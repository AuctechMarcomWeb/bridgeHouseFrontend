/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from "react";
import { MapPin, Home, IndianRupee } from "lucide-react";
import { getRequest } from "../Helpers";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

const PropertySliderTwo = () => {
  const [properties, setProperties] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();
  const swiperRef = useRef(null);

  // ✅ Fetch only verified properties once
  useEffect(() => {
    getRequest(`properties?isVerified=true&limit=10`)
      .then((res) => {
        setProperties(res?.data?.data?.properties || []);
        console.log("✅ Verified Properties", res?.data?.data?.properties);
      })
      .catch((err) => console.log("API Error:", err));
  }, []);

  const handleClick = (id) => navigate(`/property-detail/${id}`);

  const PropertyCard = ({ property }) => (
    <div
      onClick={() => handleClick(property?._id)}
      className="w-full bg-white rounded-xl shadow-md overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer group"
    >
      <div className="relative overflow-hidden">
        {Array.isArray(property?.gallery) && property.gallery.length > 0 ? (
          <img
            src={property.gallery[0]}
            alt={property?.title || "Listing"}
            className="w-full h-48 sm:h-64 object-cover transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <div className="flex items-center justify-center w-full h-48 sm:h-64 bg-gray-100">
            <Home size={50} className="text-blue-400" />
          </div>
        )}

        {/* Property Type */}
        <div className="absolute top-3 left-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
          {property?.propertyType}
        </div>

        {/* Verified badge */}
        {property?.isVerified && (
          <div className="absolute top-3 right-3 w-10 h-10 bg-white/40 rounded-lg flex items-center justify-center">
            <img
              width="28"
              height="28"
              src="https://img.icons8.com/color/48/verified-account--v1.png"
              alt="verified"
            />
          </div>
        )}
      </div>

      <div className="p-4 sm:p-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-base sm:text-lg font-bold text-gray-800 group-hover:text-blue-600 transition-colors">
            {property?.name}
          </h3>
          <span className="text-sm sm:text-xl font-bold text-green-600">
            <IndianRupee size={18} className="inline-block" />
            {property?.actualPrice}
          </span>
        </div>

        <div className="flex items-start text-gray-600 text-sm mb-3">
          <MapPin className="w-4 h-4 mr-2 mt-0.5 text-gray-400" />
          <span className="truncate w-full" title={property?.address}>
            {property?.address}
          </span>
        </div>

        <button
          onClick={() => handleClick(property?._id)}
          className="w-full bg-[#004f8a]  text-white py-2 sm:py-3 rounded-lg sm:rounded-xl text-sm sm:text-base font-semibold transition-all duration-300 hover:bg-[#004f8a] hover:shadow-lg transform hover:-translate-y-1"
        >
          View Details
        </button>
      </div>
    </div>
  );

  return (
    <div className="w-full lg:w-[80%] xl:w-[75%] 2xl:w-[70%] mx-auto px-3 sm:px-4 lg:px-0 py-10 sm:py-14">
      {/* Heading */}
      <div className="text-center mb-8 sm:mb-12">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2 sm:mb-4">
          Verified{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
            Properties
          </span>
        </h1>
        <p className="text-sm sm:text-base text-gray-600">
          Discover your dream home from our premium collection
        </p>
      </div>

      {/* Swiper */}
      <Swiper
        modules={[Autoplay]}
        spaceBetween={20}
        slidesPerView={1.2}
        loop={true}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        onSlideChange={(swiper) => setCurrentIndex(swiper.realIndex)}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        breakpoints={{
          640: { slidesPerView: 1.5, spaceBetween: 20 },
          768: { slidesPerView: 2.2, spaceBetween: 25 },
          1024: { slidesPerView: 3, spaceBetween: 30 },
          1280: { slidesPerView: 3.5, spaceBetween: 35 },
        }}
        className="pb-10"
      >
        {properties.map((property) => (
          <SwiperSlide key={property?._id}>
            <PropertyCard property={property} />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Dot Pagination */}
      <div className="flex justify-center mt-6 sm:mt-8 space-x-2 sm:space-x-3">
        {properties.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              if (swiperRef.current) {
                swiperRef.current.slideToLoop(index);
              }
              setCurrentIndex(index);
            }}
            className={`h-2 sm:h-3 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? "bg-gradient-to-r from-blue-600 to-purple-600 w-6 sm:w-8"
                : "bg-gray-300 hover:bg-gray-400 w-2 sm:w-3"
            }`}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default PropertySliderTwo;
