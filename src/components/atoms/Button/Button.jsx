const Button = ({ children, className, onClick, color }) => {
  const buttonColor = {
    authBtn: "bg-green-primary text-default-light font-bold rounded-[100px]",
  };
  return (
    <button onClick={onClick} className={`${buttonColor[color]} ${className}`}>
      {children}
    </button>
  );
};

export default Button;
