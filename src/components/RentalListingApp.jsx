/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from "react";
import { MdVerifiedUser } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { Slider, Spin, Switch } from "antd";
import {
  ChevronDown,
  Search,
  Star,
  Bed,
  Bath,
  Square,
  Heart,
  MapPin,
  Filter,
  SlidersHorizontal,
  Car,
  Building2,
  Zap,
  Droplet,
  Wrench,
  Home,
  Layers,
  Compass,
  LucideRuler,
  Calendar,
  IndianRupee,
  DropletIcon,
} from "lucide-react";
import { getRequest } from "../Helpers";
import { Pagination } from "antd";
import PropertyFilters from "./PropertyFilters";
import { PropertyContext } from "../context/PropertyContext";

export default function RentalListingApp() {
  const navigate = useNavigate();
  const [openDropdowns, setOpenDropdowns] = useState({});
  const [favorites, setFavorites] = useState(new Set());
  const [loading, setLoading] = useState(false);
  const [listings, setListing] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const [imageError, setImageError] = useState(false);
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

  useEffect(() => {
    fetchProperties();
  }, [page, approvalStatus, appliedFilters]);

  const fetchProperties = () => {
    setLoading(true);
    const query = new URLSearchParams({
      search: appliedFilters.search,
      page,
      limit,
      approvalStatus,
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
        console.log("Filtered Property List", res?.data?.data || []);
      })
      .catch((err) => console.log("Api Error", err))
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
    console.log("selected filters", filters);
    setSearch(filters.search); // ✅ update global search
    setAppliedFilters(filters);
    setPage(1);
    setLoading(true);
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
    setAppliedFilters(empty); // ✅ reset applied too
    setPage(1);
    setSearch("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="w-full 2xl:w-[70%] lg:w-[80%] xl:w-[75%] 2xl:w-[70%]  mx-auto px-4 2xl:px-0 py-4 md:py-8">
        {/* Header */}
        <div className="text-center mb-6 md:mb-12">
          <div className="inline-flex items-center justify-center mb-4">
            <div className="h-1 w-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"></div>
          </div>
          <h1 className="text-xl lg:text-3xl  font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-4">
            Premium Property Collection
          </h1>
          <p className="text-gray-500 max-w-2xl mx-auto leading-relaxed">
            Discover exceptional rental properties curated for discerning
            clients seeking luxury and comfort
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Enhanced Sidebar Filter */}
          <div className=" lg:w-80 flex-shrink-0">
            <PropertyFilters
              filters={filters}
              setFilters={setFilters}
              openDropdowns={openDropdowns}
              toggleDropdown={toggleDropdown}
              handleApplyFilters={handleApplyFilters}
              handleResetFilters={handleResetFilters}
            />
          </div>

          {/* Enhanced Main Content */}
          <div className="flex-1 min-w-0">
            {/* Enhanced Listing Grid */}
            {loading ? (
              <div className="flex justify-center items-center min-h-[300px]">
                <Spin size="large" tip="Loading properties..." fullscreen />
              </div>
            ) : listings.length === 0 ? (
              <div className="flex justify-center items-center min-h-[300px] text-gray-600 text-lg">
                No properties found for the selected filters.
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
                {listings.map((listing) => (
                  <div
                    key={listing?._id}
                    onClick={() => handleClick(listing?._id)}
                    className="group bg-white rounded-xl shadow-md overflow-hidden
             hover:shadow-xl transition-all duration-300
             transform hover:-translate-y-1 border border-gray-100
             cursor-pointer h-full flex flex-col max-w-sm"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden group">
                      {Array.isArray(listing?.gallery) &&
                        listing.gallery.length > 0 ? (
                        <>
                          <img
                            src={listing?.gallery[0]}
                            alt={`${listing?.title || "Listing"} image`}
                            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                            onError={(e) => {
                              // hide the broken image
                              e.target.style.display = "none";
                              // show fallback
                              e.target.parentElement.querySelector(
                                ".fallback"
                              ).style.display = "flex";
                            }}
                          />
                          {/* Hidden fallback when image fails */}
                          <div className="fallback hidden absolute inset-0 items-center justify-center bg-gray-100">
                            <Home size={50} className="text-blue-400" />
                          </div>

                          {/* overlay */}
                          <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                        </>
                      ) : (
                        <>
                          {/* Default fallback when no gallery */}
                          <div className="flex absolute inset-0 items-center justify-center bg-gray-100">
                            <Home
                              size={50}
                              className="text-blue-400 transition-transform duration-300 group-hover:scale-110"
                            />
                          </div>

                          <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                        </>
                      )}

                      {listing?.status && (
                        <div className="absolute top-4 left-4 space-y-2">
                          <div
                            className={`px-3 py-1 rounded-full text-xs backdrop-blur-sm ${listing?.status === "Featured"
                              ? "bg-amber-500/90 text-white shadow-lg"
                              : "bg-blue-500/90 text-white shadow-lg"
                              }`}
                          >
                            {listing?.status}
                          </div>
                        </div>
                      )}

                      {listing?.isVerified && (
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

                      <div className="absolute bottom-4 left-4">
                        <div className="bg-black/70 backdrop-blur-sm text-white px-4 py-2 rounded-xl font-bold text-base shadow-lg flex items-center gap-1">
                          <IndianRupee size={18} className="inline-block" />
                          {listing?.actualPrice}
                        </div>
                      </div>
                    </div>

                    <div className="p-6 space-y-4 flex flex-col flex-1">
                      {/* Header */}
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-bold text-base text-gray-800 group-hover:text-blue-600 transition-colors">
                          {listing?.name}
                        </h3>
                        <span className="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-medium">
                          {listing?.propertyType}
                        </span>
                      </div>

                      <div className="2xl:min-h-[136px] xl:min-h-[150px] lg:min-h-[150px] sm:min-h-150px]">
                        {/* Address */}
                        <div className="flex items-start text-gray-600 text-sm mb-1">
                          <MapPin className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0 text-gray-400" />
                          <span
                            className="truncate block w-full"
                            title={listing?.address}
                          >
                            {listing?.address}
                          </span>
                        </div>

                        {/* Facilities & Services */}
                        <div className="flex flex-wrap items-center bg-gray-50 rounded-xl p-1 gap-2 mb-1 text-sm text-gray-600">
                          {(() => {
                            const facilities = listing?.facilities || [];
                            const services = listing?.services || [];
                            const firstFacility = facilities[0];
                            const firstService = services[0];

                            return (
                              <>
                                {firstFacility && (
                                  <div className="flex items-center gap-1">
                                    <Building2 className="w-4 h-4 text-blue-500" />
                                    <span className="font-medium">
                                      Facility: {firstFacility}
                                    </span>
                                    {facilities.length > 1 && (
                                      <span className="font-medium">…</span>
                                    )}
                                  </div>
                                )}
                                {firstService && (
                                  <div className="flex items-center gap-1">
                                    <DropletIcon className="w-4 h-4 text-blue-500" />
                                    <span className="font-medium">
                                      Service: {firstService}
                                    </span>
                                    {services.length > 1 && (
                                      <span className="font-medium">…</span>
                                    )}
                                  </div>
                                )}
                              </>
                            );
                          })()}
                        </div>

                        {/* Nearby Places */}
                        {listing?.nearby?.length > 0 && (
                          <div className="flex items-center bg-gray-50 rounded-xl p-1 gap-2 text-sm text-gray-600 mb-1">
                            <MapPin className="w-4 h-4 text-red-500" />
                            <span className="font-medium">Near By:</span>
                            <span className="font-medium capitalize">
                              {listing.nearby[0].name} -{" "}
                              {listing.nearby[0].distance} Km
                            </span>
                            {listing.nearby.length > 1 && (
                              <span className="font-medium">…</span>
                            )}
                          </div>
                        )}
                      </div>

                      {/* Action Button */}
                      <button
                        onClick={() => handleClick(listing?._id)}
                        className="w-full max-w-[250px] bg-teal-500 text-white py-2 rounded-lg text-sm font-semibold
               transition-all duration-300 hover:bg-gradient-to-r hover:from-blue-700 hover:to-purple-700
               hover:shadow-lg transform hover:-translate-y-1"
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
            {!loading && listings.length > 0 && (
              <div className="flex justify-end mt-6 px-4">
                {/* <Pagination
                  current={page}
                  pageSize={limit}
                  total={total}

                  onChange={(newPage) => setPage(newPage)}

                /> */}

                <Pagination defaultCurrent={page} total={total} onChange={(newPage) => setPage(newPage)} />

              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
