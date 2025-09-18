/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { X, MapPin, Star, Phone, IndianRupee } from "lucide-react";
import { getRequest } from "../Helpers";

const RealEstatePopups = () => {
  const [popups, setPopups] = useState([]);
  const [bannerType, setBannerType] = useState("rightside");
  const navigate = useNavigate();

  const COLORS = [
    "from-green-600 to-emerald-400",
    "from-purple-600 to-indigo-400",
    "from-orange-500 to-red-400",
    "from-blue-600 to-cyan-400",
  ];

  useEffect(() => {
    getRequest(`banner?bannerType=${bannerType}`)
      .then((res) => {
        const data = res?.data?.data?.banners || [];
        const formatted = data.map((banner, index) => ({
          ...banner,
          timestamp: Date.now() + index,
        }));
        setPopups(formatted);
      })
      .catch((err) => console.error("Error fetching rightside banners:", err));
  }, [bannerType]);

  const closePopup = (id) => {
    setPopups((prev) => prev.filter((p) => p._id !== id));
  };

  return (
    <div className="hidden md:block absolute left-0 w-full h-full pointer-events-none z-50">
      <div className="absolute right-4 top-4 space-y-4 pointer-events-auto cursor-pointer">
        {popups.map((popup, index) => {
          const property = popup?.propertyId;
          const gradient = COLORS[index % COLORS.length];

          return (
            <div
              key={`${popup.id}`}
              onClick={() => navigate(`/property-detail/${property?._id}`)}
              className="transition-all duration-300 ease-out translate-x-0 opacity-100"
              // className={`transition-all duration-500 ease-out ${
              //   popup.show
              //     ? "translate-x-0 opacity-100"
              //     : "translate-x-full opacity-0"
              // }`}
              style={{
                marginTop: `${index * 10}px`,
              }}
            >
              <div className="relative w-60 bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100">
                {/* Close Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    closePopup(popup._id);
                  }}
                  className="absolute top-2 right-2 z-20 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-all duration-200 hover:scale-110 pointer-events-auto"
                >
                  <X size={16} className="text-gray-600" />
                </button>

                {/* Header */}
                <div
                  className={`bg-gradient-to-r ${gradient} p-4 text-white relative overflow-hidden`}
                >
                  <div className="absolute inset-0 bg-black/10"></div>
                  <div className="relative z-10 flex items-center gap-2">
                    <Star className="w-4 h-4 fill-yellow-300 text-yellow-300" />
                    <span className="text-sm font-medium">Premium Listing</span>
                  </div>
                </div>

                {/* Property Image */}
                <div className="relative h-40 overflow-hidden">
                  <img
                    src={popup?.bannerImage}
                    alt={popup?.title}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="bg-white/90 backdrop-blur-sm text-gray-800 px-2 py-1 rounded-lg text-xs font-semibold">
                      {property?.propertyType || "Property"}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4">
                  <h3 className="font-bold text-gray-900 text-sm mb-2 line-clamp-2">
                    {popup?.title}
                  </h3>

                  <div className="flex items-center gap-1 text-gray-600 mb-3">
                    <MapPin size={14} />
                    <span className="text-xs">
                      {property?.address || "Location not available"}
                    </span>
                  </div>

                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-1">
                      <IndianRupee size={16} className="text-green-600" />
                      <span className="font-bold text-lg text-gray-900">
                        {property?.sellingPrice || "N/A"}
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() =>
                        navigate(`/property-detail/${property?._id}`)
                      }
                      className={`flex-1 bg-gradient-to-r ${gradient} text-white py-2 px-3 rounded-lg text-xs font-semibold hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5`}
                    >
                      View Details
                    </button>
                    {/* <button className="w-10 h-8 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-50 transition-colors">
                      <Phone size={14} className="text-gray-600" />
                    </button> */}
                  </div>
                </div>

                <div className={`h-1 bg-gradient-to-r ${gradient}`}></div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RealEstatePopups;
