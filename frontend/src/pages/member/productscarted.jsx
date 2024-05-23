import { useEffect, useState } from "react";
import Dashboard from "../../components/templates/Dashboard";
import request from "../../utils/request/request";
import HeaderCart from "../../components/organisms/member/product/cart/HeaderCart";
import TableProductCarted from "../../components/organisms/member/product/cart/tableProductCarted";
import Card from "../../components/atoms/Card.Dashboard";
import { debounce } from "lodash";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { setProductsCarted, setQty } from "../../redux/reducer/productCarted";
import BottomBarOption from "../../components/organisms/member/product/cart/BottomBarOption";
import { Helmet } from "react-helmet";

export default () => {
  const [req, setReq] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);

  const productsCarted = useSelector((s) => s.productsCarted.data);

  const dispatch = useDispatch();

  const handleChangeCounter = debounce((num, id) => {
    let form = new FormData();
    form.append("qty", num);
    request
      .patch("/api/carts/" + id, form)
      .then((res) => {
        dispatch(
          setQty({
            id: id,
            qty: num,
          })
        );
        if (selectedRows.length > 0) {
          setSelectedRows(
            selectedRows.map((i) => {
              return i.id === id ? { ...i, qty: num } : i;
            })
          );
        }
      })
      .catch((err) => {
        toast.error(err);
      });
  }, 1000);

  useEffect(() => {
    const req = () => {
      request
        .get("/api/users/products/carts")
        .then((res) => {
          dispatch(setProductsCarted(res.data.data));
        })
        .catch((err) => {
          console.log(err);
        });
      setReq(true);
    };
    req();
  }, []);

  const handleChangeSelectedTable = ({ selectedRows }) => {
    setSelectedRows(selectedRows);
  };

  const handleCheckout = () => {
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
        window.snap.pay(res.data.data.token, {
          onSuccess: function () {
            window.location.reload();
          },
        });
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
      <Dashboard className={"flex flex-col gap-5"} loading={req == false}>
        <Card className={"flex flex-col gap-5"}>
          <HeaderCart />
          {req == true && productsCarted.length != 0 && (
            <TableProductCarted
              handleChangeCounter={handleChangeCounter}
              data={productsCarted}
              handleChangeSelectedTable={handleChangeSelectedTable}
            />
          )}
          {req == true && productsCarted.length == 0 && (
            <div className="text-center">cart empty</div>
          )}
        </Card>
        {req == true &&
          productsCarted.length != 0 &&
          selectedRows.length != 0 && (
            <BottomBarOption
              total={selectedRows.reduce((acc, curr) => {
                return acc + curr.qty * curr.product.price;
              }, 0)}
            />
          )}
      </Dashboard>
    </>
  );
};
