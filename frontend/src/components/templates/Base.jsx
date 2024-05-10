import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import request from "../../utils/request/request";
import Cookies from "js-cookie";
import { setUser } from "../../redux/reducer/user";
import { setCategories } from "../../redux/reducer/categories";
import { setProducts } from "../../redux/reducer/product";

export default ({ children }) => {
  const dispatch = useDispatch();

  const auth = useSelector((s) => s.user.auth);
  const categories = useSelector((s) => s.categories.data);
  const products = useSelector((s) => s.products.data);

  useEffect(() => {
    const reqUser = () => {
      request
        .get("/api/users")
        .then((res) => {
          dispatch(
            setUser({
              auth: true,
              data: res.data.data,
            })
          );
        })
        .catch((e) => console.log(e));
    };

    const reqCategory = () => {
      request
        .get("/api/categories")
        .then((res) => {
          dispatch(setCategories(res.data.data));
        })
        .catch((err) => {
          console.log(err);
        });
    };

    const reqProduct = () => {
      request.get("/api/products").then((res) => {
        dispatch(setProducts(res.data.data));
      });
    };

    if (Cookies.get("token") && !auth) {
      reqUser();
    }

    if (categories.length == 0) {
      reqCategory();
    }

    if (products.length == 0) {
      reqProduct();
    }
  }, [dispatch]);

  return (
    <div className="w-full h-screen p-5 flex relative justify-center items-center">
      <div className="w-full h-full">{children}</div>
    </div>
  );
};
