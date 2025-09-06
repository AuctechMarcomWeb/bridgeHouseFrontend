import React, { createContext, useEffect, useState } from "react";
import { getRequest } from "../Helpers";

export const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  console.log("user==============>", 547546546546546);

  const [updateStatus,setUpdateStatus] = useState(false)

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  console.log("isLoggedIn", isLoggedIn);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getRequest(`auth/profile`)
      .then((res) => {
        setIsLoggedIn(true);
        setUser(res?.data);
        console.log("dfg res", res?.data);
      })
      .catch((error) => {
        if (error?.response.status == 401) {
          setIsLoggedIn(false);
          console.log("error", error);
        }
      });

      }, [updateStatus]);
  const logout = () => {
    setUser(null);
    setIsLoggedIn(false);
    console.log("user Loggout");
  };
  return (
    <ProfileContext.Provider
      value={{ user, setUser, isLoggedIn,setUpdateStatus, setIsLoggedIn, loading, logout }}
    >
      {children}
    </ProfileContext.Provider>
  );
};
