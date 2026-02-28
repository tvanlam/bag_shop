import React from "react";
import HeroSection from "../../component/user/HeroSection";
import AboutSection from "../../component/user/AboutSection";
import ServicesSection from "../../component/user/ServicesSection";
import Category from "../../component/user/Category";
import Testimonial from "../../component/user/testimonial";
import LazySection from "../../component/utils/LazySection";

const HomePage = () => {
  return (
    <div>
      <HeroSection />
      <LazySection minHeight="300px">
        <AboutSection />
      </LazySection>
      <LazySection minHeight="300px">
        <ServicesSection />
      </LazySection>
      <LazySection minHeight="400px">
        <Category />
      </LazySection>
      <LazySection minHeight="300px">
        <Testimonial />
      </LazySection>
    </div>
  );
};

export default HomePage;
