import ContactUs from "@/components/organisms/Contact us/ContactUs";
import { useEffect } from "react";

const Contacts = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className={`md:pb-30 pb-10 md:pt-30 pt-20 w-full mx-auto`}>
      <ContactUs />
    </div>
  );
};

export default Contacts;
