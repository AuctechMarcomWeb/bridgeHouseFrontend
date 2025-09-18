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

  // Fetch banners
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
          <div className="relative rounded-3xl shadow-xl bg-white h-96">
            {/* Loader Overlay */}
            {loading && (
              <div className="absolute inset-0 flex flex-col justify-center items-center bg-white/80 z-20">
                <div className="w-12 h-12 border-4 border-t-blue-500 border-b-blue-500 border-gray-200 rounded-full animate-spin"></div>
                <p className="mt-4 text-gray-600 font-medium">
                  Loading banners...
                </p>
              </div>
            )}

            {/* Show banners when loaded */}
            {!loading && banners.length > 0
              ? banners.map((banner, index) => {
                  const property = banner?.propertyId;
                  return (
                    <div
                      key={banner?._id}
                      onClick={() => property && handleClick(property._id)}
                      className={`absolute inset-0 flex transition-all duration-700 ease-in-out ${
                        index === currentSlide
                          ? "opacity-100 translate-x-0 z-10"
                          : direction === "next"
                          ? "opacity-0 -translate-x-full"
                          : "opacity-0 translate-x-full"
                      }`}
                    >
                      {/* Left Content */}
                      <div className="w-1/2 rounded-l-2xl bg-gradient-to-br from-teal-600 via-teal-400 to-teal-200 text-white p-2 md:p-14 flex flex-col justify-center relative overflow-hidden">
                        <div className="relative z-10">
                          <h2 className="text-lg lg:text-2xl text-black font-bold mb-2 md:mb-2 leading-tight">
                            {banner?.title}
                          </h2>
                          <p className="text-white/90 text-base mb-2 md:mb-4 font-medium">
                            {property?.address || "Location not available"}
                          </p>
                          <div className="mb-2 md:mb-4">
                            <p className="text-white/90 mb-2">
                              {property
                                ? `Property Type: ${property?.propertyType}`
                                : ""}
                            </p>
                            <p className="md:text-xl font-bold">
                              {property ? `₹${property?.sellingPrice}` : ""}
                            </p>
                          </div>

                          <div className="space-y-3 md:mb-6 mb-3">
                            {property?.facilities?.map((feature, idx) => (
                              <div
                                key={idx}
                                className="flex items-start space-x-3"
                              >
                                <Check
                                  className="w-5 h-5 text-white mt-1 flex-shrink-0"
                                  strokeWidth={2.5}
                                />
                                <span className="text-white/95 text-sm leading-relaxed">
                                  {feature}
                                </span>
                              </div>
                            ))}
                          </div>

                          <button
                            onClick={() => handleClick(property?._id)}
                            className="bg-black text-white px-3 py-1 md:px-6 md:py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors duration-200 cursor-pointer"
                          >
                            See Details
                          </button>
                        </div>
                      </div>

                      {/* Right Image */}
                      <div className="w-1/2 relative">
                        <img
                          src={banner?.bannerImage}
                          alt={banner?.title}
                          className="w-full h-full object-cover rounded-r-2xl"
                        />
                      </div>
                    </div>
                  );
                })
              : !loading && (
                  <div className="absolute inset-0 flex items-center justify-center text-gray-500 font-medium">
                    No banners available
                  </div>
                )}
          </div>

          {/* Navigation Arrows */}
          {!loading && banners.length > 0 && (
            <>
              <button
                onClick={prevSlide}
                className="absolute left-1 top-1/2 transform -translate-y-1/2 bg-white shadow-lg hover:shadow-xl text-gray-600 hover:text-gray-800 rounded-full p-3 transition-all duration-200 z-20"
              >
                <ChevronLeft className="w-5 h-5" strokeWidth={2} />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-1 top-1/2 transform -translate-y-1/2 bg-white shadow-lg hover:shadow-xl text-gray-600 hover:text-gray-800 rounded-full p-3 transition-all duration-200 z-20"
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
                className={`w-2 h-2 rounded-full transition-all duration-200 ${
                  index === currentSlide ? "bg-pink-400 w-6" : "bg-gray-300"
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
