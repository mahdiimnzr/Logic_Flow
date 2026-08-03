import { useRef } from "react";
import { useLocation } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const PageTransition = ({ children }) => {
  const container = useRef();
  const location = useLocation();

  useGSAP(
    () => {
      gsap.fromTo(
        container.current,
        {
          y: 60,
          opacity: 0,
          scale: 0.98,
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.6,
          ease: "power4.out",
        },
      );
    },
    {
      dependencies: [location.pathname],
      scope: container,
    },
  );

  return <div ref={container}>{children}</div>;
};

export default PageTransition;
