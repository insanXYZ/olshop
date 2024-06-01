import { CiFilter } from "react-icons/ci";
import Button from "../../../atoms/ButtonModal";
import Select from "../../../atoms/Select";

export default () => {
    return (
        <div className="flex items-center justify-between">
            <div className="text-4xl w-full bg-dark-neutral font-outfit-b">
                Dashboard
            </div>
            <Select className={"w-52"} title={<span>Filter</span>}>
                <option value={new Date().toISOString().slice(0, 10)}>
                    Sekarang
                </option>
                <option value={new Date(Date.now() - 86400000).toISOString().slice(0, 10)}>
                    Kemarin
                </option>
            </Select>
        </div>
    );
};
