import Base from "./Base";
import Sidebar from "../organisms/layout/Sidebar.Dashboard";

export default ({ children, loading, className }) => {
  return (
    <Base>
      <div className="flex w-full h-full gap-5">
        <Sidebar />
        <div className={`w-full h-full ${className}`}>
          {loading ? (
            <div className="w-full flex justify-center items-center h-full">
              <span className="loading loading-dots loading-lg"></span>
            </div>
          ) : (
            children
          )}
        </div>
      </div>
    </Base>
  );
};
