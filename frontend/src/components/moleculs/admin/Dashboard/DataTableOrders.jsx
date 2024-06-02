import DataTable from "../../../atoms/Datatable";
import WrapComp from "../../../atoms/WrapComponent";

export default ({ orders }) => {
    const columns = [
        {
            name: (
                <div className="font-bold text-xl py-2 pt-0 text-slate-200 text-left">
                    Id
                </div>
            ),
            selector: (row) => row.id,
            sortable: true,
        },
        {
            name: (
                <div className="font-bold text-xl py-2 pt-0 text-slate-200 text-left">
                    Total
                </div>
            ),
            selector: (row) => row.total,
            sortable: true,
        },
        {
            name: (
                <div className="font-bold text-xl py-2 pt-0 text-slate-200 text-left">
                    Profit
                </div>
            ),
            selector: (row) => row.profit,
            sortable: true,
        },
        {
            name: (
                <div className="font-bold text-xl py-2 pt-0 text-slate-200 text-left">
                    Status
                </div>
            ),
            selector: (row) => row.status,
            sortable: true,
        },
    ];

    return (
        <WrapComp>
            <DataTable columns={columns} data={orders} pagination />
        </WrapComp>
    );
};
