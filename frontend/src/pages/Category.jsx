import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import request from "../utils/request/request";
import { setCategories } from "../redux/reducer/categories";
import CardCategory from "../components/moleculs/categories/CardCategory";
import Main from "../components/templates/Main";

export default () => {
    const categories = useSelector((s) => s.categories.data);
    const dispatch = useDispatch();

    useEffect(() => {
        const req = () => {
            request
                .get("/api/categories")
                .then((res) => {
                    dispatch(setCategories(res.data.data));
                })
                .catch((err) => {
                    console.log(err);
                });
        };

        if (categories.length == 0) {
            req();
        }
    });

    return (
        <Main>
            <div className="flex flex-col gap-5">
                {categories.map((v, i) => (
                    <CardCategory key={i} data={v} />
                ))}
            </div>
        </Main>
    );
};
