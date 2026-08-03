import TourContext from "@/app/context/TourContext";
import { useContext, useRef } from "react";

export const useTourControl = () => useContext(TourContext);

export const TourControlProvider = ({ children }) => {
  const openRef = useRef(null);

  return (
    <TourContext.Provider value={{ openRef }}>{children}</TourContext.Provider>
  );
};
