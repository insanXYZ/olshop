export default ({ children, className = "", onClick }) => {
  return (
    <button className={`btn ${className}`} onClick={onClick}>
      {children}
    </button>
  );
};
