import { CiEdit, CiTrash } from "react-icons/ci";
import Button from "../../../atoms/Button";
import DataTable from "../../../atoms/Datatable";
import ButtonModal from "../../../atoms/ButtonModal";

export default ({ list, setDataDelete }) => {
  const handleClickDelete = (v) => {
    setDataDelete(list.find((x) => x.id == v));
    document.getElementById("modal_delete_category").showModal();
  };

  const columns = [
    {
      name: (
        <div className="font-bold text-xl py-2 pt-0 text-slate-200 text-left">
          Name
        </div>
      ),
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: (
        <div className=" font-bold text-xl py-2 pt-0 text-slate-200 text-left">
          Action
        </div>
      ),
      selector: (row) => (
        <div className=" py-2 flex w-full items-center gap-5">
          <Button className={"bg-green-500"}>
            <CiEdit /> update
          </Button>
          <Button
            onClick={() => handleClickDelete(row.id)}
            className={"bg-red-500"}
          >
            <CiTrash /> delete
          </Button>
        </div>
      ),
    },
  ];

  return list.length > 0 ? (
    <DataTable columns={columns} data={list} pagination />
  ) : (
    <div className="text-center">Category is empty</div>
  );
};
