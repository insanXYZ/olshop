import Auth from "../components/templates/Auth";
import Input from "../components/atoms/Input";
import { useState } from "react";
import request from "../utils/request/request";

export default () => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    request
      .post("/api/login", {
        email,
        password,
      })
      .then(() => {
        window.location.href = "/";
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Auth
      onSubmit={handleSubmit}
      buttonTitle={"Login"}
      footer={{
        to: "/signup",
        title: "Dont have account ?",
      }}
    >
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
