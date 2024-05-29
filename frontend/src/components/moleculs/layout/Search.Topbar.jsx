import Select from "../../atoms/Select";
import Input from "../../atoms/Input";
import { GoSearch } from "react-icons/go";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default () => {
    const [cat, setCat] = useState("");
    const [name, setName] = useState("");

    const categories = useSelector((s) => s.categories.data);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (cat == "" && name == "") {
            return;
        }
        let searchFormat = "/product?";
        if (cat != "") {
            searchFormat += "category=" + cat;
        }

        if (name != "") {
            searchFormat += searchFormat.includes("category")
                ? "&keyword=" + name
                : "keyword=" + name;
        }

        navigate(searchFormat);
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="w-full rounded-full bg-dark-neutral p-3 flex items-center gap-3"
        >
            <Select
                title={"All Categories"}
                className={"rounded-full bg-neutral"}
                onChange={(v) => setCat(v.target.value)}
            >
                {categories.map((v) => (
                    <option value={v.name}>{v.name}</option>
                ))}
            </Select>
            <Input
                placeholder={"Search"}
                onChange={(v) => setName(v.target.value)}
                className={
                    "bg-dark-neutral text-lg border-none focus:outline-none"
                }
            />
            <button className="px-2">
                <GoSearch className="text-2xl" />
            </button>
        </form>
    );
};
