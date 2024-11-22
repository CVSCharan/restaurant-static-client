"use client";
import React, { useEffect, useState } from "react";
import { useProducts } from "@/context/ProductsContext";
import Products from "./Products";
import { filterProductsList, resturantStockImages } from "@/utils/helpers";
import landingStyles from "../styles/Landing.module.css";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import ScrollToTop from "./ScrollToTop";
import Image from "next/image";
import { Product } from "@/utils/types";
import Link from "next/link";
import VegNonVegSwitch from "./CustomSwitch";
import CustomizedCheckbox from "./CustomCheckBox";
import Footer from "./Footer";
import { Divider } from "@mui/material";
import Fuse from "fuse.js";
import axios from "axios";

const Landing = () => {
  const {
    productsList,
    categoryList,
    isProductDescriptionChecked,
    setIsProductDescriptionChecked,
  } = useProducts();

  const SERVER_URL = "https://restaurant-static-backend.onrender.com/api/ping"; // Replace with your server URL

  const keepServerAlive = () => {
    setInterval(async () => {
      try {
        const response = await axios.get(SERVER_URL);
        console.log("Server is active:", response.status);
      } catch (error) {
        console.error("Error keeping server alive:", error);
      }
    }, 5 * 60 * 1000); // Poll every 5 minutes
  };

  useEffect(() => {
    keepServerAlive();
  }, []);

  const [searchQuery, setSearchQuery] = useState("");
  const [landingSearchedProductsList, setLandingSearchedProductsList] =
    useState<Product[]>([]);
  const [isClient, setIsClient] = useState<boolean>(false);

  // Single state for filter type: "all", "veg", or "nonVeg"
  const [filterType, setFilterType] = useState<"all" | "veg" | "nonVeg">("all");

  // Check if we are on the client side
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Initialize products list when available
  useEffect(() => {
    if (isClient && productsList) {
      setLandingSearchedProductsList(productsList);
    }
  }, [isClient, productsList]);

  useEffect(() => {
    let filteredList = productsList;

    // Apply Veg/Non-Veg filter
    if (filterType === "veg") {
      filteredList = filteredList.filter((item) => item.is_veg === 0);
    } else if (filterType === "nonVeg") {
      filteredList = filteredList.filter((item) => item.is_veg !== 0);
    }

    // Handle search query
    if (searchQuery.trim() !== "") {
      const fuse = new Fuse(filteredList, {
        keys: ["name", "category"], // Search in both 'name' and 'category'
        threshold: 0.4, // Tolerance for fuzzy matching
      });

      const searchResults = fuse
        .search(searchQuery)
        .map((result) => result.item);

      if (searchResults.length > 0) {
        filteredList = searchResults;
      } else {
        // No matches found; fallback to similar category with a broader threshold
        const broaderFuse = new Fuse(filteredList, {
          keys: ["category"], // Search only in 'category' as a last resort
          threshold: 0.6, // Looser tolerance for broader matches
        });

        const categoryResults = broaderFuse
          .search(searchQuery)
          .map((result) => result.item);

        filteredList =
          categoryResults.length > 0 ? categoryResults : productsList;
      }
    }

    // Update the filtered products list
    setLandingSearchedProductsList(filteredList);
  }, [filterType, searchQuery, productsList]);

  const handleVegToggle = () => {
    setFilterType((prevState) => (prevState === "veg" ? "all" : "veg"));
  };

  const handleNonVegToggle = () => {
    setFilterType((prevState) => (prevState === "nonVeg" ? "all" : "nonVeg"));
  };

  const handleCheckboxChange = () => {
    setIsProductDescriptionChecked((prevState: boolean) => !prevState);
  };

  const handleClearBtnClick = () => {
    setSearchQuery("");
    setLandingSearchedProductsList(productsList);
  };

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 1601 },
      items: 4,
    },
    desktop: {
      breakpoint: { max: 1600, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1023, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  return (
    <section id="Landing" className={landingStyles.landingMainContainer}>
      <div style={{ flex: 1 }}>
        <ScrollToTop />
        <div className={landingStyles.landingBannerContainer}>
          <Carousel
            className={landingStyles.landingCarouselMainContainer}
            responsive={responsive}
            infinite
            // showDots
            autoPlay
          >
            {resturantStockImages.map((item: string, index: number) => (
              <div
                className={landingStyles.landingCarouselContainer}
                key={index}
              >
                <Image
                  width={400}
                  height={400}
                  className={landingStyles.landingCarouselImg}
                  src={item}
                  alt={`${index} - landing slide img`}
                  loading="lazy"
                />
              </div>
            ))}
          </Carousel>

          <div className={landingStyles.brandingContainer}>
            <Image
              width={200}
              height={200}
              className={landingStyles.landingLogo}
              alt="ss-logo"
              src="https://raw.githubusercontent.com/CVSCharan/resturant-app-assets/refs/heads/main/restaurant-logo-img.png"
              priority // Use priority to load the image eagerly
            />

            <Link
              href="/"
              className={`playwrite-gb-s-text ${landingStyles.landingBrand}`}
            >
              Restaurant Name
            </Link>
          </div>
        </div>

        <div id="MenuNav" className={landingStyles.menuNavContainer}>
          {categoryList.map((category) => (
            <a
              key={category}
              className={landingStyles.menuNavItem}
              href={`#${category}`}
            >
              <Image
                className={landingStyles.menuNavImg}
                height={100}
                width={100}
                src={filterProductsList(productsList, category)[1].image_url}
                alt={`${category} img`}
              />
              <h3 className="playwrite-gb-s-text">{category}</h3>
            </a>
          ))}
        </div>

        {/* Search Bar */}
        <div className={landingStyles.menuSearchBarContainer}>
          <div className={landingStyles.menuSearchBar}>
            <input
              type="text"
              className={`quicksand-text ${landingStyles.searchInput}`}
              placeholder="Paneer 65, Chicken Dum Biryani, ...more"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />

            <button
              onClick={handleClearBtnClick}
              className={landingStyles.searchBarClearBtn}
            >
              {searchQuery === "" ? "Search" : "Clear"}
            </button>
          </div>
        </div>

        <div className={landingStyles.landingFiltersContainer}>
          <div className={landingStyles.landingFiltersSubContainer}>
            <div className={landingStyles.landingFiltersCheckBoxContainer}>
              <CustomizedCheckbox
                checked={isProductDescriptionChecked}
                onChange={handleCheckboxChange}
                inputProps={{ "aria-label": "Product Description Checkbox" }}
              />
              <label
                className={`playwrite-gb-s-text ${landingStyles.landingFiltersCheckBoxHeading}`}
                htmlFor="product-description-checkbox"
              >
                Product Description
              </label>
            </div>
            <div className={landingStyles.landingFiltersSwitchContainer}>
              <div className={landingStyles.landingFiltersSwitchSubContainer}>
                <VegNonVegSwitch
                  checked={filterType === "veg"}
                  onChange={handleVegToggle}
                  inputProps={{ "aria-label": "Veg Filter Switch" }}
                />
                <label
                  className={`playwrite-gb-s-text ${landingStyles.landingFiltersSwitchLabel}`}
                  htmlFor="veg-filter-switch"
                >
                  Veg 🌱
                </label>
              </div>
              <div className={landingStyles.landingFiltersSwitchSubContainer}>
                <VegNonVegSwitch
                  checked={filterType === "nonVeg"}
                  onChange={handleNonVegToggle}
                  inputProps={{ "aria-label": "Non-Veg Filter Switch" }}
                />
                <label
                  className={`playwrite-gb-s-text ${landingStyles.landingFiltersSwitchLabel}`}
                  htmlFor="non-veg-filter-switch"
                >
                  Non Veg 🍗
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Filtered Products Display */}
        <div className={landingStyles.landingProductsContainer}>
          {isClient &&
            landingSearchedProductsList &&
            categoryList.map((item: string) => (
              <Products
                key={item}
                productValue={filterProductsList(
                  landingSearchedProductsList,
                  item
                )}
              />
            ))}
        </div>

        <section className={landingStyles.footerContainer}>
          <Footer />
          <Divider className={landingStyles.customDivider} />
          <div className={landingStyles.copyRightsContainer}>
            <h2
              className={`josefin-sans-text ${landingStyles.copyRightsHeading}`}
            >
              © 2024 - 2025 Restaurant Pvt. Ltd. Made with 💗 by CVS CHARAN
            </h2>
          </div>
        </section>
      </div>
    </section>
  );
};

export default Landing;
