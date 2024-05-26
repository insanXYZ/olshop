import Button from "../../../atoms/Button";
import Input from "../../../atoms/Input";
import Modal from "../../../atoms/Modal";
import InputFile from "../../../moleculs/admin/category/inputFile";

export default ({ onSubmit, onChange }) => {
  return (
    <Modal title={"Create Category"} id={"modal_create_category"}>
      <form onSubmit={onSubmit} className="flex flex-col gap-5">
        <Input onChange={onChange} placeholder={"category.."} />
        <InputFile className={"w-full h-32"} />
        <Button>Create</Button>
      </form>
    </Modal>
  );
};
