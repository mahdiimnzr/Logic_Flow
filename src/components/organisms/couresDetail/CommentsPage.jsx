import FormInput from "@/components/molecules/Inputs/FormInput";
import TextAreaInput from "@/components/molecules/Inputs/TextAreaInput";
import { Form, Formik } from "formik";
import teacherDetail2 from "../../../assets/images/teacherDetail 2.png";
import teacherDetail3 from "../../../assets/images/teacherDetail3.png";
import teacherDetail4 from "../../../assets/images/teacherDetail4.png";
import { MessageCircle, ThumbsDown, ThumbsUp } from "lucide-react";

const CommentsPage = () => {
  return (
    <Formik>
      <div
        className={` w-[877px] p-4 flex flex-col rounded-[25px] shadow-[0px_2px_5px_0px_#000000]/15 dark:shadow-[0px_2px_5px_0px_#ffffff]/15`}
      >
        <div className={`flex gap-2`}>
          <span className={``}>همه ی نظرات</span>
          <div className={` size-[22px] rounded-full bg-light-gray`}></div>
        </div>
        <Form>
          <div className={`flex flex-col gap-[16px] pt-6`}>
            <span className={`font-bold`}>عنوان دیدگاه</span>
            <FormInput
              isComment={true}
              name={"text"}
              type={"text"}
              placeholder={"عنوان دیدگاه خود را بنویسید"}
              className={` border xl:h-15! lg:h-13! md:h-11! sm:h-13! h-11! `}
              errorMessageClassName={`lg:text-[14px]! text-[12px]!`}
            />
            <span className={`font-bold`}>متن دیدگاه</span>
            <TextAreaInput
              name={"text"}
              type={"text"}
              placeholder={"متن دیدگاه خود را بنویسید"}
              className={` border xl:min-h-51! lg:min-h-48! max-h-51 `}
            />
          </div>
          <div className={`flex flex-col gap-3`}>
            <div className={`flex gap-4 pt-10`}>
              <img src={teacherDetail2} />
              <div>
                {" "}
                <p className={`text-default-black font-bold`}>ادوارد جانسون</p>
                <p className={`text-field-silver text-[14px] `}>
                  14 خرداد 1404
                </p>
              </div>
            </div>
            <div>
              {" "}
              <span className={`text-[14px] text-default-black`}>
                دوره بسیار عالی
              </span>
              <p className={`text-[14px] text-field-silver leading-loose`}>
                لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با
                استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله
                در ستون و سطرآنچنان که لازم است
              </p>
            </div>
            <div className={`h-5.25 flex gap-6 cursor-pointer`}>
              <div className={`flex justify-center items-center gap-1`}>
                <MessageCircle />
                <span className={`text-[12px] text-default-black`}>
                  بستن پاسخ ها
                </span>
              </div>
              <div className={`flex justify-center items-center gap-1`}>
                <ThumbsDown className={`size-5`} />
                <span className={`text-[14px] text-default-black`}>200</span>
              </div>
              <div className={`flex justify-center items-center gap-1 `}>
                <ThumbsUp className={`size-5`} />
                <span className={`text-[14px] text-default-black`}>200</span>
              </div>
              <span
                className={`text-[12px] text-green-primary underline cursor-pointer `}
              >
                پاسخ دادن
              </span>
            </div>
            <div className={`flex flex-col gap-[16px] pt-6`}>
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
                className={` border xl:h-29.25! lg:h-22.25!  `}
              />
            </div>
          </div>
        </Form>
        <div className={`flex flex-col gap-5 `}>
          <div className={`pr-16s`}>
            <div className={`flex flex-col gap-3`}>
              <div className={`flex gap-4 pt-10`}>
                <img src={teacherDetail3} />
                <div>
                  {" "}
                  <p className={`text-default-black font-bold`}>دیوید</p>
                  <p className={`text-field-silver text-[14px] `}>
                    14 خرداد 1404
                  </p>
                </div>
              </div>
              <div>
                {" "}
                <span className={`text-[14px] text-default-black`}>
                  دوره بسیار عالی
                </span>
                <p className={`text-[14px] text-field-silver leading-loose`}>
                  لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و
                  با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و
                  مجله در ستون و سطرآنچنان که لازم است
                </p>
              </div>
              <div className={`h-5.25 flex gap-6 cursor-pointer`}>
                <div className={`flex justify-center items-center gap-1`}>
                  <ThumbsDown className={`size-5`} />
                  <span className={`text-[14px] text-default-black`}>200</span>
                </div>
                <div className={`flex justify-center items-center gap-1 `}>
                  <ThumbsUp className={`size-5`} />
                  <span className={`text-[14px] text-default-black`}>200</span>
                </div>
                <span
                  className={`text-[12px] text-green-primary underline cursor-pointer `}
                >
                  پاسخ دادن
                </span>
              </div>
            </div>
            <div className={`flex flex-col gap-3`}>
              <div className={`flex gap-4 pt-2`}>
                <img src={teacherDetail3} />
                <div>
                  {" "}
                  <p className={`text-default-black font-bold`}>دیوید</p>
                  <p className={`text-field-silver text-[14px] `}>
                    14 خرداد 1404
                  </p>
                </div>
              </div>
              <div>
                {" "}
                <span className={`text-[14px] text-default-black`}>
                  دوره بسیار عالی
                </span>
                <p className={`text-[14px] text-field-silver leading-loose`}>
                  لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و
                  با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و
                  مجله در ستون و سطرآنچنان که لازم است
                </p>
              </div>
              <div className={`h-5.25 flex gap-6 cursor-pointer`}>
                <div className={`flex justify-center items-center gap-1`}>
                  <ThumbsDown className={`size-5`} />
                  <span className={`text-[14px] text-default-black`}>200</span>
                </div>
                <div className={`flex justify-center items-center gap-1 `}>
                  <ThumbsUp className={`size-5`} />
                  <span className={`text-[14px] text-default-black`}>200</span>
                </div>
                <span
                  className={`text-[12px] text-green-primary underline cursor-pointer `}
                >
                  پاسخ دادن
                </span>
              </div>
            </div>
          </div>

          <div className={`flex flex-col  p-4 gap-3 border-t-2`}>
            <div className={`flex gap-4 `}>
              <img src={teacherDetail4} />
              <div>
                {" "}
                <p className={`text-default-black font-bold`}>تایلر بیتون</p>
                <p className={`text-field-silver text-[14px] `}>
                  14 خرداد 1404
                </p>
              </div>
            </div>
            <div>
              {" "}
              <span className={`text-[14px] text-default-black`}>
                دوره بسیار عالی
              </span>
              <p className={`text-[14px] text-field-silver leading-loose`}>
                لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با
                استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله
                در ستون و سطرآنچنان که لازم است
              </p>
            </div>
            <div className={`h-5.25 flex gap-6 cursor-pointer`}>
              <div className={`flex justify-center items-center gap-1`}>
                <MessageCircle />
                <span className={`text-[12px] text-default-black`}>1 پاسخ</span>
              </div>
              <div className={`flex justify-center items-center gap-1`}>
                <ThumbsDown className={`size-5`} />
                <span className={`text-[14px] text-default-black`}>200</span>
              </div>
              <div className={`flex justify-center items-center gap-1 `}>
                <ThumbsUp className={`size-5`} />
                <span className={`text-[14px] text-default-black`}>200</span>
              </div>
              <span
                className={`text-[12px] text-green-primary underline cursor-pointer `}
              >
                پاسخ دادن
              </span>
            </div>
          </div>
          <div className={`flex flex-col  p-4 gap-3 border-t-2`}>
            <div className={`flex gap-4 `}>
              <img src={teacherDetail2} />
              <div>
                {" "}
                <p className={`text-default-black font-bold`}>ادوارد جانسون</p>
                <p className={`text-field-silver text-[14px] `}>
                  14 خرداد 1404
                </p>
              </div>
            </div>
            <div>
              {" "}
              <span className={`text-[14px] text-default-black`}>
                دوره بسیار عالی
              </span>
              <p className={`text-[14px] text-field-silver leading-loose`}>
                لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با
                استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله
                در ستون و سطرآنچنان که لازم است
              </p>
            </div>
            <div className={`h-5.25 flex gap-6 cursor-pointer`}>
              <div className={`flex justify-center items-center gap-1`}>
                <MessageCircle />
                <span className={`text-[12px] text-default-black`}>1 پاسخ</span>
              </div>
              <div className={`flex justify-center items-center gap-1`}>
                <ThumbsDown className={`size-5`} />
                <span className={`text-[14px] text-default-black`}>200</span>
              </div>
              <div className={`flex justify-center items-center gap-1 `}>
                <ThumbsUp className={`size-5`} />
                <span className={`text-[14px] text-default-black`}>200</span>
              </div>
              <span
                className={`text-[12px] text-green-primary underline cursor-pointer `}
              >
                پاسخ دادن
              </span>
            </div>
          </div>
        </div>
      </div>
    </Formik>
  );
};

export default CommentsPage;
