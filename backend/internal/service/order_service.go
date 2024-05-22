package service

import (
	"backend/internal/entity"
	"backend/internal/model"
	"backend/internal/repository"
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
	items := make([]midtrans.ItemDetails, len(req.DetailOrders))

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

			items = append(items, midtrans.ItemDetails{
				ID:    product.ID,
				Name:  product.Name,
				Price: int64(product.Price),
				Qty:   int32(detailOrder.Qty),
			})
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
		Items: &items,
	}

	s := snap.Client{}
	s.New(service.Viper.GetString("MD_SERVER_KEY"), midtrans.Sandbox)
	res, _ := s.CreateTransaction(reqSnap)

	return res, nil

}
