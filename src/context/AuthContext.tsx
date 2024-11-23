"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { RestaurantUser } from "@/utils/types";

interface AuthContextType {
  user: RestaurantUser | null;
  setUser: React.Dispatch<React.SetStateAction<RestaurantUser | null>>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<RestaurantUser | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Load user from localStorage on refresh
    const storedUser = localStorage.getItem("restaurant-app-user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("restaurant-app-user");
    setUser(null);
    router.push("/log-in");
  };

  return (
    <AuthContext.Provider value={{ user, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom Hook
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};