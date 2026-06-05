import Badge from "@/components/atoms/Badge/Badge";
import imgCourseDetail from "../../../assets/images/coursePng.png";
import Button from "@/components/atoms/Buttons/Button";
import {
  ArrowLeft,
  ArrowRight,
  BadgePercent,
  ChevronLeft,
  ThumbsDown,
  ThumbsUp,
} from "lucide-react";
import Person from "@/core/icons/Person";
import CalenderIcon from "@/core/icons/CalenderIcon";
import { Rating } from "react-simple-star-rating";
import Time from "@/core/icons/Time";
import { Link, NavLink, Outlet, useParams } from "react-router-dom";
import teacherDetail1 from "../../../assets/images/teacherDetail.png";
import { useContext, useEffect, useRef, useState } from "react";
import {
  deleteCourseLike,
  postCourseDisSLike,
  postCourseLike,
  postReserveAdd,
  useGetCourseDetail,
} from "@/core/services/api/CourseDetails/CourseDetails.service";
import formatDate from "@/core/utils/formatDate";
import ImageFallback from "@/components/atoms/ImageFallBack/ImageFallBack";
import formatPrice from "@/core/utils/formatPrice";
import formatTime from "@/core/utils/formatTime";
import { toast } from "react-toastify";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import ThemeContext from "@/app/context/ThemeContext";
import useGetCourses from "@/core/services/api/hooks/useGetCourse";
import { useI18n } from "@/i18n/useI18n";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Navigation } from "swiper/modules";
import { Skeleton } from "@/components/ui/skeleton";
import Card from "@/components/molecules/Cards/Card";
import useAddFavoriteCourse from "@/core/services/api/hooks/useAddFavoriteCourses";

const menu = [
  { path: "Review", Text: " مشخصات دوره" },
  { path: "Comments", Text: "نظرات کاربران" },
];

