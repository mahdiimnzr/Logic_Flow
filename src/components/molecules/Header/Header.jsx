import navigation from "@/core/constants/navigation";
import logoIcon from "/logoIcon.png";
import { Link, NavLink } from "react-router-dom";
import Button from "@/components/atoms/Buttons/Button";
import SearchHeader from "../Inputs/SearchHeader";
import ThemeButton from "../theme/ThemeButton";
import { useContext } from "react";
import ThemeContext from "@/app/context/ThemeContext";
import { Search } from "lucide-react";

const Header = () => {
  const { theme, setTheme } = useContext(ThemeContext);
  return (
    <div
      className={`w-[95%] flex justify-between items-center pt-6 mx-auto relative z-10`}
    >
      <div className={`flex items-center gap-8`}>
        <div className={`flex items-center gap-4`}>
          <img className={`size-11.5`} src={logoIcon} />
          <span className={`text-2xl font-bold text-default-black`}>
            آکادمی بحر
          </span>
        </div>
        <div className={`flex items-center gap-5`}>
          {navigation?.map((value, index) => (
            <NavLink
              key={index}
              to={value.link}
              className={({ isActive }) =>
                `${isActive ? `text-green-primary font-bold` : `text-default-black font-normal`} text-[20px]`
              }
            >
              {value?.title}
            </NavLink>
          ))}
        </div>
      </div>
      <div className={`flex items-center gap-5`}>
        <ThemeButton
          className={`size-11.5!`}
          sunClassName={`size-6`}
          moonClassName={`w-5 h-6`}
          theme={theme}
          setTheme={setTheme}
        />
        <SearchHeader
          buttonClassName={`size-11.5`}
          placeHolder={"جستجو کنید..."}
          haveSelect={true}
        >
          <Search
            className={`mx-auto size-6`}
            color={theme ? `#000000` : `#ffffff`}
          />
        </SearchHeader>
        <Link to={"/Auth/Login"} className={`rounded-[50px]`}>
          <Button color={"registerBtn"} className={`py-2.5 px-6`}>
            ورود / ثبت نام
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Header;
