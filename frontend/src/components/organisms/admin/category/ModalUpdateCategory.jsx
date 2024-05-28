import { useState } from "react";
import Button from "../../../atoms/Button";
import Input from "../../../atoms/Input";
import Modal from "../../../atoms/Modal";
import InputUpdateFile from "../../../moleculs/admin/category/InputUpdateFile";

export default ({ data, onSubmit }) => {
    const [name, setName] = useState("");
    const [image, setImage] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        let formData = new FormData();
        formData.append("name", name);
        formData.append("image", image);
        onSubmit(formData);
    };

    return (
        <Modal title={"Update Category"} id={"modal_update_category"}>
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <Input
                    defaultValue={data.name}
                    onChange={(v) => setName(v)}
                    placeholder={"category.."}
                />
                <InputUpdateFile
                    data={data}
                    className={"w-full flex justify-center"}
                    onchangeImage={(v) => setImage(v)}
                />
                <Button>Update</Button>
            </form>
        </Modal>
    );
};
