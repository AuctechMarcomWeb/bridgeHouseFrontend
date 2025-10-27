// /* eslint-disable no-unused-vars */
// import React, { useContext, useEffect, useState } from "react";
// import { Home, Building, Search, Warehouse, Building2 } from "lucide-react";
// import bannerBg from "../assets/bridge-bg.png";
// import SearchBar from "../components/SearchBar";
// import { getRequest } from "../Helpers";
// import { PropertyContext } from "../context/PropertyContext";
// import { useNavigate } from "react-router-dom";

// const RealEstateBanner = () => {
//   const [activeTab, setActiveTab] = useState("");
//   const [propertyTypes, setPropertyTypes] = useState([]);
//   const { setPropertyType, setUpdateStatus } = useContext(PropertyContext);
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     city: "",
//     propertyType: "",
//     address: "",
//     minPrice: "",
//     maxPrice: "",
//   });

//   const iconsMap = {
//     residential: Home,
//     plot: Home,
//     commercial: Building2,
//     villa: Building2,
//   };

//   const handleTabSwitch = (tab) => {
//     setActiveTab(tab);
//     setPropertyType(tab); // update context
//   };

//   const handleInputChange = (field, value) => {
//     setFormData((prev) => ({
//       ...prev,
//       [field]: value,
//     }));
//   };

//   useEffect(() => {
//     getRequest("category?type=all")
//       .then((res) => {
//         let data = res?.data?.data?.categories || [];
//         data = data.slice(0, 4); // limit to 4 items
//         setPropertyTypes(data);

//         if (data.length > 0) setActiveTab(data[0].name); // first tab active by default
//       })
//       .catch((err) => console.log("Error fetching categories:", err));
//   }, []);

//   const formatPrice = (value) => {
//     const numericValue = value.replace(/\D/g, "");
//     if (numericValue) {
//       return "$" + parseInt(numericValue).toLocaleString();
//     }
//     return value;
//   };

//   const handlePriceChange = (field, value) => {
//     const formattedValue = formatPrice(value);
//     handleInputChange(field, formattedValue);
//   };

//   return (
//     <div
//       className="relative flex items-center justify-center w-full 
//                  px-4 sm:px-6 md:px-10 lg:px-20 
//                  py-12 sm:py-16 md:py-24 lg:py-30"
//       id="home"
//       style={{
//         backgroundImage: `url(${bannerBg})`,
//         backgroundRepeat: "no-repeat",
//         backgroundSize: "cover",
//         backgroundPosition: "center",
//       }}
//     >
//       {/* Main Content */}
//       <div className="w-full sm:w-[90%] md:w-[85%] lg:w-[80%] xl:w-[75%] 2xl:w-[70%] z-10">
//         <h1
//           className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl 
//                      font-extrabold text-slate-900 leading-tight mb-4 sm:mb-5"
//         >
//           {activeTab === "buy" ? (
//             <>
//               Find Your Best Dream House
//               <br />
//               for Rental, Buy & Sell...
//             </>
//           ) : (
//             <>
//               Find Your Perfect Rental
//               <br />
//               Property Today...
//             </>
//           )}
//         </h1>

//         <p
//           className="text-slate-600 text-sm sm:text-base md:text-lg 
//                      mb-6 sm:mb-8 md:mb-10 leading-relaxed"
//         >
//           Properties for buy / rent in your location. We have more than 3000+
//           listings for you to choose
//         </p>

// {/* Tab Buttons */}
// <div className="w-full sm:w-[95%] md:w-full lg:w-[80%] xl:w-[75%] 2xl:w-[70%] z-10">
//   <div className="flex flex-wrap justify-start gap-2 pb-2 hover:pointer">
//     {propertyTypes.length > 0 ? (
//       propertyTypes.map((type) => {
//         const iconKey = type.name?.toLowerCase().trim();
//         const Icon = iconsMap[iconKey] || Home;

//         return (
//           <button
//             key={type._id}
//             onClick={() => handleTabSwitch(type.name)}
//             className={`flex items-center gap-2 
//                         px-3 sm:px-4 py-2 sm:py-3 
//                         text-xs sm:text-sm md:text-base 
//                         font-medium rounded-lg 
//                         transition-all duration-300 
//                         flex-1 sm:flex-auto min-w-[100px] ${
//                           activeTab === type.name
//                             ? "bg-[#004f8a]  text-white shadow-lg"
//                             : "bg-slate-200 text-slate-700 hover:bg-slate-300"
//                         }`}
//           >
//             <Icon size={16} className="sm:w-5 sm:h-5" />
//             {type.name}
//           </button>
//         );
//       })
//     ) : (
//       <p className="text-gray-500">No property types found</p>
//     )}
//   </div>

