import CardHeader from "../../../moleculs/admin/Dashboard/CardHeader";
import WrapComp from "../../../atoms/WrapComponent";

export default () => {
    return (
        <div className="grid grid-cols-3 gap-10">
            <WrapComp>
                <CardHeader title={"Keuntungan Kotor"}>Rp 25.00000</CardHeader>
            </WrapComp>
            <WrapComp>
                <CardHeader title={"Keuntungan Bersih"}>Rp 25.00000</CardHeader>
            </WrapComp>
            <WrapComp>
                <CardHeader title={"Produk Terjual"}>Rp 25.00000</CardHeader>
            </WrapComp>
        </div>
    );
};
