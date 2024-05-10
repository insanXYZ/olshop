export default ({ header, children, className }) => {
  return (
    <table className={`table-auto ${className}`}>
      <thead>{header}</thead>
      <tbody>{children}</tbody>
    </table>
  );
};
