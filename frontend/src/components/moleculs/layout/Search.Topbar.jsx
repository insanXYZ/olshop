import Select from "../../atoms/Select";
import Input from "../../atoms/Input";
import { GoSearch } from "react-icons/go";

export default () => {
  return (
    <form className="w-full rounded-full bg-dark-neutral p-3 flex items-center gap-3">
      <Select title={"All Categories"} className={"rounded-full bg-neutral"}>
        <option value="baju">baju</option>
        <option value="komp">komp</option>
        <option value="koko">koko</option>
        <option value="calana">calana</option>
      </Select>
      <Input
        placeholder={"Search"}
        className={"bg-dark-neutral text-lg border-none focus:outline-none"}
      />
      <button className="px-2">
        <GoSearch className="text-2xl" />
      </button>
    </form>
  );
};
