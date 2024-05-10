import { useState } from "react";
import Input from "../atoms/Input";

export default ({
  placeholder,
  max,
  className,
  min = 1,
  defaultValue = 1,
  setChange,
}) => {
  const [number, setNumber] = useState(defaultValue);

  const onChange = (num) => {
    if (num <= max && num >= min) {
      setNumber(num);
      setChange(num);
    }
  };

  return (
    <div className={`flex items-center ${className}`}>
      <Input
        value={number}
        className={"disabled border-none focus:outline-none rounded-r-none "}
        placeholder={placeholder}
        type="number"
      />
      <div className="flex bg-base-100 px-1 pr-2 h-12 rounded-r-lg items-center gap-1">
        <button
          onClick={() => onChange(number - 1)}
          className="w-8 rounded-none bg-neutral border-none"
        >
          -
        </button>
        <button
          onClick={() => onChange(number + 1)}
          className="w-8 rounded-none bg-neutral border-none"
        >
          +
        </button>
      </div>
    </div>
  );
};
