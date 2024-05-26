import { useEffect, useState } from "react";
import Button from "../../../atoms/Button";
import Modal from "../../../atoms/Modal";
import HeaderUpdateProduct from "../../../moleculs/admin/product/HeaderUpdateProduct";

export default ({ onSubmit, data }) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [qty, setQty] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState(null);

  const handleChangeImage = (e) => {
    console.log("handle image");
    if (e.target.files && e.target.files.length > 0) {
      setImages({
        url: Array.from(e.target.files).map((file) =>
          URL.createObjectURL(file)
        ),
        file: e.target.files,
      });
    }
  };

  useEffect(() => {
    setName("");
    setPrice("");
    setQty("");
    setCategory("");
    setDescription("");
    setImages(null);
  }, [data]);

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

    let data = {
      name: name,
      price: Number(price),
      qty: Number(qty),
      description: description,
      category_id: category,
    };

    if (images != null) {
      data.images = images.file;
    }

    onSubmit(data);
  };

  return (
    <Modal
      className={"max-w-5xl"}
      title={"Update Product"}
      id={"modal_update_product"}
    >
      {data != null && (
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <HeaderUpdateProduct
            onChangeImage={handleChangeImage}
            onChangeName={handleChangeName}
            onChangePrice={handleChangePrice}
            onChangeCategory={handleChangeCategory}
            onChangeQty={handleChangeQty}
            data={data}
            urlImage={images}
          />
          <textarea
            required
            defaultValue={data.description}
            placeholder="Description"
            className="bg-dark-neutral p-5 rounded-lg"
            onChange={handleChangeDescription}
            cols="30"
            rows="10"
          ></textarea>
          <Button>Update</Button>
        </form>
      )}
    </Modal>
  );
};
