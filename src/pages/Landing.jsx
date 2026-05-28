import RoadMapSection from "@/components/organisms/landing/RoadMapSection";
import HeroSection from "../components/organisms/landing/HeroSection";
import ServicesSection from "../components/organisms/landing/ServicesSection";
import ExperienceSection from "@/components/organisms/landing/ExperienceSection";
import CoursesSection from "@/components/organisms/landing/CoursesSection";
import TeachersSection from "@/components/organisms/landing/TeachersSection";

const Landing = () => {
  return (
    <div className={`flex flex-col items-center gap-25 pb-100`}>
      <div>
        <HeroSection />
        <ServicesSection />
      </div>
      <CoursesSection />
      <RoadMapSection />
      <TeachersSection />
      <ExperienceSection />
    </div>
  );
};

export default Landing;
