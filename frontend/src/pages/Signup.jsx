import Auth from "../components/templates/Auth";
import Input from "../components/atoms/Input";
import { useState } from "react";
import request from "../utils/request/request";

export default () => {
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    request
      .post("/api/register", {
        name,
        email,
        password,
      })
      .then((res) => {
        window.location.href = "/login";
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Auth
      onSubmit={handleSubmit}
      buttonTitle={"Signup"}
      footer={{
        to: "/login",
        title: "Already have account ?",
      }}
    >
      <Input
        onChange={(e) => setName(e.target.value)}
        placeholder={"Name"}
        className={"bg-neutral"}
      />
      <Input
        onChange={(e) => setEmail(e.target.value)}
        type="email"
        placeholder={"Email"}
        className={"bg-neutral"}
      />
      <Input
        onChange={(e) => setPassword(e.target.value)}
        type="password"
        placeholder={"Password"}
        className={"bg-neutral"}
      />
    </Auth>
  );
};
