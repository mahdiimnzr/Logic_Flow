import { useContext } from "react";
import CheckIcon from "../../../core/icons/CheckIcon";
import ThemeContext from "@/app/context/ThemeContext";

const CheckBox = ({
  label,
  id,
  onChange,
  type = "checkbox",
  labelId = id,
  checked,
}) => {
  const { theme } = useContext(ThemeContext);
  return (
    <label htmlFor={labelId} className={`flex items-center xl:gap-4 gap-3`}>
      <input
        type={type}
        name={id}
        id={labelId}
        checked={checked}
        onChange={onChange}
        style={{
          position: "absolute",
          width: 0,
          height: 0,
          opacity: 0,
          pointerEvents: "none",
        }}
      />
      <div
        className={`xl:size-6.5 size-5.5 flex items-center justify-center shrink-0 ${
          type === "radio" ? "rounded-full" : "xl:rounded-[10px] rounded-[9px]"
        } cursor-pointer border transition-all`}
        style={{
          backgroundColor: checked ? "#008C78" : theme ? "#1e1e1e" : "#ffffff",
          borderColor: checked ? "transparent" : "#A6A6A6",
        }}
      >
        {checked && <CheckIcon className="mx-auto" />}
      </div>
      <p
        className={`text-default-black font-normal xl:text-[14px] text-[12px] cursor-pointer select-none`}
      >
        {label}
      </p>
    </label>
  );
};

export default CheckBox;
