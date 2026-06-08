const UserInfoIcon = ({
  width = "17",
  height = "20",
  color = "#848484",
  className,
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 17 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M8.5 9.52381C11.2094 9.52381 13.4038 7.39286 13.4038 4.7619C13.4038 2.13095 11.2094 0 8.5 0C5.79062 0 3.59615 2.13095 3.59615 4.7619C3.59615 7.39286 5.79062 9.52381 8.5 9.52381ZM7.2863 11.746C3.26106 11.746 0 14.9127 0 18.8214C0 19.4722 0.543509 20 1.2137 20H15.7863C16.4565 20 17 19.4722 17 18.8214C17 14.9127 13.7389 11.746 9.7137 11.746H7.2863Z"
        fill={color}
      />
    </svg>
  );
};

export default UserInfoIcon;
