import { Formik, Form } from "formik";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import FormInput from "../../../molecules/Inputs/FormInput";
import HomeIcon from "../../../../core/icons/HomeIcon";
import Button from "../../../atoms/Buttons/Button";
import EmailIcon from "@/core/icons/EmailIcon";
import { ResetPassInFormations } from "@/core/services/api/auth/auth.service";
import { toast } from "react-toastify";

const validationSchema = Yup.object({
  phoneOrGmail: Yup.string().required("ایمیل وارد شده معتبر نیست!"),
});
const ResetPassInFormation = () => {
  const navigate = useNavigate();

  const handleSubmit = async (value) => {
    const response = await ResetPassInFormations(value);
    if (response.data.success) {
      toast.success("حساب کاربری شما با موفقیت ایجاد شد.");
      navigate("/Auth/ResetPassword/NewPassword/:veriFyCode", {
        state: value.email,
      });
    } else {
      toast.error(response.data.message);
    }
  };
  return (
    <Formik
      initialValues={{
        email: "",
        baseUrl: "https:/localhost:5173/Auth/ResetPassword/NewPassword/",
      }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        handleSubmit(values);
      }}
    >
      {({ errors }) => (
        <Form>
          <div
            className={`flex flex-col xl:gap-27 lg:gap-23 gap-12 md:pt-19 pt-8`}
          >
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
                  className={`text-green-primary xl:text-[24px] lg:text-[20px] md:text-[16px] font-bold `}
                >
                  فراموشی رمز عبور
                </span>
                <span
                  className={`xl:text-[16px] lg:text-[15px] md:text-[14px] text-default-black`}
                >
                  ایمیل خود را برای تغییر رمز درخواست وارد کنید
                </span>
              </div>
              <div className={`flex flex-col gap-10 `}>
                <FormInput
                  icon={<EmailIcon />}
                  error={errors.phoneOrGmail}
                  name={"phoneOrGmail"}
                  type={"text"}
                  placeholder={"ایمیل خود را وارد کنید"}
                />
              </div>

              <Button
                color={"authBtn"}
                className={`h-15 xl:text-[16px] lg:text-[15px] md:text-[14px] `}
              >
                ارسال درخواست
              </Button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default ResetPassInFormation;
