import { Outlet } from "react-router-dom";
import loginStep1 from "../assets/images/loginstep1.png";
import ThemeSlide from "../components/molecules/theme/themeSlide";
import { useContext } from "react";
import ThemeContext from "../app/context/themeContext";
const AuthLayout = () => {
  const { theme, setTheme } = useContext(ThemeContext);
  return (
    <div className={`min-h-screen pt-30 `}>
      <div
        className={` bg-default-light xl:w-9/10  mx-auto rounded-[60px] flex items-center p-4 justify-end gap-24.5`}
      >
        <div className={` xl:w-4/10 xl:h-150`}>
          <Outlet />
        </div>
        <div
          className={`xl:w-5/10 xl:h-176.75 bg-light-green relative rounded-[60px] loginStep1 flex flex-col justify-center items-center`}
        >
          <div className={` absolute right-180 top-1`}>
            <ThemeSlide theme={theme} setTheme={setTheme} />
          </div>
          <img src={loginStep1} />
          <div
            className={`flex flex-col justify-center items-center xl:gap-4 mt-10`}
          >
            <h2 className={`text-green-dark text-[24px] font-bold `}>
              به دنیای یادگیری خوش آمدید!
            </h2>
            <span
              className={` text-default-black text-[16px] xl:w-132.5 text-center`}
            >
              {" "}
              با ورود به حساب کاربری‌تان، به محتوای آموزشی، دوره‌ها و ابزارهای
              پیشرفته دسترسی خواهید داشت. اولین قدم برای رشد و پیشرفت همین‌جاست!
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
