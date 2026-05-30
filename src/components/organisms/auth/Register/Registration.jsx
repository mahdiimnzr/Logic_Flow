import { Formik, Form } from "formik";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import FormInput from "../../../molecules/Inputs/FormInput";
import HomeIcon from "../../../../core/icons/HomeIcon";
import Button from "../../../atoms/Buttons/Button";
import { sendVerifyRegister } from "@/core/services/api/auth/auth.service";
import { toast } from "react-toastify";
import EmailIcon from "@/core/icons/EmailIcon";

const validationSchema = Yup.object({
  gmail: Yup.string()
    .trim()
    .email("ایمیل وارد شده معتبر نیست!")
    .required("ایمیل وارد شده معتبر نیست!"),
});
const Registration = ({ setPage, setRegisterData }) => {
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
          <div className={`flex flex-col md:gap-26.75 gap-12 md:pt-18 pt-8`}>
            <Link to={"/"} className={`flex gap-2 cursor-pointer`}>
              <HomeIcon />
              <span className={`text-green-dark text-3.5 font-bold`}>
                صفحه اصلی
              </span>
            </Link>
            <div className={`flex flex-col gap-10`}>
              <div className={`flex flex-col gap-2 text-center cursor-pointer`}>
                {" "}
                <span
                  className={`text-green-primary xl:text-[24px] lg:text-[20px] md:text-[16px] font-bold`}
                >
                  ایجاد حساب کاربری
                </span>
                <span
                  className={`xl:text-[16px] lg:text-[15px] md:text-[14px] text-default-black`}
                >
                  وارد کردن شماره تماس برای ایجاد حساب کاربری
                </span>
              </div>
              <div className={`flex flex-col gap-10`}>
                <FormInput
                  icon={<EmailIcon />}
                  error={errors.gmail}
                  name={"gmail"}
                  type={"text"}
                  placeholder={"ایمیل خود را وارد کنید"}
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
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default Registration;
