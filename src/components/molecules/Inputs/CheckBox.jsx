import CheckIcon from "../../../core/icons/CheckIcon";

const CheckBox = ({
  label,
  id,
  onChange,
  type = "checkbox",
  labelId = id,
  checked,
}) => {
  return (
    <div className={`flex items-center xl:gap-4 gap-3`}>
      <input
        type={type}
        name={id}
        id={labelId}
        checked={checked}
        onChange={onChange}
        className="peer hidden"
      />
      <div
        className={`xl:size-6.5 size-5.5 ${type === "radio" ? `rounded-full` : `xl:rounded-[10px] rounded-[9px]`} content-center cursor-pointer border transition-all ${checked ? `border-transparent! bg-green-primary!` : `border-[#A6A6A6]! bg-default-light!`}`}
      >
        {checked && type === "radio" ? (
          <div
            className={`rounded-full size-5/10 bg-white mx-auto ${type === "checkbox" && "hidden"}`}
          ></div>
        ) : (
          <CheckIcon
            className={`mx-auto ${type === "radio" ? `hidden` : !checked && `hidden`}`}
          />
        )}
      </div>
      <label
        className={`text-default-black font-normal xl:text-[14px] text-[12px] cursor-pointer select-none`}
        htmlFor={labelId}
      >
        {label}
      </label>
    </div>
  );
};

export default CheckBox;
