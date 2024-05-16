import CartProduct from "../../../../moleculs/member/cart/cardProduct";

export default ({ data }) => {
  return (
    <div className="overflow-x-auto">
      <table className="table table-lg">
        <thead>
          <tr>
            <th>Product</th>
            <th>Price</th>
            <th>Qty</th>
            <th>Total</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((v, i) => (
            <CartProduct key={i} data={v} />
          ))}
        </tbody>
      </table>
    </div>
  );
};
