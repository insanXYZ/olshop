import CardProduct from "../../../../moleculs/home/CardProduct";

export default ({ data }) => {
  return data.map((v, i) => <CardProduct key={i} product={v} />);
};
