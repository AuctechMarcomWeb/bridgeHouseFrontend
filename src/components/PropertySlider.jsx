/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight, Check } from "lucide-react";
import { getRequest } from "../Helpers";

const PropertySlider = () => {
  const navigate = useNavigate();
  const handleClick = (id) => {
    navigate(`/property-detail/${id}`);
  };

  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState("next");
  const [bannerType, setBannerType] = useState("top");

  useEffect(() => {
    setLoading(true);
    getRequest(`banner?bannerType=${bannerType}`)
      .then((res) => {
        setBanners(res?.data?.data?.banners || []);
        console.log("banners fetched:", res?.data?.data?.banners);
      })
      .catch((err) => console.error("Error fetching banners:", err))
      .finally(() => setLoading(false));
  }, [bannerType]);

  const nextSlide = () => {
    setDirection("next");
    setCurrentSlide((prev) => (prev + 1) % banners.length);
  };

  const prevSlide = () => {
    setDirection("prev");
    setCurrentSlide((prev) => (prev - 1 + banners.length) % banners.length);
  };

  // Auto slide
  useEffect(() => {
    if (banners.length === 0) return;
    const interval = setInterval(() => {
      setDirection("next");
      setCurrentSlide((prev) => (prev + 1) % banners.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [banners.length]);

  return (
    <div className="w-full bg-gray-100 py-8 md:py-12 relative">
      <div className="w-full lg:w-[80%] xl:w-[75%] 2xl:w-[70%] mx-auto px-4">
        {/* Section Header */}
        <div className="flex justify-center mb-3">
          <span className="h-1 w-12 bg-gradient-to-r from-purple-500 to-green-400 rounded-full"></span>
        </div>
        <div className="text-center mb-6 md:mb-10">
          <h2 className="text-xl lg:text-3xl font-bold text-gray-800">
            Top Properties and Projects - Bridge House
          </h2>
          <p className="text-gray-500 mt-2">
            Explore Our Curated Selection of Premium Properties for Unmatched
            Luxury
          </p>
        </div>

        {/* Slider */}
        <div className="relative overflow-hidden">
          <div className="relative rounded-3xl shadow-xl bg-white min-h-[400px]">
            {/* Loader */}
            {loading && (
              <div className="absolute inset-0 flex flex-col justify-center items-center bg-white/80 z-20">
                <div className="w-12 h-12 border-4 border-t-blue-500 border-b-blue-500 border-gray-200 rounded-full animate-spin"></div>
                <p className="mt-4 text-gray-600 font-medium">
                  Loading banners...
                </p>
              </div>
            )}

            {!loading && banners.length > 0 ? (
              banners.map((banner, index) => {
                const property = banner?.propertyId;
                return (
                  <div
                    key={banner?._id}
                    onClick={() => property && handleClick(property._id)}
                    className={`absolute inset-0 flex flex-col-reverse lg:flex-row transition-all duration-700 ease-in-out ${index === currentSlide
                      ? "opacity-100 translate-x-0 z-10"
                      : direction === "next"
                        ? "opacity-0 -translate-x-full"
                        : "opacity-0 translate-x-full"
                      } h-full`}
                  >
                    {/* CONTENT */}
                  <div className="w-full lg:w-1/2 flex flex-col justify-center
    p-2 sm:p-3 md:p-6 lg:p-10
    bg-gradient-to-br from-teal-600 via-teal-400 to-teal-200
    lg:rounded-tr-none h-auto
    md:min-h-[300px]  // Tablet ke liye min height
    sm:min-h-[250px]  // Small mobile ke liye min height
">
  <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl text-black font-bold mb-2 sm:mb-2 md:mb-3 leading-tight">
    {banner?.title}
  </h2>
  <p className="text-white/90 text-sm sm:text-base md:text-base mb-2 sm:mb-3 font-medium">
    {property?.address || "Location not available"}
  </p>

  {property && (
    <>
      <p className="text-white/90 text-xs sm:text-sm md:text-sm mb-1 sm:mb-2">
        Property Type: {property?.propertyType}
      </p>
      <p className="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-black mb-2 sm:mb-3">
        ₹{property?.sellingPrice}
      </p>
    </>
  )}

  <div className="space-y-1 sm:space-y-2 md:space-y-3 mb-2 sm:mb-3 md:mb-4">
    {property?.facilities?.slice(0, 4).map((feature, idx) => (
      <div key={idx} className="flex items-start space-x-1 sm:space-x-2 md:space-x-3">
        <Check className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-white mt-1 flex-shrink-0" strokeWidth={2.5} />
        <span className="text-white/95 text-xs sm:text-sm md:text-sm leading-relaxed">{feature}</span>
      </div>
    ))}
  </div>

  <button
    onClick={() => handleClick(property?._id)}
    className="bg-black text-white px-3 py-1 sm:px-4 sm:py-2 md:px-6 md:py-3 rounded-lg font-semibold hover:bg-gray-800 transition-all duration-300 self-start text-xs sm:text-sm md:text-base"
  >
    See Details
  </button>
</div>


                    {/* IMAGE */}
                    <div className="w-full lg:w-1/2 h-64 sm:h-72 md:h-80 lg:h-auto relative rounded-t-2xl lg:rounded-r-2xl lg:rounded-l-none overflow-hidden">
                      <img
                        src={banner?.bannerImage}
                        alt={banner?.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>


                );
              })
            ) : (
              !loading && (
                <div className="absolute inset-0 flex flex-col lg:flex-row  items-center justify-center text-gray-500 font-medium">
                  No banners available
                </div>
              )
            )}
          </div>

          {/* Navigation */}
          {!loading && banners.length > 0 && (
            <>
              <button
                onClick={prevSlide}
                className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white shadow-lg hover:shadow-xl text-gray-600 hover:text-gray-800 rounded-full p-3 transition-all duration-200 z-20"
              >
                <ChevronLeft className="w-5 h-5" strokeWidth={2} />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white shadow-lg hover:shadow-xl text-gray-600 hover:text-gray-800 rounded-full p-3 transition-all duration-200 z-20"
              >
                <ChevronRight className="w-5 h-5" strokeWidth={2} />
              </button>
            </>
          )}
        </div>

        {/* Indicators */}
        {!loading && banners.length > 0 && (
          <div className="flex justify-center mt-6 space-x-2">
            {banners.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-2 h-2 rounded-full transition-all duration-200 ${index === currentSlide ? "bg-pink-400 w-6" : "bg-gray-300"
                  }`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PropertySlider;
