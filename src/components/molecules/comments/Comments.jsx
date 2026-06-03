import { FormInput, MessageCircle, ThumbsDown, ThumbsUp } from "lucide-react";
import teacherDetail2 from "../../../assets/images/teacherDetail 2.png";
import ImageFallback from "@/components/atoms/ImageFallBack/ImageFallBack";
import formatDate from "@/core/utils/formatDate";
import { useState } from "react";
import TextAreaInput from "../Inputs/TextAreaInput";

export const Comments = ({
  author,
  title,
  describe,
  pictureAddress,
  likeCount,
  disslikeCount,
  insertDate,
  handleLike,
  disLikeMutate,
  id,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`flex flex-col gap-3`}>
      <div className={`flex gap-4 pt-10`}>
        <ImageFallback src={pictureAddress} fallback={teacherDetail2} />
        <div className={`flex flex-col gap-1`}>
          {" "}
          <p className={`text-default-black font-bold`}> {author}</p>
          <p className={`text-field-silver text-[14px] `}>
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
          <MessageCircle />
          <span className={`text-[12px] text-default-black`}>بستن پاسخ ها</span>
        </div>
        <div className={`flex justify-center items-center gap-1`}>
          <ThumbsDown className={`size-5`} onClick={() => disLikeMutate(id)} />
          <span className={`text-[14px] text-default-black`}>
            {disslikeCount}
          </span>
        </div>
        <div className={`flex justify-center items-center gap-1 `}>
          <ThumbsUp className={`size-5`} onClick={() => handleLike(id)} />

          <span className={`text-[14px] text-default-black`}>{likeCount}</span>
        </div>
        <span
          className={`text-[12px] text-green-primary underline cursor-pointer `}
          onClick={() => setIsOpen(!isOpen)}
        >
          پاسخ دادن
        </span>
      </div>
      <div
        className={`flex flex-col gap-[16px] pt-6 ${isOpen ? `h-full` : `h-0 overflow-hidden transition-all`} `}
      >
        <FormInput
          isComment={true}
          name={"text"}
          type={"text"}
          placeholder={"عنوان پاسخ را بنویسید"}
          className={` border xl:h-10! lg:h-8!  `}
          errorMessageClassName={`lg:text-[14px]! text-[12px]!`}
        />

        <TextAreaInput
          name={"text"}
          type={"text"}
          placeholder={"متن دیدگاه خود را بنویسید"}
          className={`border`}
          fieldClassName={`xl:min-h-29.25! lg:h-22.25! max-h-33.25`}
        />
      </div>
    </div>
  );
};
