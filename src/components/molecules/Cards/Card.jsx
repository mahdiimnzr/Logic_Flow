import { Link } from "react-router-dom";
import course from "../../../assets/images/coursePng.png";
import CalenderIcon from "../../../core/icons/CalenderIcon";
import EyeOpenIcon from "../../../core/icons/EyeOpenIcon";
import FavoriteIcon from "../../../core/icons/FavoriteIcon";
import StarIcon from "../../../core/icons/StarIcon";
import TeachersCardIcon from "../../../core/icons/TeachersCardIcon";
import TechnologyCardIcon from "../../../core/icons/TechnologyCardIcon";
import formatPrice from "../../../core/utils/formatPrice";
import ImageFallback from "@/components/atoms/ImageFallBack/ImageFallBack";
import Tilt from "react-parallax-tilt";

const Card = (props) => {
  const {
    isCourseCard = false,
    isFavorite = false,
    courseId,
    image,
    handleAddFavoriteCourse,
    view,
  } = props;
  return (
    <Tilt tiltAxis={!view && "disable"}>
      <div
        dir="rtl"
        className={`rounded-[20px] ${view ? null : `flex items-center gap-8 p-4`} bg-default-light relative overflow-hidden w-full transition-all shadow-[0px_4px_4px_0px_#000000]/0 hover:shadow-cards-hover`}
      >
        <div
          onClick={() => handleAddFavoriteCourse(courseId)}
          className={`absolute z-10 ${view ? `right-4 top-4` : `lg:right-8 lg:top-8 top-9 right-5`} content-center bg-default-black/25 size-10 rounded-full cursor-pointer`}
        >
          <FavoriteIcon isFavorite={isFavorite} className={`mx-auto`} />
        </div>
        <Link
          to={isCourseCard ? `/Courses/Detail/${courseId}` : "/news"}
          className={`rounded-[12px] group content-center block relative ${view ? `lg:h-60 sm:h-50 h-45` : `2xl:w-4/10 lg:w-3/10 w-4/10 2xl:h-40 lg:h-50 h-35 overflow-hidden`}`}
        >
          <ImageFallback
            src={image}
            fallback={course}
            className={`${!view ? `group-hover:transform-[scale(1)]` : `group-hover:transform-[scale(1.2)]`} transform-[scale(1.5)] size-full transition-all cursor-pointer mx-auto absolute inset-0 object-cover`}
          />
        </Link>
        <div
          className={`rounded-[20px] bg-default-light flex flex-col gap-7 relative ${view ? `p-4` : `2xl:w-6/10 w-7/10`}`}
        >
          {isCourseCard ? (
            <CourseCardInformation props={props} />
          ) : (
            <NewsCardInformation props={props} />
          )}
        </div>
      </div>
    </Tilt>
  );
};

const CourseCardInformation = (props) => {
  const { title, describe, cost, levelName, teacherName, rate } = props.props;
  return (
    <>
      <div className={`flex flex-col gap-2 text-default-black`}>
        <h3 className={`text-base font-bold truncate`}>{title}</h3>
        <p className={`text-[14px] font-normal h-10.5 line-clamp-2`}>
          {describe}
        </p>
      </div>
      <div className={`flex flex-col gap-2`}>
        <div className={`flex items-center justify-between`}>
          <div className={`flex items-center gap-1`}>
            <TeachersCardIcon />
            <span className={`text-field-silver text-[12px] font-normal`}>
              {teacherName}
            </span>
          </div>
          <div className={`flex items-center gap-1`}>
            <TechnologyCardIcon />
            <span className={`text-field-silver text-[12px] font-normal`}>
              {levelName}
            </span>
          </div>
        </div>
        <div className={`flex items-center justify-between`}>
          <div className={`flex flex-col`}>
            <span className={`text-default-black font-normal text-[12px]`}>
              قیمت
            </span>
            <h3 className={`text-green-primary text-base font-bold`}>
              {cost && formatPrice(cost)} تومان
            </h3>
          </div>
          <div className={`flex items-center gap-1`}>
            <span className={`text-star-yellow text-[14px] font-normal`}>
              {rate}
            </span>
            <StarIcon />
          </div>
        </div>
      </div>
    </>
  );
};

const NewsCardInformation = () => {
  return (
    <>
      <div className={`flex flex-col gap-2 text-default-black`}>
        <h3 className={`text-base font-bold line-clamp-2 h-14`}>
          پایتون + ماینکرفت = یادگیری برنامه‌ نویسی با بازی!
        </h3>
        <p className={`text-[14px] font-normal h-10.5 line-clamp-2`}>
          برنامه‌های ساده و کوتاهی که برای خودکارسازی انجام برخی از وظایف نوشته
          می‌شود در دنیای برنامه نویسی اسکریپت نام دارد. برخلاف برنامه‌های بزرگ
          و پیچیده...
        </p>
      </div>
      <div className={`flex flex-col gap-2`}>
        <div className={`flex items-center justify-between`}>
          <div className={`flex items-center gap-1`}>
            <TechnologyCardIcon />
            <span className={`text-field-silver text-[12px] font-normal`}>
              آموزشی
            </span>
          </div>
          <div className={`flex items-center gap-1`}>
            <EyeOpenIcon />
            <span className={`text-field-silver text-[12px] font-normal`}>
              22
            </span>
          </div>
        </div>
        <div className={`flex items-center justify-between`}>
          <div className={`flex items-center gap-1`}>
            <CalenderIcon />
            <span className={`text-field-silver text-[12px] font-normal`}>
              1404/03/13
            </span>
          </div>
          <div className={`flex items-center gap-1`}>
            <span className={`text-star-yellow text-[14px] font-normal`}>
              {(3.111).toFixed(1)}
            </span>
            <StarIcon />
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;
