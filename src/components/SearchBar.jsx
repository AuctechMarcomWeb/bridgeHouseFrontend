import { State } from "country-state-city";
import React, { useState, useRef, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Locationform from "./Locationform";
import { PropertyContext } from "../context/propertyContext";

const SearchBar = () => {
  const [selectedLocation, setSelectedLocation] = useState("Select State");
  console.log("selectedLocation", selectedLocation);

  const [searchQuery, setSearchQuery] = useState("");
  console.log("searchQuery=====", searchQuery);

  const dropdownRef = useRef(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [states, setStates] = useState([]);

  //const [selectedState, setSelectedState] = useState();
  const navigate = useNavigate();
  const { search, setSearch, setUpdateStatus } = useContext(PropertyContext);

  // ✅ Load states
  useEffect(() => {
    const allStates = State.getStatesOfCountry("IN");
    setStates(allStates);
  }, []);

  // ✅ Dropdown outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ✅ When new state is selected → reset search
  const handleLocationSelect = (stateName) => {
    setSelectedLocation(stateName);
    setSearchQuery("");
    setIsDropdownOpen(false);
  };

  // ✅ Just redirect
  const handleSearch = () => {
    if (
      (!selectedLocation || selectedLocation === "Select State") &&
      (!searchQuery || searchQuery.trim() === "")
    ) {
      alert("Please select at least a state or an address!");
      return;
    }
    // Update context
    //setSearch(searchQuery);
    setUpdateStatus((prev) => !prev);

    // query params banaye
    // const queryParams = new URLSearchParams();
    // if (selectedLocation && selectedLocation !== "Select State") {
    //   queryParams.append("state", selectedLocation);
    // }
    // if (searchQuery && searchQuery.trim() !== "") {
    //   queryParams.append("address", searchQuery.trim());
    // }

    // navigate with filters
    navigate(`/property-list`);
  };

  return (
    <div className="flex flex-wrap items-center justify-start">
      <div className="bg-white rounded-full shadow-xl flex items-center md:max-w-2xl w-full transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
        {/* State Dropdown */}

        {/* State Dropdown using native select */}
        <div className="relative flex items-center px-2 md:px-5 border-gray-200 cursor-pointer hover:bg-gray-50 transition-colors duration-200">
          <select
            className="form-select text-sm md:font-semibold text-gray-700 w-30 border-none focus:outline-none focus:ring-0"
            value={selectedLocation}
            onChange={(e) => handleLocationSelect(e.target.value)}
            aria-label="Select state"
          >
            <option value="">Select state</option>
            {states.map((state) => (
              <option key={state.isoCode} value={state.name}>
                {state.name}
              </option>
            ))}
          </select>
        </div>

        {/* Address Search */}
        <div className="flex-1 md:px-3">
          <Locationform
            value={searchQuery}
            onChange={(val) => setSearchQuery(val)}
            onSelect={(val) => {
              console.log("Location selected:", val);
              //  setSearchQuery(val?.address || "");
              setSearch(val?.address || "");
            }}
          />
        </div>

        {/* Search Button */}
        <button
          onClick={handleSearch}
          className="md:px-8 md:py-5 py-2 px-2 bg-teal-500 text-white font-semibold md:text-base text-sm cursor-pointer rounded-r-full transition-all duration-200 flex items-center gap-2 hover:scale-105 active:scale-95"
        >
          <svg
            className="hidden md:block"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
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
