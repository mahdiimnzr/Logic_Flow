import { Formik, Form } from "formik";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import FormInput from "../../../molecules/Inputs/FormInput";
import EmailIcon from "../../../../core/icons/EmailIcon";
import HomeIcon from "../../../../core/icons/HomeIcon";
import Button from "../../../atoms/Buttons/Button";

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
      }}
    >
      {({ errors }) => (
        <Form>
          <div className={`flex gap-2 `}>
            <HomeIcon />
            <Link to={"/"} className={`text-green-dark text-3.5 font-bold`}>
              صفحه اصلی
            </Link>
          </div>
          <div className={`flex flex-col gap-8 xl:mt-20 lg:mt-15 mt-6`}>
            <span
              className={`text-green-primary xl:text-[24px] lg:text-[20px] md:text-[16px] font-bold text-center  `}
            >
              ورود به حساب کاربری
            </span>
            <div className={`flex flex-col gap-10 `}>
              <FormInput
                icon={<EmailIcon />}
                error={errors.phoneOrGmail}
                name={"phoneOrGmail"}
                type={"text"}
                placeholder={"ایمیل یا شماره تماس"}
              />
            </div>

            <Button color={"authBtn"} className={`h-15`}>
              ارسال کد یکبار مصرف
            </Button>
            <div
              className={`flex gap-2 justify-center text-[14px] font-normal`}
            >
              <p className={`text-default-black`}>حساب کاربری ندارید؟</p>
              <Link to={"/Auth/Register"} className={`text-green-primary`}>
                ثبت نام
              </Link>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default Registration;
