import React from "react";
import HeroSection from "../../component/user/HeroSection";
import AboutSection from "../../component/user/AboutSection";
import ServicesSection from "../../component/user/ServicesSection";
import Category from "../../component/user/Category";
import Testimonial from "../../component/user/testimonial";

const HomePage = () => {
  return (
    <div>
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <Category />
      <Testimonial />
    </div>
  );
};

export default HomePage;
