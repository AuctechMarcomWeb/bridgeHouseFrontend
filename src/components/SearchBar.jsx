import React, { useState, useRef, useEffect } from 'react';

const SearchBar = () => {
  const [selectedLocation, setSelectedLocation] = useState('Mumbai');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const dropdownRef = useRef(null);

  const cities = [
    'Mumbai',
    'Delhi',
    'Bangalore',
    'Chennai',
    'Hyderabad',
    'Pune',
    'Kolkata'
  ];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLocationSelect = (city) => {
    setSelectedLocation(city);
    setIsDropdownOpen(false);
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      console.log(`Searching for "${searchQuery}" in ${selectedLocation}`);
      alert(`Searching for "${searchQuery}" in ${selectedLocation}`);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className=" flex flex-wrap items-center justify-start" >
      <div className="bg-white rounded-full shadow-xl flex items-center md:max-w-2xl w-full  transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
        
        {/* Location Selector */}
        <div 
          ref={dropdownRef}
          className="relative flex items-center px-2 md:px-5 border-r border-gray-200 cursor-pointer hover:bg-gray-50 transition-colors duration-200"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          <span className="md:font-semibold text-sm text-gray-700 mr-2 whitespace-nowrap">
            {selectedLocation}
          </span>
          <svg 
            className={`text-gray-500 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`}
            width="12" 
            height="8" 
            viewBox="0 0 12 8" 
            fill="currentColor"
          >
            <path 
              d="M1 1l5 5 5-5" 
              stroke="currentColor" 
              strokeWidth="2" 
              fill="none" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
          </svg>
          
          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div className="absolute top-full left-0 right-0 bg-white h-15 md:w-35 md:h-35 overflow-x-auto rounded-xl shadow-lg z-10 mt-2 py-2">
              {cities.map((city) => (
                <div
                  key={city}
                  className="md:px-5 px-2 md:py-3 text-sm cursor-pointer hover:bg-gray-50 transition-colors duration-200 border-b border-gray-100 last:border-b-0"
                  onClick={() => handleLocationSelect(city)}
                >
                  {city}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Search Input */}
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Search for locality, landmark, project, or builder"
          className="flex-1 md:px-5 md:py-5 py-2 md:text-base text-sm text-gray-700  placeholder-gray-400 border-none  "
        />

        {/* Search Button */}
        <button
          onClick={handleSearch}
          className="md:px-8 md:py-5 py-2 px-2  bg-teal-500 text-white font-semibold md:text-base  text-sm cursor-pointer rounded-r-full transition-all duration-200 flex items-center gap-2 hover:scale-105 active:scale-95"
          // style={{ 
          //   background: 'linear-gradient(135deg, #19c088ff 0%, #059669 100%)',
          // }}
          onMouseEnter={(e) => {
            e.target.style.background = 'linear-gradient(135deg, #059669 0%, #047857 100%)';
          }}
          onMouseLeave={(e) => {
            e.target.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';
          }}
        >
          <svg className='hidden md:block' width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path 
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
              stroke="currentColor" 
              strokeWidth="2" 
              fill="none" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
          </svg>
          Search
        </button>
      </div>
    </div>
  );
};

export default SearchBar;