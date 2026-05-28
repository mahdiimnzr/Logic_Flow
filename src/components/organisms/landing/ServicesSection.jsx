import services from "@/core/constants/landingServices";

const ServicesSection = () => {
  return (
    <div className={`w-[95%] mx-auto flex flex-col gap-8 items-center`}>
      <div className={`flex flex-col items-center gap-2`}>
        <h3 className={`font-bold text-[32px] text-green-primary`}>
          با ما، در برنامه‌نویسی پیشتاز باشید.
        </h3>
        <p className={`text-2xl font-normal text-gray-subtitle`}>
          از مبتدی تا حرفه‌ای، همراه شما در مسیر برنامه‌نویسی.
        </p>
      </div>
      <div className={`grid grid-cols-4 gap-6 w-full`}>
        {services?.map((service, index) => (
          <div
            key={index}
            className={`bg-default-light rounded-[16px] px-4.5 py-8 flex flex-col gap-3 items-center transition-all shadow-[0px_4px_4px_0px_#000000]/0 cursor-pointer hover:shadow-[0px_4px_4px_0px_#000000]/25`}
          >
            <div
              className={`bg-light-green rounded-[20px] size-19.5 content-center`}
            >
              <service.icon className={`mx-auto`} />
            </div>
            <h4 className={`text-green-dark text-[18px] font-bold`}>
              {service.title}
            </h4>
            <p
              className={`text-default-black text-base font-normal text-center`}
            >
              {service.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServicesSection;
