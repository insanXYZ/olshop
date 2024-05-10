import ButtonModal from "../../../atoms/ButtonModal";

export default () => {
  return (
    <div className="flex items-center justify-between">
      <div className="text-4xl font-outfit-b">Products</div>
      <ButtonModal id={"modal_create_product"} className={"bg-red-500 w-52"}>
        Create
      </ButtonModal>
    </div>
  );
};
