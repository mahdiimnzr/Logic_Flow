const EmailIcon = ({
  width = "19",
  height = "21",
  color = "#848484",
  className,
  onClick,
}) => {
  return (
    <svg
      className={className}
      width={width}
      height={height}
      viewBox="0 0 19 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      onClick={onClick}
    >
      <path
        d="M1.6875 4C0.755859 4 0 4.78385 0 5.75C0 6.30052 0.249609 6.81823 0.675 7.15L8.325 13.1C8.72578 13.4099 9.27422 13.4099 9.675 13.1L17.325 7.15C17.7504 6.81823 18 6.30052 18 5.75C18 4.78385 17.2441 4 16.3125 4H1.6875ZM0 8.08333V15.6667C0 16.9536 1.00898 18 2.25 18H15.75C16.991 18 18 16.9536 18 15.6667V8.08333L10.35 14.0333C9.54844 14.6568 8.45156 14.6568 7.65 14.0333L0 8.08333Z"
        fill={color}
      />
    </svg>
  );
};

export default EmailIcon;
