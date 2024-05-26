import Dashboard from "../../components/templates/Dashboard";
import Card from "../../components/atoms/Card.Dashboard";
import HeaderProduct from "../../components/organisms/admin/product/HeaderProduct";
import ModalCreateProduct from "../../components/organisms/admin/product/ModalCreateProduct";
import ModalUpdateProduct from "../../components/organisms/admin/product/ModalUpdateProduct";
import { useEffect, useState } from "react";
import request from "../../utils/request/request";
import TableProducts from "../../components/organisms/admin/product/TableProduct";
import { useSelector } from "react-redux";
import ModalConfirm from "../../components/moleculs/ModalConfirm";
import { toast } from "react-toastify";

export default () => {
  const [dataDelete, setDataDelete] = useState("");
  const [dataUpdate, setDataUpdate] = useState(null);

  const products = useSelector((s) => s.products.data);

  const handleDelete = (data) => {
    setDataDelete(data);
    document.getElementById("modal_delete_product").showModal();
  };

  const handleUpdate = (data) => {
    setDataUpdate(null);
    setTimeout(() => {
      setDataUpdate(data);
      document.getElementById("modal_update_product").showModal();
    }, 50);
  };

  useEffect(() => {
    console.log(dataUpdate);
  }, [dataUpdate]);

  const handleConfirmDelete = () => {
    request
      .delete("/api/products/" + dataDelete.id)
      .then((res) => {
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSubmitCreate = (data) => {
    request
      .post("/api/products", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSubmitUpdate = (data) => {
    request
      .put("/api/products/" + dataUpdate.id, data, {
        headers: {
          "Content-Type": "multipart/form-data",
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
      <ModalCreateProduct onSubmit={handleSubmitCreate} />
      <ModalUpdateProduct data={dataUpdate} onSubmit={handleSubmitUpdate} />
      <ModalConfirm
        id={"modal_delete_product"}
        onConfirm={handleConfirmDelete}
        title={"Delete product"}
      >
        are you want delete this product ?
      </ModalConfirm>

      <Dashboard>
        <Card>
          <div className="flex flex-col gap-5">
            <HeaderProduct />
            <TableProducts
              onUpdate={handleUpdate}
              onDelete={handleDelete}
              list={products}
            />
          </div>
        </Card>
      </Dashboard>
    </>
  );
};
