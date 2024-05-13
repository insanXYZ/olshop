import { useParams } from "react-router-dom";
import Main from "../components/templates/Main";
import { useSelector } from "react-redux";
import Header from "../components/organisms/product/Header";
import { useEffect, useState } from "react";
import request from "../utils/request/request";
import Modal from "../components/atoms/Modal";

export default () => {
  const { id } = useParams();
  const [product, setProduct] = useState([]);

  useEffect(() => {
    request
      .get("/api/products/" + id)
      .then((res) => {
        console.log(res.data);
        setProduct(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleCheckout = () => {};

  const handleSetCart = () => {};

  return (
    <>
      <Main loading={product.length == 0}>
        <Header data={product} />
      </Main>
    </>
  );
};
