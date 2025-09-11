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
  useEffect(() => {
    getRequest(`auth/profile`)
      .then((res) => {
        setIsLoggedIn(true);
        setUser(res?.data?.data);
        console.log("dfg res", res?.data?.data);
      })
      .catch((error) => {
        if (error?.response.status == 401) {
          setIsLoggedIn(false);
          console.log("error", error);
          setUser(null);
        }
      });
  }, [updateStatus]);

    const login = (token, userData) => {
    setCookie("token-bridge-house", token, 30); 
    setUser(userData);
    setIsLoggedIn(true);
  };

  const logout = () => {
    setUser(null);
    setIsLoggedIn(false);
    deleteCookie("token-bridge-house");
    console.log("user Loggout");
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
