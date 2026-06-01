import Badge from "@/components/atoms/Badge/Badge";
import imgCourseDetail from "../../../assets/images/coursePng.png";
import Button from "@/components/atoms/Buttons/Button";
const CourseInformation = () => {
  return (
    <div className={`xl:w-9/10 `}>
      <div className={` border flex flex-col gap-4 text-center p-8.25`}>
        <span className={`text-[14px] text-green-primary`}>
          صفحه اصلی دوره های آموزشی دوره آموزش جامع HTML5
        </span>{" "}
        <span className={`text-[32px] text-default-black font-bold`}>
          دوره آموزش جامع HTML5
        </span>
      </div>
      <div className={`flex justify-center gap-12 `}>
        <div className={` border-2 w-[425px] h-[443px]`}></div>

        <div className={` border-2 xl:w-218.75`}>
          <img src={imgCourseDetail} className={` xl:h-110.75`} />
          <div className={` flex justify-between pt-4 `}>
            <div
              className={`flex justify-center items-center gap-2 text-center  h-6.75 text-field-silver  `}
            >
              <Badge
                className={`border border-field-silver rounded-full xl:w-15.25 h-6.75 text-[14px] `}
              >
                HTML
              </Badge>
              <Badge
                className={`border border-field-silver rounded-full xl:w-17.25 h-6.75 text-[14px]`}
              >
                فرانت اند
              </Badge>
              <Badge
                className={`border border-field-silver rounded-full xl:w-11.75 h-6.75 text-[14px]`}
              >
                W3C
              </Badge>
            </div>
            <div className={`flex gap-2 text-center`}>
              <Button className={` border w-[80px] h-[44px] rounded-full `}>
                150
              </Button>
              <Button
                className={` border w-[83px] h-[44px] bg-green-primary rounded-full `}
              >
                200
              </Button>
            </div>
          </div>
          <div className={`pt-8 flex gap-8  items-center`}>
            <Button
              className={` border w-32.75 h-11.5 bg-green-primary text-default-light rounded-[50px] text-[16px]`}
            >
              مشخصات دوره
            </Button>
            <span className={`text-default-black`}>نظرات کاربران</span>
          </div>
          <div className={` border w-10 h-10 pb-10 font-normal`}></div>
        </div>
      </div>
    </div>
  );
};

export default CourseInformation;
