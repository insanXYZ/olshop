import { CiHeart , CiShoppingCart ,CiBellOn } from "react-icons/ci";

export default () => {
    return (
        <div className="flex items-center gap-5">
            <CiBellOn className="text-4xl" />
            <CiHeart className="text-4xl" />
            <CiShoppingCart className="text-4xl" />
        </div>
    )
}