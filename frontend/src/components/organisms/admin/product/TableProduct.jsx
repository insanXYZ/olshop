import { CiEdit, CiTrash } from "react-icons/ci";
import Button from "../../../atoms/Button";
import DataTable from "../../../atoms/Datatable";
import Carousel from "../../../atoms/Carousel";
import toRupiah from "@develoka/angka-rupiah-js";
import CarouselProduct from "../../../moleculs/CarouselProduct";

export default ({ list, onDelete }) => {
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
        <div className="font-bold text-xl py-2 pt-0 text-slate-200 text-left">
          Price
        </div>
      ),
      selector: (row) => toRupiah(row.price),
      sortable: true,
    },
    {
      name: (
        <div className="font-bold text-xl py-2 pt-0 text-slate-200 text-left">
          Qty
        </div>
      ),
      selector: (row) => row.qty,
      sortable: true,
    },
    {
      name: (
        <div className="font-bold text-xl py-2 pt-0 text-slate-200 text-left">
          Category
        </div>
      ),
      selector: (row) => row.category.name,
      sortable: true,
    },
    {
      name: (
        <div className="font-bold text-xl py-2 pt-0 text-slate-200 text-left">
          Image
        </div>
      ),
      selector: (row) => (
        <div>
          <CarouselProduct images={row.images} className="w-28" />
        </div>
      ),
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
          <Button onClick={() => onDelete(row.id)} className={"bg-red-500"}>
            <CiTrash /> delete
          </Button>
        </div>
      ),
    },
  ];

  return list.length > 0 ? (
    <DataTable
      columns={columns}
      data={list}
      pagination
      fixedHeader={true}
      fixedHeaderScrollHeight="700px"
    />
  ) : (
    <div className="text-center">Products is empty</div>
  );
};
