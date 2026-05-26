import { useContext, useState } from "react";
import loginStep1 from "../../../assets/images/loginstep1.png";
import ThemeSlide from "../../../components/molecules/theme/ThemeSlide";
import ThemeContext from "../../../app/context/themeContext";
import Step1 from "./login/step1";
import Step2 from "./login/Step2";

const Login = () => {
  const { theme, setTheme } = useContext(ThemeContext);
  const [whichStep, setWhichStep] = useState("Step1");
  const [SignUpParams, setSignUpParams] = useState({});
  return (
    <div className=" border w-full flex items-center p-4 justify-end gap-24.5">
      <div className={`h-full xl:w-4/10 flex flex-col justify-between`}>
        {whichStep === "Step1" && <Step1 setWhichStep={setWhichStep} />}
        {whichStep === "Step2" && <Step2 />}
      </div>
      <div
        className={`xl:w-5/10 xl:h-176.75 px-8 py-15 bg-light-green relative rounded-[60px] flex flex-col items-center gap-6`}
      >
        <ThemeSlide theme={theme} setTheme={setTheme} className={`self-end`} />
        <img className={`w-108`} src={loginStep1} />
        <div className={`flex flex-col justify-center items-center xl:gap-4`}>
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
  );
};

export default Login;
