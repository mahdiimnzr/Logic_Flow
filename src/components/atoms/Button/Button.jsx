const Button = ({ children, className, onClick, color }) => {
  const buttonColor = {
    authBtn:
      "bg-green-primary text-default-light font-bold rounded-[100px] font-bold cursor-pointer",
    primaryBtn:
      "bg-green-dark text-default-light rounded-[50px] font-bold cursor-pointer",
  };
  return (
    <button
      type="submit"
      onClick={onClick}
      className={`${buttonColor[color]} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
