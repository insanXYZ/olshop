import { Link } from "react-router-dom"
import Button from "../atoms/Button"
import Icon from "../atoms/Icon"
import Cookies from "js-cookie"

export default ({onSubmit , children , buttonTitle , footer}) => {

    if(Cookies.get("token")){
        window.location.href = "/"
    }

    return (
        <div className="w-screen h-screen flex flex-col gap-7 justify-center items-center">
            <Icon className={"text-7xl"} />
            <form onSubmit={onSubmit} className="p-7 w-[420px] flex flex-col bg-dark-neutral rounded-xl gap-7">
                <div className="w-full flex flex-col gap-4">
                    {children}
                </div>
                <div className="flex justify-center ">
                    <Button className={"bg-white text-neutral rounded-full w-28"}>{buttonTitle}</Button>
                </div>
            </form>
            <Link to={footer.to} className="text-blue-600 underline uppercase">{footer.title}</Link>
        </div>       
    )
}