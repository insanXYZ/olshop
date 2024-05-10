import Cookies from "js-cookie";
import request from "../utils/request/request";

export default ({ children }) => {
  if (Cookies.get("token")) {
    request
      .get("/api/users")
      .then((res) => {
        return (window.location.href = "/");
      })
      .catch((err) => {
        Cookies.remove("token");
        return { children };
      });
  } else {
    return children;
  }
};
