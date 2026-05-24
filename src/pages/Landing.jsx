import { Formik, Form } from "formik";
import Button from "../components/atoms/Button/Button";
import FormInput from "../components/molecules/Inputs/FormInput";
import * as Yup from "yup";
import EmailIcon from "../core/icons/EmailIcon";
import CheckBox from "../components/molecules/Inputs/CheckBox";

const validationSchema = Yup.object({
  text: Yup.string().required("Please Fill The Box!"),
});

const Landing = () => {
  return (
    <div className={``}>
      <Button color={"authBtn"} className={`w-full h-15 font-bold`}>
        پایتون + ماینکرفت = یادگیری برنامه‌ نویسی با بازی!
      </Button>
      <Formik
        validationSchema={validationSchema}
        initialValues={{
          text: "",
          c1: "",
        }}
        onSubmit={(values) => console.log(values)}
      >
        {({ errors }) => (
          <Form>
            <FormInput
              icon={<EmailIcon />}
              error={errors.text}
              name={"text"}
              type={"text"}
              placeholder={"ایمیل یا شماره تماس"}
            />
            <CheckBox />
            <button type="submit" className="text-default-light">
              submit
            </button>
          </Form>
        )}
      </Formik>{" "}
    </div>
  );
};

export default Landing;
