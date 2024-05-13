import Search from "../../moleculs/layout/Search.Topbar";
import list from "../../../list/widgets";
import { Link } from "react-router-dom";

export default () => {
  return (
    <div className="flex items-center gap-5">
      <Search />
      <div className="flex items-center gap-5">
        {list.map((v, i) => (
          <Link to={v.to}>{v.icon}</Link>
        ))}
      </div>
    </div>
  );
};
