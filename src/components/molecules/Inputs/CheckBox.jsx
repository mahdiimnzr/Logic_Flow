import { FieldLabel } from "@/components/ui/field";
import CheckIcon from "../../../core/icons/CheckIcon";
import { Checkbox } from "@/components/ui/checkbox";

const CheckBox = ({ id, name, label, checked, setChecked }) => {
  return (
    <div className={`flex items-center gap-4`}>
      <Checkbox
        name={name}
        id={id}
        checked={checked}
        onCheckedChange={setChecked}
        className={`size-6.5 rounded-[10px] content-center cursor-pointer border transition-all ${checked ? `border-transparent! bg-green-primary!` : `border-[#A6A6A6]! bg-default-light!`}`}
      >
        <CheckIcon className={`mx-auto`} />
      </Checkbox>
      <FieldLabel
        className="text-default-black font-normal text-[14px] cursor-pointer select-none"
        htmlFor={id}
      >
        {label}
      </FieldLabel>
    </div>
  );
};

export default CheckBox;
