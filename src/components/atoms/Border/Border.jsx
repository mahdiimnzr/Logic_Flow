const Border = ({
  width = "w-full",
  height = "h-full",
  color = "bg-light-gray",
}) => {
  return <div className={`${width} ${height} ${color}`}></div>;
};

export default Border;
