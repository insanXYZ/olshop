import { CiImageOn } from "react-icons/ci";
import Input from "../../../atoms/Input";
import Select from "../../../atoms/Select";
import { useSelector } from "react-redux";
import { Carousel } from "react-responsive-carousel";
import CarouselProduct from "../../CarouselProduct";

export default ({
  onChangeName,
  onChangePrice,
  onChangeImage,
  onChangeCategory,
  onChangeQty,
  urlImage,
  data,
}) => {
  const categories = useSelector((s) => s.categories.data);

  return (
    <div className="flex gap-5">
      <div className="flex flex-col gap-5 w-4/5">
        <Input
          defaultValue={data.name}
          className={"bg-dark-neutral"}
          onChange={onChangeName}
          placeholder={"Named product"}
          required
        />
        <div className="flex items-center gap-5">
          <Input
            defaultValue={data.price}
            type="number"
            className={"bg-dark-neutral w-2/3"}
            onChange={onChangePrice}
            placeholder={"Price"}
            required
          />
          <Input
            defaultValue={data.qty}
            type="number"
            className={"bg-dark-neutral w-1/3"}
            onChange={onChangeQty}
            placeholder={"Qty"}
            required
          />
        </div>
        <Select
          onChange={onChangeCategory}
          title={"Category"}
          className={"bg-dark-neutral w-full"}
          selectTitle={false}
          required
        >
          {categories.map((v, i) => (
            <option key={i} value={v.id} selected={v.id == data.category.id}>
              {v.name}
            </option>
          ))}
        </Select>
      </div>
      <label htmlFor="imagesUpdate" className="w-1/5 cursor-pointer">
        <CarouselProduct
          images={urlImage != null ? urlImage.url : data.images}
          source={urlImage != null ? "" : "url"}
        />
        <input
          name="imagesUpdate"
          className="hidden"
          onChange={onChangeImage}
          multiple
          type="file"
          accept="image/*"
          id="imagesUpdate"
          required
        />
      </label>
    </div>
  );
};
