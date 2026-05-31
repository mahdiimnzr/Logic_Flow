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

const validationSchema = Yup.object({
  phoneOrGmail: Yup.string().required("ایمیل وارد شده معتبر نیست!"),
  password: Yup.string()
    .min(8, "رمز عبور حداقل باید تشکیل شده از 8 حروف باشد")
    .required("رمز عبور وارد شده معتبر نیست!"),
});

const Step1 = ({ setWhichStep, setSignUpParams, SignUpParams }) => {
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
      } else {
        setWhichStep("Step2");
        setSignUpParams({ ...SignUpParams, phoneOrGmail: value.phoneOrGmail });
      }
    } else {
      toast.error(result.data.message);
    }
  };

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
                <Link to={"/"} className={`flex gap-2`}>
                  <HomeIcon className={`xl:size-6 sm:size-5 size-4`} />
                  <p
                    className={`text-green-dark xl:text-base sm:text-[14px] text-[12px] font-bold`}
                  >
                    صفحه اصلی
                  </p>
                </Link>
                <ThemeSlide
                  theme={theme}
                  setTheme={setTheme}
                  className={`flex md:hidden`}
                />
              </div>
              <div className={`flex flex-col xl:gap-8 lg:gap-4 gap-5`}>
                <span
                  className={`text-green-primary xl:text-2xl lg:text-[18px] md:text-base text-[14px] font-bold text-center`}
                >
                  ورود به حساب کاربری
                </span>
                <div className={`flex flex-col xl:gap-10 lg:gap-5 gap-3`}>
                  <FormInput
                    icon={<HumanIcon className={`lg:size-5 size-3`} />}
                    error={errors.phoneOrGmail}
                    name={"phoneOrGmail"}
                    type={"text"}
                    placeholder={"ایمیل یا شماره تماس"}
                    className={`xl:h-15! lg:h-13! md:h-11! sm:h-13! h-11!`}
                    errorMessageClassName={`lg:text-[14px]! text-[12px]!`}
                  />
                  <FormInput
                    icon={<KeyIcon />}
                    error={errors.password}
                    name={"password"}
                    type={"password"}
                    placeholder={"رمز عبور"}
                    className={`xl:h-15! lg:h-13! md:h-11! sm:h-13! h-11!`}
                    errorMessageClassName={`lg:text-[14px]! text-[12px]!`}
                  />
                </div>
                <div className={`flex justify-between`}>
                  <CheckBox
                    id={"rememberMe"}
                    name={"rememberMe"}
                    checked={checked}
                    setChecked={() => {
                      setChecked(!checked);
                      console.log(checked);
                    }}
                    label={"مرا به خاطر بسپار"}
                  />
                  <Link
                    to={"/Auth/ResetPassword/ResetPassInFormation"}
                    className={`text-field-silver xl:text-[14px] text-[12px] font-normal ml-3`}
                  >
                    فراموشی رمز عبور
                  </Link>
                </div>

                <Button
                  color={"authBtn"}
                  className={`xl:h-15 lg:h-13 h-11 xl:text-base! lg:text-[14px]! text-[12px]!`}
                >
                  ارسال کد یکبار مصرف
                </Button>
                <div
                  className={`flex gap-2 justify-center lg:text-[14px] text-[12px] font-normal cursor-pointer`}
                >
                  <p className={`text-default-black`}>
                    حساب کاربری دارید؟{" "}
                    <Link
                      to={"/Auth/Register"}
                      className={`text-green-primary`}
                    >
                      ثبت نام
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
