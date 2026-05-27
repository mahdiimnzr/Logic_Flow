import { useContext, useState } from "react";
import loginStep1 from "../../../assets/images/loginstep1.png";
import loginStep2 from "../../../assets/images/loginstep And Register2.png";
import ThemeSlide from "../../../components/molecules/theme/ThemeSlide";
import ThemeContext from "../../../app/context/themeContext";
import Step1 from "./login/step1";
import Step2 from "./login/Step2";

const Login = () => {
  const { theme, setTheme } = useContext(ThemeContext);
  const [whichStep, setWhichStep] = useState("Step1");
  // const [SignUpParams, setSignUpParams] = useState({});
  return (
    <div className="  w-full flex flex-col md:flex-row items-center p-4 justify-end xl:gap-24 lg:gap-20 md:gap-15 gap-3">
      <div className={`h-full md:w-4/10 w-full flex flex-col justify-between`}>
        {whichStep === "Step1" && <Step1 setWhichStep={setWhichStep} />}
        {whichStep === "Step2" && <Step2 setWhichStep={setWhichStep} />}
      </div>
      <div
        className={` md:w-5/10 px-8 py-15 bg-light-green relative rounded-[60px] flex flex-col items-center gap-6`}
      >
        <ThemeSlide
          theme={theme}
          setTheme={setTheme}
          className={`self-end min-h-7`}
        />
        <img
          src={whichStep == "Step1" ? loginStep1 : loginStep2}
          className={`xl:size-108 lg:size-78 md:size-55`}
        />
        <div className={`flex flex-col justify-center items-center xl:gap-4`}>
          <h2
            className={`text-green-dark xl:text-[24px] lg:text-[20px] md:text-[16px] font-bold  `}
          >
            {whichStep == "Step1"
              ? "به دنیای یادگیری خوش آمدید!"
              : "تنها یک قدم تا دنیای یادگیری!"}
          </h2>
          <span
            className={` text-default-black xl:text-[16px] lg:text-[15px] md:text-[13px] xl:w-132.5 md:w-80 text-center`}
          >
            {whichStep == "Step1"
              ? " با ورود به حساب کاربری‌تان، به محتوای آموزشی، دوره‌ها و ابزارهای پیشرفته دسترسی خواهید داشت. اولین قدم برای رشد و پیشرفت همین‌جاست!"
              : " فرصت رشد، پیشرفت و ساختن آینده‌ای بهتر همین‌جاست — همراه با ما، یک قدم جلوتر باشید!"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Login;
