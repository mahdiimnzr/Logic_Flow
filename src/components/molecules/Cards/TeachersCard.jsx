import { Link } from "react-router-dom";
import teacher from "../../../assets/images/teacherPng.png";
import LinkedinIcon from "../../../core/icons/LinkedinIcon";
import Border from "../../atoms/Border/Border";
import Tilt from "react-parallax-tilt";
import ImageFallback from "@/components/atoms/ImageFallBack/ImageFallBack";

const TeachersCard = (props) => {
  const {
    isFromDetail = false,
    pictureAddress,
    fullName,
    courseCounts,
    teacherId,
    linkdinProfileLink,
  } = props;
  return (
    <Tilt>
      <div
        dir="rtl"
        className={`border border-light-gray bg-default-light rounded-[20px] p-4 flex flex-col items-center gap-2 transition-all shadow-[0px_4px_4px_0px_#000000]/0 hover:shadow-cards-hover`}
      >
        <Link
          to={`/Teachers/Detail/${teacherId}`}
          className={`block 2xl:h-45 xl:h-35 sm:h-45 h-35 ${isFromDetail ? "w-45" : "w-full"}`}
        >
          <ImageFallback
            src={pictureAddress}
            fallback={teacher}
            className={`size-full ${isFromDetail ? "rounded-full" : "rounded-[20ox]"}`}
          />
        </Link>
        <h3 className={`text-default-black sm:text-base text-[14px] font-bold`}>
          {fullName}
        </h3>
        <Link
          to={linkdinProfileLink}
          className={`flex items-center gap-2 cursor-pointer`}
        >
          <LinkedinIcon />
          <span className={`text-green-primary font-normal text-[12px]`}>
            پروفایل لیندکین
          </span>
        </Link>
        <div className={`flex items-center justify-center w-full gap-6`}>
          <div className={`flex flex-col items-center`}>
            <span className={`text-default-black font-normal text-[14px]`}>
              {courseCounts}
            </span>
            <h4 className={`text-field-silver font-normal text-[14px]`}>
              دوره ها
            </h4>
          </div>
          <Border width="w-0.5" height="h-12.5" />
          <div className={`flex flex-col items-center`}>
            <span className={`text-default-black font-normal text-[14px]`}>
              {courseCounts}
            </span>
            <h4 className={`text-field-silver font-normal text-[14px]`}>
              مقالات
            </h4>
          </div>
        </div>
      </div>
    </Tilt>
  );
};

export default TeachersCard;
