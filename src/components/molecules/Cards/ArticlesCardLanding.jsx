import FavoriteIcon from "@/core/icons/FavoriteIcon";
import article from "../../../assets/images/articlePng.png";
import Badge from "@/components/atoms/Badge/Badge";
import EyeOpenIcon from "@/core/icons/EyeOpenIcon";
import StarIcon from "@/core/icons/StarIcon";
import { Link } from "react-router-dom";

const ArticlesCardLanding = () => {
  return (
    <div className={`relative rounded-[20px] overflow-hidden h-91.5`}>
      <img className={`size-full`} src={article} />
      <Link
        className={`absolute z-10 bottom-0 right-0 bg-black/50 transition-all hover:bg-black/85 size-full cursor-pointer p-8 flex items-end`}
      >
        <div className={`w-full flex flex-col justify-end gap-3.5`}>
          <Badge color="articleBadge" className={`px-2 py-1 w-fit`}>
            آموزشی
          </Badge>
          <h3 className={`text-white font-bold text-[20px]`}>
            اسکریپت چیست و چه کاربردی در برنامه‌نویسی دارد؟
          </h3>
          <p className={`text-base font-normal text-white line-clamp-3`}>
            برنامه‌های ساده و کوتاهی که برای خودکارسازی انجام برخی از وظایف
            نوشته می‌شود در دنیای برنامه نویسی اسکریپت نام دارد. برخلاف
            برنامه‌های بزرگ و پیچیده، با این ابزار اغلب به‌سرعت نوشته و اجرا
            می‌شوند و نیازی به کامپایل ندارند. اسکریپت‌ها در زمینه‌های مختلفی
            مانند وب، سیستم‌عامل‌ها، پردازش داده‌ها یا اتوماسیون وظایف کاربردی
            هستند.
          </p>
          <div className={`flex justify-between items-center`}>
            <div className={`flex items-center gap-1`}>
              <EyeOpenIcon />
              <span className={`text-field-silver text-[12px] font-normal`}>
                22
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
      </Link>
      <div
        className={`absolute z-10 right-4 top-4 content-center bg-default-light/50 size-10 rounded-full cursor-pointer`}
      >
        <FavoriteIcon isFavorite={false} className={`mx-auto`} />
      </div>
    </div>
  );
};

export default ArticlesCardLanding;
