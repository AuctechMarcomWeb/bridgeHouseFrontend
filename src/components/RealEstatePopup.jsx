import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { X, MapPin, Star, Phone, IndianRupee } from "lucide-react";
import { getRequest } from "../Helpers";

const BANNER_TYPES = ["leftside", "rightside", "top", "bottom"];

const RealEstatePopup = ({
  pagination = 1,
  limit = 5,
  searchTerm = "",
  sortBy = "",
  isActive = true,
}) => {
  const [popups, setPopups] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const res = await getRequest(
          `banner?isPagination=${pagination}&page=${pagination}&limit=${limit}&search=${searchTerm}&sortBy=${sortBy}&isActive=${isActive}`
        );

        const banners = res?.data?.banners || [];
        console.log("bannners======", banners);

        if (banners.length) {
          // Add metadata for timing and type
          const bannersWithMeta = banners.map((banner) => ({
            ...banner,
            bannerType: BANNER_TYPES.includes(banner.bannerType)
              ? banner.bannerType
              : "top",
            timestamp: Date.now() + Math.random(),
            show: true,
          }));
          console.log("bannersWithMeta", bannersWithMeta);

          // Show popups one by one
          const showPopup = (index = 0) => {
            if (index < bannersWithMeta.length) {
              setPopups((prev) => [...prev, bannersWithMeta[index]]);
              setTimeout(() => showPopup(index + 1), 1000);
            }
          };

          showPopup();
        }
      } catch (err) {
        console.error("Failed to fetch banners:", err);
      }
    };

    fetchBanners();
  }, [pagination, limit, searchTerm, sortBy, isActive]);

  const closePopup = (timestamp) => {
    setPopups((prev) => prev.filter((popup) => popup.timestamp !== timestamp));
  };
  const handleClick = (id) => {
    console.log("id=====", id);

    navigate(`/property-detail/${id}`);
  };
  return (
    <div className="hidden md:block relative w-full h-full pointer-events-none z-50">
      {popups.map((popup, index) => (
        <div
          key={popup.timestamp}
          className={`fixed ${
            popup.bannerType === "top" ? "top-4 left-1/2 -translate-x-1/2" : ""
          } ${
            popup.bannerType === "bottom"
              ? "bottom-4 left-1/2 -translate-x-1/2"
              : ""
          } ${popup.bannerType === "leftside" ? "top-1/3 left-4" : ""} ${
            popup.bannerType === "rightside" ? "top-1/3 right-4" : ""
          } transition-all duration-500 ease-out`}
          style={{ marginTop: `${index * 10}px` }}
        >
          <div
            className="relative w-60 bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100 pointer-events-auto cursor-pointer"
            onClick={() => handleClick(property?._id)}
          >
            {/* Close Button */}
            <button
              onClick={() => closePopup(popup.timestamp)}
              className="absolute top-3 right-3 z-10 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-all duration-200 hover:scale-110"
            >
              <X size={16} className="text-gray-600" />
            </button>

            {/* Header */}
            <div
              className={`bg-gradient-to-r ${
                popup.gradient || "from-blue-600 to-purple-600"
              } p-4 text-white relative overflow-hidden`}
            >
              <div className="absolute inset-0 bg-black/10"></div>
              <div className="relative z-10 flex items-center gap-2">
                <Star className="w-4 h-4 fill-yellow-300 text-yellow-300" />
                <span className="text-sm font-medium">Premium Listing</span>
              </div>
            </div>

            {/* Image */}
            <div className="relative h-40 overflow-hidden">
              <img
                src={
                  popup.bannerImage ||
                  popup.bannersImages?.[0] ||
                  "/fallback.jpg"
                }
                alt={popup.title}
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
              />

              <div className="absolute top-3 left-3">
                <span className="bg-white/90 backdrop-blur-sm text-gray-800 px-2 py-1 rounded-lg text-xs font-semibold">
                  {popup.bannerType}
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="p-4">
              {/* Title */}
              <h3 className="font-bold text-gray-900 text-sm mb-2 line-clamp-2">
                {popup.title}
              </h3>

              {/* Address */}
              <div className="flex items-center gap-1 text-gray-600 mb-3">
                <MapPin size={14} />
                <span className="text-xs">{popup.propertyId?.address}</span>
              </div>

              {/* Price */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-1">
                  <IndianRupee size={16} className="text-green-600" />
                  <span className="font-bold text-lg text-gray-900">
                    {popup.propertyId?.actualPrice}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <button
                  className={`flex-1 bg-gradient-to-r ${
                    popup.gradient || "from-blue-600 to-purple-600"
                  } text-white py-2 px-3 rounded-lg text-xs font-semibold hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5`}
                >
                  View Details
                </button>
                <button className="w-10 h-8 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-50 transition-colors">
                  <Phone size={14} className="text-gray-600" />
                </button>
              </div>
            </div>

            {/* Bottom accent */}
            <div
              className={`h-1 bg-gradient-to-r ${
                popup.gradient || "from-blue-600 to-purple-600"
              }`}
            ></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RealEstatePopup;
