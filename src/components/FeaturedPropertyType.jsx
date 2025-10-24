/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import RealEstatePopups from "./RealEstatePopups";
import {
  ArrowUpRight,
  Building,
  Home,
  TreePine,
  Building2,
  Copy,
} from "lucide-react";
import { getRequest } from "../Helpers";
import RealEstateLeftPopups from "./RealEstateLeftPopups";
import FloatingPopup from "./FloatingPopup.jsx";
import { PropertyContext } from "../context/PropertyContext.jsx";

export default function FeaturedPropertyType() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const { setPropertyType } = useContext(PropertyContext); // use context
  // 🔹 Filters ka state
  const [filters, setFilters] = useState({
    isPagination: true,
    page: 1,
    limit: 10,
    search: "",
    isActive: true,
    sortBy: "",
  });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  useEffect(() => {
    setLoading(true);
    const queryString = `isPagination=${filters.isPagination}&page=${filters.page}&limit=${filters.limit}&search=${filters.search}&isActive=${filters.isActive}&sortBy=${filters.sortBy}`;
    getRequest(`category?${queryString}`)
      .then((res) => {
        console.log("Category response:", res?.data?.data?.categories || []);
        setCategories(res?.data?.data?.categories || []);
      })
      .catch((err) => {
        console.error("API error:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [filters]);
  console.log("categories-==============================", categories);

  // Icon map
  const iconMap = {
    Building: Building,
    Home: Home,
    TreePine: TreePine,
    Building2: Building2,
    Copy: Copy,
  };

  const navigate = useNavigate();
  function handleClick(name) {
    setPropertyType(name);
    console.log("categoryname", name);

    navigate(`/property-list?propertyType=${name}`);
  }

  return (
    <div
      id="featured-section"
      className=" relative w-full py-8 md:py-12 px-6 bg-white"
    >
      {/* Section Heading */}
      <div className="flex justify-center mb-3">
        <span className="h-1 w-12 bg-gradient-to-r from-purple-500 to-green-400 rounded-full"></span>
      </div>
      <div className="text-center mb-6 md:mb-10">
        <h2 className="text-xl lg:text-3xl font-bold text-gray-800">
          Featured Property Type
        </h2>
        <p className="text-gray-500 mt-2">
          Explore Our Curated Selection of Premium Properties for Unmatched
          Luxury
        </p>
      </div>

      {/* Property Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 w-full lg:w-[80%] xl:w-[75%] 2xl:w-[70%] mx-auto">
        {categories.map((category) => {
          const IconComponent = iconMap[category?.icon] || Home;
          return (
            <div
              key={category?._id}
              onClick={() => handleClick(category?.name)}
              className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden cursor-pointer"
            >
              {/* Image with overlay */}
              <div className="relative h-40">
                <img
                  src={category?.image}
                  alt={category?.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40"></div>

                {/* Icon */}
                <div className="absolute top-3 left-3 bg-white rounded-lg p-2">
                  <IconComponent className="w-6 h-6 text-blue-600" />
                </div>
              </div>

              {/* Content */}
              <div className="p-4 flex justify-between items-center">
                <div>
                  <h3 className="font-semibold text-lg text-gray-800">
                    {category?.name}
                  </h3>
                  <p className="text-gray-500 text-sm">{category?.count}</p>
                </div>
                <ArrowUpRight className="w-5 h-5 text-gray-600" />
              </div>
            </div>
          );
        })}
      </div>
      {/* <RealEstatePopups />
      <RealEstateLeftPopups /> */}
    </div>
  );
}
