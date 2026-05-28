import Button from "@/components/atoms/Buttons/Button";
import ArrowIcon from "@/core/icons/ArrowIcon";
import experienceLanding from "@/assets/images/experienceLanding.png";
import { Link } from "react-router-dom";

const ExperienceSection = () => {
  return (
    <div className={`flex justify-between items-center w-[95%] mx-auto`}>
      <div className={`w-4/10 flex flex-col gap-8`}>
        <div className={`flex flex-col gap-6`}>
          <h2 className={`text-default-black text-4xl font-bold`}>
            تجربه‌ات رو آموزش بده، تأثیر بذار و با ما <br />
            <span className={`text-green-primary leading-normal`}>
              مسیر حرفه‌ای تازه‌ای
            </span>
            {""} رو شروع کن.
          </h2>
          <p className={`text-dark-gray text-base font-normal`}>
            اگه برنامه‌نویسی بلدی و دوست داری دانشت رو به دیگران منتقل کنی،
            اینجا جاییه که می‌تونی هم <br /> آموزش بدی، هم تاثیرگذار باشی و هم
            درآمد داشته باشی. به جمع مدرسین ما بپیوند و بخشی از <br /> آینده‌ی
            برنامه‌نویسان تازه‌کار باش.
          </p>
        </div>
        <Link to="/Teachers" className={`rounded-[50px] w-fit`}>
          <Button
            color={"primaryBtn"}
            className={`h-11.5 w-63 flex justify-center items-center gap-4`}
          >
            <p>به جمع اساتید بپیوندید</p>
            <ArrowIcon />
          </Button>
        </Link>
      </div>
      <div className={`w-4/10 flex justify-end`}>
        <img className={`w-166.5 h-103.5`} src={experienceLanding} />
      </div>
    </div>
  );
};

export default ExperienceSection;
