import CarouselProduct from "../../moleculs/CarouselProduct";
import Title from "../../moleculs/product/Title";
import PurchaseOption from "../../moleculs/product/PurchaseOption";

export default ({ data, handleCheckout }) => {
    return (
        <>
            <CarouselProduct
                thumbs={true}
                className={"w-1/5 sticky top-0 left-0"}
                images={data.images}
            />
            <Title data={data} />
            <PurchaseOption handleCheckout={handleCheckout} data={data} />
        </>
    );
};
