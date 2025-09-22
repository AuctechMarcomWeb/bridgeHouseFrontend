/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Heart,
  MapPin,
  Bed,
  Bath,
  Square,
  Wind,
  Shirt,
  Tv,
  User,
  Star,
  Car,
  Building2,
  Zap,
  Droplet,
  Wrench,
  Home,
} from "lucide-react";
import PropertySidebar from "./PropertySidebar";
import { getRequest } from "../Helpers";
import { formatDate } from "../Utils";
import { PropertyContext } from "../context/PropertyContext.jsx";
import { Pagination } from "antd";
const iconMap = {
  // Facilities
  Parking: Car,
  Lift: Building2,
  "Power Backup": Zap,

  // Services
  "Water Supply": Droplet,
  Maintenance: Wrench,
};

const PropertyCard = ({ property, onClick }) => {
  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span
        key={i}
        className={`text-sm ${
          i < Math.floor(rating) ? "text-yellow-400" : "text-gray-300"
        }`}
      >
        ★
      </span>
    ));
  };

  return (
    <div
      onClick={onClick}
      className="bg-white flex-row md:flex  rounded-lg items-center shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
    >
      <div className="relative">
        <div className="relative h-56 bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center overflow-hidden group rounded-xl">
          {Array.isArray(property?.gallery) && property.gallery.length > 0 ? (
            <>
              <img
                src={property?.gallery[0]}
                alt={`${property?.title || "Listing"} image`}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
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
        </div>

        {/* Badges */}
        <div className="absolute top-3 left-3 right-3 flex justify-between items-center">
          {/* Verified Badge - Left */}
          {property?.isVerified && (
            <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
              <div className="w-6 h-6 bg-white/80 rounded flex items-center justify-center">
                <img
                  width="24"
                  height="24"
                  src="https://img.icons8.com/color/48/verified-account--v1.png"
                  alt="verified-account"
                />
              </div>
            </div>
          )}

          {/* Status Badge - Right */}
          <span className="bg-green-400 text-white px-3 py-1 rounded-full text-sm flex items-center gap-1">
            {property?.status}
          </span>
        </div>

        {/* Host avatar */}
        <div className="absolute bottom-3 left-3 w-8 h-8 bg-white rounded-full p-0.5">
          <div className="w-full h-full bg-gray-300 rounded-full flex items-center justify-center">
            <User className="w-4 h-4 text-gray-600" />
          </div>
        </div>
      </div>
      {/* Rating */}

      <div className="flex-1 p-0 px-6">
        <div className="flex items-center gap-2 mb-1">
          <div className="flex">{renderStars(property.rating)}</div>
          <span className="text-gray-600 text-sm">
            {property.rating} ({property.reviewCount} Reviews)
          </span>
        </div>

        {/* Title and Price */}
        <div className="flex justify-between items-start mb-0">
          <h3 className="text-lg font-semibold text-gray-900 flex-1">
            {property?.name}
          </h3>
          <span className="text-xl font-bold text-gray-900 ml-4">
            ₹{property?.actualPrice}
          </span>
        </div>

        {/* Location */}
        <div className="flex items-center gap-1 text-gray-600 mb-0">
          <MapPin className="w-4 h-4" />
          <span className="text-sm">{property?.address}</span>
        </div>

        {/* Amenities */}
        <div className="flex flex-wrap items-center gap-4 sm:gap-6 md:gap-8 lg:gap-12 text-gray-600 text-sm mb-0">
          <div className="space-y-2">
            {/* Facilities + Services */}
            {/* <div className="flex flex-wrap items-center bg-gray-50 rounded-xl p-1 gap-x-6 gap-y-2">
              {[
                ...(property.facilities || []),
                ...(property.services || []),
              ].map((item, index) => {
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
              })}
            </div> */}

            {/* Nearby */}
            <div className="flex flex-wrap items-center bg-gray-50 rounded-xl p-1 gap-x-6 gap-y-2">
              {property.nearby?.map((place, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 text-sm text-gray-600"
                >
                  <MapPin className="w-4 h-4 text-red-500" />
                  <span className="font-medium capitalize">
                    {place.name}
                  </span> - <span>{place.distance}</span>
                </div>
              ))}
            </div>
          </div>
          {/* <div className="flex items-center gap-1">
            <Bed className="w-4 h-4" />
            <span>{property.bedrooms} Bedroom</span>
          </div>
          <div className="flex items-center gap-1">
            <Bath className="w-4 h-4" />
            <span>{property.bathrooms} Bath</span>
          </div>
          <div className="flex items-center gap-1">
            <Square className="w-4 h-4" />
            <span>{property.sqft} Sq Ft</span>
          </div>
          <div className="flex items-center gap-1">
            <Wind className="w-4 h-4" />
            <span>{property.ac} AC</span>
          </div> */}
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center text-sm text-gray-500">
          <span>Listed on : {formatDate(property?.createdAt)}</span>
          <span>Category : {property?.propertyType}</span>
        </div>
      </div>
    </div>
  );
};

const PropertyListings = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("recent");
  const [isPagination, setIsPagination] = useState(true);
  const [propertyType, setPropertyType] = useState(() => {
    const queryParams = new URLSearchParams(location.search);
    return queryParams.get("propertyType") || "";
  });
  const [loading, setLoading] = useState(true);
  const [properties, setProperties] = useState([]);
  const { search } = useContext(PropertyContext);
  const [localSearch, setLocalSearch] = useState(""); // local input state

  useEffect(() => {
    setLoading(true);
    getRequest(
      `properties?page=${page}&limit=${limit}&search=${localSearch}&sortBy=${sortBy}&isPagination=${isPagination}&propertyType=${propertyType}`
    )
      .then((res) => {
        setProperties(res?.data?.data?.properties || []);
        console.log("Property Lists Res", res?.data?.data || []);
      })
      .catch((err) => console.log("Api Error", err))
      .finally(() => setLoading(false));
  }, [page, limit, localSearch, sortBy, isPagination, propertyType]);

  const navigate = useNavigate();
  const handleClick = (id) => {
    navigate(`/property-detail/${id}`);
  };

  // const properties = [
  //   {
  //     id: 1,
  //     image:
  //       "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
  //     title: "Gomti Apartment",
  //     price: 1680,
  //     location: "17, Grove Towers, New York, USA",
  //     rating: 5.0,
  //     reviewCount: 20,
  //     bedrooms: 4,
  //     bathrooms: 4,
  //     sqft: 350,
  //     ac: 2,
  //     wardrobe: 1,
  //     tv: 2,
  //     listedDate: "16 Jan 2023",
  //     category: "Apartment",
  //     isNew: true,
  //     isFeatured: true,
  //   },
  //   {
  //     id: 2,
  //     image:
  //       "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
  //     title: "Loyal Apartment",
  //     price: 1940,
  //     location: "25, Willow Crest Apartment, USA",
  //     rating: 4.2,
  //     reviewCount: 33,
  //     bedrooms: 2,
  //     bathrooms: 2,
  //     sqft: 350,
  //     ac: 3,
  //     wardrobe: 1,
  //     tv: 2,
  //     listedDate: "02 May 2023",
  //     category: "Apartment",
  //     isNew: false,
  //     isFeatured: false,
  //   },
  //   {
  //     id: 3,
  //     image:
  //       "https://images.unsplash.com/photo-1584738766473-61c083514bf4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
  //     title: "Ocean Villa House",
  //     price: 1370,
  //     location: "12, Seaside Drive, California, USA",
  //     rating: 4.7,
  //     reviewCount: 43,
  //     bedrooms: 3,
  //     bathrooms: 3,
  //     sqft: 450,
  //     ac: 2,
  //     wardrobe: 2,
  //     tv: 3,
  //     listedDate: "15 Mar 2023",
  //     category: "Villa",
  //     isNew: false,
  //     isFeatured: true,
  //   },
  //   {
  //     id: 4,
  //     image:
  //       "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
  //     title: "Serenity  Suite",
  //     price: 1680,
  //     location: "17, Grove Towers, New York, USA",
  //     rating: 5.0,
  //     reviewCount: 20,
  //     bedrooms: 4,
  //     bathrooms: 4,
  //     sqft: 350,
  //     ac: 2,
  //     wardrobe: 1,
  //     tv: 2,
  //     listedDate: "16 Jan 2023",
  //     category: "Apartment",
  //     isNew: true,
  //     isFeatured: true,
  //   },
  //   {
  //     id: 5,
  //     image:
  //       "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
  //     title: "Loyal Apartment",
  //     price: 1940,
  //     location: "25, Willow Crest Apartment, USA",
  //     rating: 4.2,
  //     reviewCount: 33,
  //     bedrooms: 2,
  //     bathrooms: 2,
  //     sqft: 350,
  //     ac: 3,
  //     wardrobe: 1,
  //     tv: 2,
  //     listedDate: "02 May 2023",
  //     category: "Apartment",
  //     isNew: false,
  //     isFeatured: false,
  //   },
  // ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="2xl:w-[70%] lg:w-[80%] w-full mx-auto px-8 flex gap-8 justify-between">
        <div className="w-full md:w-[80%]">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 gap-4">
            {/* Left side - Results Count */}
            <div className="text-gray-600 text-sm sm:text-base">
              {/* Showing result
              <span className="font-medium">05</span> of{" "}
              <span className="font-medium">125</span> */}
            </div>

            {/* Right side - Filters */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
              {/* Sort By */}
              <div className="flex items-center border border-gray-300 rounded px-3 py-1 w-full sm:w-64">
                {/* Search Icon */}
                <svg
                  className="text-gray-400 mr-2"
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-4.35-4.35M17 10.5a6.5 6.5 0 11-13 0 6.5 6.5 0 0113 0z"
                  />
                </svg>

                {/* Search Input */}
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full focus:outline-none text-sm text-gray-700"
                  value={localSearch} // bind to local state
                  onChange={(e) => setLocalSearch(e.target.value)} // setSearch should come from PropertyContext
                />
              </div>
              {/* <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600 whitespace-nowrap">
                  Sort By
                </span>
                <select className="border border-gray-300 rounded px-3 py-1 text-sm w-full sm:w-auto">
                  <option>Default</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Newest First</option>
                </select>
              </div> */}

              {/* Price Range */}
              {/* <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600 whitespace-nowrap">
                  Price Range
                </span>
                <select className="border border-gray-300 rounded px-3 py-1 text-sm w-full sm:w-auto">
                  <option>Low to High</option>
                  <option>High to Low</option>
                  <option>Under $1000</option>
                  <option>$1000 - $2000</option>
                </select>
              </div> */}
            </div>
          </div>

          {/* Property Grid */}
          <div className=" grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-6 cursor-pointer">
            {properties.map((property) => (
              <PropertyCard
                key={property._id}
                property={property}
                onClick={() => handleClick(property?._id)}
              />
            ))}
          </div>
          {properties.length > limit && (
            <div className="flex justify-center mt-8">
              <Pagination
                current={page}
                pageSize={limit}
                total={properties.length} // total number of properties
                onChange={(newPage) => setPage(newPage)}
                showSizeChanger={false}
                showQuickJumper
              />
            </div>
          )}
        </div>
        <div className=" hidden md:block w-[20%] relative">
          <PropertySidebar />
        </div>
      </div>
    </div>
  );
};

export default PropertyListings;
