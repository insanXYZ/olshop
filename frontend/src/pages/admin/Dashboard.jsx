import Dashboard from "../../components/templates/Dashboard";
import Title from "../../components/organisms/admin/Dashboard/Title";
import HeaderCols from "../../components/organisms/admin/Dashboard/Header.Columns";
import SecondCols from "../../components/organisms/admin/Dashboard/Second.Columns";
import LogOrders from "../../components/organisms/admin/Dashboard/LogOrders";
import WrapComp from "../../components/atoms/WrapComponent";
import { useEffect, useState } from "react";
import request from "../../utils/request/request";
import { useSearchParams } from "react-router-dom";

export default () => {
    const [data, setData] = useState(null);
    const [req, setReq] = useState(false);
    const [searchParams] = useSearchParams();
    const filter = searchParams.get("filter");
    const from = searchParams.get("from");
    const to = searchParams.get("to");

    useEffect(() => {
        let query;

        if (filter != null) {
            query = "filter=" + filter;
        } else if (from != null) {
            query = "from=" + from;
            if (to != null) {
                query += "&to=" + to;
            } else {
                query += "&to=" + new Date().toISOString().slice(0, 10);
            }
        } else {
            query = "filter=" + new Date().toISOString().slice(0, 10);
        }

        request
            .get("/api/orders/report?" + query)
            .then((res) => {
                setData(res.data.data);
                console.log(res.data);
                setReq(true);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    return (
        <Dashboard className={"relative overflow-x-hidden"}>
            <div className="flex flex-col gap-5">
                <WrapComp>
                    <Title />
                </WrapComp>
                {req && (
                    <>
                        <HeaderCols data={data} />
                        <SecondCols dataColumn={data} />
                        <LogOrders />
                    </>
                )}
            </div>
        </Dashboard>
    );
};
