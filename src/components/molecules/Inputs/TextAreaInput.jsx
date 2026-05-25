import { ErrorMessage, Field } from "formik";

const TextAreaInput = ({
  placeholder,
  type = "text",
  name,
  id,
  error,
  className,
  fieldClassName,
}) => {
  return (
    <div className={`flex flex-col gap-2`}>
      <div
        className={`bg-background-default rounded-[25px] w-full min-h-15 py-4 px-5 flex items-center gap-4 box-border ${error && `border border-red-error`} ${className}`}
      >
        <Field
          name={name}
          id={id}
          as="textarea"
          type={type}
          placeholder={placeholder}
          className={`outline-none placeholder:text-field-silver text-field-silver h-5 text-base font-normal w-full ${fieldClassName}`}
        />
      </div>
      <ErrorMessage
        name="text"
        component={"span"}
        className="text-red-error text-[14px] font-normal"
      />
    </div>
  );
};

export default TextAreaInput;
