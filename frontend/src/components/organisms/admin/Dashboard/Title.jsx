import { CiFilter } from "react-icons/ci";
import Button from "../../../atoms/ButtonModal";
import Select from "../../../atoms/Select";

export default ({ onChange }) => {
    let today = new Date();

    let firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

    let year = firstDayOfMonth.getFullYear();
    let month = String(firstDayOfMonth.getMonth() + 1).padStart(2, "0"); // Menambahkan 1 karena bulan dimulai dari 0
    let day = String(firstDayOfMonth.getDate()).padStart(2, "0");

    let formattedDate = `${year}-${month}-${day}`;
    return (
        <div className="flex items-center justify-between">
            <div className="text-4xl w-full bg-dark-neutral font-outfit-b">
                Dashboard
            </div>
            <Select
                onChange={onChange}
                className={"w-52"}
                title={<span>Filter</span>}
            >
                <option
                    value={"?filter=" + new Date().toISOString().slice(0, 10)}
                >
                    Now
                </option>
                <option
                    value={
                        "?filter=" +
                        new Date(Date.now() - 86400000)
                            .toISOString()
                            .slice(0, 10)
                    }
                >
                    Yesterday
                </option>
                <option
                    value={
                        "?from=" +
                        formattedDate +
                        "&to=" +
                        new Date().toISOString().slice(0, 10)
                    }
                >
                    This month
                </option>
            </Select>
        </div>
    );
};
