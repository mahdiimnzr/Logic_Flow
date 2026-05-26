import boyPlaying from "../../../assets/images/landingHero.png";

const HeroSection = () => {
  return (
    <div className={`bg-light-green w-full`}>
      <div className={`flex justify-between items-center w-[95%] mx-auto`}>
        <div className={`flex flex-col gap-8`}>
          <div className={`flex flex-col gap-6`}>
            <h2>
              یادگیری برنامه‌نویسی با اساتید مجرب ، <br />
              <span>مسیر موفقیت</span> شما را هموار می‌کند.
            </h2>
          </div>
        </div>
        <img src={boyPlaying} />
      </div>
      <div className={`bg-green-primary`}></div>
    </div>
  );
};

export default HeroSection;
