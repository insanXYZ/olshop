import Base from "./Base";
import Sidebar from "../organisms/layout/Sidebar.Main";
import Topbar from "../organisms/layout/Topbar";
import ModalConfirm from "../moleculs/ModalConfirm";
import Cookies from "js-cookie";

export default ({ children, loading = false }) => {
    const handleConfirmLogout = () => {
        Cookies.remove("token");
        window.location.reload();
    };

    return (
        <>
            <ModalConfirm
                id={"modal_logout"}
                onConfirm={handleConfirmLogout}
                title={"Logout"}
            >
                are you want logout ?
            </ModalConfirm>
            <Base>
                <div className="w-full h-full flex gap-5">
                    <Sidebar />
                    <div className="w-full h-full flex flex-col gap-7">
                        <Topbar />
                        {loading ? (
                            <div className="w-full flex justify-center items-center h-full">
                                <span className="loading loading-dots loading-lg"></span>
                            </div>
                        ) : (
                            children
                        )}
                    </div>
                </div>
            </Base>
        </>
    );
};
