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
    to: "/product/liked",
  },
  {
    title: "Cart",
    icon: <CiShoppingCart className="text-3xl" />,
    to: "/discount",
  },
  {
    title: "Notification",
    icon: <CiBellOn className="text-3xl" />,
    to: "/notification",
  },
];

const adminList = [
  {
    title: "Dashboard",
    icon: <CiViewTimeline className="text-3xl" />,
    to: "/dashboard",
  },
  {
    title: "Product",
    icon: <CiBoxes className="text-3xl" />,
    to: "/products",
  },
  {
    title: "Category",
    icon: <BiCategoryAlt className="text-3xl" />,
    to: "/categories",
  },
];

export default {
  memberlist: list,
  adminList,
};
