import FavoriteIcon from "@/core/icons/FavoriteIcon";
import article from "../../../assets/images/articlePng.png";
import Badge from "@/components/atoms/Badge/Badge";
import EyeOpenIcon from "@/core/icons/EyeOpenIcon";
import StarIcon from "@/core/icons/StarIcon";
import { Link } from "react-router-dom";
import ImageFallback from "@/components/atoms/ImageFallBack/ImageFallBack";

const ArticlesCardLanding = ({
  articleId,
  title,
  describe,
  categoryName,
  currentView,
  rate,
  image,
}) => {
  return (
    <div className={`relative rounded-[20px] overflow-hidden h-91.5`}>
      <ImageFallback src={image} className={`size-full`} fallback={article} />
      <img />
      <Link
        to={`/Articles/Detail/${articleId}`}
        className={`absolute z-10 bottom-0 right-0 bg-black/50 transition-all hover:bg-black/85 size-full cursor-pointer p-8 flex items-end`}
      >
        <div className={`w-full flex flex-col justify-end gap-3.5`}>
          <Badge color="articleBadge" className={`px-2 py-1 w-fit`}>
            {categoryName}
          </Badge>
          <h3 className={`text-white font-bold text-[20px]`}>{title}</h3>
          <p className={`text-base font-normal text-white line-clamp-3 h-18`}>
            {describe}
          </p>
          <div className={`flex justify-between items-center`}>
            <div className={`flex items-center gap-1`}>
              <EyeOpenIcon />
              <span className={`text-field-silver text-[12px] font-normal`}>
                {currentView}
              </span>
            </div>
            <div className={`flex items-center gap-1`}>
              <span className={`text-star-yellow text-[14px] font-normal`}>
                {rate?.toFixed(rate == "0" ? 0 : 1)}
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
