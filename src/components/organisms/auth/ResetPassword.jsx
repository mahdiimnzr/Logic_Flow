import ThemeContext from "@/app/context/ThemeContext";
import ThemeSlide from "@/components/molecules/theme/ThemeSlide";
import ResetPassword1 from "../../../assets/images/Reset Password1.png";
import ResetPassword2 from "../../../assets/images/Reset Password2.png";
import { useContext, useState } from "react";
import ResetPassInFormation from "./ResetPassword/ResetPassInFormation";
import NewPassword from "./ResetPassword/NewPassword";

const ResetPassword = () => {
  const { theme, setTheme } = useContext(ThemeContext);
  const [whichStep, setWhichStep] = useState("Step1");
  // const [SignUpParams, setSignUpParams] = useState({});
  return (
    <div className="  w-full flex flex-col md:flex-row  p-4 justify-end xl:gap-24 lg:gap-20 md:gap-15 gap-3">
      <div className={`h-full md:w-4/10 w-full flex flex-col justify-between`}>
        {whichStep == "Step1" ? (
          <ResetPassInFormation setWhichStep={setWhichStep} />
        ) : (
          <NewPassword setWhichStep={setWhichStep} />
        )}
      </div>
      <div
        className={` md:w-5/10 px-8 py-15 bg-light-green relative rounded-[60px] flex flex-col items-center gap-6`}
      >
        <ThemeSlide
          theme={theme}
          setTheme={setTheme}
          className={`self-end h-7`}
        />
        <img
          src={whichStep == "Step1" ? ResetPassword1 : ResetPassword2}
          className={`xl:size-108 lg:size-78 md:size-55`}
        />
        <div className={`flex flex-col justify-center items-center xl:gap-4`}>
          <h2
            className={`text-green-dark xl:text-[24px] lg:text-[20px] md:text-[16px] font-bold  `}
          >
            {whichStep == "Step1"
              ? "فراموشی رمز عبور پایان راه نیست!"
              : "قدم آخر برای بازگشت به مسیر یادگیری!"}
          </h2>
          <p
            className={`text-default-black xl:text-[16px] lg:text-[15px] md:text-[13px] xl:w-132.5 md:w-80 text-center`}
          >
            {whichStep == "Step1"
              ? " با وارد کردن ایمیلتان، لینک تغییر رمز را دریافت می‌کنید و دوباره به دنیای یادگیری برمی‌گردید."
              : " با تعیین یک رمز عبور جدید، دوباره به حساب کاربری خود دسترسی خواهید داشت و می‌توانید بدون توقف به یادگیری ادامه دهید."}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
