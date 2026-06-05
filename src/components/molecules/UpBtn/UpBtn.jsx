import Border from "@/components/atoms/Border/Border";
import { useI18n } from "@/i18n/useI18n";
import { ChevronsUp } from "lucide-react";
import { useEffect, useRef } from "react";

const UpBtn = () => {
  const upBtnRef = useRef(null);
  const { lang, changeLang } = useI18n();
  useEffect(() => {
    document.onscroll = () => {
      if (window.pageYOffset > 300) {
        upBtnRef.current.style.height = "40px";
        upBtnRef.current.style.opacity = "100";
        upBtnRef.current.style.transform = "rotate(0deg)";
      } else {
        upBtnRef.current.style.height = "0px";
        upBtnRef.current.style.opacity = "0";
        upBtnRef.current.style.transform = "rotate(180deg)";
      }
    };
  });
  return (
    <div
      dir={lang === "en" ? "ltr" : "rtl"}
      className={`fixed flex flex-col items-center gap-2 ${lang === "en" ? `left-5` : `right-5`} top-7/10 z-50 bg-green-primary py-1 px-2 rounded shadow-[0px_4px_4px_0px_#000000]/15`}
    >
      <div
        ref={upBtnRef}
        onClick={() => scroll(0, 0)}
        className={`rounded-full border border-white w-10 h-0 opacity-0 mx-auto cursor-pointer content-center transition-all transform-[rotate(180deg)]`}
      >
        <ChevronsUp className={`mx-auto size-6`} color="white" />
      </div>
      <div
        onClick={() => (lang === "en" ? changeLang("fa") : changeLang("en"))}
        className={`cursor-pointer size-10 rounded-full content-center text-center text-white md:text-base text-[12px] font-bold border leading-10 border-white`}
      >
        {lang === "en" ? "EN" : "FA"}
      </div>
    </div>
  );
};

export default UpBtn;
