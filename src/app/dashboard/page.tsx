"use client";

import React, { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { RestaurantUser } from "@/utils/types";
import { checkLoginExpiery } from "@/utils/helpers";
import dashboardStyles from "./page.module.css";
import LoggedOutModal from "@/components/LoggedOutModal";
import Image from "next/image";
import Link from "next/link";
import { useProducts } from "@/context/ProductsContext";
import { useRouter } from "next/router";

const Dashboard = () => {
  const { logout, showModal } = useAuth();

  const [userDetails, setUserDetails] = useState<RestaurantUser | null>(null);
  const { productsList } = useProducts();
  const [activeProductsCount, setActiveProductsCount] = useState<number | null>(
    null
  );
  const [inActiveProductsCount, setInActiveProductsCount] = useState<
    number | null
  >(null);
  const [isClient, setIsClient] = useState(false); // Track if the app is running on the client
  useEffect(() => {
    // Only run this code on the client side
    setIsClient(true);
  }, []);

  useEffect(() => {
    const resUser = localStorage.getItem("restaurant-app-user");
    if (resUser) {
      const parsedResUser = JSON.parse(resUser);
      setUserDetails(parsedResUser);
    }
  }, []);

  useEffect(() => {
    const activeFilteredList = productsList.filter(
      (item) => item.isActive === 1
    );
    setActiveProductsCount(activeFilteredList.length);
    const inActiveFilteredList = productsList.filter(
      (item) => item.isActive === 0
    );
    setInActiveProductsCount(inActiveFilteredList.length);
  }, [productsList]);

  useEffect(() => {
    if (userDetails) {
      const isSessionValid = checkLoginExpiery(userDetails.loggedInAt);

      if (isSessionValid) {
        const remainingTime =
          15 * 60 * 1000 -
          (Date.now() - new Date(userDetails.loggedInAt).getTime());

        const timer = setTimeout(() => {
          logout();
        }, remainingTime);

        return () => clearTimeout(timer);
      } else {
        logout();
      }
    }
  }, [userDetails, logout]);

  const handleAddUser = () => {
    // Check if we are on the client before using useRouter
    // if (isClient) {
    //   router.push("/sign-up");
    // }
  };

  const renderAdminView = () => (
    <div className={dashboardStyles.adminMainContainer}>
      <div className={dashboardStyles.adminContainerOne}>
        <h1>Welcome Admin!</h1>
        <div>
          <button onClick={handleAddUser}>Add User</button>
          <button onClick={logout}>Log Out</button>
        </div>
      </div>
      <h3>Product Analytics</h3>
      <div className={dashboardStyles.adminContainerTwo}>
        <div className={dashboardStyles.adminListCard}>
          <h2>{productsList.length}</h2>
          <h3>Total</h3>
        </div>
        <div className={dashboardStyles.adminListCard}>
          <h2>{activeProductsCount}</h2>
          <h3>Active</h3>
        </div>
        <div className={dashboardStyles.adminListCard}>
          <h2>{inActiveProductsCount}</h2>
          <h3>In-Active</h3>
        </div>
      </div>
    </div>
  );

  const renderManagerView = () => <div>Manager View</div>;

  const renderAccessDeniedView = () => <div>Access Denied</div>;

  return (
    <section id="Dashboard" className={dashboardStyles.dashboardMainContainer}>
      {/* {showModal && <LoggedOutModal />} */}
      <div className={dashboardStyles.dashboardBrandingContainer}>
        <Image
          width={200}
          height={200}
          className={dashboardStyles.dashboardLogo}
          alt="ss-logo"
          src="https://raw.githubusercontent.com/CVSCharan/resturant-app-assets/refs/heads/main/restaurant-logo-img.png"
          priority
        />

        <Link
          href="/"
          className={`playwrite-gb-s-text ${dashboardStyles.dashboardBrand}`}
        >
          Restaurant Name
        </Link>
      </div>
      {userDetails && userDetails.role === "admin"
        ? renderAdminView()
        : userDetails?.role === "manager"
        ? renderManagerView()
        : renderAccessDeniedView()}
    </section>
  );
};

export default Dashboard;
