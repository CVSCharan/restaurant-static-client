"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // Use `next/navigation` in the app directory
import Link from "next/link";
import dashboardStyles from "./page.module.css";
import { useAuth } from "@/context/AuthContext";
import Image from "next/image";
import TabsComp from "@/components/TabsComponent";

const Dashboard = () => {
  const router = useRouter();

  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const { user, setUser } = useAuth();

  useEffect(() => {
    const storedUser = localStorage.getItem("restaurant-app-user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser); // Safely parse the string
        console.log(parsedUser);
        setUser(parsedUser);
      } catch (error) {
        console.error("Error parsing stored user:", error);
      }
    } else {
      router.push("/log-in"); // Redirect to login if user is absent
    }
  }, []);

  const renderAdminView = () => {
    return (
      <div className={dashboardStyles.adminMainContainer}>
        <div
          style={{
            backgroundImage:
              "url(https://raw.githubusercontent.com/CVSCharan/resturant-app-assets/refs/heads/main/restaurant-stock-img-2.jpg)",
          }}
          className={dashboardStyles.adminBannerContainer}
        >
          <div className={dashboardStyles.dashboardBrandingContainer}>
            <Image
              width={200}
              height={200}
              className={dashboardStyles.dashboardLogo}
              alt="ss-logo"
              src="https://raw.githubusercontent.com/CVSCharan/resturant-app-assets/refs/heads/main/restaurant-logo-img.png"
              priority // Use priority to load the image eagerly
            />

            <Link
              href="/"
              className={`playwrite-gb-s-text ${dashboardStyles.dashboardBrand}`}
            >
              Restaurant Name
            </Link>
          </div>
        </div>
        <div className={dashboardStyles.adminDashboardContainer}>
          <h2>Welcome Admin!</h2>
          <div className={dashboardStyles.dashboardTabsContainer}>
            <TabsComp value={value} handleChange={handleChange} />
          </div>
        </div>
      </div>
    );
  };

  const renderManagerView = () => {
    return <div>Manager View</div>;
  };

  const renderAccessDeninedView = () => {
    return <div>Access Denied</div>;
  };

  return (
    <section id="Dashboard" className={dashboardStyles.dashboardMainContainer}>
      {user && user?.role === "admin"
        ? renderAdminView()
        : user?.role === "manager"
        ? renderManagerView()
        : renderAccessDeninedView()}
    </section>
  );
};

export default Dashboard;
