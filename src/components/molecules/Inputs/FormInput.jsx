import { ErrorMessage, Field } from "formik";
import EyeIcon from "../../../core/icons/EyeIcon";
import { useRef } from "react";

const FormInput = ({
  placeholder,
  name,
  error,
  icon,
  type = "text",
  className,
}) => {
  const inputRef = useRef(null);
  const handleHideFieldValue = () => {
    if (inputRef.current.type === "password") {
      inputRef.current.type = "text";
    } else if (inputRef.current.type === "text") {
      inputRef.current.type = "password";
    }
  };
  return (
    <div className={`flex flex-col gap-2`}>
      <div
        className={`bg-background-default rounded-[100px] w-full h-15 px-5 flex items-center gap-4 box-border ${error && `border border-red-error`} ${className}`}
      >
        {icon && icon}
        <Field
          name={name}
          type={type}
          ref={inputRef}
          placeholder={placeholder}
          className={`outline-none placeholder:text-field-silver text-field-silver text-base font-normal w-full`}
        />
        {type === "password" && (
          <EyeIcon
            onClick={handleHideFieldValue}
            className={`cursor-pointer`}
          />
        )}
      </div>
      <ErrorMessage
        name="text"
        component={"span"}
        className="text-red-error text-[14px] font-normal"
      />
    </div>
  );
};

export default FormInput;
