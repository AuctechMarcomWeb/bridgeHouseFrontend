import React, { useState } from 'react';
import { MapPin, Bed, Bath, Square } from 'lucide-react';

const RealEstateGallery = () => {
  const [viewMode, setViewMode] = useState('grid');

  const properties = [
    {
      id: 1,
      title: "Modern Downtown Loft",
      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop",
      featured: true
    },
    {
      id: 2,
      title: "Luxury Villa with Pool",
     
      image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop",
      featured: true
    },
    {
      id: 3,
      title: "Cozy Suburban Home",
      type: "house",
      image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&h=600&fit=crop"
    },
    {
      id: 4,
      title: "Penthouse Suite",
     
      type: "apartment",
      image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=600&fit=crop"
    },
    {
      id: 5,
      title: "Historic Brownstone",
     
      type: "house",
      image: "https://images.unsplash.com/photo-1605146769289-440113cc3d00?w=800&h=600&fit=crop"
    },
    {
      id: 6,
      title: "Mountain View Cabin",
      
      type: "house",
      image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=600&fit=crop"
    }
  ];

  const PropertyCard = ({ property }) => (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group">
      {/* Image only */}
      <div className="relative w-full h-56 sm:h-64 md:h-72 lg:h-80 overflow-hidden">
        <img
          src={property.image}
          alt={property.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {property.featured && (
          <span className="absolute top-3 left-3 bg-gradient-to-r from-orange-400 to-pink-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
            Featured
          </span>
        )}
      </div>

      {/* Card Info */}
      <div className="p-4 sm:p-6 lg:p-2 ">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-base sm:text-lg font-bold text-gray-800 group-hover:text-blue-600 transition-colors">
            {property.title}
          </h3>   
        </div> 
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-gray-900 to-blue-900">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4">
            Properties Gallery
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-blue-100 mb-6 max-w-2xl mx-auto">
            Discover your dream home from our exclusive collection
          </p>
        </div>

        {/* Floating background shapes */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-white opacity-10 rounded-full animate-ping"></div>
        <div className="absolute bottom-20 right-20 w-32 h-32 bg-indigo-400 opacity-15 rounded-lg rotate-45 animate-bounce"></div>
        <div className="absolute top-1/2 right-10 w-16 h-16 bg-white opacity-10 rounded-full animate-ping"></div>
      </div>

      {/* Main Content */}
      <div className="w-full lg:w-[85%] xl:w-[80%] 2xl:w-[70%] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div
          className={`grid ${
            viewMode === 'grid'
              ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8'
              : 'space-y-6'
          }`}
        >
          {properties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </div>

      {/* Load More Button */}
      <div className="text-center pb-10">
        <button className="bg-gradient-to-r from-blue-900 to-blue-900 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold hover:from-blue-900 hover:to-blue-900 transition-all duration-200 transform hover:scale-105 shadow-lg">
          Load More Properties
        </button>
      </div>
    </div>
  );
};

export default RealEstateGallery;
