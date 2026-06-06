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
  deleteCourseDisLike,
  deleteCourseLike,
  postCourseDisSLike,
  postCourseLike,
  postCourseRating,
  postReserveAdd,
  useGetCourseDetail,
} from "@/core/services/api/CourseDetails/CourseDetails.service";
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
import Border from "@/components/atoms/Border/Border";
import FavoriteIcon from "@/core/icons/FavoriteIcon";
import formatHour from "@/core/utils/formatHour";
import formatDate from "@/core/utils/formatDate";

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
  const { mutate: deleteDisLikeMutate } = useMutation({
    mutationFn: deleteCourseDisLike,
    onSuccess: (result) => {
      if (result.data.success) {
        toast.success(result.data.message);
        queryClient.invalidateQueries({ queryKey: [`courseDetail${id}`] });
      } else {
        toast.error(result.data.message);
      }
    },
  });
  const { mutate: addRateForCourse } = useMutation({
    mutationFn: postCourseRating,
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
  const handleDisLike = () => {
    if (Details?.data?.userIsDissLike) {
      const formData = new FormData();
      formData.append("CourseDissLikeId", Details?.data?.userDissLikeId);
      deleteDisLikeMutate(formData);
    } else if (!Details?.data?.userIsDissLike) {
      disLikeMutate(id);
    }
  };
  const handleAddFavoriteCourse = (id) => useAddFavoriteCourse(id);
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
    <div className={`flex flex-col gap-10 items-center`}>
      <div className={`flex flex-col gap-4 items-center`}>
        <div className={`flex sm:flex-row flex-col items-center gap-1`}>
          <Link
            className={`text-[14px] font-normal text-green-primary`}
            to={"/"}
          >
            صفحه اصلی
          </Link>
          <ChevronLeft
            className={`size-4 ${lang === "en" ? "sm:transform-[rotate(180deg)] transform-[rotate(270deg)]" : "sm:transform-[rotate(0deg)] transform-[rotate(270deg)]"}`}
            color="#008C78"
          />
          <Link
            className={`text-[14px] font-normal text-green-primary`}
            to={"/Courses"}
          >
            دوره های آموزشی
          </Link>
          <ChevronLeft
            className={`size-4 ${lang === "en" ? "sm:transform-[rotate(180deg)] transform-[rotate(270deg)]" : "sm:transform-[rotate(0deg)] transform-[rotate(270deg)]"}`}
            color="#008C78"
          />
          <Link className={`text-[14px] font-normal text-green-primary`}>
            {Details?.data?.title}
          </Link>
        </div>
        <span className={`text-default-black md:text-[32px] font-bold`}>
          {Details?.data?.title}
        </span>
      </div>
      <div className={`w-full flex flex-col lg:flex-row gap-12`}>
        <div className={`xl:w-3/10 lg:w-4/10 w-full flex flex-col gap-12`}>
          <div
            className={`bg-default-light flex flex-col p-4 xl:gap-12.5 gap-8 rounded-[25px] shadow-[0px_2px_5px_0px_#000000]/15 dark:shadow-[0px_2px_5px_0px_#ffffff]/15`}
          >
            <span
              className={`xl:text-[20px] lg:text-[18px] text-default-black font-bold`}
            >
              {Details?.data?.title}
            </span>
            <div className={`flex flex-col gap-4`}>
              <Border
                width="w-full"
                height="h-0.5"
                backgroundColor="bg-light-gray"
              />
              <div className={`flex justify-between`}>
                <div className={`flex gap-2.25 items-center`}>
                  <CalenderIcon
                    className={`xl:size-6 lg:size-4`}
                    color={!theme ? "#1E1E1E" : "#ffffff"}
                  />
                  <span
                    className={`text-default-black xl:text-base text-[14px]`}
                  >
                    تاریخ شروع
                  </span>
                </div>
                <span
                  className={`text-field-silver xl:text-[14px] text-[12px]`}
                >
                  {formatDate(Details?.data?.startTime)}
                </span>
              </div>
              <div className={`flex justify-between`}>
                <div className={`flex gap-2 items-center`}>
                  <Time
                    color={!theme ? "#1E1E1E" : "#ffffff"}
                    className={`xl:size-6 lg:size-4`}
                  />
                  <span
                    className={`text-default-black xl:text-base text-[14px]`}
                  >
                    ساعت شروع
                  </span>
                </div>
                <span
                  className={`text-field-silver xl:text-[14px] text-[12px]`}
                >
                  {formatHour(Details?.data?.startTime)}
                </span>
              </div>
              <div className={`flex justify-between`}>
                <div className={`flex gap-2.25 items-center`}>
                  <Time
                    color={!theme ? "#1E1E1E" : "#ffffff"}
                    className={`xl:size-6 lg:size-4`}
                  />
                  <span
                    className={`text-default-black xl:text-base text-[14px]`}
                  >
                    ساعت پایان
                  </span>
                </div>
                <span
                  className={`text-field-silver xl:text-[14px] text-[12px]`}
                >
                  {formatHour(Details?.data?.endTime)}
                </span>
              </div>
              <div className={`flex justify-between`}>
                <div className={`flex gap-2.25 items-center`}>
                  <Person
                    color={!theme ? "#1E1E1E" : "#ffffff"}
                    className={`xl:size-6 lg:size-4`}
                  />
                  <span
                    className={`text-default-black xl:text-base text-[14px]`}
                  >
                    ظرفیت دوره
                  </span>
                </div>
                <span
                  className={`text-field-silver xl:text-[14px] text-[12px]`}
                >
                  {Details?.data?.capacity} نفر
                </span>
              </div>
              <div className={`flex justify-between`}>
                <div className={`flex gap-2.25 items-center`}>
                  <BadgePercent
                    color={!theme ? "#1E1E1E" : "#ffffff"}
                    className={`xl:size-6 lg:size-4`}
                  />
                  <span
                    className={`text-default-black xl:text-base text-[14px]`}
                  >
                    قیمت
                  </span>
                </div>
                <span
                  className={`text-green-primary xl:text-[18px] text-base font-bold`}
                >
                  {formatPrice(Details?.data?.cost)} تومان
                </span>
              </div>
              <Button
                className={`xl:h-16 h-12 xl:text-base! text-[14px]! xl:rounded-[20px]! rounded-[15px]!`}
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
            className={`bg-default-light flex flex-col gap-5 p-4 rounded-[25px] shadow-[0px_2px_5px_0px_#000000]/15 dark:shadow-[0px_2px_5px_0px_#ffffff]/15`}
          >
            <span
              className={`xl:text-[18px] lg:text-base text-default-black font-bold`}
            >
              رضایت کاربران از دوره
            </span>
            <div className={`flex items-center justify-between`}>
              <div>
                <Rating
                  initialValue={Details?.data?.courseRate}
                  SVGstyle={{ display: "inline-block" }}
                  allowFraction={true}
                  transition={true}
                  SVGclassName={`xl:size-9 size-7`}
                  onClick={(event) => {
                    addRateForCourse({ courseId: id, rateNumber: event });
                  }}
                />
              </div>
              <span
                className={`text-field-silver xl:text-base text-[14px] font-normal`}
              >
                {Details?.data?.courseRate} امتیاز
              </span>
            </div>
          </div>
          <div
            className={`bg-default-light flex flex-col xl:gap-12 gap-6 p-4 items-center justify-center rounded-[25px] shadow-[0px_2px_5px_0px_#000000]/15 dark:shadow-[0px_2px_5px_0px_#ffffff]/15`}
          >
            <div className={`flex flex-col gap-2`}>
              <ImageFallback
                src={Details?.data?.imageAddress}
                fallback={teacherDetail1}
                className={`2xl:size-68 size-42 rounded-full`}
              />
              <div className={`text-center`}>
                <p
                  className={`text-field-silver xl:text-base text-[14px] font-normal`}
                >
                  مدرس دوره :
                </p>
                <p
                  className={`xl:text-[18px] text-base font-bold text-default-black`}
                >
                  {Details?.data?.teacherName}
                </p>
              </div>
            </div>
            <Button
              color={`teachersBtn`}
              className={`h-11.5! w-full! xl:rounded-[20px]! rounded-[15px]! xl:text-base! text-[14px]!`}
            >
              مشاهده اطلاعات بیشتر
            </Button>
          </div>
        </div>
        <div className={`xl:w-7/10 lg:w-6/10 w-full flex flex-col gap-10`}>
          <div className={`flex flex-col gap-4`}>
            <div className={`relative`}>
              <div
                onClick={() => handleAddFavoriteCourse(id)}
                className={`content-center bg-default-black/25 size-10 rounded-full cursor-pointer absolute right-4 top-4`}
              >
                <FavoriteIcon
                  className={`mx-auto`}
                  isFavorite={Details?.data?.isUserFavorite}
                />
              </div>
              <ImageFallback
                src={Details?.data?.imageAddress}
                fallback={imgCourseDetail}
                className={`w-full xl:h-110 sm:h-90 h-60 sm:rounded-[25px] rounded-[20px]`}
              />
            </div>
            <div
              className={`flex sm:flex-row flex-col sm:items-center gap-5 sm:gap-0 justify-between`}
            >
              <div
                className={`flex sm:justify-center justify-start items-center gap-2`}
              >
                {Details?.data?.courseTech.map((value, index) => (
                  <Badge
                    key={index}
                    color={"technologyBadge"}
                    className={`px-2 xl:py-0.5 py-1`}
                  >
                    {value?.tech?.techName}
                  </Badge>
                ))}
              </div>
              <div className={`flex gap-2 text-center`}>
                <Button
                  onClick={handleDisLike}
                  color={"likeAndDisLikeBtn"}
                  className={`xl:w-21 w-18 xl:h-11 h-10 flex items-center justify-center gap-2 cursor-pointer`}
                  isLikeOrDislike={Details?.data?.userIsDissLike ? true : false}
                >
                  {Details?.data?.dissLikeCount}
                  <ThumbsDown className={`xl:size-6 size-5`} />
                </Button>
                <Button
                  onClick={handleLike}
                  color={"likeAndDisLikeBtn"}
                  className={`xl:w-21 w-18 xl:h-11 h-10 flex items-center justify-center gap-2 cursor-pointer`}
                  isLikeOrDislike={Details?.data?.userIsLiked ? true : false}
                >
                  {Details?.data?.likeCount}
                  <ThumbsUp className={`xl:size-6 size-5`} />
                </Button>
              </div>
            </div>
          </div>
          <div className={`flex gap-4 items-center`}>
            {menu?.map((value, index) => (
              <NavLink
                key={index}
                to={value.path}
                className={({ isActive }) =>
                  `${isActive ? `text-default-light xl:text-base text-[14px] bg-green-primary xl:px-4 xl:py-3 px-3 py-2 rounded-[50px]` : `text-default-black`} text-center`
                }
              >
                {value.Text}
              </NavLink>
            ))}
          </div>
          <Outlet />
        </div>
      </div>
      <div className="flex flex-col gap-8 w-full py-12">
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
