import Button from "@/components/atoms/Buttons/Button";
import ArrowIcon from "@/core/icons/ArrowIcon";
import experienceLanding from "@/assets/images/experienceLanding.png";
import { Link } from "react-router-dom";
import { useI18n } from "@/i18n/useI18n";

const ExperienceSection = () => {
  const { t, lang } = useI18n();
  return (
    <div
      className={`flex flex-col md:flex-row justify-between items-center gap-10 md:gap-0 md:w-[95%] w-[90%] mx-auto`}
    >
      <div className={`md:w-5/10 w-full flex flex-col xl:gap-8 gap-6`}>
        <div className={`flex flex-col xl:gap-6 gap-4`}>
          <h2
            className={`text-default-black xl:text-4xl lg:text-2xl text-[20px] font-bold`}
          >
            {t("landing.experienceSection.titleFirstLine")}{" "}
            <br className={`hidden md:block`} />
            <span className={`text-green-primary leading-normal`}>
              {t("landing.experienceSection.titleKeyWord")}
            </span>
            {""} {t("landing.experienceSection.titleSecondLine")}
          </h2>
          <p
            className={`text-dark-gray xl:text-base lg:text-[14px] text-[12px] font-normal`}
          >
            {t("landing.experienceSection.descriptionFirstLine")}
            <br className={`hidden lg:block`} />{" "}
            {t("landing.experienceSection.descriptionSecondLine")}{" "}
            <br className={`hidden lg:block`} />{" "}
            {t("landing.experienceSection.descriptionThirdLine")}
          </p>
        </div>
        <Link to="/Teachers" className={`rounded-[50px] w-fit`}>
          <Button
            color={"primaryBtn"}
            className={`h-11.5 xl:w-63 md:w-55 w-45 flex justify-center items-center gap-4`}
          >
            <p className={`xl:text-base md:text-[14px] text-[12px]`}>
              {t("landing.experienceSection.linkBtn")}
            </p>
            <ArrowIcon
              className={`size-3 md:size-3.75 ${
                lang === "en"
                  ? "transform-[rotate(90deg)]"
                  : "transform-[rotate(0deg)]"
              }`}
            />
          </Button>
        </Link>
      </div>
      <div className={`md:w-4/10 w-full flex justify-end`}>
        <img
          className={`xl:w-166.5 xl:h-103.5 md:w-116.5 md:53.5 w-full`}
          src={experienceLanding}
        />
      </div>
    </div>
  );
};

export default ExperienceSection;
