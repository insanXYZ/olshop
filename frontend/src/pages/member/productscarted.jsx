import { useEffect, useState } from "react";
import Dashboard from "../../components/templates/Dashboard";
import request from "../../utils/request/request";
import HeaderCart from "../../components/organisms/member/product/cart/HeaderCart";
import TableProductCarted from "../../components/organisms/member/product/cart/tableProductCarted";
import Card from "../../components/atoms/Card.Dashboard";

export default () => {
  const [data, setData] = useState([]);
  const [req, setReq] = useState(false);

  useEffect(() => {
    const req = () => {
      request
        .get("/api/users/products/cart")
        .then((res) => {
          setData(res.data.data);
        })
        .catch((err) => {
          console.log(err);
        });
      setReq(true);
    };

    req();
  }, []);

  return (
    <Dashboard className={"flex flex-col gap-5"} loading={req == false}>
      <Card className={"flex flex-col gap-5"}>
        <HeaderCart />
        {req == true && data.length != 0 && <TableProductCarted data={data} />}
      </Card>
    </Dashboard>
  );
};
