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
        var payment = document.getElementById("payment");
        payment.addEventListener("click", function () {
          // Trigger snap popup. @TODO: Replace TRANSACTION_TOKEN_HERE with your transaction token
          window.snap.pay(res.data.token);
          // customer will be redirected after completing payment pop-up
        });
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSetCart = () => {};

  return (
    <>
      <Helmet>
        <script
          type="text/javascript"
          src="https://app.sandbox.midtrans.com/snap/snap.js"
          data-client-key={import.meta.env.VITE_BACKEND_URL}
        ></script>
      </Helmet>
      <div id="payment"></div>
      <Main loading={product.length == 0}>
        <Header handleCheckout={handleCheckout} data={product} />
      </Main>
    </>
  );
};
