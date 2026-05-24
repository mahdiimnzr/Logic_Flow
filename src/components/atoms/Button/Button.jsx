const Button = ({ children, className, onClick, color }) => {
  const buttonColor = { authBtn: "bg-green-primary text-default-light" };
  return (
    <button onClick={onClick} className={`${buttonColor[color]} ${className}`}>
      {children}
    </button>
  );
};

export default Button;
