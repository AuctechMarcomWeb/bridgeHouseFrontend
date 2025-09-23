import React, { createContext, useEffect, useState } from "react";
import { getRequest } from "../Helpers";
import useCookie, { deleteCookie } from "../Hooks/cookie";

export const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
  const { setCookie } = useCookie();
  const [user, setUser] = useState(null);
  const [updateStatus, setUpdateStatus] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  console.log("isLoggedIn", isLoggedIn);

  //  Profile fetcher function
  const fetchProfile = async () => {
    try {
      const res = await getRequest("auth/profile");
      setIsLoggedIn(true);
      setUser(res?.data?.data);
      console.log("Profile Data ===>", res?.data?.data);
    } catch (error) {
      if (error?.response?.status === 401) {
        setIsLoggedIn(false);
        setUser(null);
        console.log("Unauthorized:", error);
      }
    }
  };


  //  Run on mount and whenever updateStatus changes
  useEffect(() => {
    fetchProfile();
  }, [updateStatus]);

  
  //  Login function
  const login = async (token, userData) => {
    setCookie("token-bridge-house", token, 30);
    setIsLoggedIn(true);
    setUser(userData);


    //  Turant backend se fresh profile la lo

    await fetchProfile();
  };

  //  Logout function
  const logout = () => {
    setUser(null);
    setIsLoggedIn(false);
    deleteCookie("token-bridge-house");
    console.log("User Logged Out");
  };

  return (
    <ProfileContext.Provider
      value={{
        user,
        setUser,
        isLoggedIn,
        setUpdateStatus,
        setIsLoggedIn,
        login,
        logout,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};
