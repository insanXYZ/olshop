import Input from "../../atoms/Input";
import { useSelector } from "react-redux";

export default () => {
  const user = useSelector((s) => s.user.data);

  return (
    <form className="w-full flex flex-col gap-5">
      <Input placeholder={"Name"} defaultValue={user.name} />
      <Input placeholder={"Email"} defaultValue={user.email} />
    </form>
  );
};
