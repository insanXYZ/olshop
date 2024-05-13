import {
  CiHeart,
  CiShoppingCart,
  CiBellOn,
  CiViewTimeline,
  CiBoxes,
} from "react-icons/ci";

import { BiCategoryAlt } from "react-icons/bi";

const list = [
  {
    title: "Liked",
    icon: <CiHeart className="text-3xl" />,
    to: "/user/product/like",
  },
  {
    title: "Cart",
    icon: <CiShoppingCart className="text-3xl" />,
    to: "/user/product/cart",
  },
];

const adminList = [
  {
    title: "Dashboard",
    icon: <CiViewTimeline className="text-3xl" />,
    to: "/admin",
  },
  {
    title: "Product",
    icon: <CiBoxes className="text-3xl" />,
    to: "/admin/product",
  },
  {
    title: "Category",
    icon: <BiCategoryAlt className="text-3xl" />,
    to: "/admin/category",
  },
];

export default {
  memberlist: list,
  adminList,
};
