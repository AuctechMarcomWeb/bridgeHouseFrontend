/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import {
  X,
  Home,
  MapPin,
  DollarSign,
  Calendar,
  Star,
  Phone,
  IndianRupee,
} from "lucide-react";
import { getRequest } from "../Helpers/index";
const RealEstatePopups = () => {
  const [popups, setPopups] = useState([]);
  const navigate = useNavigate();
  const [banners, setBanners] = useState([]);

  const [params, setParams] = useState({
    isPagination: true,
    page: 1,
    limit: 10,
    search: "",
    sortBy: "recent",
    isActive: true,
    bannerType: "",
  });

  // Fetch banners
  useEffect(() => {
    const query = `?isPagination=${params.isPagination}&page=${params.page}&limit=${params.limit}&search=${params.search}&sortBy=${params.sortBy}&isActive=${params.isActive}&bannerType=${params.bannerType}`;

    getRequest(`banner?query=${query}`)
      .then((res) => {
        setBanners(res?.data?.data?.banners || []);
        console.log("banners fetched:", res?.data?.data?.banners);
      })
      .catch((err) => console.error("Error fetching banners:", err));
  }, []);

  useEffect(() => {
    console.log("Popups state updated:", popups);
  }, [popups]);

  // const adData = [
  //   {
  //     id: 1,
  //     title: "Luxury Villa in Beverly Hills",
  //     price: "₹2,850,000",
  //     location: "Gomti Nagar, Lucknow",
  //     image:
  //       "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=300&h=200&fit=crop",
  //     type: "Villa",
  //     beds: 4,
  //     baths: 3,
  //     sqft: "3,200",
  //     gradient: "from-blue-600 to-purple-600",
  //   },
  //   {
  //     id: 2,
  //     title: "Modern Downtown Apartment",
  //     price: "₹850,000",
  //     location: "Hazaratganj, Lucknow",
  //     image:
  //       "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=300&h=200&fit=crop",
  //     type: "Apartment",
  //     beds: 2,
  //     baths: 2,
  //     sqft: "1,100",
  //     gradient: "from-emerald-500 to-teal-600",
  //   },
  //   {
  //     id: 3,
  //     title: "Cozy Family Home",
  //     price: "₹425,000",
  //     location: "Jankipuram, Lucknow",
  //     image:
  //       "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=300&h=200&fit=crop",
  //     type: "House",
  //     beds: 3,
  //     baths: 2,
  //     sqft: "2,100",
  //     gradient: "from-orange-500 to-red-500",
  //   },
  //   {
  //     id: 4,
  //     title: "Oceanfront Condo",
  //     price: "₹1,200,000",
  //     location: "Gomti Nagar, Lucknow",
  //     image:
  //       "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=300&h=200&fit=crop",
  //     type: "Condo",
  //     beds: 2,
  //     baths: 2,
  //     sqft: "1,400",
  //     gradient: "from-cyan-500 to-blue-500",
  //   },
  // ];
  const gradientMap = [
    "from-blue-600 to-purple-600",
    "from-emerald-500 to-teal-600",
    "from-orange-500 to-red-500",
    "from-cyan-500 to-blue-500",
  ];
  const bannerPositions = {
    top: banners.filter((b) => b.bannerType === "top"),
    bottom: banners.filter((b) => b.bannerType === "bottom"),
    left: banners.filter((b) => b.bannerType === "leftside"),
    right: banners.filter((b) => b.bannerType === "rightside"),
  };

  useEffect(() => {
    const types = ["top", "bottom", "leftside", "rightside"];
    let index = 0;

    const showNextPopup = () => {
      if (index < types.length) {
        const type = types[index];
        const bannersOfType = bannerPositions[type] || [];
        // console.log("bannersOfType", bannersOfType);

        // Filter banners for this type
        //const bannersOfType = banners.filter((b) => b.bannerType === type);
        // console.log(
        //   "➡️ Banner before push:",
        //   banners?.bannerImage,
        //   banners?.title
        // );

        bannersOfType.forEach((banner, i) => {
          // console.log("Single banner object:", banner);
          // console.log("   bannerImage:", banner?.bannerImage);
          // console.log("   title:", banner?.title);
          const property = banner?.propertyId || {};

          setPopups((prev) => [
            ...prev,
            {
              id: uuidv4(),
              timestamp: Date.now() + i,
              show: true,
              position: type,
              gradient: gradientMap[i % gradientMap.length],
              location: property.address,
              price: property.sellingPrice,
              propertyType: property.propertyType,
              title: banner.title,
              bannerImage: banner.bannerImage,
            },
          ]);
        });

        index++;
        setTimeout(showNextPopup, 1000);
      }
    };

    showNextPopup();
  }, [banners]);

  // console.log("bannerImage", banners?.bannerImage);
  const closePopup = (id) => {
    setPopups((prev) => prev.filter((popup) => popup.id !== id));
  };

  return (
    <div className="hidden md:block absolute left-0 w-full h-full pointer-events-none z-50">
      <div className="absolute right-4 top-4 space-y-4 pointer-events-auto ">
        {popups.map((popup, index) => (
          <div
            key={`${popup?.id}-${popup?.timestamp}`}
            className={`transition-all duration-500 ease-out ${
              popup.show
                ? "translate-x-0 opacity-100"
                : "translate-x-full opacity-0"
            }`}
            style={{
              animationDelay: `${index * 200}ms`,
              // marginTop: `${index * 10}px`, //  use margin instead of overriding transform
              top: popup.position === "top" ? `${index * 10}px` : "auto",
              bottom: popup.position === "bottom" ? `${index * 10}px` : "auto",
              left: popup.position === "leftside" ? `${index * 10}px` : "auto",
              right:
                popup.position === "rightside" ? `${index * 10}px` : "auto",
            }}
          >
            <div className="relative w-60 bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100">
              {/* Close Button */}
              <button
                type="button"
                onClick={() => closePopup(popup?.id)}
                className="absolute top-3 right-3 z-20 flex items-center justify-center w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm shadow-lg hover:bg-white transition-all duration-200 hover:scale-110 cursor-pointer"
              >
                <X size={20} className="text-gray-600 pointer-events-none" />
              </button>

              {/* Header with gradient */}
              <div
                onClick={() => navigate("/property-detail")}
                className={`bg-gradient-to-r ${popup?.gradient} p-4 text-white relative overflow-hidden`}
              >
                {/* Dark overlay (lower z-index so it won't block button) */}
                <div className="absolute inset-0 bg-black/10 z-0"></div>

                {/* Content inside header */}
                <div className="relative z-10">
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 fill-yellow-300 text-yellow-300" />
                    <span className="text-sm font-medium">Premium Listing</span>
                  </div>
                </div>
              </div>

              {/* Property Image */}
              <div
                onClick={() => navigate("/property-detail")}
                className="relative h-40 overflow-hidden"
              >
                <img
                  src={popup?.bannerImage}
                  alt={popup?.title}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
                <div className="absolute top-3 left-3">
                  <span className="bg-white/90 backdrop-blur-sm text-gray-800 px-2 py-1 rounded-lg text-xs font-semibold">
                    {popup?.propertyType}
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
                  <span className="text-xs">{popup?.location}</span>
                </div>

                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-1">
                    <IndianRupee size={16} className="text-green-600" />
                    <span className="font-bold text-lg text-gray-900">
                      {popup?.price}
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <button
                    onClick={() => navigate("/property-detail")}
                    className={`flex-1 bg-gradient-to-r ${popup?.gradient} text-white py-2 px-3 rounded-lg text-xs font-semibold hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5`}
                  >
                    View Details
                  </button>
                  <button className="w-10 h-8 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-50 transition-colors">
                    <Phone size={14} className="text-gray-600" />
                  </button>
                </div>
              </div>

              {/* Bottom accent */}
              <div className={`h-1 bg-gradient-to-r ${popup?.gradient}`}></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RealEstatePopups;
