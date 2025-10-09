import React, { useEffect, useState } from 'react';
import { MapPin, Bed, Bath, Square } from 'lucide-react';
import { getRequest } from "../Helpers";
import { Pagination } from "antd";

const RealEstateGallery = () => {
  const [viewMode, setViewMode] = useState('grid');
  const [loading, setLoading] = useState(false)
  const [galleryData, setGalleryData] = useState([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(10)
  const [search, setSearch] = useState("")



  useEffect(() => {
    setLoading(true);
    getRequest(
      `gallery?isPagination=true&page=${page}&limit=${limit}&search=${search}&sortBy=recent&isActive=true`
    )
      .then((res) => {

        setGalleryData(res?.data?.data?.gallery || [])
        console.log("API Response: ======================", galleryData);
        setTotal(res?.data?.data?.totalGallery || 0);
      })
      .catch(err => console.error("API Error:", err))
      .finally(() => setLoading(false));
  }, [page, limit, search ]);


  // Search handler
  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setPage(1); // Reset to first page for new search
  };


  const PropertyCard = ({ property }) => (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group">
      {/* Image only */}
      <div className="relative w-full h-56 sm:h-64 md:h-72 lg:h-80 overflow-hidden">
        <img
          src={property.url}
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
      <div className="w-full lg:w-[85%] xl:w-[80%] 2xl:w-[70%] mx-auto px-4 sm:px-6 lg:px-8 py-8 relative">
        {/* Search box */}
        <div className="w-full flex justify-end mb-5">
          <div className="w-80 relative">
            <input
              type="text"
              placeholder="Search properties..."
              value={search}
              onChange={handleSearchChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {/* Search Icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z"
              />
            </svg>
          </div>
        </div>

        {/* Gallery Grid or Not Found */}
        <div className={`grid ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8' : 'space-y-6'}`}>
          {galleryData.length > 0 ? (
            galleryData.map((property) => (
              <PropertyCard key={property._id} property={property} />
            ))
          ) : (
            !loading && (
              <div className="col-span-full text-center text-gray-500 text-lg py-12">
                🔍 No properties found.
              </div>
            )
          )}
        </div>

        {/* Pagination: only show if data exists */}
        {galleryData.length > 0 && (
          <div className="flex justify-end mt-6">
            <Pagination
              current={page}
              total={total}
              pageSize={limit}
              onChange={(newPage) => setPage(newPage)}
              showSizeChanger={false}
            />
          </div>
        )}

      </div>
      {/* Loading Spinner Overlay */}
      {loading && (
        <div className="absolute inset-0 flex justify-center items-center bg-white/70 z-20">
          <div className="flex flex-col mt-5 items-center">
            <div className="w-12 h-12 border-4 border-t-blue-500 border-b-blue-500 border-gray-200 rounded-full animate-spin"></div>
            <p className="mt-4 text-gray-600 font-medium">Loading Gallery...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default RealEstateGallery;


