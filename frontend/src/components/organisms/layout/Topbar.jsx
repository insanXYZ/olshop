import Search from "../../moleculs/layout/Search.Topbar";
import Widgets from "../../moleculs/layout/Widgets.Topbar";

export default () => {
  return (
    <div className="flex items-center gap-5">
      <Search />
      <Widgets />
    </div>
  );
};
