import Counter from "../Counter";
import Button from "../../atoms/Button";
import toRupiah from "@develoka/angka-rupiah-js";
import { useState } from "react";
import { CiBellOn, CiHeart, CiShoppingCart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import request from "../../../utils/request/request";

export default ({ data, onLiked }) => {
  const [qty, setQty] = useState(1);
  const [liked, setLiked] = useState(data.liked);

  const handleLike = () => {
    request
      .post("/api/products/like", {
        product_id: data.id,
      })
      .then((res) => {
        setLiked(!liked);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="w-1/5">
      <div className="w-full flex flex-col gap-5 px-3 py-5 bg-dark-neutral rounded-xl">
        <div className="flex gap-5 items-center">
          <Counter
            setChange={(num) => setQty(num)}
            className={"w-3/5"}
            max={data.qty}
            placeholder={"Qty"}
          />
          <div className="w-2/5">Stock : {data.qty}</div>
        </div>
        <div className="flex justify-between items-center">
          <span>Subtotal</span>
          <span className="font-lato-b text-lg">
            {toRupiah(data.price * qty, { dot: ".", floatingPoint: 0 })}
          </span>
        </div>
        <div className="flex flex-col gap-2">
          <Button
            onClick={handleLike}
            className="flex items-center gap-2 bg-red-500"
          >
            {liked ? (
              <FaHeart className="text-2xl text-white" />
            ) : (
              <CiHeart className="text-2xl" />
            )}
            <span>Liked</span>
          </Button>
          <Button className="flex items-center gap-2 bg-red-500">
            <CiShoppingCart className="text-2xl" />
            <span>Cart</span>
          </Button>
          <Button className="flex items-center gap-5 bg-base-100 border-2 border-red-500">
            Buy
          </Button>
        </div>
      </div>
    </div>
  );
};