const CourseInformation = () => {
  const queryClient = useQueryClient();
  const { id } = useParams();
  const { theme } = useContext(ThemeContext);
  const { isLoading, data: Details, refetch } = useGetCourseDetail(id);
  const { mutate: likeMutate } = useMutation({
    mutationFn: postCourseLike,
    onSuccess: (result) => {
      if (result.data.success) {
        toast.success(result.data.message);
        queryClient.invalidateQueries({ queryKey: [`courseDetail${id}`] });
      } else {
        toast.error(result.data.message);
      }
    },
  });
  const { mutate: ReserveAddMutate } = useMutation({
    mutationFn: postReserveAdd,
    onSuccess: (result) => {
      if (result.data.success) {
        toast.success(result.data.message);
        queryClient.invalidateQueries({ queryKey: [`courseDetail${id}`] });
      } else {
        toast.error(result.data.message);
      }
    },
  });
  const { mutate: deleteLikeMutate } = useMutation({
    mutationFn: deleteCourseLike,
    onSuccess: (result) => {
      if (result.data.success) {
        toast.success(result.data.message);
        queryClient.invalidateQueries({ queryKey: [`courseDetail${id}`] });
      } else {
        toast.error(result.data.message);
      }
    },
  });
  const { mutate: disLikeMutate } = useMutation({
    mutationFn: postCourseDisSLike,
    onSuccess: (result) => {
      if (result.data.success) {
        toast.success(result.data.message);
        queryClient.invalidateQueries({ queryKey: [`courseDetail${id}`] });
      } else {
        toast.error(result.data.message);
      }
    },
  });
  const handleLike = () => {
    if (Details?.data?.userIsLiked) {
      const formData = new FormData();
      formData.append("CourseLikeId", Details?.data?.userLikedId);
      deleteLikeMutate(formData);
    } else if (!Details?.data?.userIsLiked) {
      likeMutate(id);
    }
  };
  useEffect(() => {
    refetch();
  }, []);
  const { t, lang } = useI18n();
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  const skeletonCount = new Array(4).fill("");
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const { isLoading: slidersLoading, data: courses } = useGetCourses(
    "RecommendedCourses",
    {
      RowsOfPage: "100",
      TechCount: "1",
    },
  );
  return (
    <div className={`xl:w-9/10 `}>
      <div className={` flex flex-col gap-4 text-center p-8.25`}>
        <div className={`flex justify-center text-[14px] text-green-primary`}>
          <Link to={"/"}> صفحه اصلی</Link>
          <ChevronLeft className={`size-4`} color="#008C78" />
          <Link to={"/Courses"}> دوره های آموزشی </Link>
          <ChevronLeft className={`size-4`} color="#008C78" />
          <Link>دوره آموزش جامع HTML5</Link>
        </div>
        <span
          className={`text-[32px] text-default-black font-bold cursor-pointer`}
        >
          {Details?.data?.title}
        </span>
      </div>
      <div className={`flex justify-center gap-12 `}>
        <div className=" flex flex-col gap-[48px]">
          <div
            className={` xl:w-[425px] flex flex-col items-center p-3  gap-[35px] rounded-[25px] shadow-[0px_2px_5px_0px_#000000]/15 dark:shadow-[0px_2px_5px_0px_#ffffff]/15`}
          >
            <span
              className={`text-[20px] text-default-black font-bold self-start pt-4 pr-4`}
            >
              {Details?.data?.miniDescribe}
            </span>
            <div className={` border-t-2 w-[393px] flex flex-col gap-6 pt-2 `}>
              <div className={`flex justify-between `}>
                <div className={`flex gap-2.25 items-center`}>
                  <CalenderIcon
                    className={`xl:w-[20.13px] xl:h-[23px]`}
                    color={`#1E1E1E`}
                  />
                  <span className={`text-default-black `}>تاریخ شروع</span>
                </div>
                <span className={`text-field-silver`}>
                  {Details?.data?.startTime &&
                    formatDate(Details?.data?.startTime)}
                </span>
              </div>
              <div className={`flex justify-between `}>
                <div className={`flex gap-2 items-center`}>
                  <Time />
                  <span className={`text-default-black `}>ساعت شروع</span>
                </div>
                <span className={`text-field-silver`}>
                  {" "}
                  {formatTime(Details?.data?.startTime)}{" "}
                </span>
              </div>
              <div className={`flex justify-between `}>
                <div className={`flex gap-2.25 items-center`}>
                  <Time />
                  <span className={`text-default-black `}>ساعت پایان</span>
                </div>
                <span className={`text-field-silver`}>
                  {formatTime(Details?.data?.endTime)}
                </span>
              </div>
              <div className={`flex justify-between `}>
                <div className={`flex gap-2.25 items-center`}>
                  <Person color={!theme ? "#1E1E1E" : "#ffffff"} />
                  <span className={`text-default-black `}>ظرفیت دوره</span>
                </div>
                <span className={`text-field-silver`}>
                  {" "}
                  {Details?.data?.capacity} نفر
                </span>
              </div>

              <div className={`flex justify-between `}>
                <div className={`flex gap-2.25 items-center`}>
                  <BadgePercent />
                  <span className={`text-default-black `}>قیمت</span>
                </div>
                <span className={`text-green-primary text-[18px] font-bold`}>
                  {formatPrice(Details?.data?.cost)} تومان
                </span>
              </div>
              <Button
                className={`xl:w-[393px] xl:h-[64px] text-default-light text-[18px]`}
                color={`reserveBtn`}
                onClick={() =>
                  ReserveAddMutate({
                    courseId: id,
                  })
                }
              >
                {Details?.data?.isCourseReseve == false
                  ? ` همین حالا رزرو کنید`
                  : `دوره رزرو شده است`}
              </Button>
            </div>
          </div>
          <div
            className={` xl:w-[425px] xl:h-[117px] flex flex-col justify-center  gap-5 pr-4 rounded-[25px] shadow-[0px_2px_5px_0px_#000000]/15 dark:shadow-[0px_2px_5px_0px_#ffffff]/15`}
          >
            <span
              className={`text-[18px] text-default-black font-bold self-start`}
            >
              رضایت کاربران از دوره
            </span>
            <div className={`flex items-center gap-[146px]  `}>
              <div>
                {" "}
                <Rating
                  initialValue={Details?.data?.courseRate}
                  SVGstyle={{ display: "inline-block" }}
                  allowFraction={true}
                  transition={true}
                  size={35}
                />
              </div>
              <span className={`text-field-silver`}>
                {Details?.data?.courseRate} امتیاز
              </span>
            </div>
          </div>
          <div
            className={` border-2 w-[425px] h-[366px] flex flex-col gap-[48px] items-center justify-center rounded-[25px] shadow-[0px_2px_5px_0px_#000000]/15 dark:shadow-[0px_2px_5px_0px_#ffffff]/15`}
          >
            <div className={`flex flex-col gap-2`}>
              <ImageFallback
                src={Details?.data?.imageAddress}
                fallback={teacherDetail1}
              />
              <div className={`text-center`}>
                <p className={`text-field-silver`}>مدرس دوره :</p>
                <p className={`text-default-black text-[18pxs]`}>
                  {Details?.data?.teacherName}
                </p>
              </div>
            </div>
            <Button
              color={`teachersBtn`}
              className={`xl:w-[393px] xl:h-[46px]`}
            >
              مشاهده اطلاعات بیشتر
            </Button>
          </div>
        </div>

        <div className={` xl:w-5.5/10`}>
          <ImageFallback
            src={Details?.data?.imageAddress}
            fallback={imgCourseDetail}
            className={` xl:h-110.75`}
          />
          <div className={` flex justify-between pt-4 `}>
            <div
              className={`flex justify-center items-center gap-2 text-center text-field-silver`}
            >
              {Details?.data?.courseTech.map((value, index) => (
                <Badge color={"technologyBadge"} className={`xl:px-2 py-0.5`}>
                  {value?.tech?.techName}
                </Badge>
              ))}
            </div>
            <div className={`flex gap-2 text-center`}>
              <Button
                color={"likeAndDisLikeBtn"}
                className={`xl:w-20 xl:h-11 xl:flex items-center justify-center gap-2`}
                isLikeOrDislike={Details?.data?.userIsDissLike ? true : false}
              >
                {Details?.data?.dissLikeCount}
                <ThumbsDown onClick={() => disLikeMutate(id)} />
              </Button>
              <Button
                onClick={handleLike}
                color={"likeAndDisLikeBtn"}
                className={`xl:w-20.75 xl:h-11 flex items-center justify-center gap-2`}
                isLikeOrDislike={Details?.data?.userIsLiked ? true : false}
              >
                {Details?.data?.likeCount}
                <ThumbsUp />
              </Button>
            </div>
          </div>
          <div className={`flex gap-8 items-center pt-6 pb-8`}>
            {menu?.map((value, index) => (
              <NavLink
                key={index}
                to={value.path}
                className={({ isActive }) =>
                  `${isActive ? `text-default-light bg-green-primary w-[131px] h-[46px] rounded-[50px]` : `text-default-black`} text-center leading-12 `
                }
              >
                {value.Text}
              </NavLink>
            ))}
          </div>
          <Outlet />
        </div>
      </div>
      <div className="flex flex-col gap-8 w-full">
        <div className="flex items-center justify-between">
          <h3 className={`text-green-primary font-bold text-[24px]`}>
            دوره‌های مرتبط
          </h3>
          <div dir="rtl" className="flex items-center gap-1">
            <button
              ref={nextRef}
              className={`${
                isEnd ? "bg-green-primary" : "bg-transparent"
              } size-8.5 content-center rounded-full cursor-pointer transition-colors duration-200`}
            >
              <ArrowRight
                width="19"
                height="16"
                className={`mx-auto`}
                color={isEnd ? "#ffffff" : "#008C78"}
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
                color={isBeginning ? "#ffffff" : "#008C78"}
              />
            </button>
          </div>
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
              if (!slidersLoading) {
                setIsBeginning(swiper.isBeginning);
                setIsEnd(swiper.isEnd);
              }
            }}
            style={{ paddingBlock: "20px" }}
          >
            {slidersLoading
              ? skeletonCount?.map((value, index) => (
                  <SwiperSlide key={index}>
                    <div
                      dir="rtl"
                      className={`w-full p-5 flex flex-col gap-5 rounded-[20px] bg-field-silver`}
                    >
                      <Skeleton className={`h-55 w-full`} />
                      <Skeleton className={`h-7 w-5/10`} />
                      <Skeleton className={`h-14 w-7/10`} />
                      <Skeleton className={`h-7 w-full`} />
                      <Skeleton className={`h-7 w-full`} />
                    </div>
                  </SwiperSlide>
                ))
              : courses?.data?.courseFilterDtos?.map((course, index) => (
                  <SwiperSlide key={index}>
                    <Card
                      view={true}
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
                      handleAddFavoriteCourse={useAddFavoriteCourse}
                    />
                  </SwiperSlide>
                ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default CourseInformation;
