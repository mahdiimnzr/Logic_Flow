import { useState } from "react";
import MoonIcon from "../../../core/icons/MoonIcon";
import SunIcon from "../../../core/icons/SunIcon";

const ThemeSlide = () => {
  const [theme, setTheme] = useState(false);
  return (
    <div
      onClick={() => setTheme(!theme)}
      className={`rounded-[50px] mx-auto mt-20 border relative ${!theme ? `bg-[#E0E0E0] border-[#F8BC24]` : `bg-[#455A64] border-[#37474F]`} flex items-center justify-between w-16 h-7 px-1 cursor-pointer`}
    >
      <MoonIcon className={!theme && `opacity-0 invisible`} />
      <div
        className={`size-5.5 border-2 rounded-full absolute transition-all ${!theme ? `right-1 bg-[#FFDF9B] border-[#F8B524]` : `right-9 bg-[#37474F] border-[#263238]`}`}
      ></div>
      <SunIcon className={theme && `opacity-0 invisible`} />
    </div>
  );
};

export default ThemeSlide;
