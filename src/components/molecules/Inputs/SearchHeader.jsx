import SelectModal from "../Select/Select";
import { Search } from "lucide-react";
import { useContext } from "react";
import ThemeContext from "@/app/context/themeContext";
import Button from "@/components/atoms/Buttons/Button";
import selectCategories from "@/core/constants/selectCategories";

const SearchHeader = () => {
  const { theme } = useContext(ThemeContext);
  return (
    <div
      className={`rounded-[100px] flex justify-between items-center bg-default-light pr-4 w-83`}
    >
      <input
        className={`w-5/10 text-dark-gray placeholder:text-dark-gray text-base font-normal outline-none`}
        placeholder="جستجو کنید..."
        type="text"
      />
      <div className={`flex items-center gap-4`}>
        <SelectModal
          items={selectCategories}
          contentPosition={"popper"}
          contentClassName={`min-w-30!`}
          defaultValue={"courses"}
          itemClassName={`cursor-pointer!`}
          triggerClassName={`border-none! flex! items-center! gap-1! ring-0! p-0! font-normal! text-[14px]! text-default-black! cursor-pointer! bg-default-light!`}
        />
        <Button color={"authBtn"} className={`size-11.5`}>
          <Search
            className={`mx-auto size-6`}
            color={theme ? `#000000` : `#ffffff`}
          />
        </Button>
      </div>
    </div>
  );
};

export default SearchHeader;
