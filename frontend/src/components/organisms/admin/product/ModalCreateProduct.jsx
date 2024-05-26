import { useState } from "react";
import Button from "../../../atoms/Button";
import Modal from "../../../atoms/Modal";
import HeaderInputProduct from "../../../moleculs/admin/product/HeaderInputProduct";

export default ({ onSubmit }) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [qty, setQty] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState(null);

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
    onSubmit({
      name: name,
      price: Number(price),
      qty: Number(qty),
      description: description,
      category_id: category,
      images: images.file,
    });
  };

  return (
    <Modal
      className={"max-w-5xl"}
      title={"Create Product"}
      id={"modal_create_product"}
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <HeaderInputProduct
          onChangeImage={handleChangeImage}
          onChangeName={handleChangeName}
          onChangePrice={handleChangePrice}
          onChangeCategory={handleChangeCategory}
          onChangeQty={handleChangeQty}
          urlImage={images}
        />
        <textarea
          required
          placeholder="Description"
          className="bg-dark-neutral p-5 rounded-lg"
          onChange={handleChangeDescription}
          cols="30"
          rows="10"
        ></textarea>
        <Button>Create</Button>
      </form>
    </Modal>
  );
};
