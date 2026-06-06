import services from "@/core/constants/landingServices";
import { useI18n } from "@/i18n/useI18n";

const ServicesSection = () => {
  const { t, lang } = useI18n();
  return (
    <div
      className={`md:w-[95%] w-[90%] mx-auto flex flex-col gap-8 items-center`}
    >
      <div className={`flex flex-col items-center gap-2 text-center`}>
        <h3
          className={`font-bold xl:text-[32px] md:text-[28px] text-[20px] text-green-primary`}
        >
          {t("landing.servicesSection.title")}
        </h3>
        <p
          className={`xl:text-2xl md:text-[20px] text-base font-normal text-gray-subtitle`}
        >
          {t("landing.servicesSection.description")}
        </p>
      </div>
      <div className={`grid lg:grid-cols-4 sm:grid-cols-2 gap-6 w-full`}>
        {services?.map((service, index) => (
          <div
            key={index}
            className={`text-center bg-default-light rounded-[16px] px-4.5 py-8 flex flex-col gap-3 items-center transition-all shadow-[0px_4px_4px_0px_#000000]/0 cursor-pointer hover:shadow-cards-hover`}
          >
            <div
              className={`bg-light-green rounded-[20px] xl:size-19.5 size-17 content-center`}
            >
              <service.icon className={`mx-auto size-10 xl:size-auto`} />
            </div>
            <h4
              className={`text-green-dark 2xl:text-[18px] lg:text-base text-[18px] font-bold sm:h-12 xl:h-auto`}
            >
              {lang === "en" ? service.titleEn : service.title}
            </h4>
            <p
              className={`text-default-black xl:text-base lg:text-[14px] font-normal text-center`}
            >
              {lang === "en" ? service.descriptionEn : service.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServicesSection;
