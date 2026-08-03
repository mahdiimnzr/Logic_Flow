import { Formik, Form, ErrorMessage } from "formik";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import Button from "../../../atoms/Buttons/Button";
import ArrowRightIcon from "../../../../core/icons/ArrowRightIcon";
import OtpInput from "../../../molecules/Inputs/OtpInput";
import { verifyCodeLogin } from "@/core/services/api/auth/auth.service";
import { toast } from "react-toastify";
import { useI18n } from "@/i18n/useI18n";
import LoginContext from "@/app/context/LoginContext";
import ThemeSlide from "@/components/molecules/theme/ThemeSlide";
import ThemeContext from "@/app/context/ThemeContext";
import Timer from "@/components/atoms/Timer/Timer";

const Step2 = ({ SignUpParams, setWhichStep }) => {
  const { t, lang, changeLang } = useI18n();
  const { theme, setTheme } = useContext(ThemeContext);
  const navigate = useNavigate();
  const otp = new Array(6).fill("");
  const [timer, setTimer] = useState(120);
  const [otpValue, setOtpValue] = useState("");
  const { setIsLogin } = useContext(LoginContext);
  const handleSubmit = async (value) => {
    const result = await verifyCodeLogin(value);
    if (result.data.success) {
      toast.success(result.data.message);
      navigate("/");
      localStorage.setItem("token", JSON.stringify(result.data.token));
      setIsLogin(true);
    } else {
      toast.error(result.data.message);
    }
  };
  const validationSchema = Yup.object({
    verifyCode: Yup.string()
      .length(6, t("auth.login.step2.codeErrorMessage"))
      .required(t("auth.login.step2.codeErrorMessage")),
  });
  return (
    <Formik
      initialValues={{
        phoneOrGmail: SignUpParams.phoneOrGmail,
        verifyCode: "",
      }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        handleSubmit(values);
      }}
    >
      {({ errors, values, setFieldValue }) => {
        const newCode = otpValue;
        if (values.verifyCode !== newCode) {
          setFieldValue("verifyCode", newCode);
        }
        return (
          <Form>
            <div
              className={`flex flex-col gap-20 xl:pt-19 lg:pt-15 md:pt-10 pt-2`}
            >
              <div className={`flex items-center justify-between w-full`}>
                <div
                  onClick={() => {
                    setWhichStep("Step1");
                  }}
                  className={`flex gap-2 cursor-pointer `}
                >
                  <ArrowRightIcon
                    className={`xl:size-6 sm:size-5 size-4 ${lang === "en" ? "transform-[rotate(180deg)]" : "transform-[rotate(0deg)]"}`}
                  />
                  <span
                    className={`text-green-dark xl:text-base sm:text-[14px] text-[12px] font-bold`}
                  >
                    {t("auth.register.step2.backBtn")}
                  </span>
                </div>
                <div className={`flex items-center lg:gap-2 gap-1`}>
                  <div
                    onClick={() =>
                      lang === "en" ? changeLang("fa") : changeLang("en")
                    }
                    className={`cursor-pointer lg:size-10 size-8 rounded-full bg-green-primary content-center text-center text-white md:text-base text-[12px] font-bold border lg:leading-10 leading-8 border-green-primary`}
                  >
                    {lang === "en" ? "EN" : "FA"}
                  </div>
                  <ThemeSlide
                    theme={theme}
                    setTheme={setTheme}
                    className={`flex md:hidden`}
                  />
                </div>
              </div>
              <div className={`flex flex-col xl:gap-8 lg:gap-4 gap-5`}>
                <div className={`flex flex-col gap-2 text-center`}>
                  <span
                    className={`text-green-primary xl:text-2xl lg:text-[18px] md:text-base text-[14px] font-bold text-center`}
                  >
                    {t("auth.login.step2.title")}
                  </span>
                  <span
                    className={`xl:text-[16px] lg:text-[15px] md:text-[14px] text-[12px] text-default-black`}
                  >
                    {t("auth.login.step2.description")}
                  </span>
                </div>
                <div className={`flex flex-col gap-2 w-full`}>
                  <div dir="ltr" className={`flex w-full`}>
                    <OtpInput
                      otp={otp}
                      otpValue={otpValue}
                      setOtpValue={setOtpValue}
                      error={errors?.verifyCode}
                    />
                  </div>
                  <ErrorMessage
                    component={"span"}
                    name="verifyCode"
                    className={`text-red-error lg:text-[14px] text-[12px] font-normal`}
                  />
                </div>
                <Button
                  color={"authBtn"}
                  className={`xl:h-15 lg:h-13 h-11 xl:text-base! lg:text-[14px]! text-[12px]!`}
                >
                  {t("auth.login.step2.submitVerifyCode")}
                </Button>
                <div className={`flex justify-center`}>
                  {timer === 0 ? (
                    <p
                      onClick={() => {
                        setTimer(120);
                      }}
                      className={`text-default-black md:text-base text-[12px] cursor-pointer`}
                    >
                      {t("auth.register.step2.repeatPassword")}
                    </p>
                  ) : (
                    <Timer timer={timer} setTimer={setTimer} />
                  )}
                </div>
              </div>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default Step2;
