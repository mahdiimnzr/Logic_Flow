import { ThumbsDown, ThumbsUp } from "lucide-react";
import teacherDetail3 from "../../../assets/images/teacherDetail3.png";
import ImageFallback from "@/components/atoms/ImageFallBack/ImageFallBack";
import formatDate from "@/core/utils/formatDate";

const ReplyComment = ({
  author,
  pictureAddress,
  insertDate,
  title,
  describe,
  likeCount,
  disslikeCount,
}) => {
  return (
    <div className={`flex flex-col pr-12`}>
      <div className={`flex gap-4 `}>
        <ImageFallback src={pictureAddress} fallback={teacherDetail3} />

        <div>
          {" "}
          <p className={`text-default-black font-bold`}>{author}</p>
          <p className={`text-field-silver text-[14px] `}>
            {" "}
            {formatDate(insertDate)}
          </p>
        </div>
      </div>
      <div>
        {" "}
        <span className={`text-[14px] text-default-black`}>{title}</span>
        <p className={`text-[14px] text-field-silver leading-loose`}>
          {describe}
        </p>
      </div>
      <div className={`h-5.25 flex gap-6 cursor-pointer`}>
        <div className={`flex justify-center items-center gap-1`}>
          <ThumbsDown className={`size-5`} />
          <span className={`text-[14px] text-default-black`}>
            {disslikeCount}
          </span>
        </div>
        <div className={`flex justify-center items-center gap-1 `}>
          <ThumbsUp className={`size-5`} />
          <span className={`text-[14px] text-default-black`}>{likeCount}</span>
        </div>
        <span
          className={`text-[12px] text-green-primary underline cursor-pointer `}
        >
          پاسخ دادن
        </span>
      </div>
    </div>
  );
};

export default ReplyComment;
