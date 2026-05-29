import SelectModal from "../Select/Select";
import Button from "@/components/atoms/Buttons/Button";
import selectCategories from "@/core/constants/selectCategories";

const SearchHeader = ({
  haveSelect = false,
  onChange,
  placeHolder,
  buttonClassName,
  inputClassName = "w-5/10",
  children,
  color = "authBtn",
}) => {
  return (
    <div
      className={`rounded-[100px] flex justify-between items-center bg-default-light pr-4 w-83`}
    >
      <input
        className={`${inputClassName} text-dark-gray placeholder:text-dark-gray text-base font-normal outline-none`}
        placeholder={placeHolder}
        type="text"
        onChange={onChange}
      />
      <div className={`flex items-center gap-4`}>
        {haveSelect && (
          <SelectModal
            items={selectCategories}
            contentPosition={"popper"}
            contentClassName={`min-w-30!`}
            defaultValue={"courses"}
            itemClassName={`cursor-pointer!`}
            triggerClassName={`border-none! flex! items-center! gap-1! ring-0! p-0! font-normal! text-[14px]! text-default-black! cursor-pointer! bg-default-light!`}
          />
        )}
        <Button color={color} className={buttonClassName}>
          {children}
        </Button>
      </div>
    </div>
  );
};

export default SearchHeader;
