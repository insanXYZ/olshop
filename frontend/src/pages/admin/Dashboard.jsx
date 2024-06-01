import Dashboard from "../../components/templates/Dashboard";
import Title from "../../components/organisms/admin/Dashboard/Title";
import HeaderCols from "../../components/organisms/admin/Dashboard/Header.Columns";
import SecondCols from "../../components/organisms/admin/Dashboard/Second.Columns";
import LogOrders from "../../components/organisms/admin/Dashboard/LogOrders";
import WrapComp from "../../components/atoms/WrapComponent";
import { useEffect, useState } from "react";
import request from "../../utils/request/request";

export default () => {
    const [date, setData] = useState(null);

    // useEffect(() => {
    //     request
    //         .get("/api/orders/report")
    //         .then((res) => {
    //             console.log(res.data);
    //         })
    //         .catch((err) => {
    //             console.log(err);
    //         });
    // });

    return (
        <Dashboard className={"relative overflow-x-hidden"}>
            <div className="flex flex-col gap-5">
                <WrapComp>
                    <Title />
                </WrapComp>
                <HeaderCols />
                <SecondCols />
                <LogOrders />
            </div>
        </Dashboard>
    );
};
