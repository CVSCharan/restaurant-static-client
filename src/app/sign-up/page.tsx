"use client";
import React, { useState } from "react";
import signUpStyles from "./page.module.css";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import bcrypt from "bcryptjs";
import Alert from "@mui/material/Alert";
import { Snackbar } from "@mui/material";

const SignUpPage: React.FC = () => {
  const [formData, setFormData] = useState({
    username: "",
    name: "",
    email: "",
    password: "",
    role: "manager",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showAlert, setShowAlert] = useState<boolean>(false);

  const handleClose = () => {
    setShowAlert(false);
  };

  // Handle input changes
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    console.log(error, success);
    e.preventDefault();
    setError("");
    setSuccess("");
    const token = localStorage.getItem("resturant-app-token");
    if (
      formData.username !== "" &&
      formData.name !== "" &&
      formData.email !== "" &&
      formData.password
    ) {
      try {
        // Hash the password using bcryptjs
        const hashedPassword = await bcrypt.hash(formData.password, 10);

        // Create a new form data object with the hashed password
        const encryptedFormData = {
          ...formData,
          password: hashedPassword,
        };

        console.log(encryptedFormData);

        // Send POST request to your API with headers
        const response = await axios.post(
          "http://localhost:8080/api/auth/sign-up",
          encryptedFormData,
          {
            headers: {
              Authorization: `Bearer ${token}`, // Replace with your token
              "Content-Type": "application/json", // Specify the content type
            },
          }
        );

        setSuccess(response.data.message);
        setShowAlert(true);
        setFormData({
          username: "",
          name: "",
          email: "",
          password: "",
          role: "manager",
        });
      } catch (err: any) {
        setError(
          err.response?.data?.error || "Failed to sign up. Please try again."
        );
      }
    }
  };

  return (
    <section id="Sign Up" className={signUpStyles.signUpMainContainer}>
      <div className={signUpStyles.signUpBrandingContainer}>
        <Image
          width={200}
          height={200}
          className={signUpStyles.signUpLogo}
          alt="ss-logo"
          src="https://raw.githubusercontent.com/CVSCharan/resturant-app-assets/refs/heads/main/restaurant-logo-img.png"
          priority // Use priority to load the image eagerly
        />

        <Link
          href="/dashboard"
          className={`playwrite-gb-s-text ${signUpStyles.signUpBrand}`}
        >
          Restaurant Name
        </Link>
      </div>
      <div className={signUpStyles.signUpContainer}>
        <form className={signUpStyles.signUpForm} onSubmit={handleSubmit}>
          <div className={signUpStyles.signUpFormGroup}>
            <label
              className={`josefin-sans-text ${signUpStyles.signUpLabel}`}
              htmlFor="username"
            >
              Username
            </label>
            <input
              type="text"
              className={signUpStyles.signUpInput}
              id="username"
              name="username"
              placeholder="Enter username"
              value={formData.username}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className={signUpStyles.signUpFormGroup}>
            <label
              className={`josefin-sans-text ${signUpStyles.signUpLabel}`}
              htmlFor="name"
            >
              Name
            </label>
            <input
              className={signUpStyles.signUpInput}
              type="text"
              id="name"
              name="name"
              placeholder="Enter full name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className={signUpStyles.signUpFormGroup}>
            <label
              className={`josefin-sans-text ${signUpStyles.signUpLabel}`}
              htmlFor="email"
            >
              Email
            </label>
            <input
              className={signUpStyles.signUpInput}
              type="email"
              id="email"
              name="email"
              placeholder="Enter email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className={signUpStyles.signUpFormGroup}>
            <label
              className={`josefin-sans-text ${signUpStyles.signUpLabel}`}
              htmlFor="password"
            >
              Password
            </label>
            <input
              className={signUpStyles.signUpInput}
              type="password"
              id="password"
              name="password"
              placeholder="Enter password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className={signUpStyles.signUpFormGroup}>
            <label
              className={`josefin-sans-text ${signUpStyles.signUpLabel}`}
              htmlFor="role"
            >
              Role
            </label>
            <select
              className={signUpStyles.signUpSelect}
              id="role"
              name="role"
              value={formData.role}
              onChange={handleInputChange}
              required
            >
              <option value="manager">Manager</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <button type="submit" className={signUpStyles.submitBtn}>
            Sign Up
          </button>
        </form>
      </div>

      <Snackbar
        open={showAlert}
        autoHideDuration={1000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          className={signUpStyles.signUpAlert}
          variant="filled"
          severity="success"
        >
          Restaurant User Added Successfully!!
        </Alert>
      </Snackbar>
    </section>
  );
};

export default SignUpPage;
