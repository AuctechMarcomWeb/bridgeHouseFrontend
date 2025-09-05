import React, { useEffect, useState } from "react";
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
} from "lucide-react";
import PropertySidebar from "./PropertySidebar";

const PropertyCard = ({ property }) => {
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
    <div className="bg-white flex-row md:flex  rounded-lg items-center shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="relative">
        <img
          src={property.image}
          alt={property.title}
          className="w-full h-50 object-cover"
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          {property.isNew && (
            <span className="bg-red-500 text-white px-2 py-1 rounded text-xs font-medium">
              New
            </span>
          )}
          {property.isFeatured && (
            <span className="bg-orange-400 text-white px-2 py-1 rounded text-xs font-medium">
              Featured
            </span>
          )}
        </div>

        {/* Heart icon */}
        <button className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:bg-gray-50">
          <Heart className="w-4 h-4 text-gray-400" />
        </button>

        {/* Host avatar */}
        <div className="absolute bottom-3 left-3 w-8 h-8 bg-white rounded-full p-0.5">
          <div className="w-full h-full bg-gray-300 rounded-full flex items-center justify-center">
            <User className="w-4 h-4 text-gray-600" />
          </div>
        </div>
      </div>

      <div className="flex-1 p-4 px-6">
        {/* Rating */}
        <div className="flex items-center gap-2 mb-2">
          <div className="flex">{renderStars(property.rating)}</div>
          <span className="text-gray-600 text-sm">
            {property.rating} ({property.reviewCount} Reviews)
          </span>
        </div>

        {/* Title and Price */}
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-gray-900 flex-1">
            {property.title}
          </h3>
          <span className="text-xl font-bold text-gray-900 ml-4">
            ₹{property.price}
          </span>
        </div>

        {/* Location */}
        <div className="flex items-center gap-1 text-gray-600 mb-4">
          <MapPin className="w-4 h-4" />
          <span className="text-sm">{property.location}</span>
        </div>

        {/* Amenities */}
        <div className="flex flex-wrap items-center gap-4 sm:gap-6 md:gap-8 lg:gap-12 text-gray-600 text-sm mb-4">
          <div className="flex items-center gap-1">
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
          </div>
         
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center text-sm text-gray-500">
          <span>Listed on : {property.listedDate}</span>
          <span>Category : {property.category}</span>
        </div>
      </div>
    </div>
  );
};

const PropertyListings = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const navigate = useNavigate();
  function handleClick() {
    navigate("/property-detail");
    // window.location.href = "/";
  }
  const properties = [
    {
      id: 1,
      image:
        "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      title: "Gomti Apartment",
      price: 1680,
      location: "17, Grove Towers, New York, USA",
      rating: 5.0,
      reviewCount: 20,
      bedrooms: 4,
      bathrooms: 4,
      sqft: 350,
      ac: 2,
      wardrobe: 1,
      tv: 2,
      listedDate: "16 Jan 2023",
      category: "Apartment",
      isNew: true,
      isFeatured: true,
    },
    {
      id: 2,
      image:
        "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      title: "Loyal Apartment",
      price: 1940,
      location: "25, Willow Crest Apartment, USA",
      rating: 4.2,
      reviewCount: 33,
      bedrooms: 2,
      bathrooms: 2,
      sqft: 350,
      ac: 3,
      wardrobe: 1,
      tv: 2,
      listedDate: "02 May 2023",
      category: "Apartment",
      isNew: false,
      isFeatured: false,
    },
    {
      id: 3,
      image:
        "https://images.unsplash.com/photo-1584738766473-61c083514bf4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      title: "Ocean Villa House",
      price: 1370,
      location: "12, Seaside Drive, California, USA",
      rating: 4.7,
      reviewCount: 43,
      bedrooms: 3,
      bathrooms: 3,
      sqft: 450,
      ac: 2,
      wardrobe: 2,
      tv: 3,
      listedDate: "15 Mar 2023",
      category: "Villa",
      isNew: false,
      isFeatured: true,
    },
    {
      id: 4,
      image:
        "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      title: "Serenity  Suite",
      price: 1680,
      location: "17, Grove Towers, New York, USA",
      rating: 5.0,
      reviewCount: 20,
      bedrooms: 4,
      bathrooms: 4,
      sqft: 350,
      ac: 2,
      wardrobe: 1,
      tv: 2,
      listedDate: "16 Jan 2023",
      category: "Apartment",
      isNew: true,
      isFeatured: true,
    },
    {
      id: 5,
      image:
        "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      title: "Loyal Apartment",
      price: 1940,
      location: "25, Willow Crest Apartment, USA",
      rating: 4.2,
      reviewCount: 33,
      bedrooms: 2,
      bathrooms: 2,
      sqft: 350,
      ac: 3,
      wardrobe: 1,
      tv: 2,
      listedDate: "02 May 2023",
      category: "Apartment",
      isNew: false,
      isFeatured: false,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="2xl:w-[70%] lg:w-[80%] w-full mx-auto px-8 flex gap-8 justify-between">
        <div className="w-full md:w-[80%]">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 gap-4">
            {/* Left side - Results Count */}
            <div className="text-gray-600 text-sm sm:text-base">
              Showing result <span className="font-medium">05</span> of{" "}
              <span className="font-medium">125</span>
            </div>

            {/* Right side - Filters */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
              {/* Sort By */}
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600 whitespace-nowrap">
                  Sort By
                </span>
                <select className="border border-gray-300 rounded px-3 py-1 text-sm w-full sm:w-auto">
                  <option>Default</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Newest First</option>
                </select>
              </div>

              {/* Price Range */}
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600 whitespace-nowrap">
                  Price Range
                </span>
                <select className="border border-gray-300 rounded px-3 py-1 text-sm w-full sm:w-auto">
                  <option>Low to High</option>
                  <option>High to Low</option>
                  <option>Under $1000</option>
                  <option>$1000 - $2000</option>
                </select>
              </div>
            </div>
          </div>

          {/* Property Grid */}
          <div
            onClick={handleClick}
            className=" grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-6 cursor-pointer"
          >
            {properties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        </div>
        <div className=" hidden md:block w-[20%] relative">
            <PropertySidebar />
        </div>


      </div>
    </div>
  );
};

export default PropertyListings;
