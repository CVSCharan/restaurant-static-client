"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { RestaurantUser } from "@/utils/types";

interface AuthContextType {
  user: RestaurantUser | null;
  setUser: React.Dispatch<React.SetStateAction<RestaurantUser | null>>;
  logout: () => void;
  login: (user: RestaurantUser) => void;
  showModal: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<RestaurantUser | null>(null);
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem("restaurant-app-user");
    if (storedUser) {
      const parsedStoredUser = JSON.parse(storedUser);
      setUser(parsedStoredUser);
    }
  }, []);

  const login = (user: RestaurantUser) => {
    localStorage.setItem("restaurant-app-user", JSON.stringify(user));
    setUser(user);
    router.push("/dashboard");
  };

  const logout = () => {
    localStorage.removeItem("restaurant-app-user");
    setUser(null);
    setShowModal(true);
    router.push("/log-in");
  };

  return (
    <AuthContext.Provider value={{ user, setUser, logout, login, showModal }}>
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
