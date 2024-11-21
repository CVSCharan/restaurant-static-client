"use client";
import React, { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation"; // Use `next/navigation` in the app directory
import Link from "next/link";
import QRCodeGenerator from "@/components/QRCodeGenerator";

const Dashboard = () => {
  const router = useRouter();

  const pathname = usePathname();
  useEffect(() => {
    console.log("Route Name:", pathname);
    if (pathname !== "/dashboard") {
      localStorage.removeItem("restaurant-app-token");
    }
  }, [pathname]);

  useEffect(() => {
    const token = localStorage.getItem("restaurant-app-token");
    console.log(token);

    if (!token) {
      router.push("/log-in"); // Redirect to login if token is absent
    }
  }, [router]); // Add router as a dependency to useEffect

  return (
    <section id="Dashboard" className="dashboard-main-container">
      <Link href="/sign-up">Add New User</Link>
      <QRCodeGenerator />
    </section>
  );
};

export default Dashboard;
