import { createBrowserRouter } from "react-router-dom";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Account from "./pages/Account";
import Password from "./pages/Password";
import Category from "./pages/admin/Category";
import ProductAdmin from "./pages/admin/Product";
import Product from "./pages/Product";
import Liked from "./pages/member/productsliked";

import IsGuess from "./middlewares/IsGuess";
import IsAuth from "./middlewares/IsAuth";
import IsAdmin from "./middlewares/IsAdmin";

export default createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: (
      <IsGuess>
        <Login />
      </IsGuess>
    ),
  },
  {
    path: "/signup",
    element: (
      <IsGuess>
        <Signup />
      </IsGuess>
    ),
  },
  {
    path: "/user",
    element: (
      <IsAuth>
        <Account />
      </IsAuth>
    ),
  },
  {
    path: "/user/password",
    element: (
      <IsAuth>
        <Password />
      </IsAuth>
    ),
  },
  {
    path: "/admin/category",
    element: (
      <IsAuth>
        <IsAdmin>
          <Category />
        </IsAdmin>
      </IsAuth>
    ),
  },
  {
    path: "/admin/product",
    element: (
      <IsAuth>
        <IsAdmin>
          <ProductAdmin />
        </IsAdmin>
      </IsAuth>
    ),
  },
  {
    path: "/user/product/like",
    element: (
      <IsAuth>
        <Liked />
      </IsAuth>
    ),
  },
  {
    path: "/product/:id",
    element: <Product />,
  },
]);
