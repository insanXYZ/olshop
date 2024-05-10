import { useSelector } from "react-redux";

export default ({ children }) => {
  const user = useSelector((s) => s.user.data);

  if (user.role == "admin") {
    return children;
  } else {
    window.location.href = "/";
  }
};
