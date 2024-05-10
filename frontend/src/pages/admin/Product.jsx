import Dashboard from "../../components/templates/Dashboard";
import Card from "../../components/atoms/Card.Dashboard";
import HeaderProduct from "../../components/organisms/admin/product/HeaderProduct";
import ModalCreateProduct from "../../components/organisms/admin/product/ModalCreateProduct";
import { useState } from "react";
import request from "../../utils/request/request";
import TableProducts from "../../components/organisms/admin/product/TableProduct";
import { useSelector } from "react-redux";
import ModalConfirm from "../../components/moleculs/ModalConfirm";

export default () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [qty, setQty] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState(null);
  const [dataDelete, setDataDelete] = useState("");

  const products = useSelector((s) => s.products.data);

  const handleDelete = (id) => {
    setDataDelete(products.find((x) => x.id == id));
    document.getElementById("modal_delete_product").showModal();
  };

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

  const handleChangeImage = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setImages({
        url: Array.from(e.target.files).map((file) =>
          URL.createObjectURL(file)
        ),
        file: e.target.files,
      });
    }
  };

  const handleChangeCategory = (v) => {
    setCategory(v.target.value);
  };

  const handleChangeQty = (v) => {
    setQty(v.target.value);
  };

  const handleChangeName = (v) => {
    setName(v.target.value);
  };

  const handleChangePrice = (v) => {
    setPrice(v.target.value);
  };

  const handleChangeDescription = (v) => {
    setDescription(v.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    request
      .post(
        "/api/products",
        {
          name: name,
          price: price,
          qty: qty,
          description: description,
          category_id: category,
          images: images.file,
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
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <ModalCreateProduct
        onChangeCategory={handleChangeCategory}
        onChangeName={handleChangeName}
        onChangeDesc={handleChangeDescription}
        onChangeImage={handleChangeImage}
        onChangePrice={handleChangePrice}
        onSubmit={handleSubmit}
        onChangeQty={handleChangeQty}
        urlImage={images}
      />
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
            <TableProducts onDelete={handleDelete} list={products} />
          </div>
        </Card>
      </Dashboard>
    </>
  );
};
