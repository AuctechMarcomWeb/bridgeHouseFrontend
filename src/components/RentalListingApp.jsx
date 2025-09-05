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
} from "lucide-react";

export default function RentalListingApp() {

   const navigate = useNavigate();
  function handleClick() {
    navigate("/property-detail");

  }

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

  const listings = [
    {
      id: 1,
      title: "Serenity Condo Suite",
      location: "125 Grace Hawkins Ave, Elgin, USA",
      price: "₹3,100",
      rating: 5.0,
      reviews: 20,
      bedrooms: 4,
      bathrooms: 4,
      sqft: 350,
      category: "Apartment",
      listedDate: "16 Jun 2023",
      image:
        "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=300&fit=crop",
      featured: true,
      tag: "Featured",
    },
    {
      id: 2,
      title: "Loyal Apartment",
      location: "123 Shirley Court Baltimore, USA",
      price: "₹1,940",
      rating: 4.0,
      reviews: 28,
      bedrooms: 2,
      bathrooms: 3,
      sqft: 350,
      category: "Apartment",
      listedDate: "22 May 2023",
      image:
        "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=400&h=300&fit=crop",
      featured: false,
      tag: "Approved",
    },
    {
      id: 3,
      title: "Grand Villa House",
      location: "123 Oak Ridge Villa, USA",
      price: "₹1,370",
      rating: 4.1,
      reviews: 25,
      bedrooms: 4,
      bathrooms: 3,
      sqft: 520,
      category: "Villa",
      listedDate: "28 Apr 2023",
      image:
        "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=400&h=300&fit=crop",
      featured: true,
      tag: "Featured",
    },
    {
      id: 4,
      title: "Palm Cove Bungalows",
      location: "145 Pine Boulevard Beach, USA",
      price: "₹1,370",
      rating: 4.8,
      reviews: 25,
      bedrooms: 5,
      bathrooms: 3,
      sqft: 700,
      category: "Bungalow",
      listedDate: "16 Mar 2023",
      image:
        "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=400&h=300&fit=crop",
      featured: false,
      tag: "",
    },
    {
      id: 5,
      title: "Blue Horizon Villa",
      location: "The Golden Oaks Online, USA",
      price: "₹2,000",
      rating: 4.5,
      reviews: 27,
      bedrooms: 3,
      bathrooms: 1,
      sqft: 400,
      category: "Villa",
      listedDate: "08 Mar 2023",
      image:
        "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&h=300&fit=crop",
      featured: false,
      tag: "",
    },
    {
      id: 6,
      title: "Wanderlust Lodge",
      location: "Via Brera Boulevard, Boston, USA",
      price: "₹1,950",
      rating: 4.7,
      reviews: 46,
      bedrooms: 3,
      bathrooms: 2,
      sqft: 550,
      category: "Lodge",
      listedDate: "25 Feb 2023",
      image:
        "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=300&fit=crop",
      featured: false,
      tag: "",
    },
  ];

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

  const renderStars = (rating, reviews) => {
    return (
      <div className="flex items-center gap-1 text-sm mb-2">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${
              i < Math.floor(rating)
                ? "fill-amber-400 text-amber-400"
                : "text-gray-300"
            }`}
          />
        ))}
        <span className="text-gray-700 ml-2 font-medium">{rating}</span>
        <span className="text-gray-500 text-xs">({reviews} reviews)</span>
      </div>
    );
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
                    onClick={() => toggleDropdown("categories")}
                  >
                    <span className="text-sm font-semibold text-gray-700 group-hover:text-blue-600 transition-colors">
                      Property Types
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-gray-400 transition-transform group-hover:text-blue-600 ${
                        openDropdowns.categories ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {openDropdowns.categories && (
                    <div className="space-y-3 pl-4 border-l-2 border-blue-100">
                      {[
                        { name: "Apartment", count: 45 },
                        { name: "Villa", count: 12 },
                        { name: "House", count: 18 },
                        { name: "Plot", count: 32 },
                      ].map((category) => (
                        <label
                          key={category.name}
                          className="flex items-center justify-between group cursor-pointer"
                        >
                          <div className="flex items-center">
                            <input
                              type="checkbox"
                              className="mr-3 w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                              defaultChecked
                            />
                            <span className="text-sm  text-gray-700 group-hover:text-blue-600 transition-colors">
                              {category.name}
                            </span>
                          </div>
                          <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                            {category.count}
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
            {/* Results Header */}
            {/* <div className="flex items-center justify-between mb-8 bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div>
                <h3 className="text-xl font-semibold text-gray-900">
                  {listings.length} Premium Properties
                </h3>
                <p className="text-gray-600 mt-1">Showing all available rentals</p>
              </div>
              <div className="flex items-center gap-4">
                <select className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>Sort by: Featured</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Newest First</option>
                </select>
              </div>
            </div> */}

            {/* Enhanced Listing Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {listings.map((listing) => (
                <div onClick={handleClick}
                  key={listing.id}
                  className="group bg-white rounded-2xl shadow-lg  overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 cursor-pointer"
                    >
                  <div className="relative overflow-hidden">
                    <img
                      src={listing.image}
                      alt={listing.title}
                      className=" w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                     <div className="absolute inset-0 bg-black/30 opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      </div>
                   

                    {listing.tag && (
                      <div
                        className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs  backdrop-blur-sm ${
                          listing.tag === "Featured"
                            ? "bg-amber-500/90 text-white shadow-lg"
                            : "bg-blue-500/90 text-white shadow-lg"
                        }`}
                      >
                        {listing.tag}
                      </div>
                    )}

                    <button
                      onClick={() => toggleFavorite(listing.id)}
                      className="absolute top-4 right-4 p-1 bg-white/90 backdrop-blur-sm rounded-full shadow-md hover:shadow-lg transition-all duration-200 group"
                    >
                      <Heart
                        className={`w-4 h-4 transition-colors ${
                          favorites.has(listing.id)
                            ? "fill-red-500 text-red-500"
                            : "text-gray-600 hover:text-red-500"
                        }`}
                      />
                    </button>

                    <div className="absolute bottom-4 left-4">
                      <div className="bg-black/70 backdrop-blur-sm text-white px-4 py-2 rounded-xl font-bold text-base shadow-lg">
                        {listing.price}
                        <span className="text-sm font-normal opacity-80"></span>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 space-y-4">
                    {renderStars(listing.rating, listing.reviews)}

                    <div>
                      <h3 className="font-bold text-base text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">
                        {listing.title}
                      </h3>

                      <div className="flex items-start text-gray-600 text-sm">
                        <MapPin className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0 text-gray-400" />
                        <span>{listing.location}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between bg-gray-50 rounded-xl p-4 mb-0">
                      <div className="flex items-center gap-1 text-sm text-gray-600">
                        <Bed className="w-4 h-4 text-blue-500" />
                        <span className="font-medium">{listing.bedrooms}</span>
                      </div>
                      <div className="flex items-center gap-1 text-sm text-gray-600">
                        <Bath className="w-4 h-4 text-blue-500" />
                        <span className="font-medium">{listing.bathrooms}</span>
                      </div>
                      <div className="flex items-center gap-1 text-sm text-gray-600">
                        <Square className="w-4 h-4 text-blue-500" />
                        <span className="font-medium">
                          {listing.sqft} sq ft
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                      <span className="text-xs text-gray-500">
                        Listed: {listing.listedDate}
                      </span>
                      <span className="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-medium">
                        {listing.category}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Enhanced View All Button */}
            <div className="text-center mt-8 md:mt-12">
              <button className="bg-teal-500 text-white px-4 py-2 md:px-10 md:py-4 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                View All
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
