import CarouselProduct from "../../CarouselProduct";
import toRupiah from "@develoka/angka-rupiah-js";
import Counter from "../../Counter";
import { debounce } from "lodash";
import request from "../../../../utils/request/request";

export default ({ data }) => {
  const handleChangeCounter = debounce((num) => {
    console.log(num);
  }, 1000);

  return (
    <tr className="relative">
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
          setChange={handleChangeCounter}
        />
      </th>
      <th>
        {toRupiah(data.product.price * data.qty, {
          dot: ".",
          floatingPoint: 0,
        })}
      </th>
      <th>ini action</th>
    </tr>
  );
};
