import TeachersCard from "@/components/molecules/Cards/TeachersCard";
import { ArrowLeft, ArrowRight, ChevronLeft } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { useRef, useState } from "react";
import { Navigation } from "swiper/modules";
import { Link } from "react-router-dom";
import "swiper/css";
import { useI18n } from "@/i18n/useI18n";

const mockCourses = [
  {
    id: 1,
    title: "دوره React",
    level: "مقدماتی",
    price: "۲۵۰,۰۰۰",
    image: null,
  },
  {
    id: 2,
    title: "دوره Next.js",
    level: "متوسط",
    price: "۳۵۰,۰۰۰",
    image: null,
  },
  {
    id: 3,
    title: "دوره TypeScript",
    level: "پیشرفته",
    price: "۴۰۰,۰۰۰",
    image: null,
  },
  {
    id: 4,
    title: "دوره Tailwind",
    level: "مقدماتی",
    price: "۱۵۰,۰۰۰",
    image: null,
  },
  {
    id: 5,
    title: "دوره Node.js",
    level: "متوسط",
    price: "۳۰۰,۰۰۰",
    image: null,
  },
  {
    id: 6,
    title: "دوره MongoDB",
    level: "متوسط",
    price: "۲۸۰,۰۰۰",
    image: null,
  },
];

const TeachersSection = () => {
  const { t, lang } = useI18n();
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  return (
    <div className="md:w-[95%] w-[90%] mx-auto flex flex-col gap-8 items-center">
      <div className="flex flex-col items-center text-center gap-2">
        <h3 className="font-bold xl:text-[32px] md:text-[28px] text-[20px] text-green-primary">
          {t("landing.teachersSection.title")}
        </h3>
        <p className="xl:text-2xl md:text-[20px] text-base font-normal text-gray-subtitle">
          {t("landing.teachersSection.description")}
        </p>
      </div>
      <div className="flex flex-col gap-8 w-full">
        <div className="flex items-center justify-between">
          <div dir="rtl" className="flex items-center gap-1">
            <button
              ref={nextRef}
              className={`${
                isEnd ? "bg-green-primary" : "bg-transparent"
              } size-8.5 content-center rounded-full cursor-pointer transition-colors duration-200 nextBtn`}
            >
              <ArrowRight
                width="19"
                height="16"
                className="mx-auto"
                color={isEnd ? "#ffffff" : "#008C78"}
              />
            </button>
            <button
              ref={prevRef}
              className={`${
                isBeginning ? "bg-green-primary" : "bg-transparent"
              } size-8.5 content-center rounded-full cursor-pointer transition-colors duration-200 prevBtn`}
            >
              <ArrowLeft
                width="19"
                height="16"
                className="mx-auto"
                color={isBeginning ? "#ffffff" : "#008C78"}
              />
            </button>
          </div>
          <Link to="/Teachers" className="flex items-center gap-2">
            <span className="text-field-silver text-[14px] font-normal">
              {t("landing.teachersSection.moreBtn")}
            </span>
            <ChevronLeft
              width="16"
              height="16"
              color="#848484"
              className={
                lang === "en"
                  ? "transform-[rotate(180deg)]"
                  : "transform-[rotate(0deg)]"
              }
            />
          </Link>
        </div>
        <div className={`w-full`}>
          <Swiper
            dir="ltr"
            modules={[Navigation]}
            navigation={true}
            onBeforeInit={(swiper) => {
              swiper.params.navigation.prevEl = prevRef.current;
              swiper.params.navigation.nextEl = nextRef.current;
            }}
            loop={false}
            breakpoints={{
              0: { slidesPerView: 1.2, spaceBetween: 12 },
              640: { slidesPerView: 2, spaceBetween: 16 },
              1024: { slidesPerView: 3, spaceBetween: 24 },
              1280: { slidesPerView: 4, spaceBetween: 32 },
            }}
            onSlideChange={(swiper) => {
              setIsBeginning(swiper.isBeginning);
              setIsEnd(swiper.isEnd);
            }}
            onSwiper={(swiper) => {
              setIsBeginning(swiper.isBeginning);
              setIsEnd(swiper.isEnd);
            }}
            style={{ paddingBlock: "20px" }}
          >
            {mockCourses.map((teachers, index) => (
              <SwiperSlide key={index}>
                <TeachersCard
                  isCourseCard={true}
                  pictureAddress={teachers.image}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default TeachersSection;
