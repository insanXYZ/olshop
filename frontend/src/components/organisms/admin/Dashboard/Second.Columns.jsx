import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import WrapComp from "../../../atoms/WrapComponent";
import CardProduct from "../../../moleculs/home/CardProduct";
import CardProductPopular from "../../../moleculs/admin/Dashboard/CardProductPopular";
import toRupiah from "@develoka/angka-rupiah-js";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const options = {
    responsive: true,
    plugins: {
        legend: {
            position: "hidden",
        },
    },
};

export default ({ dataColumn }) => {
    const labels =
        dataColumn.orders_grouped != null
            ? dataColumn.orders_grouped.map((v) => v.date)
            : [];

    let dataBar = {
        labels: labels,
        datasets: [
            {
                label: "Gross Profit",
                data:
                    dataColumn.orders_grouped != null
                        ? dataColumn.orders_grouped.map((v) => v.gross_profit)
                        : [],
                backgroundColor: "rgba(255, 99, 132, 0.5)",
            },
            {
                label: "Net Profit",
                data:
                    dataColumn.orders_grouped != null
                        ? dataColumn.orders_grouped.map((v) => v.net_profit)
                        : [],
                backgroundColor: "rgba(255, 99, 132, 0.5)",
            },
            {
                label: "Product Sold",
                data:
                    dataColumn.orders_grouped != null
                        ? dataColumn.orders_grouped.map(
                              (v) => v.amount_product_sold
                          )
                        : [],
                backgroundColor: "rgba(255, 99, 132, 0.5)",
            },
        ],
    };

    return (
        <div className="flex h-full gap-5">
            <WrapComp>
                <div className="w-[800px]">
                    <Bar options={options} data={dataBar} />
                </div>
            </WrapComp>
            {dataColumn.product_popular.product == null ? (
                <div className="w-full h-[440px] bg-dark-neutral flex justify-center items-center rounded-lg">
                    Produk populer tidak ada
                </div>
            ) : (
                <div className="w-full flex flex-col gap-6 h-[440px]">
                    <WrapComp>
                        <span className="font-outfit-b">Produk terpopuler</span>
                    </WrapComp>
                    <div className="flex gap-5 w-full h-full">
                        <div className="w-[250px] h-full ">
                            <CardProduct
                                className="h-full"
                                product={dataColumn.product_popular.product}
                            />
                        </div>
                        <div className="h-full w-full gap-1 flex flex-col justify-between">
                            <CardProductPopular title={"Gross Profit"}>
                                {toRupiah(
                                    dataColumn.product_popular.statistic.total,
                                    {
                                        dot: ".",
                                        formal: false,
                                        floatingPoint: 0,
                                    }
                                )}{" "}
                            </CardProductPopular>
                            <CardProductPopular title={"Net Profit"}>
                                {toRupiah(
                                    dataColumn.product_popular.statistic.profit,
                                    {
                                        dot: ".",
                                        formal: false,
                                        floatingPoint: 0,
                                    }
                                )}{" "}
                            </CardProductPopular>
                            <CardProductPopular title={"Amount Sold"}>
                                {dataColumn.product_popular.statistic.qty}
                            </CardProductPopular>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
