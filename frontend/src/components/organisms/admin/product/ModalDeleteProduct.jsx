import ModalConfirm from "../../../moleculs/ModalConfirm";

export default ({ onConfirm }) => {
  return (
    <ModalConfirm
      onConfirm={onConfirm}
      id={"modal_delete_product"}
      title={"Delete Product"}
    >
      are you want delete this product ?
    </ModalConfirm>
  );
};
