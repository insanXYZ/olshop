import Button from "../../../atoms/Button";
import Input from "../../../atoms/Input";
import Modal from "../../../atoms/Modal";

export default ({ onSubmit, onChange }) => {
  return (
    <Modal title={"Create Category"} id={"modal_create_category"}>
      <form onSubmit={onSubmit} className="flex flex-col gap-5">
        <Input onChange={onChange} placeholder={"category.."} />
        <Button>Create</Button>
      </form>
    </Modal>
  );
};
