const ModernServicesIcon = ({
  width = "50",
  height = "40",
  color = "#005B77",
  className,
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 50 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M10 0C7.24219 0 5 2.24219 5 5V22.5H1.5C0.671875 22.5 0 23.1719 0 24C0 27.3125 2.6875 30 6 30H25V22.5H10V5H35V7.5H40V5C40 2.24219 37.7578 0 35 0H10ZM40 10H31.25C29.1797 10 27.5 11.6797 27.5 13.75V36.25C27.5 38.3203 29.1797 40 31.25 40H46.25C48.3203 40 50 38.3203 50 36.25V20H42.5C41.1172 20 40 18.8828 40 17.5V10ZM42.5 10V17.5H50L42.5 10Z"
        fill={color}
      />
    </svg>
  );
};

export default ModernServicesIcon;
