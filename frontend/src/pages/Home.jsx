import Main from "../components/templates/Main";
import HeaderImage from "../components/organisms/home/HeaderImage";
import TopProducts from "../components/organisms/home/TopProducts";
import { useSelector } from "react-redux";

export default () => {
  let products = useSelector((s) => s.products.data);

  return (
    <Main>
      <HeaderImage />
      <TopProducts products={products} />
    </Main>
  );
};
