import CardProduct from "../../moleculs/home/CardProduct";

export default ({ data }) => {
    return data.length != 0 ? (
        <div className="grid grid-cols-6 gap-5">
            {data.map((v, i) => (
                <CardProduct key={i} product={v} />
            ))}
        </div>
    ) : (
        <div className="w-full text-center">Products is empty</div>
    );
};
