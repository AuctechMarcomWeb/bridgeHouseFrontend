/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  MapPin,
  User,
  Home,
  Car,
  Building2,
  Zap,
  Droplet,
  Wrench,
} from "lucide-react";
import { Pagination, Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";

import PropertySidebar from "./PropertySidebar";
import { getRequest } from "../Helpers";
import { formatDate } from "../Utils";
import { PropertyContext } from "../context/PropertyContext.jsx";

// -----------------------------------------
// PropertyCard Component
// -----------------------------------------
const PropertyCard = ({ property, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="bg-white w-full flex flex-col lg:flex-row rounded-lg items-start shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer"
    >
      {/* Image Section */}
      <div className="relative w-full lg:w-[350px] aspect-[4/3] flex-shrink-0 bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center overflow-hidden group">
        {Array.isArray(property?.gallery) && property.gallery.length > 0 ? (
          <>
            <img
              src={property.gallery[0]}
              alt={property?.title || "Listing image"}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              onError={(e) => {
                e.target.style.display = "none";
                e.target.nextElementSibling.style.display = "flex";
              }}
            />
            <div className="hidden absolute inset-0 items-center justify-center">
              <Home size={50} className="text-blue-400" />
            </div>
          </>
        ) : (
          <Home size={50} className="text-blue-400" />
        )}

        {/* Badges */}
        <div className="absolute top-3 left-3 right-3 flex justify-between items-center">
          {property?.isVerified && (
            <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
              <div className="w-6 h-6 bg-white/80 rounded flex items-center justify-center">
                <img
                  width="24"
                  height="24"
                  src="https://img.icons8.com/color/48/verified-account--v1.png"
                  alt="verified"
                />
              </div>
            </div>
          )}
          <span className="bg-green-400 text-white px-3 py-1 rounded-full text-xs sm:text-sm">
            {property?.status}
          </span>
        </div>

        {/* Host Avatar */}
        <div className="absolute bottom-3 left-3 w-8 h-8 bg-white rounded-full p-0.5">
          <div className="w-full h-full bg-gray-300 rounded-full flex items-center justify-center">
            <User className="w-4 h-4 text-gray-600" />
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="flex-1 px-4 py-3 md:px-6 md:py-4 lg:px-8 lg:py-6 flex flex-col justify-between">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-900 flex-1">
            {property?.name}
          </h3>
          <span className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-gray-900 ml-4">
            ₹{property?.actualPrice}
          </span>
        </div>

        <div className="flex items-center gap-1 text-gray-600 mb-2 sm:mb-3">
          <MapPin className="w-4 h-4" />
          <span className="text-xs sm:text-sm md:text-base">
            {property?.address}
          </span>
        </div>

        {property.nearby?.length > 0 && (
          <div className="flex flex-wrap items-center bg-gray-50 rounded-xl p-2 gap-x-4 gap-y-2 w-full mb-3">
            {property.nearby.map((place, i) => (
              <div
                key={i}
                className="flex items-center gap-2 text-xs sm:text-sm text-gray-600"
              >
                <MapPin className="w-4 h-4 text-red-500" />
                <span className="font-medium capitalize">{place.name}</span> -{" "}
                <span>{place.distance}</span>
              </div>
            ))}
          </div>
        )}

        <div className="flex flex-col md:flex-row justify-between text-xs sm:text-sm text-gray-500">
          <span>Listed on: {formatDate(property.createdAt)}</span>
          <span>Category: {property.propertyType}</span>
        </div>
      </div>
    </div>
  );
};

// -----------------------------------------
// Main Component
// -----------------------------------------
const PropertyListings = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { search, propertyType, setPropertyType } = useContext(PropertyContext);

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(4);
  const [localSearch, setLocalSearch] = useState("");
  const [sortBy, setSortBy] = useState("recent");
  const [loading, setLoading] = useState(true);
  const [properties, setProperties] = useState([]);
  const [total, setTotal] = useState(0);
  const [isPagination, setIsPagination] = useState(true);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // Get propertyType from URL
  const queryParams = new URLSearchParams(location.search);
  const propertyTypeFromURL = queryParams.get("propertyType") || "";
  useEffect(() => {
    if (propertyTypeFromURL && propertyTypeFromURL !== propertyType) {
      setPropertyType(propertyTypeFromURL);
    }
  }, [propertyTypeFromURL, setPropertyType]);

  // Fetch Data from API
  useEffect(() => {
    setLoading(true);
    getRequest(
      `properties?page=${page}&limit=${limit}&search=${search}&sortBy=${sortBy}&isPagination=${isPagination}&propertyType=${propertyType}`
    )
      .then((res) => {
        setProperties(res?.data?.data?.properties || []);
        setTotal(res?.data?.data?.totalProperties || 0);
        setPage(res?.data?.data?.currentPage || 1);
      })
      .catch((err) => console.log("API Error:", err))
      .finally(() => setLoading(false));
  }, [page, limit, search, sortBy, isPagination, propertyType]);

  // Local filtering
  const filteredProperties = properties.filter(
    (p) =>
      p.name?.toLowerCase().includes(localSearch.toLowerCase()) ||
      p.address?.toLowerCase().includes(localSearch.toLowerCase())
  );

  const handleClick = (id) => {
    navigate(`?propertyType=${id}`);
    setPropertyType(id);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-[1440px] w-full mx-auto px-4 sm:px-6 md:px-8 flex flex-col lg:flex-row gap-6 lg:gap-8 justify-between">
        {/* Main Content */}
        <div className="w-full lg:w-[128%] flex flex-col">
          {/* Search */}
          
            {!loading &&  (
          <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
            <Input
              placeholder="Search properties..."
              prefix={<SearchOutlined className="text-gray-500" />}
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
              className="!bg-white shadow-md rounded-lg !border-gray-300 
             focus:!border-gray-400 focus:!ring-0 focus:!outline-none 
             hover:!border-gray-400 w-full sm:w-auto"
              size="large"
            />

          </div>
 )}
          {/* Property Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-6">
            {filteredProperties.map((property) => (
              <PropertyCard
                key={property._id}
                property={property}
                onClick={() => handleClick(property?._id)}
              />
            ))}

            {!loading && filteredProperties.length === 0 && (
              <div className="text-center py-16">
                <div className="text-6xl mb-4">🏠</div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                  No Properties Found
                </h3>
                <p className="text-gray-600">
                  Try adjusting your search or filter criteria
                </p>
              </div>
            )}
          </div>

          {/* Pagination */}
          {!loading && filteredProperties.length > 0 && (
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-3 rounded-xl shadow-sm border border-gray-100 mt-6">
              <div className="text-gray-600 text-sm sm:text-base">
                Showing{" "}
                <span className="font-semibold text-blue-600">
                  {(page - 1) * limit + 1}
                </span>{" "}
                to{" "}
                <span className="font-semibold text-blue-600">
                  {Math.min(page * limit, total)}
                </span>{" "}
                of{" "}
                <span className="font-semibold text-blue-600">{total}</span>{" "}
                results
              </div>

              <Pagination
                current={page}
                pageSize={limit}
                total={total}
                onChange={(newPage) => setPage(newPage)}
                showSizeChanger={false}
              />
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="2xl:w-[70%] lg:w-[80%] w-full mx-auto px-4 flex flex-col lg:flex-row gap-8 justify-between overflow-y-auto lg:max-h-[125vh]">
          <PropertySidebar />
        </div>
      </div>
    </div>
  );
};

export default PropertyListings;






