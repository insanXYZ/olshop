import { MdOutlineExplore } from "react-icons/md";
import { BiCategoryAlt } from "react-icons/bi";
import { CiDiscount1 } from "react-icons/ci";

const list = [
  {
    title: "Explore",
    icon: <MdOutlineExplore className="text-3xl" />,
    to: "/",
  },
  {
    title: "Categories",
    icon: <BiCategoryAlt className="text-3xl" />,
    to: "/category",
  },
  {
    title: "Best offers",
    icon: <CiDiscount1 className="text-3xl" />,
    to: "/discount",
  },
];

export default list;
