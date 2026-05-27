import boyPlaying from "../../../assets/images/landingHero.png";
import ArrowIcon from "../../../core/icons/ArrowIcon";
import Border from "../../atoms/Border/Border";
import Button from "../../atoms/Buttons/Button";

const HeroSection = () => {
  return (
    <div className={`bg-light-green w-full pt-29 relative -top-29`}>
      <div className={`flex justify-between items-center w-[95%] mx-auto`}>
        <div className={`w-4/10 flex flex-col gap-8`}>
          <div className={`flex flex-col gap-6`}>
            <h2 className={`text-default-black text-4xl font-bold`}>
              یادگیری برنامه‌نویسی با اساتید مجرب ، <br />
              <span className={`text-green-primary leading-normal`}>
                مسیر موفقیت
              </span>
              {""} شما را هموار می‌کند.
            </h2>
            <p className={`text-dark-gray text-base font-normal`}>
              در دوره‌های تخصصی ما، با اساتید حرفه‌ای و با تجربه یادگیری
              برنامه‌نویسی را آغاز کنید. <br /> از مفاهیم پایه تا مهارت‌های
              پیشرفته، شما را به سطحی می‌رسانیم که آماده ورود به <br /> دنیای
              حرفه‌ای فناوری باشید. با روش‌های مدرن و کارآمد، به سرعت رشد کنید!
            </p>
          </div>
          <Button
            color={"primaryBtn"}
            className={`h-11.5 w-63 flex justify-center items-center gap-1.5`}
          >
            <p>به جمع حرفه‌ای‌ها بپیوندید</p>
            <ArrowIcon />
          </Button>
        </div>
        <div className={`w-4/10 flex justify-end`}>
          <img className={`w-125`} src={boyPlaying} />
        </div>
      </div>
      <div
        className={`bg-green-primary flex items-center justify-evenly py-10`}
      >
        <div className={`text-default-light flex items-center gap-4`}>
          <span className={`font-normal text-2xl`}>اساتید برتر</span>
          <h3 dir="ltr" className={`text-5xl font-bold`}>
            +97
          </h3>
        </div>
        <Border width={`w-0.5`} height={`h-15`} color={`bg-default-light`} />
        <div className={`text-default-light flex items-center gap-4`}>
          <span className={`font-normal text-2xl`}>دانشجو</span>
          <h3 dir="ltr" className={`text-5xl font-bold`}>
            +250
          </h3>
        </div>
        <Border width={`w-0.5`} height={`h-15`} color={`bg-default-light`} />
        <div className={`text-default-light flex items-center gap-4`}>
          <span className={`font-normal text-2xl`}>دوره های آموزشی</span>
          <h3 dir="ltr" className={`text-5xl font-bold`}>
            +154
          </h3>
        </div>
        <Border width={`w-0.5`} height={`h-15`} color={`bg-default-light`} />
        <div className={`text-default-light flex items-center gap-4`}>
          <span className={`font-normal text-2xl`}>اخبار و مقالات</span>
          <h3 dir="ltr" className={`text-5xl font-bold`}>
            +15
          </h3>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
