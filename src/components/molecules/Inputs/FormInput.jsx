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
  id,
  lightTheme = false,
  isComment = false,
  errorMessageClassName,
  inputClassName,
  ...rest
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
    <div className={`flex flex-col lg:gap-2 gap-1`}>
      <div
        className={`${lightTheme ? `bg-default-light rounded-2xl border border-light-gray` : null} bg-background-default ${isComment ? `rounded-[25px]` : `rounded-[100px]`} w-full h-15 px-5 flex items-center gap-4 box-border ${error && `border border-red-error`} ${className}`}
      >
        {icon && icon}
        <Field
          name={name}
          id={id}
          type={type}
          ref={inputRef}
          placeholder={placeholder}
          {...rest}
          className={`outline-none placeholder:text-field-silver text-field-silver ${lightTheme && !isComment ? `text-base` : `text-[14px]`} font-normal w-full ${inputClassName}`}
        />
        {type === "password" && (
          <EyeIcon
            onClick={handleHideFieldValue}
            className={`cursor-pointer`}
          />
        )}
      </div>
      <ErrorMessage
        name={name}
        component={"span"}
        className={`text-red-error text-[14px] font-normal mt-2 ${errorMessageClassName}`}
      />
    </div>
  );
};

export default FormInput;
