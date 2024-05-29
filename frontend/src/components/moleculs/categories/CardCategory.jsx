import { Link } from "react-router-dom";

export default ({ data }) => {
    return (
        <Link
            to={"/product?category=" + data.name}
            className="flex w-[180px] h-[240px] flex-col rounded-lg gap-1 justify-between p-5"
        >
            <img src={data.image} className="w-full aspect-square rounded-md" />
            <span className="text-center line-clamp-2">{data.name}</span>
        </Link>
    );
};
