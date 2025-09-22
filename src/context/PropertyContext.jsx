/* eslint-disable no-unused-vars */
/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useState, useEffect } from "react";
import { getRequest } from "../Helpers";
import toast from "react-hot-toast";
export const PropertyContext = createContext();

export const PropertyProvider = ({ children }) => {
  const [properties, setProperties] = useState([]);
  const [updateStatus, setUpdateStatus] = useState(false);
  const [propertyType, setPropertyType] = useState("");
  // 🔹 Search ka state
  const [search, setSearch] = useState("");

  // API call function
  useEffect(() => {
    getRequest(`properties?search=${search}&propertyType=${propertyType}`)
      .then((res) => {
        console.log(
          "context Properties API response:===",
          res?.data?.data?.properties
        );
        console.log("context working");

        setProperties(res?.data?.data?.properties || []);
      })
      .catch((err) => {
        console.error("Failed to load properties:", err);
        toast.error("Failed to load properties");
      });
  }, [search, updateStatus, propertyType]);

  return (
    <PropertyContext.Provider
      value={{
        properties,
        setUpdateStatus,
        search,
        setSearch,
        propertyType,
        setPropertyType,
      }}
    >
      {children}
    </PropertyContext.Provider>
  );
};
