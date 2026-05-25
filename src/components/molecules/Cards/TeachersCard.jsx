import { Link } from "react-router-dom";
import teacher from "../../../assets/images/teacherPng.png";
import LinkedinIcon from "../../../core/icons/LinkedinIcon";
import Border from "../../atoms/Border/Border";

const TeachersCard = (props) => {
  const { isFromDetail = false } = props;
  return (
    <div
      className={`border border-light-gray bg-default-light rounded-[20px] p-4 flex flex-col items-center gap-2`}
    >
      <Link className={`block h-45 ${isFromDetail ? "w-45" : "w-full"}`}>
        <img
          className={`size-full ${isFromDetail ? "rounded-full" : "rounded-[20ox]"}`}
          src={teacher}
        />
      </Link>
      <h3 className={`text-default-black text-base font-bold`}>
        دکتر محمد حسین بحرالعلومی
      </h3>
      <div className={`flex items-center gap-2 cursor-pointer`}>
        <LinkedinIcon />
        <span className={`text-green-primary font-normal text-[12px]`}>
          پروفایل لیندکین
        </span>
      </div>
      <div className={`flex items-center gap-6`}>
        <div className={`flex flex-col items-center`}>
          <span className={`text-default-black font-normal text-[14px]`}>
            3
          </span>
          <h4 className={`text-field-silver font-normal text-[14px]`}>
            دوره ها
          </h4>
        </div>
        <Border width="w-0.5" height="h-full" />
        <div className={`flex flex-col items-center`}>
          <span className={`text-default-black font-normal text-[14px]`}>
            8
          </span>
          <h4 className={`text-field-silver font-normal text-[14px]`}>
            مقالات
          </h4>
        </div>
      </div>
    </div>
  );
};

export default TeachersCard;
