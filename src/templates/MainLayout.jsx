import { Outlet } from "react-router-dom";
import Header from "../components/molecules/Header/Header";
import Footer from "@/components/molecules/Footer/Footer";
import Border from "@/components/atoms/Border/Border";
import { ChevronsUp } from "lucide-react";
import { useEffect, useRef } from "react";

const MainLayout = () => {
  const upBtnRef = useRef(null);
  useEffect(() => {
    window.onscroll = () => {
      if (window.pageYOffset > 200) {
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
    <>
      <div
        className={`fixed flex flex-col items-center gap-2 left-5 top-7/10 z-50 bg-green-primary py-1 px-2 rounded shadow-[0px_4px_4px_0px_#000000]/15`}
      >
        <div
          ref={upBtnRef}
          onClick={() => scroll(0, 0)}
          className={`rounded-full border border-white w-10 h-0 opacity-0 mx-auto cursor-pointer content-center transition-all transform-[rotate(180deg)]`}
        >
          <ChevronsUp className={`mx-auto size-6`} color="white" />
        </div>
        <div
          className={`flex items-center gap-2 text-white md:text-base text-[12px]`}
        >
          <span className={`cursor-pointer`}>EN</span>
          <Border width="w-0.5" height="h-4" color="bg-white" />
          <span className={`cursor-pointer`}>FA</span>
        </div>
      </div>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

export default MainLayout;
