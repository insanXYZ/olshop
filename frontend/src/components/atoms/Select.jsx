export default ({ children, className, title, onChange, ...att }) => {
  return (
    <select onChange={onChange} className={`select ${className}`} {...att}>
      <option disabled selected>
        {title}
      </option>
      {children}
    </select>
  );
};
