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

export default () => {
  const [req, setReq] = useState(false);

  const productsCarted = useSelector((s) => s.productsCarted.data);

  const dispatch = useDispatch();

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
      })
      .catch((err) => {
        toast.error(err);
      });
  }, 1000);

  return (
    <Dashboard className={"flex flex-col gap-5"} loading={req == false}>
      <Card className={"flex flex-col gap-5"}>
        <HeaderCart />
        {req == true && productsCarted.length != 0 && (
          <TableProductCarted
            handleChangeCounter={handleChangeCounter}
            data={productsCarted}
          />
        )}
        {req == true && productsCarted.length == 0 && (
          <div className="text-center">cart empty</div>
        )}
      </Card>
    </Dashboard>
  );
};
