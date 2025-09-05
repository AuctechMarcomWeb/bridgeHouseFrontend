import React, { useState } from "react";
import { Search, Home, Building } from "lucide-react";
import bannerBg from "../assets/bridge-bg.png";
import SearchBar from "../components/SearchBar";

const RealEstateBanner = () => {
  const [activeTab, setActiveTab] = useState("buy");
  const [formData, setFormData] = useState({
    city: "",
    propertyType: "",
    address: "",
    minPrice: "",
    maxPrice: "",
  });

  const handleTabSwitch = (tab) => {
    setActiveTab(tab);
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const formatPrice = (value) => {
    const numericValue = value.replace(/\D/g, "");
    if (numericValue) {
      return "$" + parseInt(numericValue).toLocaleString();
    }
    return value;
  };

  const handlePriceChange = (field, value) => {
    const formattedValue = formatPrice(value);
    handleInputChange(field, formattedValue);
  };

  const handleSearch = () => {
    const searchParams = {
      type: activeTab,
      ...formData,
    };

    alert(
      `Searching for ${searchParams.type} properties...\n\nCity: ${
        searchParams.city || "Any"
      }\nType: ${searchParams.propertyType || "Any"}\nLocation: ${
        searchParams.address || "Any"
      }\nPrice Range: ${searchParams.minPrice || "$0"} - ${
        searchParams.maxPrice || "$∞"
      }`
    );

    console.log("Search Parameters:", searchParams);
  };

  const cityOptions = [
    { value: "", label: "Select" },
    { value: "lucnkow ", label: "Lucnkow" },
    { value: "barabanki", label: "Barabanki  " },
    { value: "sitapur", label: "Sitapur" },
    { value: "hardoi", label: "Hardoi" },
    { value: "kanpur", label: "Kanpur" },
  ];

  const propertyTypeOptions = [
    { value: "", label: "Select" },
    { value: "1-bhk", label: "1 BHK" },
    { value: "2-bhk", label: "2 BHK" },
    { value: "3-bhk", label: "3 BHK" },
    { value: "villa", label: "Villa" },
    { value: "townhouse", label: "Townhouse" },
  ];

  return (
    <div
      className="relative items-center justify-center w-full  flex items-center  overflow-hidden px-6 md:px-10 lg:px-20 py-16 md:py-24 lg:py-30 "
      style={{
        backgroundImage: `url(${bannerBg})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Main Content */}
      <div className="w-full lg:w-[80%] xl:w-[75%] 2xl:w-[70%] z-10">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-900 leading-tight mb-5">
          {activeTab === "buy" ? (
            <>
              Find Your Best Dream House
              <br />
              for Rental, Buy & Sell...
            </>
          ) : (
            <>
              Find Your Perfect Rental
              <br />
              Property Today...
            </>
          )}
        </h1>

        <p className="text-slate-600 text-base mb-10 leading-relaxed">
          Properties for buy / rent in in your location. We have more than 3000+
          listings for you to choose
        </p>

        {/* Tab Buttons */}
        <div className=" ">
          <div className=" flex flex-wrap  gap-2 pb-2">
            <button
              onClick={() => handleTabSwitch("buy")}
              className={`flex items-center gap-2 px-4 py-3 font-medium text-sm rounded-lg transition-all duration-300 ${
                activeTab === "buy"
                  ? "bg-teal-500 text-white shadow-lg"
                  : "bg-slate-200 text-slate-700 hover:bg-slate-300"
              }`}
            >
              <Home size={18} />
              Buy Property
            </button>
            <button
              onClick={() => handleTabSwitch("rent")}
              className={`flex items-center gap-2 px-4 py-3 font-medium text-sm rounded-lg transition-all duration-300 ${
                activeTab === "rent"
                  ? "bg-teal-500 text-white shadow-lg"
                  : "bg-slate-200 text-slate-700 hover:bg-slate-300"
              }`}
            >
              <Building size={18} />
              Rent Property
            </button>
            <button
              onClick={() => handleTabSwitch("plot")}
              className={`flex items-center gap-2 px-4 py-3 font-medium text-sm rounded-lg transition-all duration-300 ${
                activeTab === "plot"
                  ? "bg-teal-500 text-white shadow-lg"
                  : "bg-slate-200 text-slate-700 hover:bg-slate-300"
              }`}
            >
              <Building size={18} />
              Plot
            </button>
            <button
              onClick={() => handleTabSwitch("commercial")}
              className={`flex items-center gap-2 px-4 py-3 font-medium text-sm rounded-lg transition-all duration-300 ${
                activeTab === "commercial"
                  ? "bg-teal-500 text-white shadow-lg"
                  : "bg-slate-200 text-slate-700 hover:bg-slate-300"
              }`}
            >
              <Building size={18} />
              Commercial
            </button>
          </div>
          <SearchBar />
        </div>

        {/* Search Form */}
        {/* <div className="bg-white rounded-xl p-8 shadow-xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4 sm:gap-5 items-end">
          <div className="flex flex-col">
            <label className="text-sm text-slate-600 mb-2 font-medium">
              City
            </label>
            <select
              value={formData.city}
              onChange={(e) => handleInputChange("city", e.target.value)}
              className="px-4 py-3 border-2 border-slate-200 rounded-lg text-sm bg-white text-slate-700 transition-colors focus:outline-none focus:border-teal-500 cursor-pointer"
            >
              {cityOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col">
            <label className="text-sm text-slate-600 mb-2 font-medium">
              Property Type
            </label>
            <select
              value={formData.propertyType}
              onChange={(e) =>
                handleInputChange("propertyType", e.target.value)
              }
              className="px-4 py-3 border-2 border-slate-200 rounded-lg text-sm bg-white text-slate-700 transition-colors focus:outline-none focus:border-teal-500 cursor-pointer"
            >
              {propertyTypeOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col">
            <label className="text-sm text-slate-600 mb-2 font-medium">
              Min Price
            </label>
            <input
              type="text"
              value={formData.minPrice}
              onChange={(e) => handlePriceChange("minPrice", e.target.value)}
              placeholder="₹"
              className="px-4 py-3 border-2 border-slate-200 rounded-lg text-sm text-slate-700 transition-colors focus:outline-none focus:border-teal-500"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm text-slate-600 mb-2 font-medium">
              Max Price
            </label>
            <input
              type="text"
              value={formData.maxPrice}
              onChange={(e) => handlePriceChange("maxPrice", e.target.value)}
              placeholder="₹"
              className="px-4 py-3 border-2 border-slate-200 rounded-lg text-sm text-slate-700 transition-colors focus:outline-none focus:border-teal-500"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm text-slate-600 mb-2 font-medium">
              Search
            </label>
            <input
              type="text"
              value={formData.address}
              onChange={(e) => handleInputChange("address", e.target.value)}
              placeholder="Enter name,city or anything..."
              className="px-4 py-3 border-2 border-slate-200 rounded-lg text-sm text-slate-700 transition-colors focus:outline-none focus:border-teal-500"
            />
          </div>

          <button
            onClick={handleSearch}
            className="bg-teal-500 text-white px-2 py-3 rounded-lg hover:bg-teal-600 transition-all duration-300 hover:-translate-y-1 shadow-lg hover:shadow-xl flex items-center justify-center cursor-pointer"
          >
            <Search size={20} />
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default RealEstateBanner;
