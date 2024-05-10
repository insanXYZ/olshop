import Button from "../../../atoms/Button";
import Modal from "../../../atoms/Modal";
import HeaderInputProduct from "../../../moleculs/admin/product/HeaderInputProduct";

export default ({
  onSubmit,
  onChangeName,
  onChangePrice,
  onChangeDesc,
  onChangeImage,
  onChangeCategory,
  onChangeQty,
  urlImage,
}) => {
  return (
    <Modal
      className={"max-w-5xl"}
      title={"Create Product"}
      id={"modal_create_product"}
    >
      <form onSubmit={onSubmit} className="flex flex-col gap-5">
        <HeaderInputProduct
          onChangeImage={onChangeImage}
          onChangeName={onChangeName}
          onChangePrice={onChangePrice}
          onChangeCategory={onChangeCategory}
          onChangeQty={onChangeQty}
          urlImage={urlImage}
        />
        <textarea
          required
          placeholder="Description"
          className="bg-dark-neutral p-5 rounded-lg"
          onChange={onChangeDesc}
          cols="30"
          rows="10"
        ></textarea>
        <Button>Create</Button>
      </form>
    </Modal>
  );
};
