import Button from "../../../atoms/Button";
import Modal from "../../../atoms/Modal";
import { CiCircleInfo } from "react-icons/ci";

export default ({ onConfirm }) => {
  return (
    <Modal id={"modal_delete_category"} title={"Delete category"}>
      <div className="flex flex-col gap-5 items-center">
        <CiCircleInfo className="text-6xl" />
        <span>are you want delete this category ?</span>
        <div className="flex items-center gap-2">
          <form method="dialog">
            <Button>cancel</Button>
          </form>
          <Button onClick={onConfirm}>yes</Button>
        </div>
      </div>
    </Modal>
  );
};
