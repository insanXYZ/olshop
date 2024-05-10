import list from "../../../list/SidebarTop";
import Card from "../../atoms/Card.Sidebar";
import { Link } from "react-router-dom";
import removeSlash from "../../../utils/removeSlash";

export default () => {
  return (
    <div className="flex flex-col w-full h-full gap-4">
      {list.map((v, i) => (
        <Link key={i} to={v.to} className="w-full">
          <Card
            className={
              removeSlash(window.location.pathname) == v.to &&
              "bg-red-500 rounded-lg"
            }
          >
            {v.icon}
            <span className="text-lg">{v.title}</span>
          </Card>
        </Link>
      ))}
    </div>
  );
};
