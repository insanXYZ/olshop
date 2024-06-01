import { createBrowserRouter } from "react-router-dom";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Account from "./pages/Account";
import Password from "./pages/Password";
import CategoryAdmin from "./pages/admin/Category";
import ProductAdmin from "./pages/admin/Product";
import Dashboard from "./pages/admin/Dashboard";
import Product from "./pages/Product";
import Products from "./pages/Products";
import Liked from "./pages/member/productsliked";
import Carted from "./pages/member/productscarted";
import Category from "./pages/Category";

import IsGuess from "./middlewares/IsGuess";
import IsAuth from "./middlewares/IsAuth";
import IsAdmin from "./middlewares/IsAdmin";

export default createBrowserRouter([
    {
        path: "/admin",
        element: (
            <IsAuth>
                <IsAdmin>
                    <Dashboard />
                </IsAdmin>
            </IsAuth>
        ),
    },
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
                    <CategoryAdmin />
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
        path: "/user/product/cart",
        element: (
            <IsAuth>
                <Carted />
            </IsAuth>
        ),
    },
    {
        path: "/product/:id",
        element: <Product />,
    },
    {
        path: "/category",
        element: <Category />,
    },
    {
        path: "/product",
        element: <Products />,
    },
]);
