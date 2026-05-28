import { Formik, Form } from "formik";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import FormInput from "../../../molecules/Inputs/FormInput";
import HomeIcon from "../../../../core/icons/HomeIcon";
import Button from "../../../atoms/Buttons/Button";
import Phone from "../../../../core/icons/Phone";

const validationSchema = Yup.object({
  phoneOrGmail: Yup.string()
    .min(8, " ایمیل حداقل باید تشکیل شده از 8 حروف باشد")
    .required("ایمیل وارد شده معتبر نیست!"),
});
const Registration = ({ setPage }) => {
  const handleSubmit = () => {
    setPage("Step2");
  };
  return (
    <Formik
      initialValues={{
        phoneOrGmail: "",
      }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        handleSubmit();
        console.log(values);
      }}
    >
      {({ errors }) => (
        <Form>
          <div
            className={`flex flex-col xl:gap-15 gap-5 xl:pt-27.75 lg:pt-21.75 md:pt-17.75 pt-10`}
          >
            <Link to={"/"} className={`flex gap-2 cursor-pointer`}>
              <HomeIcon />
              <span className={`text-green-dark text-3.5 font-bold`}>
                صفحه اصلی
              </span>
            </Link>
            <div className={`flex flex-col gap-2 text-center cursor-pointer`}>
              {" "}
              <span
                className={`text-green-primary xl:text-[24px] lg:text-[20px] md:text-[16px] font-bold `}
              >
                ایجاد حساب کاربری
              </span>
              <span
                className={`xl:text-[16px] lg:text-[15px] md:text-[14px] text-default-black`}
              >
                وارد کردن شماره تماس برای ایجاد حساب کاربری
              </span>
            </div>
            <div className={`flex flex-col gap-10 `}>
              <FormInput
                icon={<Phone />}
                error={errors.phoneOrGmail}
                name={"phoneOrGmail"}
                type={"text"}
                placeholder={"شماره تماس خود را وارد کنید"}
              />
            </div>

            <Button
              color={"authBtn"}
              className={`h-15 xl:text-[16px] lg:text-[15px] md:text-[14px] `}
            >
              ارسال کد یکبار مصرف
            </Button>
            <div
              className={`flex gap-2 justify-center text-[14px] font-normal cursor-pointer `}
            >
              <p className={`text-default-black`}>
                حساب کاربری دارید؟{" "}
                <Link to={"/Auth/Login"} className={`text-green-primary`}>
                  وارد شوید
                </Link>
              </p>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default Registration;
