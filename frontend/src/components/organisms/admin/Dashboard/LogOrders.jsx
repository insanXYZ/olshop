import WrapComp from "../../../atoms/WrapComponent";
import DatatableOrders from "../../../moleculs/admin/Dashboard/DataTableOrders";

export default ({ data }) => {
    return data.orders == null ? (
        <WrapComp className={"w-full flex justify-center"}>
            <span className="text-center font-outfit-b">Orders is empty</span>
        </WrapComp>
    ) : (
        <DatatableOrders orders={data.orders} />
    );
};
