export default ({ title, children }) => {
    return (
        <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
                <div>{title}</div>
                <div className="w-full h-[1px] bg-neutral"></div>
            </div>
            <div className="text-3xl font-outfit-b">{children}</div>
        </div>
    );
};
