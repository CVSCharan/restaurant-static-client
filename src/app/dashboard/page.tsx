"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation"; // Use `next/navigation` in the app directory
import Link from "next/link";

const Dashboard = () => {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("restaurant-app-token");

    if (!token) {
      router.push("/log-in"); // Redirect to login if token is absent
    }
  }, [router]); // Add router as a dependency to useEffect

  return (
    <section id="Dashboard" className="dashboard-main-container">
      <Link href="/sign-up">Add New User</Link>
    </section>
  );
};

export default Dashboard;
