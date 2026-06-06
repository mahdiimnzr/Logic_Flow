import MoonIcon from "../../../core/icons/MoonIcon";
import SunIcon from "../../../core/icons/SunIcon";

const ThemeSlide = ({ className, theme, setTheme }) => {
  return (
    <div
      dir="rtl"
      onClick={() => setTheme(!theme)}
      className={`rounded-[50px] border relative ${!theme ? `bg-[#E0E0E0] border-star-yellow` : `bg-moon-background border-[#37474F]`} flex items-center justify-between xl:w-16 lg:w-14 w-12 xl:h-7 lg:h-6.5 h-6 px-1 cursor-pointer ${className}`}
    >
      <MoonIcon
        className={`${!theme ? `opacity-0 invisible` : null} xl:size-5 lg:size-4 size-3.5`}
      />
      <div
        className={`xl:size-5.5 lg:size-4.5 size-4 border-2 rounded-full absolute transition-all ${!theme ? `right-1 bg-sun-background border-star-yellow` : `xl:right-9 lg:right-8 right-7 bg-[#37474F] border-[#263238]`}`}
      ></div>
      <SunIcon
        className={`${theme ? `opacity-0 invisible` : null} xl:size-5 lg:size-4 size-3.5`}
      />
    </div>
  );
};

export default ThemeSlide;
