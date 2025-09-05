import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight, Check } from "lucide-react";

const PropertySlider = () => {

   const navigate = useNavigate();
  function handleClick() {
    navigate("/property-detail");
  }
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState("next");

  const properties = [
    {
      name: "Sample Property 1",
      developer: "By Auctech, 1090, Gomti Nagar",
      area: "Area 2(3): 2906 sqft",
      price: "1.03 Cr onwards",
      features: ["Nearby River Front", "Upcoming Lucknow Expressway Road"],
      image:
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=500&fit=crop",
    },
    {
      name: "Sample Property 2",
      developer: "By ABC Developers, Indra Nagar, Lucknow",
      area: "Area 2(3): 2500 sqft",
      price: "95 Lakh onwards",
      features: [
        "Near IT parks and corporate offices",
        "Well connected metro connectivity",
      ],
      image:
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=500&fit=crop",
    },
  ];

  const nextSlide = () => {
    setDirection("next");
    setCurrentSlide((prev) => (prev + 1) % properties.length);
  };

  const prevSlide = () => {
    setDirection("prev");
    setCurrentSlide((prev) => (prev - 1 + properties.length) % properties.length);
  };

  // ✅ Auto slide effect (faster: 2.5s)
  useEffect(() => {
    const interval = setInterval(() => {
      setDirection("next");
      setCurrentSlide((prev) => (prev + 1) % properties.length);
    }, 2500);

    return () => clearInterval(interval);
  }, [properties.length]);

  return (
    <div className="w-full bg-gray-100 py-8 md:py-12">
      <div className="w-full lg:w-[80%] xl:w-[75%] 2xl:w-[70%] mx-auto px-4">
        {/* Section Header */}
        <div className="flex justify-center mb-3">
          <span className="h-1 w-12 bg-gradient-to-r from-purple-500 to-green-400 rounded-full"></span>
        </div>
        <div className="text-center mb-6 md:mb-10">
          <h2 className=" text-xl lg:text-3xl font-bold text-gray-800">
            Top Properties and  Projects - Bridge House
          </h2>
          <p className="text-gray-500 mt-2">
            Explore Our Curated Selection of Premium Properties for Unmatched Luxury
          </p>
        </div>

        {/* Slider */}
        <div className="relative overflow-hidden">
          <div className="relative  rounded-3xl shadow-xl bg-white h-96">
            {properties.map((property, index) => (
              <div
                key={index}
                className={`absolute inset-0 flex  transition-all duration-700 ease-in-out ${
                  index === currentSlide
                    ? "opacity-100 translate-x-0 z-10"
                    : direction === "next"
                    ? "opacity-0 -translate-x-full"
                    : "opacity-0 translate-x-full"
                }`}
              >
                {/* Left Content */}
                <div className="w-1/2 rounded-l-2xl bg-gradient-to-br from-teal-600 via-teal-400 to-teal-200 text-white p-2 md:p-14 flex flex-col justify-center relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
                  <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12"></div>

                  <div className="relative z-10">
                    <h2 className="text-lg lg:text-2xl  text-black font-bold mb-2 md:mb-4 leading-tight">
                      {property.name}
                    </h2>
                    <p className="text-white/90 text-base mb-2 md:mb-6 font-medium">
                      {property.developer}
                    </p>
                    <div className=" mb-2 md:mb-6">
                      <p className="text-white/90 mb-2">{property.area}</p>
                      <p className="md:text-xl font-bold">{property.price}</p>
                    </div>

                    <div className="space-y-3 md:mb-8 mb-4">
                      {property.features.map((feature, idx) => (
                        <div key={idx} className="flex items-start space-x-3">
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

                    <button  onClick={handleClick} className="bg-black text-white px-3 py-1 md:px-6 md:py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors duration-200 cursor-pointer">
                      See Details
                    </button>
                  </div>
                </div>

                {/* Right Image */}
                <div className="w-1/2 relative">
                  <img
                    src={property.image}
                    alt={property.name}
                    className="w-full h-full object-cover rounded-r-2xl"
                  />
                  <div className="absolute top-4 right-4 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
                    <div className="w-6 h-6 bg-white/80 rounded">
                      <img
                        width="48"
                        height="48"
                        src="https://img.icons8.com/color/48/verified-account--v1.png"
                        alt="verified-account--v1"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Arrows */}
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
        </div>

        {/* Indicators */}
        <div className="flex justify-center mt-6 space-x-2">
          {properties.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2 h-2 rounded-full transition-all duration-200 ${
                index === currentSlide ? "bg-pink-400 w-6" : "bg-gray-300"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PropertySlider;
