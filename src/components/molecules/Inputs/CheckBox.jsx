import { FieldLabel } from "@/components/ui/field";
import CheckIcon from "../../../core/icons/CheckIcon";
import { Checkbox } from "@/components/ui/checkbox";

const CheckBox = ({ id, name, label, checked, setChecked }) => {
  return (
    <div className={`flex items-center xl:gap-4 gap-3`}>
      <Checkbox
        name={name}
        id={id}
        checked={checked}
        onCheckedChange={setChecked}
        className={`xl:size-6.5 size-5.5 xl:rounded-[10px] rounded-[9px] content-center cursor-pointer border transition-all ${checked ? `border-transparent! bg-green-primary!` : `border-[#A6A6A6]! bg-default-light!`}`}
      >
        <CheckIcon className={`mx-auto`} />
      </Checkbox>
      <FieldLabel
        className="text-default-black font-normal xl:text-[14px] text-[12px] cursor-pointer select-none"
        htmlFor={id}
      >
        {label}
      </FieldLabel>
    </div>
  );
};

export default CheckBox;
