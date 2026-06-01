import Badge from "@/components/atoms/Badge/Badge";
import imgCourseDetail from "../../../assets/images/coursePng.png";
import Button from "@/components/atoms/Buttons/Button";
import { ThumbsDown, ThumbsUp } from "lucide-react";
import Person from "@/core/icons/Person";
import CalenderIcon from "@/core/icons/CalenderIcon";
// import { Rating } from "react-simple-star-rating";
import Time from "@/core/icons/Time";
import { Link } from "react-router-dom";
const CourseInformation = () => {
  return (
    <div className={`xl:w-9/10 `}>
      <div className={` border flex flex-col gap-4 text-center p-8.25`}>
        <div className={`flex justify-center text-[14px] text-green-primary`}>
          <Link> صفحه اصلی</Link>
          <Link> دوره های آموزشی </Link>
          <Link>دوره آموزش جامع HTML5</Link>
        </div>

        <span className={`text-[32px] text-default-black font-bold`}>
          دوره آموزش جامع HTML5
        </span>
      </div>
      <div className={`flex justify-center gap-12 `}>
        <div
          className={` border-2 w-[425px] h-[443px] flex flex-col items-center  gap-[50px] rounded-[25px] shadow-[0px_2px_5px_0px_#000000]/15 dark:shadow-[0px_2px_5px_0px_#ffffff]/15`}
        >
          <span
            className={`text-[20px] text-default-black font-bold self-start pt-4 pr-4`}
          >
            دوره آموزش جامع HTML5
          </span>
          <div
            className={`border border-t-light-gray w-[393px] flex flex-col gap-6  `}
          >
            <div className={`flex justify-between `}>
              <div className={`flex gap-2.25 items-center`}>
                <CalenderIcon
                  className={`xl:w-[20.13px] xl:h-[23px]`}
                  color={`#1E1E1E`}
                />
                <span className={`text-default-black `}>تاریخ شروع</span>
              </div>
              <span className={`text-field-silver`}>1404/03/17</span>
            </div>
            <div className={`flex justify-between `}>
              <div className={`flex gap-2 items-center`}>
                <Time />
                <span className={`text-default-black `}>ساعت شروع</span>
              </div>
              <span className={`text-field-silver`}>09:30</span>
            </div>
            <div className={`flex justify-between `}>
              <div className={`flex gap-2.25 items-center`}>
                <Time />
                <span className={`text-default-black `}>ساعت پایان</span>
              </div>
              <span className={`text-field-silver`}>11:00</span>
            </div>
            <div className={`flex justify-between `}>
              <div className={`flex gap-2.25 items-center`}>
                <Person />
                <span className={`text-default-black `}>ظرفیت دوره</span>
              </div>
              <span className={`text-field-silver`}>50 نفر</span>
            </div>
            <div className={`flex justify-between `}>
              <div
                className={`w-[115px] h-[48px] bg-red-error rounded-[15px] font-bold text-default-light text-center leading-12 `}
              >
                50% تخفیف
              </div>
              <div>
                {" "}
                <div className={`flex gap-[33px]`}>
                  <span className={`text-default-black text-[14px]`}>قیمت</span>
                  <span
                    className={`text-field-silver text-[14px] line-through `}
                  >
                    500,000
                  </span>
                </div>
                <span className={`text-green-primary text-[18px] font-bold`}>
                  250,000 تومان
                </span>
              </div>
            </div>
            <Button
              className={`xl:w-[393px] xl:h-[64px] text-default-light text-[18px]`}
              color={`reserveBtn`}
            >
              همین حالا رزرو کنید
            </Button>
          </div>
          <div
            className={` border-2 xl:w-[425px] h-100 flex flex-col justify-center items-center rounded-[25px] shadow-[0px_2px_5px_0px_#000000]/15 dark:shadow-[0px_2px_5px_0px_#ffffff]/15`}
          >
            {/* <span className={`text-[18px] text-default-black font-bold `}>
              رضایت کاربران از دوره
            </span>
            <div className={`flex gap-[146px] flex `}>
              <div className={``}>
                {" "}
                <Rating
                  initialValue={3.5}
                  SVGstyle={{ display: "inline-block" }}
                  allowFraction={true}
                  transition={true}
                  size={30}
                />
              </div>
              <span className={`text-field-silver`}>3.5 امتیاز</span>
            </div> */}
          </div>
        </div>
        <div className={` border-2 xl:w-5.5/10`}>
          <img src={imgCourseDetail} className={` xl:h-110.75`} />
          <div className={` flex justify-between pt-4 `}>
            <div
              className={`flex justify-center items-center gap-2 text-center text-field-silver`}
            >
              <Badge color={"technologyBadge"} className={`xl:w-15.25 h-6.75`}>
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
              <Button
                color={"likeAndDisLikeBtn"}
                className={`xl:w-20 xl:h-11 xl:flex items-center justify-center gap-2`}
              >
                150
                <ThumbsDown />
              </Button>
              <Button
                color={"likeAndDisLikeBtn"}
                className={`xl:w-20.75 xl:h-11 flex items-center justify-center gap-2`}
                isLikeOrDislike={true}
              >
                200
                <ThumbsUp />
              </Button>
            </div>
          </div>
          <div className={`pt-8 flex gap-8  items-center`}>
            <Button color={"registerBtn"} className={`xl:w-32.75 xl:h-11.5 `}>
              مشخصات دوره
            </Button>
            <span className={`text-default-black`}>نظرات کاربران</span>
          </div>
          <div className={`flex flex-col gap-9 pt-8 `}>
            <span className={`size-4.5 font-bold text-default-black`}>
              جزئیات
            </span>
            <div className={`flex gap-[47px]`}>
              <div
                className={`xl:w-[186px] xl:h-[81px] rounded-[20px] bg-default-light flex flex-col gap-0.5 justify-center items-center`}
              >
                <span className={`text-[12px] text-field-silver`}>
                  تعداد دانشجو
                </span>
                <div className={`flex gap-2 justify-center items-center`}>
                  <Person />
                  <span className={`text-default-black`}>38 نفر</span>
                </div>
              </div>
              <div
                className={`xl:w-46.5 xl:h-20.25 rounded-[20px] bg-default-light flex flex-col gap-0.5 justify-center items-center`}
              >
                <span className={`text-[12px] text-field-silver`}>
                  مدت زمان
                </span>
                <div className={`flex gap-2 justify-center items-center`}>
                  <Person />
                  <span className={`text-default-black`}>38 نفر</span>
                </div>
              </div>
              <div
                className={`xl:w-46.5 xl:h-20.25 rounded-[20px] bg-default-light flex flex-col gap-0.5 justify-center items-center`}
              >
                <span className={`text-[12px] text-field-silver`}>
                  سطح دوره
                </span>
                <div className={`flex gap-2 justify-center items-center`}>
                  <Person />
                  <span className={`text-default-black`}>38 نفر</span>
                </div>
              </div>
              <div
                className={`xl:w-46.5 xl:h-20.25 rounded-[20px] bg-default-light flex flex-col gap-0.5 justify-center items-center`}
              >
                <span className={`text-[12px] text-field-silver`}>
                  وضعیت دوره
                </span>
                <div className={`flex gap-2 justify-center items-center`}>
                  <Person />
                  <span className={`text-default-black`}>38 نفر</span>
                </div>
              </div>
            </div>
          </div>
          <div className={`border xl:w-[887px] xl:h-[248px]  mt-10`}>
            <span className={`text-[18px] text-default-black font-bold`}>
              توضیحات
            </span>
            <p className={`text-field-silver leading-loose`}>
              لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با
              استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله
              در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد
              نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد،
              کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان
              جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای
              طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان
              فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و دشواری
              موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و زمان مورد
              نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل
              دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseInformation;
