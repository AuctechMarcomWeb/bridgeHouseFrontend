import { useEffect, useRef, useState } from "react";

const FloatingPopup = ({ children, side = "left", offsetTop = 20 }) => {
  const popupRef = useRef(null);
  const [translateY, setTranslateY] = useState(0);

  useEffect(() => {
    const section = document.getElementById("featured-section");
    const footer = document.getElementById("footer");
    if (!section || !footer) return;

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const footerTop = footer.offsetTop;
      const popupHeight = popupRef.current?.offsetHeight || 200;

      // Default: scroll down with page
      let newTranslate = scrollY - sectionTop + offsetTop;

      // Stop at top of section
      if (newTranslate < 0) newTranslate = 0;

      // Stop before footer
      const maxTranslate = sectionHeight - popupHeight;
      if (sectionTop + newTranslate + popupHeight > footerTop) {
        newTranslate = maxTranslate;
      }

      setTranslateY(newTranslate);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // initial
    return () => window.removeEventListener("scroll", handleScroll);
  }, [offsetTop]);

  return (
    <div
      ref={popupRef}
      className="w-60 z-50 transition-transform duration-300"
      style={{
        position: "absolute",
        top: 0,
        [side]: "20px",
        transform: `translateY(${translateY}px)`,
      }}
    >
      {children}
    </div>
  );
};

export default FloatingPopup;
