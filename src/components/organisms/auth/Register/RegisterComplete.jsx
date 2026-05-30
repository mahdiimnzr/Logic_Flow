import { Formik, Form } from "formik";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import FormInput from "../../../molecules/Inputs/FormInput";
import EmailIcon from "../../../../core/icons/EmailIcon";
import Button from "../../../atoms/Buttons/Button";
import ArrowRightIcon from "../../../../core/icons/ArrowRightIcon";
import KeyIcon from "../../../../core/icons/KeyIcon";
import { toast } from "react-toastify";
import { completeRegister } from "@/core/services/api/auth/auth.service";

const validationSchema = Yup.object({
  phoneNumber: Yup.string()
    .trim()
    .min(8, " ایمیل حداقل باید تشکیل شده از 8 حروف باشد")
    .required("ایمیل وارد شده معتبر نیست!"),
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

const RegisterComplete = ({ setPage, registerData }) => {
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
        handleSubmit(values);
        console.log(values);
      }}
    >
      {({ errors }) => (
        <Form>
          <div className={`flex flex-col xl:gap-8 gap-3 xl:pt-19.5 pt-10`}>
            <div
              onClick={() => {
                setPage("Step2");
              }}
              className={`flex gap-2 cursor-pointer`}
            >
              <ArrowRightIcon />
              <span className={`text-green-dark text-3.5 font-bold `}>
                بازگشت
              </span>
            </div>
            <div className={`flex flex-col gap-10 `}>
              <div className={`flex flex-col gap-2 cursor-pointer`}>
                <span
                  className={`text-green-primary xl:text-[24px] lg:text-[20px] text-[16px] font-bold text-center  `}
                >
                  ایجاد حساب کاربری
                </span>
                <span
                  className={`xl:text-[16px] lg:text-[14px] text-[13px] text-default-black text-center`}
                >
                  کامل کردن مشخصات
                </span>
              </div>
              <FormInput
                icon={<EmailIcon />}
                error={errors.phoneNumber}
                name={"phoneNumber"}
                type={"text"}
                placeholder={"ایمیل خود را وارد کنید"}
              />
              <FormInput
                icon={<KeyIcon />}
                error={errors.phoneOrGmail}
                name={"password"}
                type={"password"}
                placeholder={"رمز عبور خود را وارد کنید"}
              />
              <FormInput
                icon={<KeyIcon />}
                error={errors.phoneOrGmail}
                name={"repeatPassword"}
                type={"password"}
                placeholder={"تکرار رمز عبور"}
              />
            </div>
            <Button color={"authBtn"} className={`h-15 `}>
              ثبت نام
            </Button>
            <div
              className={`flex gap-2 justify-center text-[14px] font-normal cursor-pointer`}
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

export default RegisterComplete;
