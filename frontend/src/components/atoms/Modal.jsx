export default ({ id, title, children, className }) => {
  return (
    <dialog id={id} className="modal">
      <div className={`modal-box flex flex-col gap-5 ${className}`}>
        <h3 className="font-bold text-lg">{title}</h3>
        {children}
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
};
