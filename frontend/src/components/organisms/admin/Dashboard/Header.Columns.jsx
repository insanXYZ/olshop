import CardHeader from "../../../moleculs/admin/Dashboard/CardHeader";
import WrapComp from "../../../atoms/WrapComponent";
import toRupiah from "@develoka/angka-rupiah-js";

export default ({ data }) => {
    return (
        <div className="grid grid-cols-3 gap-10">
            <WrapComp>
                <CardHeader title={"Gross Profit"}>
                    {toRupiah(data.gross_profit, {
                        dot: ".",
                        formal: false,
                        floatingPoint: 0,
                    })}
                </CardHeader>
            </WrapComp>
            <WrapComp>
                <CardHeader title={"Net Profit"}>
                    {toRupiah(data.net_profit, {
                        dot: ".",
                        formal: false,
                        floatingPoint: 0,
                    })}{" "}
                </CardHeader>
            </WrapComp>
            <WrapComp>
                <CardHeader title={"Product Sold"}>
                    {data.amount_product_sold}
                </CardHeader>
            </WrapComp>
        </div>
    );
};
