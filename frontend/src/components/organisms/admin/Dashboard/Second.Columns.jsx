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

const labels = ["January", "February", "March", "April", "May", "June", "July"];

const options = {
    responsive: true,
    plugins: {
        legend: {
            position: "hidden",
        },
    },
};

const data = {
    labels,
    datasets: [
        {
            data: labels.map(() => Math.floor(Math.random() * 1000)),
            backgroundColor: "rgba(255, 99, 132, 0.5)",
        },
    ],
};

export default () => {
    return (
        <div className="flex h-full gap-5">
            <WrapComp>
                <div className="w-[800px]">
                    <Bar options={options} data={data} />
                </div>
            </WrapComp>
            <div className="w-full h-[440px] bg-dark-neutral flex justify-center items-center rounded-lg">
                Produk populer tidak ada
            </div>
        </div>
    );
};