//   {/* SearchBar */}
//   <div className="w-full flex flex-col sm:flex-row sm:items-center gap-3 mt-4">
//     <SearchBar activeTab={activeTab} />
//   </div>
// </div>

//       </div>
//     </div>
//   );
// };

// export default RealEstateBanner;
/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from "react";
import { Home, Building2 } from "lucide-react";
import bannerBg from "../assets/bridge-bg.png";
import SearchBar from "../components/SearchBar";
import { getRequest } from "../Helpers";
import { PropertyContext } from "../context/PropertyContext";
import { useNavigate } from "react-router-dom";

const RealEstateBanner = () => {
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [propertyTypes, setPropertyTypes] = useState([]);
  const { setPropertyType } = useContext(PropertyContext);
  const navigate = useNavigate();

  const iconsMap = {
    residential: Home,
    plot: Home,
    commercial: Building2,
    villa: Building2,
  };

  useEffect(() => {
    getRequest("category?type=all")
      .then((res) => {
        let data = res?.data?.data?.categories || [];
        data = data.slice(0, 4); // limit to 4 items
        setPropertyTypes(data);
      })
      .catch((err) => console.log("Error fetching categories:", err));
  }, []);

  const handleCheckboxChange = (typeName) => {
    setSelectedTypes((prev) => {
      let updated;
      if (prev.includes(typeName)) {
        updated = prev.filter((item) => item !== typeName);
      } else {
        updated = [...prev, typeName];
      }
      setPropertyType(updated); // update context with selected property types
      return updated;
    });
  };


const handleTypeClick = (typeName) => {
  setSelectedTypes((prev) => {
    const isSame = prev === typeName;
    const newSelected = isSame ? "" : typeName;

    // ✅ Send plain string (not template string)
    setPropertyType(isSame ? "" : typeName);

    return newSelected;
  });
};

  return (
    <div
      className="relative flex items-center justify-center w-full 
                 px-4 sm:px-6 md:px-10 lg:px-20 
                 py-12 sm:py-16 md:py-24 lg:py-30"
      id="home"
      style={{
        backgroundImage: `url(${bannerBg})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Main Content */}
      <div className="w-full sm:w-[90%] md:w-[85%] lg:w-[80%] xl:w-[75%] 2xl:w-[70%] z-10">
        <h1
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl 
                     font-extrabold text-slate-900 leading-tight mb-4 sm:mb-5"
        >
          Find Your Best Dream House
          <br />
          for Rental, Buy & Sell...
        </h1>

        <p
          className="text-slate-600 text-sm sm:text-base md:text-lg 
                     mb-6 sm:mb-8 md:mb-10 leading-relaxed"
        >
          Properties for buy / rent in your location. We have more than 3000+
          listings for you to choose
        </p>

        {/* Checkbox Section */}
        <div className="w-full sm:w-[95%] md:w-full lg:w-[80%] xl:w-[75%] 2xl:w-[70%] z-10">
          <div className="flex flex-wrap justify-start gap-3 pb-2">
            {propertyTypes.length > 0 ? (
              propertyTypes.map((type) => {
                const iconKey = type.name?.toLowerCase().trim();
                const Icon = iconsMap[iconKey] || Home;
                const isActive = selectedTypes === type.name; // 👈 single selection check

                return (
                  <button
                    key={type._id}
                    onClick={() => handleTypeClick(type.name)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg border font-medium cursor-pointer transition-all duration-200
              ${isActive
                        ? "bg-[#004f8a] text-white border-[#004f8a] scale-105"
                        : "bg-slate-200 text-slate-700 border-gray-300 hover:bg-slate-300"
                      }`}
                  >
                    <Icon size={16} className="sm:w-5 sm:h-5" />
                    {type.name}
                  </button>
                );
              })
            ) : (
              <p className="text-gray-500">No property types found</p>
            )}
          </div>

          {/* SearchBar */}
          <div className="w-full flex flex-col sm:flex-row sm:items-center gap-3 mt-4">
            <SearchBar activeTab={selectedTypes} />
          </div>
        </div>

      </div>
    </div>
  );
};

export default RealEstateBanner;
