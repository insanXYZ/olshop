import Base from "./Base";
import Sidebar from "../organisms/layout/Sidebar.Dashboard";

export default ({ children }) => {
  return (
    <Base>
      <div className="flex w-full h-full gap-5">
        <Sidebar />
        <div className="w-full h-full">{children}</div>
      </div>
    </Base>
  );
};
