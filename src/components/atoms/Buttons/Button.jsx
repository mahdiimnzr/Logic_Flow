const Button = ({
  children,
  className,
  onClick,
  color,
  isLikeOrDislike = false,
}) => {
  const buttonColor = {
    authBtn:
      "bg-green-primary text-white font-bold rounded-[100px] text-base cursor-pointer",
    primaryBtn:
      "bg-green-dark text-white rounded-[50px] text-base font-bold cursor-pointer",
    reserveBtn:
      "bg-lightly-green text-white rounded-[20px] text-base  font-normal text-[18px] cursor-pointer",
    teachersBtn:
      "bg-default-black text-default-light rounded-[20px] cursor-pointer text-base font-normal",
    searchBtn:
      "bg-green-primary text-default-light rounded-[15px] font-normal text-[14px] cursor-pointer",
    registerBtn:
      "bg-green-primary text-default-light rounded-[50px] text-base font-normal cursor-pointer",
    panelBtn:
      "bg-green-primary text-default-light rounded-[16px] font-normal text-base cursor-pointer",
    moreBtn:
      "bg-transparent border-2 border-green-primary text-green-primary rounded-[15px] font-bold text-[14px] text-green-primary",
    likeAndDisLikeBtn: `${isLikeOrDislike ? `bg-green-primary text-default-light` : `bg-light-gray text-field-silver`} rounded-[100px] text-base font-normal`,
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
