import { Checkbox } from "radix-ui";
import CheckIcon from "../../../core/icons/CheckIcon";

const CheckBox = ({ id, name, label, checked, setChecked }) => {
  return (
    <div className={`flex items-center gap-4`}>
      <Checkbox.Root
        name={name}
        id={id}
        checked={checked}
        onCheckedChange={setChecked}
      >
        <div
          className={`size-6.5 rounded-[10px] content-center cursor-pointer border transition-all ${!checked ? `border-[#A6A6A6] bg-default-light` : `border-transparent bg-green-primary`}`}
        >
          {checked && <CheckIcon className={`mx-auto`} />}
        </div>
      </Checkbox.Root>
      <label
        className="text-default-black font-normal text-[14px] cursor-pointer select-none"
        htmlFor={id}
      >
        {label}
      </label>
    </div>
  );
};

export default CheckBox;
