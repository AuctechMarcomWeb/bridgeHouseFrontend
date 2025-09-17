/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { MdVerifiedUser } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { Slider, Switch } from "antd";
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
} from "lucide-react";
import { getRequest } from "../Helpers";
import { Pagination } from "antd";

export default function RentalListingApp() {
  const navigate = useNavigate();
  const iconMap = {
    // Facilities
    Parking: Car,
    Lift: Building2,
    "Power Backup": Zap,

    // Services
    "Water Supply": Droplet,
    Maintenance: Wrench,
  };

  const [openDropdowns, setOpenDropdowns] = useState({});
  const [favorites, setFavorites] = useState(new Set());
  const [loading, setLoading] = useState(false);
  const [listings, setListing] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [approvalStatus, setApprovalStatus] = useState("");

  const [filters, setFilters] = useState({
    search: "",
    minSqft: "",
    maxSqft: "",
    propertyType: "",
    bhk: "",
    minPrice: "",
    maxPrice: "",
  });

  // Decide which listings to show
  let displayListings = showAll
    ? listings.length > limit
      ? listings.slice((page - 1) * limit, page * limit)
      : listings
    : listings.slice(0, 4);

  useEffect(() => {
    fetchProperties();
  }, [page]); // only re-fetch when page changes, not filters

  const fetchProperties = () => {
    setLoading(true);
    const query = new URLSearchParams({
      search: filters.search,
      page,
      limit,
      approvalStatus,
      minSqft: filters.minSqft,
      maxSqft: filters.maxSqft,
      propertyType: filters.propertyType,
      bhk: filters.bhk,
      minPrice: filters.minPrice,
      maxPrice: filters.maxPrice,
    }).toString();

    getRequest(`properties?${query}`)
      .then((res) => {
        setListing(res?.data?.data?.properties || []);
        setTotal(res?.totalProperties || res?.total || 0);
        console.log("Filtered Property List", res?.data?.data || []);
      })
      .catch((err) => console.log("Api Error", err))
      .finally(() => setLoading(false));
  };

  const handleClick = (id) => {
    console.log("id=====", id);

    navigate(`/property-detail/${id}`);
  };

  const toggleDropdown = (dropdown) => {
    setOpenDropdowns((prev) => ({
      ...prev,
      [dropdown]: !prev[dropdown],
    }));
  };

  const toggleFavorite = (id) => {
    setFavorites((prev) => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(id)) {
        newFavorites.delete(id);
      } else {
        newFavorites.add(id);
      }
      return newFavorites;
    });
  };
  const handleApplyFilters = () => {
    console.log("Selected Filters:", filters);
    setPage(1); // reset pagination to page 1 when applying filters
    fetchProperties();
  };

  const handleResetFilters = () => {
    setFilters({
      search: "",
      minSqft: "",
      maxSqft: "",
      propertyType: "",
      bhk: "",
      minPrice: "",
      maxPrice: "",
    });
    setPage(1);
    fetchProperties(); // ✅ refetch after reset
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="w-full lg:w-[80%] xl:w-[75%] 2xl:w-[70%] mx-auto px-4 md:px-0 py-4 md:py-8">
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
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden sticky top-8">
              <div className="bg- px-6 py-4">
                <div className="flex items-center gap-3 text-grey-800">
                  <SlidersHorizontal className="w-5 h-5" />
                  <h2 className="text-lg font-semibold"> Filters</h2>
                </div>
              </div>

              <div className="p-6 space-y-6 max-h-[calc(100vh-200px)] overflow-y-auto">
                <button
                  onClick={handleResetFilters}
                  className="text-red-500 text-sm font-medium hover:text-red-600 transition-colors"
                >
                  Reset All Filters
                </button>
                {/* Enhanced Search */}
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search properties..."
                    value={filters.search}
                    onChange={(e) =>
                      setFilters({ ...filters, search: e.target.value })
                    }
                    className="w-full pl-11 pr-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 hover:bg-white transition-all"
                  />
                </div>
                {/* Sqft Range */}
                {/* Sqft Range */}
                <div className="space-y-3">
                  <label className="block text-sm font-semibold text-gray-700">
                    Square Feet Range
                  </label>
                  <Slider
                    range
                    min={100}
                    max={5000}
                    step={50}
                    value={[filters.minSqft || 100, filters.maxSqft || 5000]}
                    onChange={(value) =>
                      setFilters({
                        ...filters,
                        minSqft: value[0],
                        maxSqft: value[1],
                      })
                    }
                  />
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>{filters.minSqft || 100} sqft</span>
                    <span>{filters.maxSqft || 5000} sqft</span>
                  </div>
                </div>

                {/* Property Types */}
                <div className="space-y-3">
                  <button
                    className="flex items-center justify-between w-full text-left group"
                    onClick={() => toggleDropdown("propertyType")}
                  >
                    <span className="text-sm font-semibold text-gray-700 group-hover:text-blue-600 transition-colors">
                      Property Types
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-gray-400 transition-transform ${
                        openDropdowns.propertyType ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {openDropdowns.propertyType && (
                    <div className="space-y-3 pl-4 border-l-2 border-blue-100">
                      {["Apartment", "Villa", "Residential", "Plot"].map(
                        (type) => (
                          <label
                            key={type}
                            className="flex items-center gap-2 cursor-pointer"
                          >
                            <input
                              type="radio"
                              name="propertyType" // single selection group
                              value={type}
                              checked={filters.propertyType === type}
                              onChange={(e) =>
                                setFilters({
                                  ...filters,
                                  propertyType: e.target.value,
                                })
                              }
                              className="w-4 h-4 text-blue-600"
                            />
                            <span className="text-sm">{type}</span>
                          </label>
                        )
                      )}
                    </div>
                  )}
                </div>
                {/* BHK Types */}
                <div className="space-y-3">
                  <button
                    className="flex items-center justify-between w-full text-left group"
                    onClick={() => toggleDropdown("bhk")}
                  >
                    <span className="text-sm font-semibold text-gray-700 group-hover:text-blue-600 transition-colors">
                      BHK Types
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-gray-400 transition-transform ${
                        openDropdowns.bhk ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {openDropdowns.bhk && (
                    <div className="space-y-3 pl-4 border-l-2 border-blue-100">
                      {["1 BHK", "2 BHK", "3 BHK", "4 BHK"].map((bhkOption) => (
                        <label
                          key={bhkOption}
                          className="flex items-center gap-2 cursor-pointer"
                        >
                          <input
                            type="radio"
                            name="bhk" // all radios share the same name
                            value={bhkOption}
                            checked={filters.bhk === bhkOption}
                            onChange={(e) =>
                              setFilters({ ...filters, bhk: e.target.value })
                            }
                            className="w-4 h-4 text-blue-600"
                          />
                          <span className="text-sm">{bhkOption}</span>
                        </label>
                      ))}
                    </div>
                  )}
                </div>

                {/* Price Range */}
                <div className="space-y-3">
                  <label className="block text-sm font-semibold text-gray-700">
                    Price Range (₹)
                  </label>
                  <Slider
                    range
                    min={30000}
                    max={50000000000}
                    step={5000}
                    value={[
                      filters.minPrice || 30000,
                      filters.maxPrice || 50000000000,
                    ]}
                    onChange={(value) =>
                      setFilters({
                        ...filters,
                        minPrice: value[0],
                        maxPrice: value[1],
                      })
                    }
                  />
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>₹{filters.minPrice || 30000}</span>
                    <span>₹{filters.maxPrice || 50000000000}</span>
                  </div>
                </div>

                {/* Apply Filter Button */}
                <button
                  onClick={handleApplyFilters}
                  className="w-full bg-teal-500 text-white py-4 rounded-xl font-semibold hover:bg-teal-600 transition-all"
                >
                  Apply Filters
                </button>
              </div>
            </div>
          </div>

          {/* Enhanced Main Content */}
          <div className="flex-1 min-w-0">
            {/* Enhanced Listing Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {displayListings.map((listing) => (
                <div
                  onClick={() => handleClick(listing?._id)}
                  key={listing?._id}
                  className="group bg-white rounded-2xl shadow-lg  overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 cursor-pointer"
                >
                  <div className="relative overflow-hidden">
                    <div className="relative h-56 bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center overflow-hidden group rounded-xl">
                      {Array.isArray(listing?.gallery) &&
                      listing.gallery.length > 0 ? (
                        <>
                          <img
                            src={listing?.gallery[0]}
                            alt={`${listing?.title || "Listing"} image`}
                            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                            onError={(e) => {
                              // Fallback if image fails to load
                              e.target.style.display = "none";
                              e.target.nextElementSibling.style.display =
                                "flex";
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

                    {listing?.status && (
                      <div className="absolute top-4 left-4 space-y-2">
                        {/* Status Badge */}
                        <div
                          className={`px-3 py-1 rounded-full text-xs backdrop-blur-sm ${
                            listing?.status === "Featured"
                              ? "bg-amber-500/90 text-white shadow-lg"
                              : "bg-blue-500/90 text-white shadow-lg"
                          }`}
                        >
                          {listing?.status}
                        </div>
                      </div>
                    )}

                    {/* Verified Badge */}
                    {listing?.isVerified && (
                      <div className="absolute top-4 right-4 p-1 bg-white rounded-full shadow">
                        <MdVerifiedUser className="text-blue-500 text-3xl" />
                      </div>
                    )}

                    <div className="absolute bottom-4 left-4">
                      <div className="bg-black/70 backdrop-blur-sm text-white px-4 py-2 rounded-xl font-bold text-base shadow-lg">
                        {listing?.actualPrice}
                        <span className="text-sm font-normal opacity-80"></span>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 space-y-4">
                    {/* {renderStars(listing.rating, listing.reviews)} */}

                    <div>
                      <h3 className="font-bold text-base text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">
                        {listing?.name}
                      </h3>

                      <div className="flex items-start text-gray-600 text-sm">
                        <MapPin className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0 text-gray-400" />
                        <span>{listing?.address}</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      {/* <div className="flex flex-wrap items-center bg-gray-50 rounded-xl p-4 gap-x-6 gap-y-2">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <LucideRuler className="w-4 h-4 text-blue-500" />
                          <span className="font-medium">
                            {listing?.propertyDetails?.area ?? "—"} sq ft
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Bed className="w-4 h-4 text-blue-500" />
                          <span className="font-medium">
                            {listing?.propertyDetails?.bedrooms ?? "—"} Bedrooms
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Bath className="w-4 h-4 text-blue-500" />
                          <span className="font-medium">
                            {listing?.propertyDetails?.bathrooms ?? "—"}{" "}
                            Bathrooms
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Layers className="w-4 h-4 text-blue-500" />
                          <span className="font-medium">
                            {listing?.propertyDetails?.floors ?? "—"} Floors
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600 capitalize">
                          <Compass className="w-4 h-4 text-blue-500" />
                          <span className="font-medium">
                            Facing {listing?.propertyDetails?.facing ?? "—"}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Calendar className="w-4 h-4 text-blue-500" />
                          <span className="font-medium">
                            Built {listing?.propertyDetails?.builtYear ?? "—"}
                          </span>
                        </div>
                      </div> */}
                      {/* Facilities + Services */}
                      <div className="flex flex-wrap items-center bg-gray-50 rounded-xl p-4 gap-x-6 gap-y-2">
                        {[
                          ...(listing.facilities || []),
                          ...(listing.services || []),
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
                      </div>

                      {/* Nearby */}
                      <div className="flex flex-wrap items-center bg-gray-50 rounded-xl p-4 gap-x-6 gap-y-2">
                        {listing.nearby?.map((place, index) => (
                          <div
                            key={index}
                            className="flex items-center gap-2 text-sm text-gray-600"
                          >
                            <MapPin className="w-4 h-4 text-red-500" />
                            <span className="font-medium capitalize">
                              {place.name}
                            </span>{" "}
                            - <span>{place.distance}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                      <span className="text-xs text-gray-500">
                        Listed: {listing.listedDate}
                      </span>
                      <span className="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-medium">
                        {listing?.propertyType}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Enhanced View All Button */}
            {!showAll && listings.length > 4 && (
              <div className="text-center mt-8 md:mt-12">
                <button
                  onClick={() => setShowAll(true)}
                  className="bg-teal-500 text-white px-4 py-2 md:px-10 md:py-4 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  View All
                </button>
              </div>
            )}
          </div>
          {/* Pagination */}
          {showAll && listings.length > limit && (
            <div className="flex justify-center mt-8">
              <Pagination
                current={page}
                pageSize={limit}
                total={listings.length}
                onChange={(newPage) => setPage(newPage)}
                showSizeChanger={false}
                showQuickJumper
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
