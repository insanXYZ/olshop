import CartProduct from "../../../../moleculs/member/cart/cardProduct";
import Datatable from "../../../../atoms/Datatable";
import CarouselProduct from "../../../../moleculs/CarouselProduct";
import toRupiah from "@develoka/angka-rupiah-js";
import Counter from "../../../../moleculs/Counter";

export default ({ data, handleChangeCounter, handleChangeSelectedTable }) => {
  const columns = [
    {
      name: (
        <div className="font-bold text-xl py-2 pt-0 text-slate-200 text-left">
          Product
        </div>
      ),
      selector: (row) => (
        <div className="flex items-center gap-5">
          <CarouselProduct className="w-32" images={row.product.images} />
          <div className="line-clamp-2">{row.product.name}</div>
        </div>
      ),
    },
    {
      name: (
        <div className="font-bold text-xl py-2 pt-0 text-slate-200 text-left">
          Price
        </div>
      ),
      selector: (row) =>
        toRupiah(row.product.price, {
          dot: ".",
          floatingPoint: 0,
          formal: false,
        }),
      sortable: true,
    },
    {
      name: (
        <div className="font-bold text-xl py-2 pt-0 text-slate-200 text-left">
          Qty
        </div>
      ),
      selector: (row) => (
        <Counter
          className={"w-56"}
          max={row.product.qty}
          defaultValue={row.qty}
          setChange={(num) => handleChangeCounter(num, row.id)}
        />
      ),
      sortable: true,
    },
    {
      name: (
        <div className="font-bold text-xl py-2 pt-0 text-slate-200 text-left">
          Total
        </div>
      ),
      selector: (row) =>
        toRupiah(row.product.price * row.qty, {
          dot: ".",
          floatingPoint: 0,
          formal: false,
        }),
      sortable: true,
    },
  ];

  return (
    <Datatable
      columns={columns}
      data={data}
      pagination
      fixedHeader={true}
      fixedHeaderScrollHeight="700px"
      onSelectedRowsChange={handleChangeSelectedTable}
      selectableRows
    />
  );
};
