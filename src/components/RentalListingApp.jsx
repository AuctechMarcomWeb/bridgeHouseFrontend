/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Spin, Pagination } from "antd";
import { SiMercadopago } from "react-icons/si";
import {
  MapPin,
  Home,
  Building2,
  DropletIcon,
  IndianRupee,
} from "lucide-react";
import { getRequest } from "../Helpers";
import PropertyFilters from "./PropertyFilters";
import { PropertyContext } from "../context/PropertyContext";

export default function RentalListingApp() {
  const navigate = useNavigate();
  const [openDropdowns, setOpenDropdowns] = useState({});
  const [loading, setLoading] = useState(false);
  const [listings, setListing] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [limit] = useState(6);
  const [approvalStatus, setApprovalStatus] = useState("");
  const { search, setSearch } = useContext(PropertyContext);

  const [filters, setFilters] = useState({
    search: search,
    minSqft: "",
    maxSqft: "",
    propertyType: "",
    bhk: "",
    minPrice: "",
    maxPrice: "",
  });
  const [appliedFilters, setAppliedFilters] = useState(filters);

  // 🔹 Fetch data when filters or page change
  useEffect(() => {
    fetchProperties();
  }, [page, approvalStatus, appliedFilters]);

  const fetchProperties = () => {
    setLoading(true);
    const query = new URLSearchParams({
      search: appliedFilters.search,
      page,
      limit,

      minSqft: appliedFilters.minSqft,
      maxSqft: appliedFilters.maxSqft,
      propertyType: appliedFilters.propertyType,
      bhk: appliedFilters.bhk,
      minPrice: appliedFilters.minPrice,
      maxPrice: appliedFilters.maxPrice,
    }).toString();

    getRequest(`properties?${query}`)
      .then((res) => {
        setListing(res?.data?.data?.properties || []);
        setTotal(res?.data?.data?.totalProperties || 0);
      })
      .catch((err) => console.log("API Error:", err))
      .finally(() => setLoading(false));
  };

  const handleClick = (id) => {
    navigate(`/property-detail/${id}`);
  };

  const toggleDropdown = (dropdown) => {
    setOpenDropdowns((prev) => ({
      ...prev,
      [dropdown]: !prev[dropdown],
    }));
  };

  const handleApplyFilters = () => {
    setSearch(filters.search);
    setAppliedFilters(filters);
    setPage(1);
  };

  const handleResetFilters = () => {
    const empty = {
      search: "",
      minSqft: "",
      maxSqft: "",
      propertyType: "",
      bhk: "",
      minPrice: "",
      maxPrice: "",
    };
    setFilters(empty);
    setAppliedFilters(empty);
    setPage(1);
    setSearch("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="w-full 2xl:w-[70%] xl:w-[80%] lg:w-[85%] mx-auto px-4 py-6 md:py-10">
        {/* ✅ Header */}
        <div className="text-center mb-8 md:mb-12">
          <div className="inline-flex items-center justify-center mb-3">
            <div className="h-1 w-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"></div>
          </div>
          <h1 className="text-xl md:text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-2">
            Premium Property Collection
          </h1>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Discover exceptional rental properties curated for comfort and
            luxury.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filter */}
          <div className="lg:w-80 flex-shrink-0">
            <PropertyFilters
              filters={filters}
              setFilters={setFilters}
              openDropdowns={openDropdowns}
              toggleDropdown={toggleDropdown}
              handleApplyFilters={handleApplyFilters}
              handleResetFilters={handleResetFilters}
            />
          </div>

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {loading ? (
              <div className="flex justify-center items-center min-h-[300px]">
                <Spin size="large" tip="Loading properties..." />
              </div>
            ) : listings.length === 0 ? (
                     <div className="text-center py-16">
                  <div className="text-6xl mb-4">🏠</div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">
                    No Properties Found
                  </h3>
                  <p className="text-gray-600">
                    Try adjusting your search or filter criteria
                  </p>
                </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {listings.map((listing) => (
                  <div
                    key={listing?._id}
                    onClick={() => handleClick(listing?._id)}
                    className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 cursor-pointer flex flex-col h-full"
                  >
                    {/* Image */}
                    <div className="relative aspect-[4/3] overflow-hidden">
                      {Array.isArray(listing?.gallery) &&
                      listing.gallery.length > 0 ? (
                        <img
                          src={listing.gallery[0]}
                          alt="property"
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                          onError={(e) => {
                            e.target.style.display = "none";
                            e.target.parentElement.querySelector(
                              ".fallback"
                            ).style.display = "flex";
                          }}
                        />
                      ) : null}

                      <div className="fallback hidden absolute inset-0 items-center justify-center bg-gray-100">
                        <Home size={48} className="text-blue-400" />
                      </div>

                      {listing?.status && (
                        <div className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs bg-blue-600/90 text-white font-semibold shadow-md">
                          {listing.status}
                        </div>
                      )}

                      {listing?.isVerified && (
                        <div className="absolute top-4 right-4 bg-white/90 rounded-full p-1">
                          <img
                            width="24"
                            height="24"
                            src="https://img.icons8.com/color/48/verified-account--v1.png"
                            alt="verified"
                          />
                        </div>
                      )}

                      <div className="absolute bottom-4 left-4">
                        <div className="bg-black/70 backdrop-blur-sm text-white px-4 py-1.5 rounded-lg font-semibold flex items-center gap-1 text-sm">
                          <IndianRupee size={16} /> {listing?.actualPrice}
                        </div>
                      </div>

                      {listing?.isAdopted && (
                        <div className="absolute bottom-4 right-4 bg-white/70 rounded-full p-1">
                          <span className="bg-gradient-to-r from-blue-900 to-blue-900 text-white px-1 py-1 rounded-full text-sm flex items-center gap-1">
                            <SiMercadopago className="fs-4" />
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-5 flex flex-col justify-between flex-grow">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-semibold text-gray-800 group-hover:text-blue-600 truncate">
                            {listing?.name}
                            <br/> <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                          {listing?.propertyType}
                        </span>
                          </h3>
                         
                        </div>
                        
                        <div className="text-gray-600 text-sm mb-2 flex items-start">
                          <MapPin
                            className="w-4 h-4 mr-1 mt-0.5 text-gray-400 flex-shrink-0"
                            size={14}
                          />
                          <span className="truncate w-full">
                            {listing?.address}
                          </span>
                        </div>

                        {/* Facilities */}
                        <div className="bg-gray-50 rounded-lg p-2 text-xs text-gray-600 mb-2 space-y-1">
                          {listing?.facilities?.[0] && (
                            <div className="flex items-center gap-1">
                              <Building2 size={12} className="text-blue-500" />
                              <span>{listing.facilities[0]}</span>
                              {listing.facilities.length > 1 && <span>…</span>}
                            </div>
                          )}
                          {listing?.services?.[0] && (
                            <div className="flex items-center gap-1">
                              <DropletIcon
                                size={12}
                                className="text-blue-500"
                              />
                              <span>{listing.services[0]}</span>
                              {listing.services.length > 1 && <span>…</span>}
                            </div>
                          )}
                        </div>

                        {/* Nearby */}
                        {listing?.nearby?.[0] && (
                          <div className="bg-gray-50 rounded-lg p-2 text-xs text-gray-600 flex items-center gap-2">
                            <MapPin size={12} className="text-red-500" />
                            <span className="capitalize">
                              {listing.nearby[0].name} —{" "}
                              {listing.nearby[0].distance} km
                            </span>
                            {listing.nearby.length > 1 && <span>…</span>}
                          </div>
                        )}
                      </div>

                      <button
                        onClick={() => handleClick(listing?._id)}
                        className="mt-4 bg-gradient-to-r from-[#004f8a]  to-[#004f8a]  text-white py-2 rounded-lg text-sm font-semibold hover:from-[#004f8a] hover:from[#004f8a]  transition-transform duration-300 hover:-translate-y-1 shadow-md"
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* ✅ Pagination - no dots, right aligned */}
            {!loading && listings.length > 0 && (
              <div className="flex justify-end mt-8">
                <Pagination
                  current={page}
                  pageSize={limit}
                  total={total}
                  onChange={(newPage) => setPage(newPage)}
                  showSizeChanger={false}
                  showLessItems
                  // itemRender={(pageNum, type, originalElement) => {
                  //   if (type === "prev" || type === "next")
                  //     return originalElement;
                  //   if (typeof pageNum === "number") {
                  //     return <span>{pageNum}</span>; // hides dots
                  //   }
                  //   return null;
                  // }}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
