import Main from "../components/templates/Main";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import CardsProducts from "../components/organisms/products/CardsProducts";
import request from "../utils/request/request";

export default () => {
    const [productsState, setProductsState] = useState([]);
    const [req, setReq] = useState(false);
    const [searchParams] = useSearchParams();
    const keyword = searchParams.get("keyword");
    const category = searchParams.get("category");
    const products = useSelector((s) => s.products.data);

    useEffect(() => {
        const req = () => {
            request
                .get(
                    `/api/products?category=${
                        category ? category : ""
                    }&keyword=${keyword ? keyword : ""}`
                )
                .then((res) => {
                    setProductsState(res.data.data);
                })
                .catch((err) => console.log(err));
        };

        if (keyword || category) {
            req();
        }
        setReq(true);
    }, [keyword, category]);

    return (
        <Main loading={(keyword || category) && req == false}>
            <CardsProducts
                data={keyword || category ? productsState : products}
            />
        </Main>
    );
};
