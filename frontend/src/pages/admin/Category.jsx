import Dashboard from "../../components/templates/Dashboard";
import Card from "../../components/atoms/Card.Dashboard";
import { useEffect, useRef, useState } from "react";
import ModalCreateCategory from "../../components/organisms/admin/category/ModalCreateCategory";
import ModalDeleteCategory from "../../components/organisms/admin/category/ModalDeleteCategory";
import HeaderCategory from "../../components/organisms/admin/category/HeaderCategory";
import request from "../../utils/request/request";
import TableCategory from "../../components/organisms/admin/category/TableCategory";
import { useDispatch, useSelector } from "react-redux";
import { setCategories } from "../../redux/reducer/categories";

export default () => {
  const [categoryInput, setCategoryInput] = useState("");
  const [dataDelete, setDataDelete] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    request
      .post("/api/categories", {
        name: categoryInput,
      })
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

  return (
    <>
      <ModalDeleteCategory onConfirm={handleConfirmDelete} />
      <ModalCreateCategory onChange={handleChange} onSubmit={handleSubmit} />
      <Dashboard>
        <Card className={"flex flex-col gap-10 w-full"}>
          <HeaderCategory />
          <TableCategory list={list} setDataDelete={setDataDelete} />
        </Card>
      </Dashboard>
    </>
  );
};
