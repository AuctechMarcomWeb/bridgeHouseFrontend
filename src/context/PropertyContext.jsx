import React, { createContext, useState, useEffect } from "react";
import { getRequest } from "../Helpers"; // aapki helper API function
import toast from "react-hot-toast";

// Context create
export const PropertyContext = createContext();

export const PropertyProvider = ({ children }) => {
  const [properties, setProperties] = useState([]);
  const [updateStatus, setUpdateStatus] = useState(false);
  // const [search, setSearch] = useState("");

  // API call function
  useEffect(() => {
    getRequest(`properties?search`)
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
  }, [updateStatus]);

  return (
    <PropertyContext.Provider
      value={{
        properties,
        setUpdateStatus,
      }}
    >
      {children}
    </PropertyContext.Provider>
  );
};
