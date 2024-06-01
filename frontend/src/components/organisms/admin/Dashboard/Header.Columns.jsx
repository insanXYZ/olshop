import CardHeader from "../../../moleculs/admin/Dashboard/CardHeader";
import WrapComp from "../../../atoms/WrapComponent";
import toRupiah from "@develoka/angka-rupiah-js";

export default ({ data }) => {
    return (
        <div className="grid grid-cols-3 gap-10">
            <WrapComp>
                <CardHeader title={"Keuntungan Kotor"}>
                    {toRupiah(data.gross_profit, {
                        dot: ".",
                        formal: false,
                        floatingPoint: 0,
                    })}
                </CardHeader>
            </WrapComp>
            <WrapComp>
                <CardHeader title={"Keuntungan Bersih"}>
                    {toRupiah(data.net_profit, {
                        dot: ".",
                        formal: false,
                        floatingPoint: 0,
                    })}{" "}
                </CardHeader>
            </WrapComp>
            <WrapComp>
                <CardHeader title={"Produk Terjual"}>
                    {data.amount_product_sold}
                </CardHeader>
            </WrapComp>
        </div>
    );
};
