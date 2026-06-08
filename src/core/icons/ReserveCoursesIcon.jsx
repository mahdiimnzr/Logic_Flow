const ReserveCoursesIcon = ({
  width = "15",
  height = "20",
  color = "#848484",
  className,
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 15 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M2.5 0C1.12109 0 0 1.1212 0 2.50023V18.7517C0 19.201 0.242187 19.619 0.632812 19.8378C1.02344 20.0565 1.50391 20.0526 1.89062 19.8221L7.5 16.4585L13.1055 19.8221C13.4922 20.0526 13.9727 20.0604 14.3633 19.8378C14.7539 19.6151 15 19.201 15 18.7517V2.50023C15 1.1212 13.8789 0 12.5 0H2.5Z"
        fill={color}
      />
    </svg>
  );
};

export default ReserveCoursesIcon;
