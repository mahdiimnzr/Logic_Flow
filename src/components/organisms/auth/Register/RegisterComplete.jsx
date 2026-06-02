import { Formik, Form } from "formik";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import FormInput from "../../../molecules/Inputs/FormInput";
import Button from "../../../atoms/Buttons/Button";
import ArrowRightIcon from "../../../../core/icons/ArrowRightIcon";
import KeyIcon from "../../../../core/icons/KeyIcon";
import { toast } from "react-toastify";
import { completeRegister } from "@/core/services/api/auth/auth.service";
import ThemeSlide from "@/components/molecules/theme/ThemeSlide";
import ThemeContext from "@/app/context/ThemeContext";
import { useContext } from "react";
import Phone from "@/core/icons/Phone";
import { useI18n } from "@/i18n/useI18n";
const RegisterComplete = ({ setPage, registerData }) => {
  const { t } = useI18n();
  const { theme, setTheme } = useContext(ThemeContext);
  const navigate = useNavigate();
  const handleSubmit = async (value) => {
    const response = await completeRegister(value);
    if (response.data.success) {
      toast.success("حساب کاربری شما با موفقیت ایجاد شد.");
      navigate("/Auth/Login");
    } else {
      toast.error(response.data.message);
    }
  };

  const validationSchema = Yup.object({
    phoneNumber: Yup.string()
      .min(10, "شماره موبایل حداقل باید تشکیل شده از 11 رقم باشد")
      .required("شماره موبایل وارد شده معتبر نیست!"),
    password: Yup.string()
      .trim()
      .min(8, "رمز عبور حداقل باید تشکیل شده از 8 حروف باشد")
      .required("رمز عبور وارد شده معتبر نیست!"),
    repeatPassword: Yup.string()
      .trim()
      .min(8, "رمز عبور حداقل باید تشکیل شده از 8 حروف باشد")
      .oneOf([Yup.ref("password")], "مقدار وارد شده با رمز عبور یکسان نمیباشد")
      .required("رمز عبور وارد شده معتبر نیست!"),
  });
  return (
    <Formik
      initialValues={{
        gmail: registerData?.gmail,
        password: "",
        repeatPassword: "",
        phoneNumber: "",
      }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        values.phoneNumber = values.phoneNumber.toString();
        handleSubmit(values);
      }}
    >
      {({ errors }) => (
        <Form>
          <div
            className={`flex flex-col xl:gap-25 lg:gap-20 sm:gap-15 gap-6 xl:pt-19 lg:pt-15 md:pt-10 pt-2`}
          >
            <div className={`flex items-center justify-between w-full`}>
              <div
                onClick={() => {
                  setPage("Step2");
                }}
                className={`flex gap-2 cursor-pointer `}
              >
                <ArrowRightIcon className={`xl:size-6 sm:size-5 size-4`} />
                <span
                  className={`text-green-dark xl:text-base sm:text-[14px] text-[12px] font-bold`}
                >
                  {t("auth.register.step3.backBtn")}
                </span>
              </div>
              <ThemeSlide
                theme={theme}
                setTheme={setTheme}
                className={`flex md:hidden`}
              />
            </div>
            <div className={`flex flex-col xl:gap-8 lg:gap-4 gap-5`}>
              <div className={`flex flex-col gap-2 text-center`}>
                <span
                  className={`text-green-primary xl:text-2xl lg:text-[18px] md:text-base text-[14px] font-bold text-center`}
                >
                  {t("auth.register.step3.title")}
                </span>
                <span
                  className={`xl:text-[16px] lg:text-[15px] md:text-[14px] text-[12px] text-default-black`}
                >
                  {t("auth.register.step3.description")}
                </span>
              </div>
              <FormInput
                icon={<Phone />}
                error={errors.phoneNumber}
                name={"phoneNumber"}
                type={"number"}
                pattern="/^[0-9]$/"
                placeholder={t("auth.register.step3.numberPlaceHolder")}
                className={`xl:h-15! lg:h-13! md:h-11! sm:h-13! h-11!`}
                errorMessageClassName={`lg:text-[14px]! text-[12px]!`}
              />
              <FormInput
                icon={<KeyIcon />}
                error={errors.password}
                name={"password"}
                type={"password"}
                placeholder={t("auth.register.step3.passwordPlaceHolder")}
                className={`xl:h-15! lg:h-13! md:h-11! sm:h-13! h-11!`}
                errorMessageClassName={`lg:text-[14px]! text-[12px]!`}
              />
              <FormInput
                icon={<KeyIcon />}
                error={errors.repeatPassword}
                name={"repeatPassword"}
                type={"password"}
                placeholder={t("auth.register.step3.repeatPasswordPlaceHolder")}
                className={`xl:h-15! lg:h-13! md:h-11! sm:h-13! h-11!`}
                errorMessageClassName={`lg:text-[14px]! text-[12px]!`}
              />
              <Button
                color={"authBtn"}
                className={`xl:h-15 lg:h-13 h-11 xl:text-base! lg:text-[14px]! text-[12px]!`}
              >
                ثبت نام
              </Button>
              <div
                className={`flex gap-2 justify-center lg:text-[14px] text-[12px] font-normal cursor-pointer`}
              >
                <p className={`text-default-black`}>
                  حساب کاربری دارید؟{" "}
                  <Link to={"/Auth/Login"} className={`text-green-primary`}>
                    وارد شوید
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default RegisterComplete;
