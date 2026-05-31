import { Formik, Form } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";
import FormInput from "../../../molecules/Inputs/FormInput";
import Button from "../../../atoms/Buttons/Button";
import ArrowRightIcon from "../../../../core/icons/ArrowRightIcon";
import KeyIcon from "../../../../core/icons/KeyIcon";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { ResetPassNewPass } from "@/core/services/api/auth/auth.service";

const validationSchema = Yup.object({
  newPassword: Yup.string()
    .trim()
    .min(8, "رمز عبور حداقل باید تشکیل شده از 8 حروف باشد")
    .required("رمز عبور وارد شده معتبر نیست!"),
  repeatPassword: Yup.string()
    .trim()
    .min(8, "رمز عبور حداقل باید تشکیل شده از 8 حروف باشد")
    .oneOf([Yup.ref("newPassword")], "مقدار وارد شده با رمز عبور یکسان نمیباشد")
    .required("رمز عبور وارد شده معتبر نیست!"),
});

const NewPassword = () => {
  const email = JSON.parse(localStorage.getItem("email"));
  const { verifyCode } = useParams();
  const navigate = useNavigate();
  const handleSubmit = async (value) => {
    const response = await ResetPassNewPass(value);
    if (response.data.success) {
      toast.success(response.data.message);
      navigate("/Auth/Login");
    } else {
      toast.error(response.data.message);
    }
  };
  useEffect(() => {
    if (!email) {
      navigate("/Auth/ResetPassword/ResetPassInFormation");
    }
  }, []);
  console.log(verifyCode);
  return (
    <Formik
      initialValues={{
        gmail: email,
        newPassword: "",
        repeatPassword: "",
        resetValue: verifyCode,
      }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        handleSubmit(values);
      }}
    >
      {({ errors }) => (
        <Form>
          <div className={`flex flex-col md:gap-19 gap-3 xl:pt-20 pt-10`}>
            <div
              onClick={() => {
                navigate("/Auth/ResetPassword/ResetPassInFormation");
              }}
              className={`flex gap-2 cursor-pointer`}
            >
              <ArrowRightIcon />
              <span className={`text-green-dark text-3.5 font-bold `}>
                بازگشت
              </span>
            </div>
            <div className={`flex flex-col gap-10`}>
              <div className={`flex flex-col gap-2 cursor-pointer`}>
                <span
                  className={`text-green-primary xl:text-[24px] lg:text-[20px] text-[16px] font-bold text-center  `}
                >
                  فراموشی رمز عبور
                </span>
                <span
                  className={`xl:text-[16px] lg:text-[14px] text-[13px] text-default-black text-center`}
                >
                  رمز عبور جدید برای خود تعیین کنید
                </span>
              </div>
              <div className={`flex flex-col gap-10 `}>
                <FormInput
                  icon={<KeyIcon />}
                  error={errors.newPassword}
                  name={"newPassword"}
                  type={"password"}
                  placeholder={"رمز عبور جدید"}
                  className={`xl:h-15! lg:h-13! md:h-11! sm:h-13! h-11!`}
                  errorMessageClassName={`lg:text-[14px]! text-[12px]!`}
                />
                <FormInput
                  icon={<KeyIcon />}
                  error={errors.repeatPassword}
                  name={"repeatPassword"}
                  type={"password"}
                  placeholder={"تکرار رمز عبور"}
                  className={`xl:h-15! lg:h-13! md:h-11! sm:h-13! h-11!`}
                  errorMessageClassName={`lg:text-[14px]! text-[12px]!`}
                />
              </div>
              <Button
                color={"authBtn"}
                className={`xl:h-15 lg:h-13 h-11 xl:text-base! lg:text-[14px]! text-[12px]!`}
              >
                ثبت رمز عبور جدید
              </Button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default NewPassword;
