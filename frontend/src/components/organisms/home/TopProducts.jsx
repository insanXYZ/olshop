import { Link } from "react-router-dom";
import CardProduct from "../../moleculs/home/CardProduct";

export default ({ products }) => {
  return (
    <div className="flex flex-col gap-5 h-full">
      <div className="flex gap-5 items-end">
        <div className="text-4xl">
          <span>Top </span>
          <span className="font-outfit-b">Products</span>
        </div>
        <Link to={"/"}>View All</Link>
      </div>
      <div className="grid grid-cols-6 h-full">
        {products.length > 0 &&
          products
            .slice(0, 5)
            .map((v, i) => <CardProduct key={i} product={v} />)}
      </div>
    </div>
  );
};
