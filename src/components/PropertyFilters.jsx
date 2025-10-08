/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import React, { useEffect, useState } from "react";
import { Slider } from "antd";
import { ChevronDown, Search, SlidersHorizontal } from "lucide-react";
import { getRequest } from "../Helpers";

export default function PropertyFilters({
  filters,
  setFilters,

  handleApplyFilters,
  handleResetFilters,
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [bhk, setBhk] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [updateStatus, setUpdateStatus] = useState(false);
  const [category, setCategory] = useState([]);
  const [openDropdowns, setOpenDropdowns] = useState({
    propertyType: true,
    bhk: true,
  });

  const toggleDropdown = (dropdown) => {
    setOpenDropdowns((prev) => ({
      ...prev,
      [dropdown]: !prev[dropdown], // click karne par toggle ho
    }));
  };


  // ✅ Fetch BHK with Pagination + Search
  useEffect(() => {
    getRequest(`bhk?search=${searchTerm}&page=${page}&limit=${limit}`)
      .then((res) => {
        const responseData = res?.data?.data;
        setBhk(responseData?.bhks || []);
        setTotal(responseData?.totalBhks || 0);
      })
      .catch((error) => {
        console.log("error", error);
      });
  }, [page, limit, searchTerm, updateStatus]);

  // ✅ Fetch Property Type with Pagination + Search
  useEffect(() => {
    getRequest(`category?search=${searchTerm}&page=${page}&limit=${limit}`)
      .then((res) => {
        const responseData = res?.data?.data;
        setCategory(responseData?.categories || []);
        setTotal(responseData?.totalCategories || 0);
      })
      .catch((error) => {
        console.log("error", error);
      });
  }, [page, limit, searchTerm, updateStatus]);

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden sticky top-8">
      <div className="px-6 py-4">
        <div className="flex items-center gap-3 text-grey-800">
          <SlidersHorizontal className="w-5 h-5" />
          <h2 className="text-lg font-semibold">Filters</h2>
        </div>
      </div>

      <div className="p-6 space-y-6 ">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search properties..."
            value={filters.search}
            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
            className="w-full pl-11 pr-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 hover:bg-white transition-all"
          />
        </div>

        {/* Sqft Range */}
        <div className="space-y-3">
          <label className="block text-sm font-semibold text-gray-700">
            Square Feet Range
          </label>
          <Slider
            range
            min={250}
            max={100000}
            step={50}
            value={[filters.minSqft || 250, filters.maxSqft || 100000]}
            onChange={(val) =>
              setFilters({ ...filters, minSqft: val[0], maxSqft: val[1] })
            }
          />
          <div className="flex justify-between text-xs text-gray-500">
            <span>{filters.minSqft || 250} sqft</span>
            <span>{filters.maxSqft || 100000} sqft</span>
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
              className={`w-4 h-4 text-gray-400 transition-transform ${openDropdowns.propertyType ? "rotate-180" : ""
                }`}
            />
          </button>
          {openDropdowns.propertyType && (
            <div className="space-y-3 pl-4 border-l-2 border-blue-100">
              {category.length > 0 ? (
                category.map((cat) => (
                  <label
                    key={cat._id}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <input
                      type="radio"
                      name="propertyType"
                      value={cat.name}
                      checked={filters.propertyType === cat.name}
                      onChange={(e) =>
                        setFilters({ ...filters, propertyType: e.target.value })
                      }
                      className="w-4 h-4 text-blue-600"
                    />
                    <span className="text-sm">{cat.name}</span>
                  </label>
                ))
              ) : (
                <p className="text-sm text-gray-400">No property types found</p>
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
              className={`w-4 h-4 text-gray-400 transition-transform ${openDropdowns.bhk ? "rotate-180" : ""
                }`}
            />
          </button>





          {openDropdowns.bhk && bhk.length > 0 && (
            <div className="space-y-3 pl-4 border-l-2 border-blue-100">
              {bhk.map((item) => (
                <label
                  key={item._id}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <input
                    type="radio"
                    name="bhk"
                    value={item.name}
                    checked={filters.bhk === item.name}
                    onChange={(e) =>
                      setFilters({ ...filters, bhk: e.target.value })
                    }
                    className="w-4 h-4 text-blue-600"
                  />
                  <span className="text-sm">{item.name}</span>
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
            min={500000}
            max={10000000}
            step={5000}
            value={[filters.minPrice || 500000, filters.maxPrice || 10000000]}
            onChange={(val) =>
              setFilters({ ...filters, minPrice: val[0], maxPrice: val[1] })
            }
          />
          <div className="flex justify-between text-xs text-gray-500">
            <span>₹{filters.minPrice || 500000}</span>
            <span>₹{filters.maxPrice || 10000000}</span>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          {/* Apply Button */}
          <button
            onClick={handleApplyFilters}
            className="w-full bg-[#004f8a] text-white py-2 rounded-xl font-semibold hover:bg-[#004f8a] transition-all"
          >
            Apply Filters
          </button>

          {/* Reset Button */}
          <button
            onClick={handleResetFilters}
            className="w-full bg-[#004f8a] text-white py-2 rounded-xl font-semibold hover:bg-[#004f8a] transition-all"
          >
            Reset All Filters
          </button>
        </div>
      </div>
    </div>
  );
}
