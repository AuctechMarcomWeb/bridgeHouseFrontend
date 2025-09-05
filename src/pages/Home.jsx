import React, { useEffect } from "react";
import RealEstateBanner from "../components/RealEstateBanner";
import FeaturedPropertyType from "../components/FeaturedPropertyType";
import PropertySlider from "../components/PropertySlider";
import RentalListingApp from "../components/RentalListingApp";
import PropertySliderTwo from "../components/PropertySliderTwo";
import PricingSection from "../components/PricingSection";


const Home = () => {
    useEffect(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
      
    }, []);
  return (
    <>     
     <RealEstateBanner />
      <FeaturedPropertyType />
      <PropertySlider />
      <RentalListingApp />
      <PropertySliderTwo />
      <PricingSection />
      
    </>
  );
};

export default Home;
