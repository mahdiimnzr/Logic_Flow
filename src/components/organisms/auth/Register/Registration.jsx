import { Formik, Form } from "formik";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import FormInput from "../../../molecules/Inputs/FormInput";
import HomeIcon from "../../../../core/icons/HomeIcon";
import Button from "../../../atoms/Buttons/Button";
import { sendVerifyRegister } from "@/core/services/api/auth/auth.service";
import { toast } from "react-toastify";
import EmailIcon from "@/core/icons/EmailIcon";
import ThemeSlide from "@/components/molecules/theme/ThemeSlide";
import ThemeContext from "@/app/context/ThemeContext";
import { useContext } from "react";

const validationSchema = Yup.object({
  gmail: Yup.string()
    .trim()
    .email("ایمیل وارد شده معتبر نیست!")
    .required("ایمیل وارد شده معتبر نیست!"),
});
const Registration = ({ setPage, setRegisterData }) => {
  const { theme, setTheme } = useContext(ThemeContext);
  const handleSubmit = async (value) => {
    const response = await sendVerifyRegister(value);
    if (response.data.success) {
      toast.success(response.data.message);
      setPage("Step2");
      setRegisterData(value);
    } else {
      toast.error(response.data.message);
    }
  };
  return (
    <Formik
      initialValues={{
        gmail: "",
      }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        handleSubmit(values);
      }}
    >
      {({ errors }) => (
        <Form>
          <div
            className={`flex flex-col xl:gap-25 lg:gap-20 gap-15 xl:pt-19 lg:pt-15 md:pt-10 pt-2`}
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
              <div className={`flex flex-col gap-2 text-center`}>
                <span
                  className={`text-green-primary xl:text-2xl lg:text-[18px] md:text-base text-[14px] font-bold text-center`}
                >
                  ایجاد حساب کاربری
                </span>
                <span
                  className={`xl:text-[16px] lg:text-[15px] md:text-[14px] text-[12px] text-default-black`}
                >
                  وارد کردن ایمیل برای ایجاد حساب کاربری
                </span>
              </div>
              <FormInput
                icon={<EmailIcon />}
                error={errors.gmail}
                name={"gmail"}
                type={"text"}
                placeholder={"ایمیل خود را وارد کنید"}
                className={`xl:h-15! lg:h-13! md:h-11! sm:h-13! h-11!`}
                errorMessageClassName={`lg:text-[14px]! text-[12px]!`}
              />
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

export default Registration;
