import ButtonModal from "../../../atoms/ButtonModal";

export default () => {
  return (
    <div className="flex items-center justify-between">
      <div className="text-4xl font-outfit-b">Categories</div>
      <ButtonModal id={"modal_create_category"} className={"bg-red-500 w-52"}>
        Create
      </ButtonModal>
    </div>
  );
};
