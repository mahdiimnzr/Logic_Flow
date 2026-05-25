import { Form, Formik } from "formik";
import FormInput from "../../molecules/Inputs/FormInput";
import * as Yup from "yup";

const Step1 = () => {
  return (
    <Formik>
      <Form>
        <FormInput />
      </Form>
    </Formik>
  );
};

export default Step1;
