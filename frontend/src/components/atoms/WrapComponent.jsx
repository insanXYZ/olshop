export default ({ className, children }) => {
    return (
        <div className={`bg-dark-neutral rounded-lg p-5 ${className}`}>
            {children}
        </div>
    );
};
