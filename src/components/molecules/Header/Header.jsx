import logoIcon from "/logoIcon.png";

const Header = () => {
  return (
    <div
      className={`w-[95%] flex justify-between items-center pt-6 mx-auto relative z-10`}
    >
      <div className={`flex items-center gap-8`}>
        <div className={`flex items-center gap-4`}>
          <img className={`size-11.5`} src={logoIcon} />
          <span className={`text-2xl font-bold text-default-black`}>
            آکادمی بحر
          </span>
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default Header;
