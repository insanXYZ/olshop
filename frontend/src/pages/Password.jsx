import Dashboard from "../components/templates/Dashboard";
import Input from "../components/atoms/Input";
import Button from "../components/atoms/Button";
import { useState } from "react";
import request from "../utils/request/request";
import WrapComp from "../components/atoms/WrapComponent";

export default () => {
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        let formData = new FormData();

        formData.append("old_password", oldPassword);
        formData.append("new_password", newPassword);

        request
            .put("/api/users/password", formData)
            .then((res) => {
                window.location.reload();
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <Dashboard>
            <WrapComp>
                <form
                    onSubmit={handleSubmit}
                    className={"w-full flex flex-col gap-5"}
                >
                    <Input
                        className={"bg-neutral"}
                        placeholder={"Old Password"}
                        onChange={(e) => setOldPassword(e.target.value)}
                    />
                    <Input
                        className={"bg-neutral"}
                        placeholder={"New Password"}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                    <Button className={"bg-white text-neutral rounded-full"}>
                        Update
                    </Button>
                </form>
            </WrapComp>
        </Dashboard>
    );
};
