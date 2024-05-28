export default ({
    placeholder,
    value,
    type = "text",
    className,
    onChange,
    defaultValue,
    ...att
}) => {
    return (
        <input
            onChange={onChange}
            type={type}
            value={value}
            placeholder={placeholder}
            defaultValue={defaultValue}
            className={`input w-full ${className}`}
            {...att}
        />
    );
};
