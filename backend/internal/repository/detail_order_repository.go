package repository

import (
	"backend/internal/entity"
	"backend/internal/model"
	"fmt"
	"github.com/sirupsen/logrus"
	"gorm.io/gorm"
	"time"
)

type DetailOrderRepository struct {
	Repository[entity.DetailOrder]
	Log *logrus.Logger
}

func NewDetailOrderRepository(log *logrus.Logger) *DetailOrderRepository {
	return &DetailOrderRepository{
		Log: log,
	}
}

func (repo *DetailOrderRepository) TakeProfitOrder(db *gorm.DB, response *model.ReportOrderResponse, date string) error {
	modelBuff := new(model.ProfitOrder)

	err := db.Raw("select sum(total) as gross_profit, sum(products.profit * detail_orders.qty) as net_profit , sum(detail_orders.qty) as amount_product_sold from detail_orders join products on detail_orders.product_id = products.id where order_id in (select id from orders where date(created_at) = ?);", date).Scan(modelBuff).Error

	if err != nil {
		return err
	}
	response.GrossProfit = modelBuff.GrossProfit
	response.NetProfit = modelBuff.NetProfit
	response.AmountProductSold = modelBuff.AmountProductSold

	return nil
}

func (repo *DetailOrderRepository) TakeProfitOrderWithWhereBetween(db *gorm.DB, response *model.ReportOrderResponse, from, to string) error {
	modelBuff := new(model.ProfitOrder)

	err := db.Raw("select sum(total) as gross_profit, sum(products.profit * detail_orders.qty) , sum(detail_orders.qty) from detail_orders join products on detail_orders.product_id = products.id where order_id in (select id from orders where date(created_at) between ? and ?);", from, to).Scan(modelBuff).Error

	if err != nil {
		return err
	}
	response.GrossProfit = modelBuff.GrossProfit
	response.NetProfit = modelBuff.NetProfit
	response.AmountProductSold = modelBuff.AmountProductSold

	return nil
}

func (repo *DetailOrderRepository) FindWithWhereDateGrouped(db *gorm.DB, response *model.ReportOrderResponse, date string) error {
	var modelBuff []model.OrdersReportGrouped

	err := db.Raw("select DATE(detail_orders.created_at) as date, sum(total) as gross_profit, sum(products.profit * detail_orders.qty) as net_profit , sum(detail_orders.qty) as amount_product_sold from detail_orders join products on detail_orders.product_id = products.id where order_id in (select id from orders where date(detail_orders.created_at) = ?) group by date(detail_orders.created_at);", date).Scan(&modelBuff).Error
	if err != nil {
		return err
	}

	parse, err := time.Parse(time.RFC3339, modelBuff[0].Date)
	if err != nil {
		return err
	}

	modelBuff[0].Date = parse.Format("2006-01-02")

	response.OrdersGrouped = modelBuff
	return nil

}

func (repo *DetailOrderRepository) FindWithWhereBetweenDateGrouped(db *gorm.DB, response *model.ReportOrderResponse, from, to string) error {
	var modelBuff []model.OrdersReportGrouped

	err := db.Raw("select date(detail_orders.created_at) as date, sum(total) as gross_profit, sum(products.profit * detail_orders.qty) as net_profit , sum(detail_orders.qty) as amount_product_sold from detail_orders join products on detail_orders.product_id = products.id where order_id in (select id from orders where date(detail_orders.created_at) between ? and ?) group by date(detail_orders.created_at);", from, to).Scan(&modelBuff).Error
	if err != nil {
		return err
	}

	for i, mod := range modelBuff {
		parse, err := time.Parse(time.RFC3339, mod.Date)
		if err != nil {
			return err
		}

		modelBuff[i].Date = parse.Format("2006-01-02")
	}

	response.OrdersGrouped = modelBuff
	return nil

}

func (repo *DetailOrderRepository) TakeStatisticProductPopular(db *gorm.DB, response *model.ReportOrderResponse, date string) error {
	var res model.DataStatistic

	err := db.Raw("select sum(detail_orders.total) as total, sum(products.profit * detail_orders.qty) as profit , sum(detail_orders.qty) as qty from detail_orders JOIN products on products.id = detail_orders.product_id where date(detail_orders.created_at) = ? group by detail_orders.product_id order by sum(detail_orders.qty) desc limit 1;", date).Scan(&res).Error

	if err != nil {
		return err
	}

	fmt.Println(res)

	response.ProductPopular.Statistic = &res
	return nil
}

func (repo *DetailOrderRepository) TakeStatisticProductPopularWithBetweenDate(db *gorm.DB, response *model.ReportOrderResponse, from, to string) error {
	var res model.DataStatistic

	err := db.Raw("select sum(detail_orders.total), sum(products.profit * detail_orders.qty) , sum(detail_orders.qty) from detail_orders JOIN products on products.id = detail_orders.product_id where date(detail_orders.created_at) between ? and ? group by detail_orders.product_id order by sum(detail_orders.qty) desc limit 1;", from, to).Scan(&res).Error

	if err != nil {
		return err
	}

	response.ProductPopular.Statistic = &res
	return nil
}
