import { useParams } from "react-router-dom";
import Main from "../components/templates/Main";
import { useSelector } from "react-redux";
import Header from "../components/organisms/product/Header";
import { useEffect, useState } from "react";
import request from "../utils/request/request";
import Modal from "../components/atoms/Modal";
import { Helmet } from "react-helmet";

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

  const handleSetCart = () => {};

  const handleCheckout = (qty) => {
    request
      .post("/api/orders", {
        detail_orders: [
          {
            product_id: product.id,
            qty,
          },
        ],
      })
      .then((res) => {
        window.snap.pay(res.data.data.token);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <Helmet>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <script
          type="text/javascript"
          src="https://app.sandbox.midtrans.com/snap/snap.js"
          data-client-key={import.meta.env.VITE_MIDTRANS_CLIENT_KEY}
        ></script>
      </Helmet>
      <Main loading={product.length == 0}>
        <Header handleCheckout={handleCheckout} data={product} />
      </Main>
    </>
  );
};
