import navigation from "@/core/constants/navigation";
import logoIcon from "/logoIcon.png";
import { Link, NavLink } from "react-router-dom";
import Button from "@/components/atoms/Buttons/Button";
import SearchHeader from "../Inputs/SearchHeader";
import ThemeButton from "../theme/ThemeButton";
import { useContext } from "react";
import ThemeContext from "@/app/context/ThemeContext";
import { Menu, Search } from "lucide-react";
import DrawerComponents from "../Drawer/Drawer";
import InstagramIcon from "@/core/icons/InstagramIcon";
import FaceBookIcon from "@/core/icons/FaceBookIcon";
import TwitterIcon from "@/core/icons/TwitterIcon";
import TelegramIcon from "@/core/icons/TelegramIcon";
import WhatsAppIcon from "@/core/icons/WhatsAppIcon";

const Header = () => {
  const { theme, setTheme } = useContext(ThemeContext);
  return (
    <div
      className={`md:w-[95%] w-[90%] flex justify-between items-center pt-6 mx-auto relative z-10`}
    >
      <div className={`flex items-center xl:gap-8`}>
        <div className={`flex items-center xl:gap-4 md:gap-3`}>
          <img className={`size-11.5`} src={logoIcon} />
          <span
            className={`2xl:text-2xl xl:text-[20px] font-bold text-default-black hidden lg:block`}
          >
            آکادمی بحر
          </span>
        </div>
        <div
          className={`lg:flex items-center 2xl:gap-5 xl:gap-4 lg:gap-3 hidden`}
        >
          {navigation?.map((value, index) => (
            <NavLink
              key={index}
              to={value.link}
              className={({ isActive }) =>
                `${isActive ? `text-green-primary font-bold` : `text-default-black font-normal`} 2xl:text-[20px] xl:text-[18px]`
              }
            >
              {value?.title}
            </NavLink>
          ))}
        </div>
      </div>
      <div
        className={`flex items-center 2xl:gap-5 xl:gap-4 md:gap-3 sm:gap-2 gap-1`}
      >
        <ThemeButton
          className={`xl:size-11.5! lg:size-10! size-11.5!`}
          sunClassName={`xl:size-6 lg:size-5 size-6!`}
          moonClassName={`xl:w-5 xl:h-6 w-5! h-6!`}
          theme={theme}
          setTheme={setTheme}
        />
        <SearchHeader
          buttonClassName={`xl:size-11.5 lg:size-10`}
          placeHolder={"جستجو کنید..."}
          haveSelect={true}
          className={`lg:w-70 hidden lg:flex`}
        >
          <Search
            className={`mx-auto xl:size-6 lg:size-5`}
            color={theme ? `#000000` : `#ffffff`}
          />
        </SearchHeader>
        <Link to={"/Auth/Login"} className={`rounded-[50px]`}>
          <Button
            color={"registerBtn"}
            className={`xl:px-6 py-3 px-4 text-[14px]!`}
          >
            ورود / ثبت نام
          </Button>
        </Link>
        <DrawerComponents
          trigger={
            <div
              className={`size-11.5 bg-green-primary rounded-full content-center cursor-pointer lg:hidden`}
            >
              <Menu className={`mx-auto`} color={theme ? "black" : "white"} />
            </div>
          }
          contentClassName={`${theme ? `bg-[#1e1e1e] border-[#0f0f0f]` : `bg-white border-[#f5f5f5]`} w-full`}
          primitiveClassName={`${theme ? `bg-[#0f0f0f]` : `bg-[#f5f5f5]`}`}
          footer={
            <div className={`flex items-center justify-between`}>
              <div className={`flex items-center gap-3`}>
                <img className={`size-11.5`} src={logoIcon} />
                <span
                  className={`text-[20px] font-bold ${theme ? "text-white" : "text-[#848484]"}`}
                >
                  آکادمی بحر
                </span>
              </div>
              <div className={`flex items-center gap-6`}>
                <InstagramIcon color={theme ? "white" : "#848484"} />
                <FaceBookIcon color={theme ? "white" : "#848484"} />
                <TwitterIcon color={theme ? "white" : "#848484"} />
                <TelegramIcon color={theme ? "white" : "#848484"} />
                <WhatsAppIcon color={theme ? "white" : "#848484"} />
              </div>
            </div>
          }
        >
          <div className={`flex flex-col gap-3`}>
            {navigation?.map((value, index) => (
              <div className={`flex items-center justify-between`}>
                <NavLink
                  key={index}
                  to={value.link}
                  className={({ isActive }) =>
                    `${isActive ? `text-[#008c78] font-bold` : theme ? `text-white font-normal` : `text-[#1e1e1e] font-normal`} 2xl:text-[20px] xl:text-[18px]`
                  }
                >
                  {value?.title}
                </NavLink>
                <p
                  className={`text-[#848484] font-normal text-base w-4/10 text-left truncate`}
                >
                  {value.describe}
                </p>
              </div>
            ))}
          </div>
        </DrawerComponents>
      </div>
    </div>
  );
};

export default Header;
