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
    const labels = dataColumn.orders_grouped.map((v) => v.date);

    let dataBar = {
        labels: labels,
        datasets: [
            {
                label: "Keuntungan kotor",
                data: dataColumn.orders_grouped.map((v) => v.gross_profit),
                backgroundColor: "rgba(255, 99, 132, 0.5)",
            },
            {
                label: "Keuntungan bersih",
                data: dataColumn.orders_grouped.map((v) => v.net_profit),
                backgroundColor: "rgba(255, 99, 132, 0.5)",
            },
            {
                label: "Produk terjual",
                data: dataColumn.orders_grouped.map(
                    (v) => v.amount_product_sold
                ),
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
            <div className="w-full h-[440px] bg-dark-neutral flex justify-center items-center rounded-lg">
                Produk populer tidak ada
            </div>
        </div>
    );
};
