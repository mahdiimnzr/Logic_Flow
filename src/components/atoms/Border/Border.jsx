const Border = ({
  width = "w-full",
  height = "h-full",
  color = "bg-light-gray",
  className
}) => {
  return <div className={`${width} ${height} ${color} ${className}`}></div>;
};

export default Border;
