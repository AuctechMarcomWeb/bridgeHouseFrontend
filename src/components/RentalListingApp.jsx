/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
} from "lucide-react";
import { getRequest } from "../Helpers";

export default function RentalListingApp() {
  const navigate = useNavigate();
  function handleClick() {
    navigate("/property-detail");
  }
  const iconMap = {
    // Facilities
    Parking: Car,
    Lift: Building2,
    "Power Backup": Zap,

    // Services
    "Water Supply": Droplet,
    Maintenance: Wrench,
  };

  const [filters, setFilters] = useState({
    location: "Chicago",
    bedrooms: "Select",
    bathrooms: "Select",
    minSqFt: "",
    priceRange: [200, 4999],
    categories: {
      apartments: true,
      condos: true,
      land: true,
      office: true,
    },
    amenities: {
      backyard: false,
      centralAir: false,
      chairAccessible: false,
    },
    reviews: {
      fiveStar: false,
      fourStar: false,
      threeStar: false,
      twoStar: false,
      oneStar: false,
    },
    style: {
      budget: false,
      midrange: false,
      luxury: false,
      familyFriendly: false,
    },
  });

  const [openDropdowns, setOpenDropdowns] = useState({});
  const [favorites, setFavorites] = useState(new Set());
  const [loading, setLoading] = useState(false);
  const [listings, setListing] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [fiters, setFiters] = useState({
    page: 1,
    limit: 10,
    search: "",
    sortBy: "recent",
    isPagination: true,
  });

  useEffect(() => {
    const { page, limit, search, sortBy, isPagination } = fiters;

    const queryParams = new URLSearchParams({
      page,
      limit,
      search,
      sortBy,
      isPagination,
    }).toString();

    setLoading(true);
    getRequest(`properties?${queryParams}`)
      .then((res) => {
        setListing(res?.data?.data?.properties || []);
        console.log("listing res", res?.data?.data || []);
      })
      .catch((err) => console.log("Api Error", err))
      .finally(() => setLoading(false));
  }, [fiters]);

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
                <button className="text-red-500 text-sm font-medium hover:text-red-600 transition-colors">
                  Reset All Filters
                </button>

                {/* Enhanced Search */}
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search properties..."
                    className="w-full pl-11 pr-4 py-2 border border-gray-200 text-sm rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-gray-50 hover:bg-white"
                  />
                </div>

                {/* Location */}
                <div className="space-y-3">
                  <label className="block text-sm font-semibold text-gray-700">
                    Location
                  </label>
                  <div className="relative">
                    <select className="w-full p-3 border text-sm border-gray-200 rounded-xl appearance-none bg-gray-50 hover:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all">
                      <option>Lucknow</option>
                      <option>Kanpur</option>
                      <option>Sitapur</option>
                      <option>Barabanki</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                  </div>
                </div>

                {/* Property Details */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <label className="block text-sm font-semibold text-gray-700">
                      Bedrooms
                    </label>
                    <select className="w-full p-3 border text-sm border-gray-200 rounded-xl appearance-none bg-gray-50 hover:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all">
                      <option>Any</option>
                      <option>1+</option>
                      <option>2+</option>
                      <option>3+</option>
                      <option>4+</option>
                    </select>
                  </div>
                  <div className="space-y-3">
                    <label className="block text-sm font-semibold text-gray-700">
                      Bathrooms
                    </label>
                    <select className="w-full p-3 text-sm border border-gray-200 rounded-xl appearance-none bg-gray-50 hover:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all">
                      <option>Any</option>
                      <option>1+</option>
                      <option>2+</option>
                      <option>3+</option>
                    </select>
                  </div>
                </div>

                {/* Min Sqft */}
                <div className="space-y-3">
                  <label className="block text-sm font-semibold text-gray-700">
                    Minimum Square Feet
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., 500"
                    className="w-full p-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 hover:bg-white transition-all"
                  />
                </div>

                {/* Enhanced Categories */}
                <div className="space-y-3">
                  <button
                    className="flex items-center justify-between w-full text-left group"
                    onClick={() => toggleDropdown("propertyType")}
                  >
                    <span className="text-sm font-semibold text-gray-700 group-hover:text-blue-600 transition-colors">
                      Property Types
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-gray-400 transition-transform group-hover:text-blue-600 ${
                        openDropdowns?.propertyType ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {openDropdowns?.propertyType && (
                    <div className="space-y-3 pl-4 border-l-2 border-blue-100">
                      {[
                        { name: "Apartment", count: 45 },
                        { name: "Villa", count: 12 },
                        { name: "Residential", count: 18 },
                        { name: "Plot", count: 32 },
                      ].map((propertyType) => (
                        <label
                          key={propertyType?.name}
                          className="flex items-center justify-between group cursor-pointer"
                        >
                          <div className="flex items-center">
                            <input
                              type="checkbox"
                              className="mr-3 w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                              defaultChecked
                            />
                            <span className="text-sm  text-gray-700 group-hover:text-blue-600 transition-colors">
                              {propertyType?.name}
                            </span>
                          </div>
                          <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                            {propertyType?.count}
                          </span>
                        </label>
                      ))}
                    </div>
                  )}
                </div>

                {/* Enhanced Categories */}
                <div className="space-y-3">
                  <button
                    className="flex items-center justify-between w-full text-left group"
                    onClick={() => toggleDropdown("bhk")}
                  >
                    <span className="text-sm font-semibold text-gray-700 group-hover:text-blue-600 transition-colors">
                      BHK Types
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-gray-400 transition-transform group-hover:text-blue-600 ${
                        openDropdowns.bhk ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {openDropdowns.bhk && (
                    <div className="space-y-3 pl-4 border-l-2 border-blue-100">
                      {[
                        { name: "1 BHK", count: 45 },
                        { name: "2 BHK", count: 12 },
                        { name: "3 BHK", count: 18 },
                        { name: "4 BHK", count: 32 },
                      ].map((bhk) => (
                        <label
                          key={bhk.name}
                          className="flex items-center justify-between group cursor-pointer"
                        >
                          <div className="flex items-center">
                            <input
                              type="checkbox"
                              className="mr-3 w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                              defaultChecked
                            />
                            <span className="text-sm  text-gray-700 group-hover:text-blue-600 transition-colors">
                              {bhk.name}
                            </span>
                          </div>
                          <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                            {bhk.count}
                          </span>
                        </label>
                      ))}
                    </div>
                  )}
                </div>

                {/* Enhanced Price Range */}
                <div className="space-y-4">
                  <button
                    className="flex items-center justify-between w-full text-left group"
                    onClick={() => toggleDropdown("price")}
                  >
                    <span className="text-sm font-semibold text-gray-700 group-hover:text-blue-600 transition-colors">
                      Price Range
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-gray-400 transition-transform group-hover:text-blue-600 ${
                        openDropdowns.price ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {openDropdowns.price && (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-medium">
                          ₹200
                        </span>
                        <span className="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-medium">
                          ₹4,999
                        </span>
                      </div>
                      <div className="relative">
                        <input
                          type="range"
                          min="200"
                          max="4999"
                          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                        />
                      </div>
                      <div className="text-center">
                        <span className="text-xs text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
                          Range: ₹200 - ₹4,999
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Apply Filter Button */}
                <button className="w-full bg-teal-500 text-white py-4 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                  Apply Filters
                </button>
              </div>
            </div>
          </div>

          {/* Enhanced Main Content */}
          <div className="flex-1 min-w-0">
            {/* Enhanced Listing Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {(showAll ? listings : listings.slice(0, 4)).map((listing) => (
                <div
                  onClick={handleClick}
                  key={listing?.id}
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
                      <div
                        className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs  backdrop-blur-sm ${
                          listing?.status === "Featured"
                            ? "bg-amber-500/90 text-white shadow-lg"
                            : "bg-blue-500/90 text-white shadow-lg"
                        }`}
                      >
                        {listing?.status}
                      </div>
                    )}

                    <button
                      onClick={() => toggleFavorite(listing?.id)}
                      className="absolute top-4 right-4 p-1 bg-white/90 backdrop-blur-sm rounded-full shadow-md hover:shadow-lg transition-all duration-200 group"
                    >
                      <Heart
                        className={`w-4 h-4 transition-colors ${
                          favorites.has(listing?.id)
                            ? "fill-red-500 text-red-500"
                            : "text-gray-600 hover:text-red-500"
                        }`}
                      />
                    </button>

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
        </div>
      </div>
    </div>
  );
}
