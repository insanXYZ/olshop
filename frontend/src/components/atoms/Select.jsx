export default ({
  children,
  className,
  title,
  onChange,
  selectTitle = true,
  ...att
}) => {
  return (
    <select onChange={onChange} className={`select ${className}`} {...att}>
      <option disabled selected={selectTitle} hidden>
        {title}
      </option>
      {children}
    </select>
  );
};
