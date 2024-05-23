import CarouselProduct from "../../CarouselProduct";
import toRupiah from "@develoka/angka-rupiah-js";
import Counter from "../../Counter";
import { useState } from "react";

export default ({ data, handleChangeCounter }) => {
  const [qty, setQty] = useState(data.qty);

  const handleCounter = (num) => {
    handleChangeCounter(num, data.id);
    setQty(num);
  };

  return (
    <tr className="relative">
      <th>
        <label>
          <input type="checkbox" className="checkbox" />
        </label>
      </th>
      <th className="flex items-center gap-5">
        <CarouselProduct className="w-32" images={data.product.images} />
        <div className="line-clamp-2">{data.product.name}</div>
      </th>
      <th>{toRupiah(data.product.price, { dot: ".", floatingPoint: 0 })}</th>
      <th>
        <Counter
          className={"w-56"}
          max={data.product.qty}
          defaultValue={data.qty}
          setChange={handleCounter}
        />
      </th>
      <th>
        {toRupiah(data.product.price * qty, {
          dot: ".",
          floatingPoint: 0,
          formal: false,
        })}
      </th>
    </tr>
  );
};
