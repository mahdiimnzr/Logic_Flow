import MoonIcon from "../../../core/icons/MoonIcon";
import SunIcon from "../../../core/icons/SunIcon";

const ThemeButton = ({
  theme,
  setTheme,
  className,
  sunClassName,
  moonClassName,
}) => {
  return (
    <div
      onClick={() => {
        setTheme(!theme);
        localStorage.setItem("theme", JSON.stringify(!theme));
      }}
      className={`size-14 content-center rounded-full cursor-pointer ${!theme ? `bg-sun-background` : `bg-moon-background`} ${className}`}
    >
      {!theme && (
        <SunIcon width="28" height="28" className={`mx-auto ${sunClassName}`} />
      )}
      {theme && (
        <MoonIcon
          width="24"
          height="28"
          className={`mx-auto ${moonClassName}`}
        />
      )}
    </div>
  );
};

export default ThemeButton;
