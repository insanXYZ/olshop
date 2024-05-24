import Card from "../../../../atoms/Card.Dashboard";
import toRupiah from "@develoka/angka-rupiah-js";
import Button from "../../../../atoms/Button";

export default ({ total, onCheckout, onDelete }) => {
  return (
    <Card className={"flex justify-between items-center"}>
      <div className="gap-5 text-lg">
        <span className="font-outfit-b">Total : </span>
        <span className="font-outfit-b">
          {toRupiah(total, {
            dot: ".",
            formal: false,
            floatingPoint: 0,
          })}
        </span>
      </div>
      <div className="flex items-center gap-5">
        <Button className="px-10 bg-red-500" onClick={onDelete}>
          Delete
        </Button>
        <Button className="px-10 border-2 border-red-500" onClick={onCheckout}>
          Buy
        </Button>
      </div>
    </Card>
  );
};
