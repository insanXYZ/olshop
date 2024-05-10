import Card from "../../atoms/Card.Sidebar";
import { CiSettings } from "react-icons/ci";
import { useSelector } from "react-redux";
import { CiLogin } from "react-icons/ci";
import { CiLogout } from "react-icons/ci";
import { Link } from "react-router-dom";

export default () => {
  const user = useSelector((s) => s.user);

  return (
    <>
      <div className="w-full h-full flex flex-col">
        {user.auth == false ? (
          <a href="/login">
            <Card className={"bg-red-500 rounded-lg"}>
              <CiLogin className="text-3xl" />
              <span className="text-lg">Login</span>
            </Card>
          </a>
        ) : (
          <div className="w-full flex gap-1">
            <Link to={"/account"} className="w-full">
              <Card className={"bg-neutral rounded-lg"}>
                <img src={user.data.image} className="w-[30px] rounded-full" />
                <span className="text-lg line-clamp-1">{user.data.name}</span>
              </Card>
            </Link>
            <div
              onClick={() =>
                document.getElementById("modal_logout").showModal()
              }
              className="w-1/4 flex items-center justify-center cursor-pointer bg-red-500 rounded-lg"
            >
              <CiLogout />
            </div>
          </div>
        )}
        <Card>
          <CiSettings className="text-3xl" />
          <span className="text-lg">Setting</span>
        </Card>
      </div>
    </>
  );
};
