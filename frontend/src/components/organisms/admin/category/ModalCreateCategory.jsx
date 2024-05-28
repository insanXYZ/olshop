import Button from "../../../atoms/Button";
import Input from "../../../atoms/Input";
import Modal from "../../../atoms/Modal";
import InputFile from "../../../moleculs/admin/category/inputFile";

export default ({ onSubmit, onChange, onChangeImage }) => {
    return (
        <Modal title={"Create Category"} id={"modal_create_category"}>
            <form onSubmit={onSubmit} className="flex flex-col gap-5">
                <Input onChange={onChange} placeholder={"category.."} />
                <InputFile
                    className={"w-full flex justify-center"}
                    onchangeImage={onChangeImage}
                />
                <Button>Create</Button>
            </form>
        </Modal>
    );
};
