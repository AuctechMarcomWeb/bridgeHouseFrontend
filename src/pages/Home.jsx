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
    const footerTop = footerRef.current.getBoundingClientRect().top + scrollY;

    // Calculate popup height dynamically
    const popupElement = containerRef.current.querySelector("#leftPopup");
    const popupHeight = popupElement ? popupElement.offsetHeight : 350;

    const windowWidth = window.innerWidth;

    // Responsive offset from top
    let topOffset = 100;
    if (windowWidth < 1024) topOffset = 80;
    if (windowWidth < 768) topOffset = 60;
    if (windowWidth < 480) topOffset = 50;

    // When scroll between featured & footer
    if (scrollY > featuredBottom && scrollY + popupHeight < footerTop - 20) {
      setPopupStyle({
        position: "fixed",
        top: `${topOffset}px`,
        left: "20px",
        width: windowWidth < 768 ? "180px" : "250px",
        zIndex: 1000,
        opacity: 1,
        transform: "translateY(0)",
        transition: "transform 0.3s ease-out, opacity 0.3s ease-out",
        pointerEvents: "auto",
      });
    }
    // When popup reaches footer → start scrolling up smoothly
    else if (scrollY + popupHeight >= footerTop - 20) {
      const extraScroll = scrollY + popupHeight - (footerTop - 20);
      const maxTranslate = popupHeight - 40; // how much it can lift max
      const translateY = Math.min(extraScroll, maxTranslate);

      setPopupStyle({
        position: "fixed",
        top: `${topOffset}px`,
        left: "20px",
        width: windowWidth < 768 ? "180px" : "250px",
        zIndex: 1000,
        opacity: 1,
        transform: `translateY(-${translateY}px)`,
        transition: "transform 0.3s ease-out",
        pointerEvents: "auto",
      });
    }
    // Before featured section → hidden
    else {
      setPopupStyle({
        opacity: 0,
        pointerEvents: "none",
        transform: "translateY(0)",
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
  <div id="leftPopup" style={popupStyle}>
    <RealEstateLeftPopups />
  </div>

  {/* Right Popup */}
  <div
    id="rightPopup"
    style={{ ...popupStyle, left: "auto", right: "20px" }}
  >
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

  {/* Footer — ⚠️ Footer component ko ref ke andar rakho */}
  <div ref={footerRef}>
  
  </div>
</main>

    </>
  );
};

export default Home;
