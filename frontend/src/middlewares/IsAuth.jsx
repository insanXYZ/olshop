import { useSelector } from "react-redux";
import Cookies from "js-cookie";
import request from "../utils/request/request";
import { setUser } from "../redux/reducer/user";
import { useDispatch } from "react-redux";

export default ({ children }) => {
    const user = useSelector((s) => s.user);

    const dispatch = useDispatch();

    if (Cookies.get("token")) {
        if (user.auth == true) {
            return children;
        } else if (user.auth == false) {
            request
                .get("/api/users")
                .then((res) => {
                    dispatch(
                        setUser({
                            auth: true,
                            data: res.data.data,
                        })
                    );

                    return children;
                })
                .catch((err) => {
                    Cookies.remove("token");
                    window.location.href = "/login";
                });
        }
    } else {
        window.location.href = "/login";
    }
};
