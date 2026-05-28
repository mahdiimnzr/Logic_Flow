import { ArrowLeft, ArrowRight, ChevronLeft } from "lucide-react";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Card from "@/components/molecules/Cards/Card";
import ThemeContext from "@/app/context/ThemeContext";

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

const CoursesSection = () => {
  const { theme } = useContext(ThemeContext);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  return (
    <div className="w-[95%] mx-auto flex flex-col gap-8 items-center">
      <div className="flex flex-col items-center gap-2">
        <h3 className="font-bold text-[32px] text-green-primary">
          دوره‌های آموزشی برنامه‌نویسی
        </h3>
        <p className="text-2xl font-normal text-gray-subtitle">
          دوره‌هایی برای همه: یاد بگیر، تمرین کن، پروژه بزن!
        </p>
      </div>
      <div className="flex flex-col gap-8 w-full">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <button
              className={`${
                isEnd ? "bg-green-primary" : "bg-transparent"
              } size-8.5 content-center rounded-full cursor-pointer transition-colors duration-200 nextBtn`}
            >
              <ArrowRight
                width="19"
                height="16"
                className="mx-auto"
                color={isEnd ? (!theme ? "#ffffff" : "#1E1E1E") : "#008C78"}
              />
            </button>
            <button
              className={`${
                isBeginning ? "bg-green-primary" : "bg-transparent"
              } size-8.5 content-center rounded-full cursor-pointer transition-colors duration-200 prevBtn`}
            >
              <ArrowLeft
                width="19"
                height="16"
                className="mx-auto"
                color={
                  isBeginning ? (!theme ? "#ffffff" : "#1E1E1E") : "#008C78"
                }
              />
            </button>
          </div>
          <Link to="/Courses" className="flex items-center gap-2">
            <span className="text-field-silver text-[14px] font-normal">
              مشاهده همه دوره ها
            </span>
            <ChevronLeft width="16" height="16" color="#848484" />
          </Link>
        </div>
        <div className={`w-full`}>
          <Swiper
            dir="ltr"
            modules={[Navigation]}
            navigation={{
              prevEl: ".prevBtn",
              nextEl: ".nextBtn",
            }}
            loop={false}
            spaceBetween={32}
            slidesPerView={4}
            slidesPerGroup={1}
            onSwiper={(swiper) => {
              setIsBeginning(swiper.isBeginning);
              setIsEnd(swiper.isEnd);
            }}
            onSlideChange={(swiper) => {
              setIsBeginning(swiper.isBeginning);
              setIsEnd(swiper.isEnd);
            }}
            style={{ paddingBottom: "10px", paddingInline: "10px" }}
          >
            {mockCourses.map((course) => (
              <SwiperSlide key={course.id}>
                <Card isCourseCard={true} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default CoursesSection;
