import toRupiah from "@develoka/angka-rupiah-js";
import { Link } from "react-router-dom";
import CarouselProduct from "../CarouselProduct";

export default ({ product }) => {
  return (
    <Link
      to={"/product/" + product.id}
      className="flex w-[250px] h-full flex-col bg-dark-neutral rounded-lg gap-1 justify-between p-5"
    >
      <div className="h-full w-full flex flex-col gap-1">
        <CarouselProduct images={product.images} source="url" />
        <div className="line-clamp-2">{product.name}</div>
      </div>
      <span className="font-outfit-b text-end text-lg line-clamp-1">
        {toRupiah(product.price, {
          dot: ".",
          formal: false,
          floatingPoint: 0,
        })}
      </span>
    </Link>
  );
};
