import Dashboard from "../components/templates/Dashboard";
import Card from "../components/atoms/Card.Dashboard";
import Input from "../components/atoms/Input";
import Button from "../components/atoms/Button";
import { useSelector } from "react-redux";
import { useState } from "react";
import request from "../utils/request/request";

export default () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState(null);

  const user = useSelector((s) => s.user.data);

  const handleSubmit = (e) => {
    e.preventDefault();

    let formData = new FormData();

    formData.append("name", name);
    formData.append("email", email);
    if (image != null) {
      formData.append("image", image.file);
    }

    request
      .put("/api/users", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChangeImage = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage({
        url: URL.createObjectURL(e.target.files[0]),
        file: e.target.files[0],
      });
    }
  };

  return (
    <Dashboard>
      <Card>
        <form
          onSubmit={handleSubmit}
          className={"w-full flex items-center gap-5"}
        >
          <div className="flex flex-col gap-5 w-4/5">
            <Input
              className={"bg-neutral"}
              defaultValue={user.name}
              onChange={(e) => setName(e.target.value)}
            />
            <Input
              className={"bg-neutral"}
              defaultValue={user.email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Button className={"bg-white text-neutral rounded-full"}>
              Update
            </Button>
          </div>
          <label
            htmlFor="image"
            className="w-1/5 p-3 flex items-center justify-center cursor-pointer"
          >
            <img
              src={image == null ? user.image : image.url}
              className="w-full rounded-full aspect-square object-cover"
            />
            <input
              onChange={handleChangeImage}
              type="file"
              id="image"
              accept="image/*"
              className="hidden"
            />
          </label>
        </form>
      </Card>
    </Dashboard>
  );
};
