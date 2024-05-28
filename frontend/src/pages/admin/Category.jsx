import Dashboard from "../../components/templates/Dashboard";
import Card from "../../components/atoms/Card.Dashboard";
import { useEffect, useRef, useState } from "react";
import ModalCreateCategory from "../../components/organisms/admin/category/ModalCreateCategory";
import ModalDeleteCategory from "../../components/organisms/admin/category/ModalDeleteCategory";
import ModalUpdateCategory from "../../components/organisms/admin/category/ModalUpdateCategory";
import HeaderCategory from "../../components/organisms/admin/category/HeaderCategory";
import request from "../../utils/request/request";
import TableCategory from "../../components/organisms/admin/category/TableCategory";
import { useDispatch, useSelector } from "react-redux";
import { setCategories } from "../../redux/reducer/categories";
import { toast } from "react-toastify";

export default () => {
    const [categoryInput, setCategoryInput] = useState("");
    const [dataDelete, setDataDelete] = useState("");
    const [dataUpdate, setDataUpdate] = useState({});
    const [image, setImage] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        request
            .post(
                "/api/categories",
                {
                    name: categoryInput,
                    image: image,
                },
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            )
            .then((res) => {
                window.location.reload();
            })
            .catch((e) => {
                console.log(e);
            });
    };

    const dispatch = useDispatch();

    const list = useSelector((s) => s.categories.data);

    useEffect(() => {
        request
            .get("/api/categories")
            .then((res) => {
                dispatch(setCategories(res.data.data));
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const handleChange = (v) => {
        setCategoryInput(v.target.value);
    };

    const handleChangeImage = (e) => {
        setImage(e);
    };

    const handleConfirmDelete = () => {
        request
            .delete("/api/categories/" + dataDelete.id)
            .then((res) => {
                window.location.reload();
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const handleConfirmUpdate = (e) => {
        request
            .put("/api/categories/" + dataUpdate.id, e)
            .then((res) => {
                window.location.reload();
            })
            .catch((err) => {
                toast.error(err.message);
            });
    };

    const handleDelete = (v) => {
        setDataDelete(v);
        setTimeout(() => {
            document.getElementById("modal_delete_category").showModal();
        }, 50);
    };

    const handleUpdate = (v) => {
        setDataUpdate(v);
        setTimeout(() => {
            document.getElementById("modal_update_category").showModal();
        }, 50);
    };

    return (
        <>
            <ModalDeleteCategory onConfirm={handleConfirmDelete} />
            <ModalCreateCategory
                onChangeImage={handleChangeImage}
                onChange={handleChange}
                onSubmit={handleSubmit}
            />
            <ModalUpdateCategory
                onSubmit={handleConfirmUpdate}
                data={dataUpdate}
            />
            <Dashboard>
                <Card className={"flex flex-col gap-10 w-full"}>
                    <HeaderCategory />
                    <TableCategory
                        list={list}
                        onUpdate={handleUpdate}
                        onDelete={handleDelete}
                    />
                </Card>
            </Dashboard>
        </>
    );
};
