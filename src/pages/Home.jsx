import React, { useRef, useEffect, useState } from "react";
import RealEstateBanner from "../components/RealEstateBanner";
import FeaturedPropertyType from "../components/FeaturedPropertyType";
import PropertySlider from "../components/PropertySlider";
import PropertySliderTwo from "../components/PropertySliderTwo";
import RentalListingApp from "../components/RentalListingApp";
import RealEstateLeftPopups from "../components/RealEstateLeftPopups";
import RealEstatePopups from "../components/RealEstatePopups";
import Footer from "../components/Footer";

const Home = () => {
  const bannerRef = useRef(null);
  const featuredRef = useRef(null); // <-- Featured Property Type section ka reference
  const containerRef = useRef(null);
  const footerRef = useRef(null);
  const [popupStyle, setPopupStyle] = useState({});

useEffect(() => {
  const handleScroll = () => {
    if (
      !bannerRef.current ||
      !featuredRef.current ||
      !containerRef.current ||
      !footerRef.current
    )
      return;

    const scrollY = window.scrollY;
    const featuredBottom =
      featuredRef.current.offsetTop + featuredRef.current.offsetHeight;
    const footerTop = footerRef.current.offsetTop;
    const containerTop = containerRef.current.offsetTop;
    const popupHeight = 250;
    const extraOffset = 60;

    //  Responsive adjustment
    const windowWidth = window.innerWidth;
    let responsiveTop = 10;
    if (windowWidth >= 1024 && windowWidth <= 1530) {
      responsiveTop = 120; // shift popup downward on medium-large screens
    }

    // Hidden before featured
    if (scrollY < featuredBottom + extraOffset) {
      setPopupStyle({
        position: "fixed",
        top: `${responsiveTop}px`,
        left: "20px",
        width: "250px",
        zIndex: 1000,
        opacity: 0,
        pointerEvents: "none",
      });
    }
    // Between featured and footer → fixed
    else if (scrollY + popupHeight + 10 < footerTop) {
      setPopupStyle({
        position: "fixed",
        top: `${responsiveTop}px`,
        left: "20px",
        width: "250px",
        zIndex: 1000,
        opacity: 1,
        pointerEvents: "auto",
        transition: "opacity 0.3s ease-in-out",
      });
    }
    // Footer ke paas → absolute
    else {
      const stopPoint = footerTop - popupHeight - containerTop;
      setPopupStyle({
        position: "absolute",
        top: `${stopPoint}px`,
        left: "20px",
        width: "250px",
        zIndex: 1000,
        opacity: 1,
        pointerEvents: "auto",
      });
    }
  };

  window.addEventListener("scroll", handleScroll, { passive: true });
  handleScroll();

  return () => window.removeEventListener("scroll", handleScroll);
}, []);

  return (
    <>
      {/* Banner */}
      <div ref={bannerRef}>
        <RealEstateBanner />
      </div>

      <main className="relative" ref={containerRef}>
        {/* Left Popup */}
        <div style={popupStyle}>
          <RealEstateLeftPopups />
        </div>

        {/* Right Popup */}
        <div style={{ ...popupStyle, left: "auto", right: "20px" }}>
          <RealEstatePopups />
        </div>

        {/* Featured Property Type */}
        <div ref={featuredRef}>
          <FeaturedPropertyType />
        </div>

        {/* Rest of the content */}
        <PropertySlider />
        <RentalListingApp />
        <PropertySliderTwo />

        {/* Footer */}
        <div ref={footerRef}>
        </div>
      </main>
    </>
  );
};

export default Home;
