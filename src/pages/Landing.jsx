import HeroSection from "../components/organisms/landing/HeroSection";
import ServicesSection from "../components/organisms/landing/ServicesSection";

const Landing = () => {
  return (
    <div className={`flex flex-col items-center gap-25`}>
      <HeroSection />
      <ServicesSection />
    </div>
  );
};

export default Landing;
