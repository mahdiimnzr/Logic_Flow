import { CircleCheck } from "lucide-react";
import roadMap from "../../../assets/images/roadMap.png";
import { useI18n } from "@/i18n/useI18n";

const RoadMapSection = () => {
  const { t } = useI18n();
  return (
    <div
      className={`md:w-[95%] w-[90%] mx-auto flex flex-col md:flex-row gap-10 md:gap-0 items-center justify-between`}
    >
      <div>
        <img
          className={`2xl:w-150 2xl:h-137.5 xl:w-120 xl:h-117.5 md:w-100 md:h-87.5 w-full h-auto`}
          src={roadMap}
        />
      </div>
      <div
        className={`2xl:w-4/10 md:w-6/10 w-full flex flex-col xl:gap-8 gap-5`}
      >
        <div className={`flex flex-col gap-4`}>
          <h3 className={`xl:text-4xl text-2xl font-bold text-default-black`}>
            {t("landing.roadMapSection.title")}{" "}
            <span className={`text-green-primary`}>
              {t("landing.roadMapSection.titleKeyWord")}
            </span>{" "}
            {t("landing.roadMapSection.titleLastLine")}
          </h3>
          <p
            className={`text-field-silver xl:text-base text-[14px] font-normal`}
          >
            {t("landing.roadMapSection.description")}
          </p>
        </div>
        <div className={`flex xl:gap-4 gap-2`}>
          <CircleCheck color={`#008C78`} className={`xl:size-6.5 size-5`} />
          <div className={`flex flex-col xl:gap-3.5 gap-2`}>
            <h3
              className={`text-default-black xl:text-base text-[14px] font-bold`}
            >
              {t("landing.roadMapSection.step1.title")}
            </h3>
            <p
              className={`text-field-silver xl:text-[14px] text-[12px] font-normal`}
            >
              {t("landing.roadMapSection.step1.description")}
            </p>
          </div>
        </div>
        <div className={`flex xl:gap-4 gap-2`}>
          <CircleCheck color={`#008C78`} className={`xl:size-6.5 size-5`} />
          <div className={`flex flex-col xl:gap-3.5 gap-2`}>
            <h3
              className={`text-default-black xl:text-base text-[14px] font-bold`}
            >
              {t("landing.roadMapSection.step2.title")}
            </h3>
            <p
              className={`text-field-silver xl:text-[14px] text-[12px] font-normal`}
            >
              {t("landing.roadMapSection.step2.description")}
            </p>
          </div>
        </div>
        <div className={`flex xl:gap-4 gap-2`}>
          <CircleCheck color={`#008C78`} className={`xl:size-6.5 size-5`} />
          <div className={`flex flex-col xl:gap-3.5 gap-2`}>
            <h3
              className={`text-default-black xl:text-base text-[14px] font-bold`}
            >
              {t("landing.roadMapSection.step3.title")}
            </h3>
            <p
              className={`text-field-silver xl:text-[14px] text-[12px] font-normal`}
            >
              {t("landing.roadMapSection.step3.description")}
            </p>
          </div>
        </div>
        <div className={`flex xl:gap-4 gap-2`}>
          <CircleCheck color={`#008C78`} className={`xl:size-6.5 size-5`} />
          <div className={`flex flex-col xl:gap-3.5 gap-2`}>
            <h3
              className={`text-default-black xl:text-base text-[14px] font-bold`}
            >
              {t("landing.roadMapSection.step4.title")}
            </h3>
            <p
              className={`text-field-silver xl:text-[14px] text-[12px] font-normal`}
            >
              {t("landing.roadMapSection.step4.description")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoadMapSection;
