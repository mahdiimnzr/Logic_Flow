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
  className,
  contentClassName,
  itemClassName,
}) => {
  return (
    <div
      className={`rounded-[100px] flex justify-between items-center bg-default-light pr-4 xl:w-83 ${className}`}
    >
      <input
        className={`${inputClassName} text-dark-gray placeholder:text-dark-gray xl:text-base lg:text-[14px] sm:text-[12px] text-[10px] font-normal outline-none`}
        placeholder={placeHolder}
        type="text"
        onChange={onChange}
      />
      <div className={`flex items-center xl:gap-4 lg:gap-2`}>
        {haveSelect && (
          <SelectModal
            items={selectCategories}
            contentPosition={"popper"}
            contentClassName={`min-w-30! ${contentClassName}`}
            defaultValue={"courses"}
            itemClassName={`cursor-pointer! ${itemClassName}`}
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
