const CommentsIcon = ({
  width = "20",
  height = "20",
  color = "#848484",
  className,
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M20 9.37424C20 14.5496 15.5234 18.7485 10 18.7485C8.55078 18.7485 7.17578 18.4594 5.93359 17.94L1.30859 19.9242C0.941406 20.0804 0.519531 19.9906 0.25 19.6976C-0.0195312 19.4047 -0.0781249 18.975 0.109375 18.6235L2.01562 15.0222C0.75 13.4481 0 11.4952 0 9.37424C0 4.19888 4.47656 0 10 0C15.5234 0 20 4.19888 20 9.37424Z"
        fill={color}
      />
    </svg>
  );
};

export default CommentsIcon;
