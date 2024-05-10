export default ({ className, children }) => {
  return (
    <div className={`p-5 rounded-lg bg-dark-neutral ${className}`}>
      {children}
    </div>
  );
};
