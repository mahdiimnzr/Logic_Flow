import { Outlet } from "react-router-dom";
import loginStep1 from "../assets/images/loginstep1.png";
const AuthLayout = () => {
  return (
    <div className={`min-h-screen pt-30`}>
      <div
        className={`border bg-default-light xl:w-9/10  mx-auto rounded-[60px] flex items-center p-4 justify-end gap-24.5`}
      >
        <div className={`border w-4/10 h-[600px]`}>
          <Outlet />
        </div>

        <div
          className={` border xl:w-5/10 h-[707px] bg-light-green relative rounded-[60px] loginStep1 flex flex-col justify-center items-center`}
        >
          <div className={`border  xl:w-[64px] h-[28px] mr-150`}></div>
          <img className="" src={loginStep1} />
          <div
            className={`flex flex-col justify-center items-center gap-[16px] mt-12`}
          >
            <h2 className={`text-green-dark text-[24px] font-bold `}>
              به دنیای یادگیری خوش آمدید!
            </h2>
            <span
              className={` text-default-black text-[16px] w-[530px] text-center`}
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
