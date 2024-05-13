import { Link } from "react-router-dom";
import Sidebar from "../../atoms/Sidebar";
import list from "../../../list/Sidebar.Dashboard";
import Card from "../../atoms/Card.Sidebar";
import removeSlash from "../../../utils/removeSlash";
import { FaArrowLeft } from "react-icons/fa6";
import Accordion from "../../atoms/Accordion";
import { CiUser } from "react-icons/ci";
import { useSelector } from "react-redux";

export default () => {
  const user = useSelector((s) => s.user.data);

  return (
    <Sidebar className={"gap-10"}>
      <Link to={"/"} className="flex gap-4 items-center ">
        <FaArrowLeft className="text-3xl" />
        <span className="text-lg">Back</span>
      </Link>
      <div className="flex flex-col">
        <Accordion
          title={setTitle()}
          className={`${
            removeSlash(window.location.pathname) == "/user" ||
            removeSlash(window.location.pathname) == "/user/password"
              ? "bg-red-500"
              : "bg-base-100"
          } flex items-center gap-4 transition-all text-stone-300 group-hover:text-white`}
        >
          <Link to={"/user"}>
            <span className="text-lg">identity</span>
          </Link>
          <Link to={"/user/password"}>
            <span className="text-lg">password</span>
          </Link>
        </Accordion>
        {user.role == "member"
          ? list.memberlist.map((v, i) => (
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
            ))
          : list.adminList.map((v, i) => (
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
    </Sidebar>
  );
};

const setTitle = () => {
  return (
    <>
      <CiUser className="text-3xl" />
      <span className="text-lg">User</span>
    </>
  );
};
