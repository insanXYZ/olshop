import { CiHeart } from "react-icons/ci";
import { PiShoppingCartSimpleThin } from "react-icons/pi";

const list = [
  {
    icon: <CiHeart className="text-4xl" />,
    to: "/user/product/like",
  },
  {
    icon: <PiShoppingCartSimpleThin className="text-4xl" />,
    to: "/user/product/cart",
  },
];

export default list;
