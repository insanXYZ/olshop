import CarouselProduct from "../../moleculs/CarouselProduct";
import Title from "../../moleculs/product/Title";
import PurchaseOption from "../../moleculs/product/PurchaseOption";

export default ({ data }) => {
  return (
    <div className="flex gap-10 relative">
      <CarouselProduct
        thumbs={true}
        className={"w-3/5 sticky top-0"}
        images={data.images}
      />
      <Title data={data} />
      <PurchaseOption data={data} />
    </div>
  );
};
