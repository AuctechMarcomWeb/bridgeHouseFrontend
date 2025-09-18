import React, { useEffect } from "react";
import RealEstateBanner from "../components/RealEstateBanner";
import FeaturedPropertyType from "../components/FeaturedPropertyType";
import PropertySlider from "../components/PropertySlider";
import PropertySliderTwo from "../components/PropertySliderTwo";
import PricingSection from "../components/PricingSection";
import RentalListingApp from "../components/RentalListingApp";

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
      {/* <PricingSection /> */}
    </>
  );
};

export default Home;
