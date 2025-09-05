import React, { useState } from 'react';
import { Heart, MapPin, Bed, Bath, Square, Filter, Grid, List, Search } from 'lucide-react';

const RealEstateGallery = () => {
  const [favorites, setFavorites] = useState(new Set());
  const [viewMode, setViewMode] = useState('grid');
  const [filterType, setFilterType] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const properties = [
    {
      id: 1,
      title: "Modern Downtown Loft",
      price: "$850,000",
      location: "Manhattan, NY",
      beds: 2,
      baths: 2,
      sqft: "1,200",
      type: "apartment",
      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&h=300&fit=crop",
      featured: true
    },
    {
      id: 2,
      title: "Luxury Villa with Pool",
      price: "$2,450,000",
      location: "Beverly Hills, CA",
      beds: 5,
      baths: 4,
      sqft: "4,200",
      type: "house",
      image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&h=300&fit=crop",
      featured: true
    },
    {
      id: 3,
      title: "Cozy Suburban Home",
      price: "$485,000",
      location: "Austin, TX",
      beds: 3,
      baths: 2,
      sqft: "1,800",
      type: "house",
      image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=400&h=300&fit=crop"
    },
    {
      id: 4,
      title: "Penthouse Suite",
      price: "$1,200,000",
      location: "Miami, FL",
      beds: 3,
      baths: 3,
      sqft: "2,100",
      type: "apartment",
      image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400&h=300&fit=crop"
    },
    {
      id: 5,
      title: "Historic Brownstone",
      price: "$1,850,000",
      location: "Boston, MA",
      beds: 4,
      baths: 3,
      sqft: "2,800",
      type: "house",
      image: "https://images.unsplash.com/photo-1605146769289-440113cc3d00?w=400&h=300&fit=crop"
    },
    {
      id: 6,
      title: "Mountain View Cabin",
      price: "$695,000",
      location: "Aspen, CO",
      beds: 3,
      baths: 2,
      sqft: "1,600",
      type: "house",
      image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=300&fit=crop"
    }
  ];

  const toggleFavorite = (id) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(id)) {
      newFavorites.delete(id);
    } else {
      newFavorites.add(id);
    }
    setFavorites(newFavorites);
  };

  const filteredProperties = properties.filter(property => {
    const matchesType = filterType === 'all' || property.type === filterType;
    const matchesSearch = property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         property.location.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesType && matchesSearch;
  });

  const PropertyCard = ({ property }) => (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group">
      <div className="relative overflow-hidden">
        <img 
          src={property.image} 
          alt={property.title}
          className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute top-4 left-4">
          {property.featured && (
            <span className="bg-gradient-to-r from-orange-400 to-pink-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
              Featured
            </span>
          )}
        </div>
        <button
          onClick={() => toggleFavorite(property.id)}
          className="absolute top-4 right-4 p-2 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white transition-all duration-200"
        >
          <Heart 
            className={`w-5 h-5 transition-colors ${
              favorites.has(property.id) ? 'fill-red-500 text-red-500' : 'text-gray-600'
            }`}
          />
        </button>
      </div>
      
      <div className="p-6">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-lg font-bold text-gray-800 group-hover:text-blue-600 transition-colors">
            {property.title}
          </h3>
          <span className="text-lg font-bold text-green-600">{property.price}</span>
        </div>
        
        <div className="flex items-center text-gray-600 mb-4">
          <MapPin className="w-4 h-4 mr-1" />
          <span className="text-sm">{property.location}</span>
        </div>
        
        <div className="flex justify-between items-center text-gray-700">
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <Bed className="w-4 h-4 mr-1" />
              <span className="text-sm">{property.beds}</span>
            </div>
            <div className="flex items-center">
              <Bath className="w-4 h-4 mr-1" />
              <span className="text-sm">{property.baths}</span>
            </div>
            <div className="flex items-center">
              <Square className="w-4 h-4 mr-1" />
              <span className="text-sm">{property.sqft} sqft</span>
            </div>
          </div>
        </div>
        
        <button className="w-full mt-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105">
          View Details
        </button>
      </div>
    </div>
  );

  const PropertyListItem = ({ property }) => (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 mb-4">
      <div className="flex flex-col md:flex-row">
        <div className="relative md:w-80 h-48 md:h-auto overflow-hidden">
          <img 
            src={property.image} 
            alt={property.title}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
          {property.featured && (
            <span className="absolute top-4 left-4 bg-gradient-to-r from-orange-400 to-pink-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
              Featured
            </span>
          )}
          <button
            onClick={() => toggleFavorite(property.id)}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white transition-all duration-200"
          >
            <Heart 
              className={`w-5 h-5 transition-colors ${
                favorites.has(property.id) ? 'fill-red-500 text-red-500' : 'text-gray-600'
              }`}
            />
          </button>
        </div>
        
        <div className="flex-1 p-6">
          <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-3">
            <h3 className="text-lg font-bold text-gray-800 hover:text-blue-600 transition-colors mb-2 md:mb-0">
              {property.title}
            </h3>
            <span className="text-lg font-bold text-green-600">{property.price}</span>
          </div>
          
          <div className="flex items-center text-gray-600 mb-4">
            <MapPin className="w-5 h-5 mr-2" />
            <span>{property.location}</span>
          </div>
          
          <div className="flex items-center space-x-6 mb-6">
            <div className="flex items-center">
              <Bed className="w-5 h-5 mr-2 text-blue-500" />
              <span className="text-sm font-medium">{property.beds} Bedrooms</span>
            </div>
            <div className="flex items-center">
              <Bath className="w-5 h-5 mr-2 text-blue-500" />
              <span className="text-sm font-medium">{property.baths} Bathrooms</span>
            </div>
            <div className="flex items-center">
              <Square className="w-5 h-5 mr-2 text-blue-500" />
              <span className="text-sm font-medium">{property.sqft} sqft</span>
            </div>
          </div>
          
          <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105">
            View Details
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-lg sticky top-0 z-50">
        <div className="sm:w-full lg:w-[80%]  xl:w-[80%] 2xl:w-[70%] mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            <div>
              <h1 className="2xl:text-3xl md:text-2xl text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                 Properties Gallery
              </h1>
              <p className="text-gray-600 mt-2">Discover your dream home from our exclusive collection</p>
            </div>
            
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search properties..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-3 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full sm:w-64"
                />
              </div>
              
              {/* Filter */}
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="pl-10 pr-8 py-3 border text-sm border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
                >
                  <option value="all">All Types</option>
                  <option value="house">Houses</option>
                  <option value="apartment">Apartments</option>
                </select>
              </div>
              
              {/* View Toggle */}
              <div className="flex bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-md transition-all ${
                    viewMode === 'grid' 
                      ? 'bg-white shadow-sm text-blue-600' 
                      : 'text-gray-600 hover:text-gray-800'
                  }`}
                >
                  <Grid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-md transition-all ${
                    viewMode === 'list' 
                      ? 'bg-white shadow-sm text-blue-600' 
                      : 'text-gray-600 hover:text-gray-800'
                  }`}
                >
                  <List className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className=" sm:w-full lg:w-[80%]  xl:w-[80%] 2xl:w-[70%] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Bar */}
        <div className="hidden md:block mb-8 p-6 bg-white rounded-xl shadow-lg">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{filteredProperties.length}</div>
              <div className=" text-gray-600">Properties</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{favorites.size}</div>
              <div className="text-gray-600">Favorites</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">15+</div>
              <div className="text-gray-600">Cities</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">5★</div>
              <div className="text-gray-600">Rating</div>
            </div>
          </div>
        </div>

        {/* Properties Grid/List */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProperties.map(property => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        ) : (
          <div className="space-y-6">
            {filteredProperties.map(property => (
              <PropertyListItem key={property.id} property={property} />
            ))}
          </div>
        )}

        {filteredProperties.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🏠</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">No Properties Found</h3>
            <p className="text-gray-600">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>

      {/* Load More Button */}
      {filteredProperties.length > 0 && (
        <div className="text-center pb-8">
          <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 shadow-lg">
            Load More Properties
          </button>
        </div>
      )}

      {/* Footer CTA */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-8">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl font-bold mb-4">Ready to Find Your Dream Home?</h2>
          <p className="text-lg mb-8 text-blue-100">Connect with our expert agents today</p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <button className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-200 transform hover:scale-105">
              Contact Agent
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-all duration-200 transform hover:scale-105">
              Schedule Tour
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RealEstateGallery;