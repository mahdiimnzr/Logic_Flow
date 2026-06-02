import FormInput from "@/components/molecules/Inputs/FormInput";
import TextAreaInput from "@/components/molecules/Inputs/TextAreaInput";
import { Form, Formik } from "formik";
import teacherDetail2 from "../../../assets/images/teacherDetail 2.png";

const CommentsPage = () => {
  return (
    <Formik>
      <div
        className={` w-[877px] h-[1731px] p-4 flex flex-col rounded-[25px] shadow-[0px_2px_5px_0px_#000000]/15 dark:shadow-[0px_2px_5px_0px_#ffffff]/15`}
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
              className={` border xl:h-51! lg:h-48!  `}
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
            <div className={`border w-80 h-5.25`}></div>
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
      </div>
    </Formik>
  );
};

export default CommentsPage;
