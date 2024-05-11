import toRupiah from "@develoka/angka-rupiah-js";

export default ({ data }) => {
  return (
    <div className="w-3/5 flex flex-col gap-5">
      <div className="flex flex-col gap-2">
        <div className="text-2xl font-lato-b line-clamp-4">{data.name}</div>
        <div>Terjual 500++</div>
      </div>
      <div className="text-4xl font-lato-b">
        {toRupiah(data.price, { dot: ".", floatingPoint: 0 })}
      </div>
      <div className="whitespace-pre-line">{data.description}</div>
    </div>
  );
};
