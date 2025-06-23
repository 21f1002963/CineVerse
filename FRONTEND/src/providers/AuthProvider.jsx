"use client";

import { api, ENDPOINT } from "@/lib/api";
import { userLoggedInDetails } from "@/redux/userSlice";
import { Loader2Icon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const checkAuth = async () => {
      try {
        console.log("AuthProvider - Checking authentication...");
        const res = await api.get(ENDPOINT.user);
        console.log("AuthProvider - API response:", res.data);
        if (res.data.status === "success") {
          console.log("AuthProvider - User is logged in, dispatching user data");
          dispatch(userLoggedInDetails(res.data.user));
        } else {
          console.log("AuthProvider - API response status is not success:", res.data.status);
        }
      } catch (err) {
        // Only log non-401 errors (401 is expected for unauthenticated users)
        if (err.response?.status !== 401) {
          console.log("Authentication check failed:", err);
        } else {
          console.log("AuthProvider - User is not authenticated (401 response)");
        }
        // This is normal for unauthenticated users - no action needed
      } finally {
        setLoading(false);
      }
    };

    // Set a maximum loading time of 1 second
    const timeoutId = setTimeout(() => {
      setLoading(false);
    }, 1000);

    checkAuth().finally(() => {
      clearTimeout(timeoutId);
      setLoading(false);
    });
  }, [dispatch]);

  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <Loader2Icon className="w-[100px] h-[100px] animate-spin" />
      </div>
    );
  }
    
  return <>{children}</>;
};

export default AuthProvider;
