import Button from "../atoms/Button";
import Modal from "../atoms/Modal";
import { CiCircleInfo } from "react-icons/ci";

export default ({ onConfirm, onCancel, children, title, id }) => {
  return (
    <Modal id={id} title={title}>
      <div className="flex flex-col gap-5 items-center">
        <CiCircleInfo className="text-6xl" />
        <span>{children}</span>
        <div className="flex items-center gap-2">
          <form method="dialog">
            <Button onClick={onCancel}>cancel</Button>
          </form>
          <Button onClick={onConfirm}>yes</Button>
        </div>
      </div>
    </Modal>
  );
};
