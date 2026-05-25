import { Formik, Form, ErrorMessage } from "formik";
import Button from "../components/atoms/Buttons/Button";
import * as Yup from "yup";
import ArrowIcon from "../core/icons/ArrowIcon";
import OtpInput from "../components/molecules/Inputs/OtpInput";
import { useState } from "react";
import TextAreaInput from "../components/molecules/Inputs/TextAreaInput";
import FormInput from "../components/molecules/Inputs/FormInput";
import Card from "../components/molecules/Cards/Card";
import TeachersCard from "../components/molecules/Cards/TeachersCard";

const validationSchema = Yup.object({
  verifyCode: Yup.string()
    .length(6, "پرکردن فیلد ها الزامی است !")
    .required("پرکردن فیلد ها الزامی است !"),
});

const Landing = () => {
  const [otp, setOtp] = useState(new Array(6).fill(""));
  return (
    <div className={`pb-100`}>
      <Button
        color={"primaryBtn"}
        className={`w-80 h-15 flex gap-1.5 justify-center items-center`}
      >
        <p>به جمع حرفه‌ای‌ها بپیوندید</p>
        <ArrowIcon />
      </Button>
      <Formik
        initialValues={{ verifyCode: "" }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
        }}
      >
        {({ errors, setFieldValue, values }) => {
          const otpValue = otp.join("");
          if (values.verifyCode !== otpValue) {
            setFieldValue("verifyCode", otpValue);
          }
          return (
            <Form>
              <div dir="ltr" className={`flex gap-10`}>
                <OtpInput otp={otp} setOtp={setOtp} error={errors.verifyCode} />
              </div>
              <FormInput id={"text"} name={"text"} />
              <FormInput id={"text1"} name={"text1"} lightTheme={true} />
              <FormInput id={"text2"} name={"text2"} isComment={true} />
              <ErrorMessage
                name="verifyCode"
                component={"span"}
                className="text-red-error text-[14px] font-normal"
              />
              <Button color={"primaryBtn"} type="submit">
                Click Meeee
              </Button>
              <TextAreaInput id={"name"} name={"name"} />
            </Form>
          );
        }}
      </Formik>
      <div className={`grid grid-cols-4 gap-8 mx-auto`}>
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
      <div className={`grid grid-cols-4 gap-8 mx-auto`}>
        <TeachersCard />
        <TeachersCard />
        <TeachersCard />
        <TeachersCard />
      </div>
      <div className={`grid grid-cols-4 gap-8 mx-auto`}>
        <Card isCourseCard={true} />
        <Card isCourseCard={true} />
        <Card isCourseCard={true} />
        <Card isCourseCard={true} />
      </div>
    </div>
  );
};

export default Landing;
