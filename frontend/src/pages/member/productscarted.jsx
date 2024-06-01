import { useEffect, useState } from "react";
import Dashboard from "../../components/templates/Dashboard";
import request from "../../utils/request/request";
import HeaderCart from "../../components/organisms/member/product/cart/HeaderCart";
import TableProductCarted from "../../components/organisms/member/product/cart/tableProductCarted";
import { debounce } from "lodash";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { setProductsCarted, setQty } from "../../redux/reducer/productCarted";
import BottomBarOption from "../../components/organisms/member/product/cart/BottomBarOption";
import { Helmet } from "react-helmet";
import WrapComp from "../../components/atoms/WrapComponent";

export default () => {
    const [req, setReq] = useState(false);
    const [selectedRows, setSelectedRows] = useState([]);

    const productsCarted = useSelector((s) => s.productsCarted.data);

    const dispatch = useDispatch();

    const handleChangeCounter = debounce((num, id) => {
        let form = new FormData();
        form.append("qty", num);
        request
            .put("/api/carts/" + id, form)
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
        let orders = [];

        selectedRows.forEach((element) => {
            orders.push({
                product_id: element.product.id,
                qty: element.qty,
            });
        });

        request
            .post("/api/orders", {
                detail_orders: orders,
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

    const handleDelete = () => {
        request
            .delete("/api/carts", {
                data: {
                    carts_id: selectedRows.map((item) => item.id),
                },
            })
            .then((res) => {
                window.location.reload();
            })
            .catch((err) => {
                toast.error(err);
            });
    };

    return (
        <>
            <Helmet>
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <script
                    type="text/javascript"
                    src="https://app.sandbox.midtrans.com/snap/snap.js"
                    data-client-key={import.meta.env.VITE_MIDTRANS_CLIENT_KEY}
                ></script>
            </Helmet>
            <Dashboard className={"flex flex-col gap-5"} loading={req == false}>
                <div className={"flex flex-col gap-5"}>
                    <WrapComp>
                        <HeaderCart />
                    </WrapComp>
                    {req == true && productsCarted.length != 0 && (
                        <WrapComp>
                            <TableProductCarted
                                handleChangeCounter={handleChangeCounter}
                                data={productsCarted}
                                handleChangeSelectedTable={
                                    handleChangeSelectedTable
                                }
                            />
                        </WrapComp>
                    )}
                    {req == true && productsCarted.length == 0 && (
                        <div className="text-center">cart empty</div>
                    )}
                </div>
                {req == true &&
                    productsCarted.length != 0 &&
                    selectedRows.length != 0 && (
                        <WrapComp>
                            <BottomBarOption
                                onDelete={handleDelete}
                                onCheckout={handleCheckout}
                                total={selectedRows.reduce((acc, curr) => {
                                    return acc + curr.qty * curr.product.price;
                                }, 0)}
                            />
                        </WrapComp>
                    )}
            </Dashboard>
        </>
    );
};
