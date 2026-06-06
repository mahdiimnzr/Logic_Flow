import InstagramIcon from "@/core/icons/InstagramIcon";
import SearchHeader from "../Inputs/SearchHeader";
import FaceBookIcon from "@/core/icons/FaceBookIcon";
import TwitterIcon from "@/core/icons/TwitterIcon";
import TelegramIcon from "@/core/icons/TelegramIcon";
import WhatsAppIcon from "@/core/icons/WhatsAppIcon";
import { useI18n } from "@/i18n/useI18n";

const Footer = () => {
  const { t } = useI18n();
  return (
    <div
      className={`py-12 px-6 bg-green-primary rounded-t-[50px] flex flex-col gap-14`}
    >
      <div className={`flex flex-col gap-8`}>
        <div
          className={`rounded-tl-[30px] rounded-br-[30px] px-8 py-12 bg-black/30 flex flex-col md:flex-row justify-between items-center gap-10 md:gap-0`}
        >
          <h3
            className={`md:w-4/10 w-full text-white font-bold xl:text-4xl lg:text-2xl text-[20px] leading-loose`}
          >
            {t("footer.title")}
          </h3>
          <div
            className={`2xl:w-3/10 lg:w-4/10 md:w-5/10 w-full flex flex-col gap-5`}
          >
            <SearchHeader
              placeHolder={t("footer.inputPlaceHolder")}
              buttonClassName={`lg:px-5 lg:py-3 md:px-4 sm:py-2 sm:px-3 px-2 py-1.5 md:text-[14px]! text-[12px]! text-white!`}
              inputClassName={`xl:w-7/10 md:w-6/10 w-7/10`}
              color={"registerBtn"}
              className={`lg:w-80 md:w-70 sm:w-60 w-50`}
            >
              {t("footer.registerBtn")}
            </SearchHeader>
            <p className={`text-[#C8C8C8] text-[12px] font-normal`}>
              {t("footer.registerDescription")}
            </p>
          </div>
        </div>
        <div className={`grid lg:grid-cols-4 md:grid-cols-2 gap-8`}>
          <div
            className={`rounded-tl-[30px] rounded-br-[30px] px-8 py-12 bg-black/30 flex flex-col gap-6`}
          >
            <h3
              className={`text-base text-white font-bold pb-4 border-b border-green-primary`}
            >
              {t("footer.parts.firstPart.title")}
            </h3>
            <div className={`flex flex-col gap-4`}>
              <span className={`text-[14px] font-normal text-white`}>
                {t("footer.parts.firstPart.item1")}
              </span>
              <span className={`text-[14px] font-normal text-white`}>
                {t("footer.parts.firstPart.item2")}
              </span>
              <span className={`text-[14px] font-normal text-white`}>
                {t("footer.parts.firstPart.item3")}
              </span>
              <span className={`text-[14px] font-normal text-white`}>
                {t("footer.parts.firstPart.item4")}
              </span>
              <span className={`text-[14px] font-normal text-white`}>
                {t("footer.parts.firstPart.item5")}
              </span>
              <span className={`text-[14px] font-normal text-white`}>
                {t("footer.parts.firstPart.item6")}
              </span>
              <span className={`text-[14px] font-normal text-white`}>
                {t("footer.parts.firstPart.item7")}
              </span>
            </div>
          </div>
          <div
            className={`rounded-tl-[30px] rounded-br-[30px] px-8 py-12 bg-black/30 flex flex-col gap-6`}
          >
            <h3
              className={`text-base text-white font-bold pb-4 border-b border-green-primary`}
            >
              {t("footer.parts.secondPart.title")}
            </h3>
            <div className={`flex flex-col gap-4`}>
              <span className={`text-[14px] font-normal text-white`}>
                {t("footer.parts.secondPart.item1")}
              </span>
              <span className={`text-[14px] font-normal text-white`}>
                {t("footer.parts.secondPart.item2")}
              </span>
              <span className={`text-[14px] font-normal text-white`}>
                {t("footer.parts.secondPart.item3")}
              </span>
              <span className={`text-[14px] font-normal text-white`}>
                {t("footer.parts.secondPart.item4")}
              </span>
              <span className={`text-[14px] font-normal text-white`}>
                {t("footer.parts.secondPart.item5")}
              </span>
              <span className={`text-[14px] font-normal text-white`}>
                {t("footer.parts.secondPart.item6")}
              </span>
              <span className={`text-[14px] font-normal text-white`}>
                {t("footer.parts.secondPart.item7")}
              </span>
            </div>
          </div>
          <div
            className={`rounded-tl-[30px] rounded-br-[30px] px-8 py-12 bg-black/30 flex flex-col gap-6`}
          >
            <h3
              className={`text-base text-white font-bold pb-4 border-b border-green-primary`}
            >
              {t("footer.parts.thirdPart.title")}
            </h3>
            <div className={`flex flex-col gap-4`}>
              <span className={`text-[14px] font-normal text-white`}>
                {t("footer.parts.thirdPart.item1")}
              </span>
              <span className={`text-[14px] font-normal text-white`}>
                {t("footer.parts.thirdPart.item2")}
              </span>
              <span className={`text-[14px] font-normal text-white`}>
                {t("footer.parts.thirdPart.item3")}
              </span>
              <span className={`text-[14px] font-normal text-white`}>
                {t("footer.parts.thirdPart.item4")}
              </span>
              <span className={`text-[14px] font-normal text-white`}>
                {t("footer.parts.thirdPart.item5")}
              </span>
              <span className={`text-[14px] font-normal text-white`}>
                {t("footer.parts.thirdPart.item6")}
              </span>
              <span className={`text-[14px] font-normal text-white`}>
                {t("footer.parts.thirdPart.item7")}
              </span>
            </div>
          </div>
          <div
            className={`rounded-tl-[30px] rounded-br-[30px] px-8 py-12 bg-black/30 flex flex-col gap-6`}
          >
            <h3
              className={`text-base text-white font-bold pb-4 border-b border-green-primary`}
            >
              {t("footer.parts.fourthPart.title")}
            </h3>
            <div className={`flex flex-col gap-4`}>
              <span className={`text-[14px] font-normal text-white`}>
                {t("footer.parts.fourthPart.item1")}
              </span>
              <span className={`text-[14px] font-normal text-white`}>
                {t("footer.parts.fourthPart.item2")}
              </span>
              <span className={`text-[14px] font-normal text-white`}>
                {t("footer.parts.fourthPart.item3")}
              </span>
              <span className={`text-[14px] font-normal text-white`}>
                {t("footer.parts.fourthPart.item4")}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className={`flex items-center justify-between px-4`}>
        <h1 className={`text-white lg:text-[18px] text-base font-bold`}>
          {t("footer.acName")}
        </h1>
        <p
          className={`text-white lg:text-[14px] text-[12px] font-normal hidden md:block`}
        >
          {t("footer.copyRight")}
        </p>
        <div className={`flex items-center lg:gap-6 sm:gap-4 gap-2`}>
          <InstagramIcon />
          <FaceBookIcon />
          <TwitterIcon />
          <TelegramIcon />
          <WhatsAppIcon />
        </div>
      </div>
    </div>
  );
};

export default Footer;
