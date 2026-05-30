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
  handleAddFavoriteArticle,
}) => {
  return (
      <div
        className={`relative rounded-[20px] overflow-hidden md:h-91.5 h-80 hover:z-20`}
      >
        <ImageFallback
          src={image}
          className={`size-full transform-[scale(1.25)] hover:transform-[scale(1.1)]`}
          fallback={article}
        />
        <Link
          to={`/Articles/Detail/${articleId}`}
          className={`absolute z-10 bottom-0 right-0 bg-black/50 transition-all hover:bg-black/85 size-full cursor-pointer md:p-8 p-4 flex items-end`}
        >
          <div className={`w-full flex flex-col justify-end gap-3.5`}>
            <Badge
              color="articleBadge"
              className={`md:px-2 md:py-1 px-1.5 py-0.5 xl:text-[14px]! lg:text-[12px]! w-fit`}
            >
              {categoryName}
            </Badge>
            <h3
              className={`text-white font-bold xl:text-[20px] lg:text-base md:text-[20px] text-base sm:h-12 xl:h-auto`}
            >
              {title}
            </h3>
            <p
              className={`xl:text-base lg:text-[14px] md:text-base text-[14px] font-normal text-white line-clamp-3 h-18`}
            >
              {describe}
            </p>
            <div className={`flex justify-between items-center`}>
              <div className={`flex items-center gap-1`}>
                <EyeOpenIcon />
                <span className={`text-field-silver text-[14px] font-normal`}>
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
          onClick={() => handleAddFavoriteArticle(articleId)}
          className={`absolute z-10 right-4 top-4 content-center bg-default-light/50 md:size-10 size-8 rounded-full cursor-pointer`}
        >
          <FavoriteIcon isFavorite={false} className={`mx-auto md:size-6 size-5`} />
        </div>
      </div>
  );
};

export default ArticlesCardLanding;
