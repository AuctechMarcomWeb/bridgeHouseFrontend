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
  const featuredRef = useRef(null);
  const footerRef = useRef(null);
  const containerRef = useRef(null);
  const [popupStyle, setPopupStyle] = useState({});

  useEffect(() => {
    const handleScroll = () => {
      if (!featuredRef.current || !footerRef.current || !containerRef.current)
        return;

      const scrollY = window.scrollY;
      const featuredBottom =
        featuredRef.current.offsetTop + featuredRef.current.offsetHeight;
      const footerTop = footerRef.current.offsetTop;
      const containerTop = containerRef.current.offsetTop;
      const popupHeight = 350;

      const windowWidth = window.innerWidth;
      let topOffset = 100;
      if (windowWidth < 1024) topOffset = 80;
      if (windowWidth < 768) topOffset = 60;

      // ✅ Between featured & footer → show fixed
      if (scrollY > featuredBottom && scrollY + popupHeight < footerTop - 50) {
        setPopupStyle({
          position: "fixed",
          top: `${topOffset}px`,
          left: "20px",
          width: "250px",
          zIndex: 1000,
          opacity: 1,
          transition: "opacity 0.3s ease-in-out",
          pointerEvents: "auto",
        });
      }
      // ✅ Footer ke pass → stop above footer
      else if (scrollY + popupHeight >= footerTop - 50) {
        const stopPoint = footerTop - popupHeight - containerTop - 50;
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
      //  Before featured → hidden
      else {
        setPopupStyle({
          opacity: 0,
          pointerEvents: "none",
        });
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <div>
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
