import { Formik, Form } from "formik";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import FormInput from "../../../molecules/Inputs/FormInput";
import CheckBox from "../../../molecules/Inputs/CheckBox";
import HomeIcon from "../../../../core/icons/HomeIcon";
import Button from "../../../atoms/Buttons/Button";
import KeyIcon from "../../../../core/icons/KeyIcon";
import HumanIcon from "@/core/icons/HumanIcon";
import { postLogin } from "@/core/services/api/auth/auth.service";
import { toast } from "react-toastify";
import ThemeSlide from "@/components/molecules/theme/ThemeSlide";
import ThemeContext from "@/app/context/ThemeContext";
import { useI18n } from "@/i18n/useI18n";
import LoginContext from "@/app/context/LoginContext";

const Step1 = ({ setWhichStep, setSignUpParams, SignUpParams }) => {
  const { setIsLogin } = useContext(LoginContext);
  const { t, lang, changeLang } = useI18n();
  const { theme, setTheme } = useContext(ThemeContext);
  const [checked, setChecked] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = async (value) => {
    const result = await postLogin(value);
    if (result.data.success) {
      toast.success(result.data.message);
      if (result.data.token) {
        navigate("/");
        localStorage.setItem("token", JSON.stringify(result.data.token));
        setIsLogin(true);
      } else {
        setWhichStep("Step2");
        setSignUpParams({ ...SignUpParams, phoneOrGmail: value.phoneOrGmail });
      }
    } else {
      toast.error(result.data.message);
    }
  };
  const validationSchema = Yup.object({
    phoneOrGmail: Yup.string().required(
      t("auth.login.step1.emailErrorMessage"),
    ),
    password: Yup.string()
      .min(6, t("auth.login.step1.passwordMoreThan8ErrorMessage"))
      .required(t("auth.login.step1.passwordErrorMessage")),
  });
  return (
    <Formik
      initialValues={{
        phoneOrGmail: "",
        password: "",
        rememberMe: false,
      }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        handleSubmit(values);
      }}
    >
      {({ errors, setFieldValue, values }) => {
        const newValue = checked;
        if (values.rememberMe !== checked) {
          setFieldValue("rememberMe", newValue);
        }
        return (
          <Form>
            <div
              className={`flex flex-col xl:gap-10 lg:gap-15 gap-5 xl:pt-19 lg:pt-15 md:pt-10 pt-2`}
            >
              <div className={`flex items-center justify-between w-full`}>
                <Link to={"/"} className={`flex  gap-2`}>
                  <HomeIcon className={`xl:size-6 sm:size-5 size-4`} />
                  <p
                    className={`text-green-dark xl:text-base sm:text-[14px] text-[12px] font-bold leading-7`}
                  >
                    {t("auth.login.step1.homeBtn")}
                  </p>
                </Link>
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
                <span
                  className={`text-green-primary xl:text-2xl lg:text-[18px] md:text-base text-[14px] font-bold text-center`}
                >
                  {t("auth.login.step1.title")}
                </span>
                <div className={`flex flex-col xl:gap-10 lg:gap-5 gap-3`}>
                  <FormInput
                    icon={<HumanIcon className={`lg:size-5 size-3`} />}
                    error={errors.phoneOrGmail}
                    name={"phoneOrGmail"}
                    type={"text"}
                    placeholder={t("auth.login.step1.emailPlaceHolder")}
                    className={`xl:h-15! lg:h-13! md:h-11! sm:h-13! h-11!`}
                    errorMessageClassName={`lg:text-[14px]! text-[12px]!`}
                  />
                  <FormInput
                    icon={<KeyIcon />}
                    error={errors.password}
                    name={"password"}
                    type={"password"}
                    placeholder={t("auth.login.step1.passwordPlaceHolder")}
                    className={`xl:h-15! lg:h-13! md:h-11! sm:h-13! h-11!`}
                    errorMessageClassName={`lg:text-[14px]! text-[12px]!`}
                  />
                </div>
                <div className={`flex justify-between`}>
                  <CheckBox
                    labelId={"rememberMe"}
                    id={"rememberMe"}
                    checked={checked}
                    onChange={() => {
                      setChecked(!checked);
                    }}
                    label={t("auth.login.step1.rememberMe")}
                  />
                  <Link
                    to={"/Auth/ResetPassword/ResetPassInFormation"}
                    className={`text-field-silver xl:text-[14px] text-[12px] font-normal ml-3`}
                  >
                    {t("auth.login.step1.forgetPassword")}
                  </Link>
                </div>

                <Button
                  color={"authBtn"}
                  className={`xl:h-15 lg:h-13 h-11 xl:text-base! lg:text-[14px]! text-[12px]!`}
                >
                  {t("auth.login.step1.sendVerifyCode")}
                </Button>
                <div
                  className={`flex gap-2 justify-center lg:text-[14px] text-[12px] font-normal cursor-pointer`}
                >
                  <p className={`text-default-black`}>
                    {t("auth.login.step1.notHaveAccount")}{" "}
                    <Link
                      to={"/Auth/Register"}
                      className={`text-green-primary`}
                    >
                      {t("auth.login.step1.register")}
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default Step1;
