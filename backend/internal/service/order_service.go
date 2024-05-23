package service

import (
	"backend/internal/entity"
	"backend/internal/model"
	"backend/internal/repository"
	"crypto/sha512"
	"encoding/hex"
	"errors"
	"github.com/go-playground/validator/v10"
	"github.com/golang-jwt/jwt/v5"
	"github.com/google/uuid"
	"github.com/midtrans/midtrans-go"
	"github.com/midtrans/midtrans-go/snap"
	"github.com/sirupsen/logrus"
	"github.com/spf13/viper"
	"gorm.io/gorm"
)

type OrderService struct {
	DB                    *gorm.DB
	Log                   *logrus.Logger
	Validate              *validator.Validate
	Viper                 *viper.Viper
	OrderRepository       *repository.OrderRepository
	DetailOrderRepository *repository.DetailOrderRepository
	ProductRepository     *repository.ProductRepository
	UserRepository        *repository.UserRepository
}

func NewOrderService(db *gorm.DB, log *logrus.Logger, validate *validator.Validate, viper *viper.Viper, repo *repository.OrderRepository, detailRepository *repository.DetailOrderRepository, productRepository *repository.ProductRepository, userRepository *repository.UserRepository) *OrderService {
	return &OrderService{
		DB:                    db,
		Log:                   log,
		Validate:              validate,
		Viper:                 viper,
		OrderRepository:       repo,
		DetailOrderRepository: detailRepository,
		ProductRepository:     productRepository,
		UserRepository:        userRepository,
	}
}

func (service *OrderService) Create(claims jwt.MapClaims, req *model.CreateOrder) (*snap.Response, error) {
	err := service.Validate.Struct(req)
	if err != nil {
		return nil, err
	}

	order := &entity.Order{
		ID:     uuid.New().String(),
		Status: "unpaid",
		UserID: claims["sub"].(string),
	}
	user := new(entity.User)

	err = service.DB.Transaction(func(tx *gorm.DB) error {

		err := service.UserRepository.TakeById(tx, user, claims["sub"].(string))
		if err != nil {
			return err
		}

		err = service.OrderRepository.Create(tx, order)
		if err != nil {
			return err
		}

		var total int

		for _, detailOrder := range req.DetailOrders {
			product := new(entity.Product)
			err := service.ProductRepository.TakeById(tx, product, detailOrder.ProductID)
			if err != nil {
				return err
			}

			if detailOrder.Qty > product.Qty {
				return errors.New("order failed")
			}

			totalPrice := detailOrder.Qty * product.Price

			dOrder := &entity.DetailOrder{
				ID:        uuid.New().String(),
				OrderId:   order.ID,
				ProductId: product.ID,
				Qty:       detailOrder.Qty,
				Total:     totalPrice,
			}

			total += totalPrice

			err = service.DetailOrderRepository.Create(tx, dOrder)
			if err != nil {
				return err
			}
		}

		order.Total = total

		err = service.OrderRepository.Save(tx, order)
		if err != nil {
			return err
		}

		return nil
	})
	if err != nil {
		return nil, err
	}

	reqSnap := &snap.Request{
		TransactionDetails: midtrans.TransactionDetails{
			OrderID:  order.ID,
			GrossAmt: int64(order.Total),
		},
		CustomerDetail: &midtrans.CustomerDetails{
			FName: user.Name,
			Email: user.Email,
		},
	}

	s := snap.Client{}
	s.New(service.Viper.GetString("MD_SERVER_KEY"), midtrans.Sandbox)
	res, _ := s.CreateTransaction(reqSnap)

	return res, nil

}

func (service *OrderService) AfterPayment(req *model.AfterPayment) error {
	err := service.Validate.Struct(req)
	if err != nil {
		return err
	}

	if req.TransactionStatus == "capture" {
		hash := sha512.New()
		hash.Write([]byte(req.OrderId + req.StatusCode + req.GrossAmount + service.Viper.GetString("MD_SERVER_KEY")))
		sha512Hash := hex.EncodeToString(hash.Sum(nil))

		if sha512Hash == req.SignatureKey {

			err := service.DB.Transaction(func(tx *gorm.DB) error {

				order := new(entity.Order)
				order.ID = req.OrderId
				err := service.OrderRepository.TakeWithGetRelationDetailOrder(tx, order)
				if err != nil {
					return err
				}

				order.Status = "paid"
				err = service.OrderRepository.Save(tx, order)
				if err != nil {
					return err
				}

				for _, detailOrder := range order.DetailOrders {

					product := new(entity.Product)
					product.ID = detailOrder.ProductId

					err := service.ProductRepository.Take(tx, product)
					if err != nil {
						return err
					}

					product.Qty = product.Qty - detailOrder.Qty

					err = service.ProductRepository.Save(tx, product)
					if err != nil {
						return err
					}

				}

				return nil

			})
			if err != nil {
				return err
			}
		}
	}

	return errors.New("failed to pay for the order")

}
