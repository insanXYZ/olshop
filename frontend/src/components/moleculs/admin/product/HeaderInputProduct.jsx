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
}) => {
  const categories = useSelector((s) => s.categories.data);

  return (
    <div className="flex gap-5">
      <div className="flex flex-col gap-5 w-4/5">
        <Input
          className={"bg-dark-neutral"}
          onChange={onChangeName}
          placeholder={"Named product"}
          required
        />
        <div className="flex items-center gap-5">
          <Input
            type="number"
            className={"bg-dark-neutral w-2/3"}
            onChange={onChangePrice}
            placeholder={"Price"}
            required
          />
          <Input
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
          required
        >
          {categories.map((v, i) => (
            <option key={i} value={v.id}>
              {v.name}
            </option>
          ))}
        </Select>
      </div>
      <label htmlFor="images" className="w-1/5 cursor-pointer">
        {urlImage == null ? (
          <div className=" aspect-square rounded-lg border-2 flex justify-center items-center">
            <CiImageOn className="text-6xl" />
          </div>
        ) : (
          <CarouselProduct images={urlImage.url} source={""} />
        )}
        <input
          name="images"
          className="hidden"
          onChange={onChangeImage}
          multiple
          type="file"
          accept="image/*"
          id="images"
          required
        />
      </label>
    </div>
  );
};
