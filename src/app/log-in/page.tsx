"use client";
import React, { useState } from "react";
import logInStyles from "./page.module.css";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import { useRouter } from "next/navigation";
import { BASE_URL } from "@/utils/apis";
// import { useAuth } from "@/context/AuthContext";
import { RestaurantUser } from "@/utils/types";

const LogInPage: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  // const { setUser } = useAuth();

  // Handler for input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    if (id === "login-username") setUsername(value);
    if (id === "login-password") setPassword(value);
  };

  // Handler for form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log("Username:", username);

    // Check if username and password are not empty
    if (username !== "" && password !== "") {
      try {
        // Send a POST request with username and password
        const response = await axios.post(`${BASE_URL}/auth/log-in`, {
          username,
          password,
        });

        // Check if the response is successful
        if (response.status === 200) {
          console.log("Login successful:", response.data);

          const { token, id, username, role, email, loggedInAt } =
            response.data;
          const tempUser: RestaurantUser = {
            id,
            name: username,
            email,
            role,
            token,
            loggedInAt,
          };
          // Store the token in localStorage (or cookie)
          localStorage.setItem("restaurant-app-user", JSON.stringify(tempUser));
          // You can redirect or update the UI here on success
          router.push("/dashboard");
        } else {
          console.log("Login failed:", response.data);
          alert("Login failed. Please check your credentials.");
        }
      } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          console.error("Error logging in:", error);
          alert(error.response?.data || "Error logging in. Please try again.");
        }
      }
    }
  };

  return (
    <section id="LogIn" className={logInStyles.logInMainContainer}>
      <div className={logInStyles.logInBrandingContainer}>
        <Image
          width={200}
          height={200}
          className={logInStyles.logInLogo}
          alt="ss-logo"
          src="https://raw.githubusercontent.com/CVSCharan/resturant-app-assets/refs/heads/main/restaurant-logo-img.png"
          priority // Use priority to load the image eagerly
        />

        <Link
          href="/"
          className={`playwrite-gb-s-text ${logInStyles.logInBrand}`}
        >
          Restaurant Name
        </Link>
      </div>
      <div className={logInStyles.logInContainer}>
        <form className={logInStyles.logInForm} onSubmit={handleSubmit}>
          <div className={logInStyles.formGroup}>
            <label
              htmlFor="login-username"
              className={`josefin-sans-text ${logInStyles.logInLabel}`}
            >
              User Name
            </label>
            <input
              type="text"
              id="login-username"
              className={logInStyles.logInInput}
              placeholder="Enter your username"
              value={username}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className={logInStyles.formGroup}>
            <label
              htmlFor="login-password"
              className={`josefin-sans-text ${logInStyles.logInLabel}`}
            >
              Password
            </label>
            <input
              type="password"
              id="login-password"
              className={logInStyles.logInInput}
              placeholder="Enter your password"
              value={password}
              onChange={handleInputChange}
              required
            />
          </div>

          <Link href="/forgot-password" className={logInStyles.forgotPassword}>
            Forgot Password?
          </Link>

          <button type="submit" className={logInStyles.submitBtn}>
            Log In
          </button>
        </form>
      </div>
    </section>
  );
};

export default LogInPage;
