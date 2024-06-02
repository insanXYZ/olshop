import CardHeader from "./CardHeader";

export default ({ title, children }) => {
    return (
        <div className="p-3 bg-dark-neutral rounded-lg">
            <CardHeader title={title}>{children}</CardHeader>
        </div>
    );
};
