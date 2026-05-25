import { Link } from "react-router-dom";
import course from "../../../assets/images/coursePng.png";
import CalenderIcon from "../../../core/icons/CalenderIcon";
import EyeOpenIcon from "../../../core/icons/EyeOpenIcon";
import FavoriteIcon from "../../../core/icons/FavoriteIcon";
import StarIcon from "../../../core/icons/StarIcon";
import TeachersCardIcon from "../../../core/icons/TeachersCardIcon";
import TechnologyCardIcon from "../../../core/icons/TechnologyCardIcon";
import formatPrice from "../../../core/utils/formatPrice";

const Card = (props) => {
  const { isCourseCard = false } = props;
  return (
    <div className={`rounded-[20px] relative overflow-hidden w-full`}>
      <div
        className={`absolute z-10 right-4 top-4 content-center bg-default-black/25 size-10 rounded-full cursor-pointer`}
      >
        <FavoriteIcon isFavorite={false} className={`mx-auto`} />
      </div>
      <Link className={`h-60 group content-center block`}>
        <img
          className={`transform-[scale(1.5)] size-full transition-all cursor-pointer mx-auto group-hover:transform-[scale(1.2)]`}
          src={course}
        />
      </Link>
      <div
        className={`rounded-[20px] bg-default-light flex flex-col gap-7 p-4 relative`}
      >
        {isCourseCard ? <CourseCardInformation /> : <NewsCardInformation />}
      </div>
    </div>
  );
};

const CourseCardInformation = () => {
  return (
    <>
      <div className={`flex flex-col gap-2 text-default-black`}>
        <h3 className={`text-base font-bold truncate`}>
          دوره آموزش جامع HTML5
        </h3>
        <p className={`text-[14px] font-normal h-10.5 line-clamp-2`}>
          خواه شما مبتدی باشید یا به دنبال پیشرفت در مهارت‌های برنامه‌نویسی خود
          باشید، دوره‌های آموزشی ما شما را در هر مرحله همراهی می‌کنند.
        </p>
      </div>
      <div className={`flex flex-col gap-2`}>
        <div className={`flex items-center justify-between`}>
          <div className={`flex items-center gap-1`}>
            <TeachersCardIcon />
            <span className={`text-field-silver text-[12px] font-normal`}>
              دکتر بحرالعلومی
            </span>
          </div>
          <div className={`flex items-center gap-1`}>
            <TechnologyCardIcon />
            <span className={`text-field-silver text-[12px] font-normal`}>
              پیشرفته
            </span>
          </div>
        </div>
        <div className={`flex items-center justify-between`}>
          <div className={`flex flex-col`}>
            <span className={`text-default-black font-normal text-[12px]`}>
              قیمت
            </span>
            <h3 className={`text-green-primary text-base font-bold`}>
              {formatPrice(500000)} تومان
            </h3>
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
