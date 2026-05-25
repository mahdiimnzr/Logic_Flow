import MoonIcon from "../../../core/icons/MoonIcon";
import SunIcon from "../../../core/icons/SunIcon";

const ThemeButton = ({ theme, setTheme }) => {
  return (
    <div
      onClick={() => setTheme(!theme)}
      className={`size-14 content-center rounded-full cursor-pointer ${!theme ? `bg-sun-background` : `bg-moon-background`}`}
    >
      {!theme && <SunIcon width="28" height="28" className={`mx-auto`} />}
      {theme && <MoonIcon width="24" height="28" className={`mx-auto`} />}
    </div>
  );
};

export default ThemeButton;
