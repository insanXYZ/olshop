import CartProduct from "../../../../moleculs/member/cart/cardProduct";
import Datatable from "../../../../atoms/Datatable";
import CarouselProduct from "../../../../moleculs/CarouselProduct";
import toRupiah from "@develoka/angka-rupiah-js";
import Counter from "../../../../moleculs/Counter";

// export default ({ data, handleChangeCounter }) => {
//   return (
//     <div className="overflow-x-auto">
//       <table className="table table-lg">
//         <thead>
//           <tr>
//             <th> </th>
//             <th>Product</th>
//             <th>Price</th>
//             <th>Qty</th>
//             <th>Total</th>
//           </tr>
//         </thead>
//         <tbody>
//           {data.map((v, i) => (
//             <CartProduct
//               handleChangeCounter={handleChangeCounter}
//               key={i}
//               data={v}
//             />
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

export default ({ data, handleChangeCounter }) => {
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
        toRupiah(row.product.price, { dot: ".", floatingPoint: 0 }),
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
      selectableRows
    />
  );
};
