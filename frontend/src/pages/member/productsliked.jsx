import Dashboard from "../../components/templates/Dashboard";
import HeaderLiked from "../../components/organisms/member/product/like/HeaderLiked";
import { useEffect, useState } from "react";
import request from "../../utils/request/request";
import { toast } from "react-toastify";
import ListProductLiked from "../../components/organisms/member/product/like/ListProductLiked";
import WrapComp from "../../components/atoms/WrapComponent";

export default () => {
    const [req, setReq] = useState(false);
    const [data, setData] = useState([]);
    useEffect(() => {
        const req = () => {
            request
                .get("/api/users/products/like")
                .then((res) => {
                    console.log(res.data);
                    setData(res.data.data);
                })
                .catch((err) => {
                    toast.error(err.data.message);
                });
            setReq(true);
        };

        req();
    }, []);

    return (
        <Dashboard className={"flex flex-col gap-5"} loading={req == false}>
            <WrapComp>
                <HeaderLiked />
            </WrapComp>
            <div className="h-full">
                {req != false && data.length > 0 && (
                    <div className="grid grid-cols-5">
                        <ListProductLiked data={data} />
                    </div>
                )}
                {req == true && data.length == 0 && (
                    <div className="text-center">products liked is empty</div>
                )}
            </div>
        </Dashboard>
    );
};
