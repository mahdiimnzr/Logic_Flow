import { ArrowLeft, ArrowRight, ChevronLeft } from "lucide-react";
import { useContext, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Card from "@/components/molecules/Cards/Card";
import ThemeContext from "@/app/context/ThemeContext";
import useGetCourses from "@/core/services/api/common/useGetCourse";

const CoursesSection = () => {
  const { theme } = useContext(ThemeContext);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const { isLoading, data } = useGetCourses({
    RowsOfPage: "100",
    TechCount: "1",
  });

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
              ref={nextRef}
              className={`${
                isEnd ? "bg-green-primary" : "bg-transparent"
              } size-8.5 content-center rounded-full cursor-pointer transition-colors duration-200`}
            >
              <ArrowRight
                width="19"
                height="16"
                className="mx-auto"
                color={isEnd ? (!theme ? "#ffffff" : "#1E1E1E") : "#008C78"}
              />
            </button>
            <button
              ref={prevRef}
              className={`${
                isBeginning ? "bg-green-primary" : "bg-transparent"
              } size-8.5 content-center rounded-full cursor-pointer transition-colors duration-200`}
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
        <div className="w-full">
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
              if (!isLoading) {
                setIsBeginning(swiper.isBeginning);
                setIsEnd(swiper.isEnd);
              }
            }}
            style={{ paddingBlock: "20px", paddingInline: "20px" }}
          >
            {data?.courseFilterDtos?.map((course, index) => (
              <SwiperSlide key={index}>
                <Card
                  courseId={course.courseId}
                  title={course.title}
                  describe={course.describe}
                  levelName={course.levelName}
                  teacherName={course.teacherName}
                  rate={course.courseRate.avg}
                  cost={course.cost}
                  image={course.imageAddress}
                  isCourseCard={true}
                  isFavorite={false}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default CoursesSection;
