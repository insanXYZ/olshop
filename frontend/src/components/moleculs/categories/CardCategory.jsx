export default ({ data }) => {
    return (
        <div className="w-full h-20 relative">
            <img
                src={data.image}
                className="w-full h-full rounded-lg object-cover brightness-50"
            />
        </div>
    );
};
