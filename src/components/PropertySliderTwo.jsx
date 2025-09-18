import React, { useEffect, useRef, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  MapPin,
  Bed,
  Bath,
  Square,
  Heart,
  Home,
  Car,
  Building2,
  Zap,
  Droplet,
  Wrench,
  Star,
  IndianRupee,
} from "lucide-react";
import { getRequest } from "../Helpers";
import { Navigate, useNavigate } from "react-router-dom";

const PropertySliderTwo = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollRef = useRef(null);
  const animationRef = useRef(null);
  const [isScrolling, setIsScrolling] = useState(true);
  const timeoutRef = useRef(null);
  const [properties, setproperties] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fiters, setFiters] = useState({
    page: 1,
    limit: 10,
    search: "",
    sortBy: "recent",
    isPagination: true,
    isVerified: true,
  });
  const navigate = useNavigate();

  useEffect(() => {
    const { page, limit, search, sortBy, isPagination, isVerified } = fiters;
    const queryParams = new URLSearchParams({
      page,
      limit,
      search,
      sortBy,
      isPagination,
      isVerified,
    }).toString();

    setLoading(true);
    getRequest(`properties?${queryParams}`)
      .then((res) => {
        setproperties(res?.data?.data?.properties || []);
        console.log("Property Lists Res", res?.data?.data || []);
      })
      .catch((err) => console.log("Api Error", err))
      .finally(() => setLoading(false));
  }, [fiters]);

  const iconMap = {
    // Facilities
    Parking: Car,
    Lift: Building2,
    "Power Backup": Zap,

    // Services
    "Water Supply": Droplet,
    Maintenance: Wrench,
  };

  // const properties = [
  //   {
  //     id: 1,
  //     image:
  //       "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80",
  //     title: "Modern Luxury Villa",
  //     price: "₹850,000",
  //     location: "Beverly Hills, CA",
  //     beds: 4,
  //     baths: 3,
  //     area: "2,500 sq ft",
  //     type: "Villa",
  //   },
  //   {
  //     id: 2,
  //     image:
  //       "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80",
  //     title: "Downtown Penthouse",
  //     price: "₹1,200,000",
  //     location: "Manhattan, NY",
  //     beds: 3,
  //     baths: 2,
  //     area: "1,800 sq ft",
  //     type: "Penthouse",
  //   },
  //   {
  //     id: 3,
  //     image:
  //       "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=800&q=80",
  //     title: "Cozy Family Home",
  //     price: "₹450,000",
  //     location: "Austin, TX",
  //     beds: 3,
  //     baths: 2,
  //     area: "1,600 sq ft",
  //     type: "House",
  //   },
  //   {
  //     id: 4,
  //     image:
  //       "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
  //     title: "Oceanfront Condo",
  //     price: "₹750,000",
  //     location: "Miami Beach, FL",
  //     beds: 2,
  //     baths: 2,
  //     area: "1,200 sq ft",
  //     type: "Condo",
  //   },
  //   {
  //     id: 5,
  //     image:
  //       "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=800&q=80",
  //     title: "Mountain Retreat",
  //     price: "₹680,000",
  //     location: "Aspen, CO",
  //     beds: 3,
  //     baths: 3,
  //     area: "2,200 sq ft",
  //     type: "Cabin",
  //   },
  // ];

  const maxIndex = properties.length - 1;

  const scroll = () => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer || !isScrolling) {
      if (isScrolling) {
        animationRef.current = requestAnimationFrame(scroll);
      }
      return;
    }

    scrollContainer.scrollLeft += 0.5;
    if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth / 2) {
      scrollContainer.scrollLeft = 0;
    }

    animationRef.current = requestAnimationFrame(scroll);
  };

  useEffect(() => {
    if (isScrolling) {
      scroll();
    } else {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isScrolling]);

  const stopScrolling = () => {
    setIsScrolling(false);
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
    // Clear any existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  const resumeScrolling = () => {
    // Clear any existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Resume scrolling after a delay
    timeoutRef.current = setTimeout(() => {
      setIsScrolling(true);
    }, 3000); // Resume after 3 seconds
  };

  const handleScrollLeft = () => {
    stopScrolling();
    const scrollContainer = scrollRef.current;
    if (scrollContainer) {
      scrollContainer.scrollBy({
        left: -320, // Card width + margin
        behavior: "smooth",
      });
    }
    resumeScrolling();
  };

  const handleScrollRight = () => {
    stopScrolling();
    const scrollContainer = scrollRef.current;
    if (scrollContainer) {
      scrollContainer.scrollBy({
        left: 320, // Card width + margin
        behavior: "smooth",
      });
    }
    resumeScrolling();
  };

  const handleDotClick = (index) => {
    stopScrolling();
    const scrollContainer = scrollRef.current;
    if (scrollContainer) {
      const cardWidth = 320; // Approximate card width including margins
      scrollContainer.scrollTo({
        left: index * cardWidth,
        behavior: "smooth",
      });
    }
    setCurrentIndex(index);
    resumeScrolling();
  };
  const handleClick = (id) => {
    navigate(`/property-detail/${id}`);
  };

  const PropertyCard = ({ property }) => (
    <div
      onClick={() => handleClick(property?._id)}
      className="w-full sm:w-sm md:w-md lg:max-w-lg bg-white rounded-xl shadow-md overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl group"
    >
      <div className="relative overflow-hidden">
        {Array.isArray(property?.gallery) && property.gallery.length > 0 ? (
          <>
            <img
              src={property?.gallery[0]}
              alt={`${property?.title || "Listing"} image`}
              className="w-full h-48 sm:h-64 object-cover transition-transform duration-500 group-hover:scale-110"
              onError={(e) => {
                // Fallback if image fails to load
                e.target.style.display = "none";
                e.target.nextElementSibling.style.display = "flex";
              }}
            />
            {/* Hidden fallback that shows if image fails to load */}
            <div className="hidden absolute inset-0 items-center justify-center">
              <Home size={50} className="text-blue-400" />
            </div>
            <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
          </>
        ) : (
          <>
            {/* Default fallback when no gallery images */}
            <Home
              size={50}
              className="text-blue-400 transition-transform duration-300 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
          </>
        )}
        <div className="absolute top-2 sm:top-4 left-2 sm:left-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-semibold">
          {property?.propertyType}
        </div>
        {/* <button className="absolute top-2 sm:top-4 right-2 sm:right-4 p-1.5 sm:p-2 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white group-hover:text-red-500 transition-colors">
          <Heart size={16} className="sm:w-[18px]" />
        </button> */}

        {/* Verified Badge */}
        {property?.isVerified && (
          <div className="absolute top-4 right-4 w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
            <div className="w-6 h-6 bg-white/80 rounded">
              <img
                width="48"
                height="48"
                src="https://img.icons8.com/color/48/verified-account--v1.png"
                alt="verified-account"
              />
            </div>
          </div>
        )}
      </div>

      <div className="p-4 sm:p-6">
        <div className="flex justify-between items-start mb-2 sm:mb-3">
          <h3 className="text-base sm:text-lg font-bold text-gray-800 group-hover:text-blue-600 transition-colors">
            {property?.name}
          </h3>
          <span className="text-sm sm:text-xl font-bold text-green-600">
            <IndianRupee size={18} className="inline-block" />
            {property?.actualPrice}
          </span>
        </div>

        <div className="flex items-center text-gray-600 mb-3 sm:mb-4">
          <MapPin size={14} className="mr-1 sm:mr-2 text-red-500" />
          <span className="text-xs sm:text-sm">{property?.address}</span>
        </div>

        <div className="flex justify-between items-center text-gray-700 mb-3 sm:mb-4 text-xs sm:text-sm">
          <div className="flex flex-wrap items-center bg-gray-50 rounded-xl p-4 gap-x-6 gap-y-2">
            {[...(property.facilities || []), ...(property.services || [])].map(
              (item, index) => {
                const Icon = iconMap[item] || Star;
                return (
                  <div
                    key={index}
                    className="flex items-center gap-2 text-sm text-gray-600"
                  >
                    <Icon className="w-4 h-4 text-blue-500" />
                    <span className="font-medium">{item}</span>
                  </div>
                );
              }
            )}
          </div>
        </div>
        <button
          onClick={() => handleClick(property?._id)}
          className="w-full bg-teal-500 text-white py-2 sm:py-3 rounded-lg sm:rounded-xl text-sm sm:text-base font-semibold transition-all duration-300 hover:bg-gradient-to-r hover:from-blue-700 hover:to-purple-700 hover:shadow-lg transform hover:-translate-y-1"
        >
          View Details
        </button>
      </div>
    </div>
  );

  return (
    <div className="w-full lg:w-[80%] xl:w-[75%] 2xl:w-[70%] mx-auto px-2 sm:px-4 lg:px-0 py-8 sm:py-12">
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

      <div className="relative">
        <div className="overflow-hidden rounded-xl sm:rounded-xl">
          <div
            ref={scrollRef}
            className="flex overflow-x-hidden no-scrollbar pb-4"
            style={{ scrollBehavior: "smooth" }}
            onMouseEnter={stopScrolling}
            onMouseLeave={resumeScrolling}
          >
            {properties.map((property) => (
              <div
                key={property?.id}
                className="mx-2 sm:mx-4 flex-shrink-0 cursor-pointer group"
                onClick={stopScrolling}
              >
                <PropertyCard property={property} />
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={handleScrollLeft}
          className="hidden sm:flex absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white text-gray-800 border border-gray-300 shadow p-2 rounded-full"
        >
          <ChevronLeft className="w-5 h-5 text-gray-700" />
        </button>
        <button
          onClick={handleScrollRight}
          className="hidden sm:flex absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white text-gray-800 border border-gray-300 shadow p-2 rounded-full"
        >
          <ChevronRight className="w-5 h-5 text-gray-700" />
        </button>
      </div>

      {/* Dots */}
      <div className="flex justify-center mt-6 sm:mt-8 space-x-2 sm:space-x-3">
        {Array.from({ length: maxIndex + 1 }).map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-2 sm:h-3 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? "bg-gradient-to-r from-blue-600 to-purple-600 w-6 sm:w-8"
                : "bg-gray-300 hover:bg-gray-400 w-2 sm:w-3"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default PropertySliderTwo;
