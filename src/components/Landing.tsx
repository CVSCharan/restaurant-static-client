"use client";
import React, { useEffect, useState, useMemo, useCallback } from "react";
import { useProducts } from "@/context/ProductsContext";
import Products from "./Products";
import { filterProductsList, resturantStockImages } from "@/utils/helpers";
import landingStyles from "../styles/Landing.module.css";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Image from "next/image";
import { Product } from "@/utils/types";
import Link from "next/link";
import VegNonVegSwitch from "./CustomSwitch";
import Footer from "./Footer";
import { Divider } from "@mui/material";
import Fuse from "fuse.js";
import MenuComponent from "./MenuComponent";
import LoaderModal from "./LoaderModal";

// ======================================================================
// Constants and Configurations
// ======================================================================

/**
 * Responsive configuration for the carousel component
 */
const CAROUSEL_RESPONSIVE_CONFIG = {
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

/**
 * Filter type definition for product filtering
 */
type FilterType = "all" | "veg" | "nonVeg";

// ======================================================================
// Main Component
// ======================================================================

/**
 * Landing Component - Main page of the restaurant application
 * 
 * Displays the restaurant's menu, allows filtering by veg/non-veg,
 * and provides search functionality for products.
 */
const Landing: React.FC = () => {
  // ======================================================================
  // Context and State Management
  // ======================================================================
  
  const { productsList, categoryList } = useProducts();

  // UI states
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [landingSearchedProductsList, setLandingSearchedProductsList] = 
    useState<Product[]>([]);
  const [isClient, setIsClient] = useState<boolean>(false);
  const [filterType, setFilterType] = useState<FilterType>("all");
  const [loaderOpen, setLoaderOpen] = useState<boolean>(false);

  // ======================================================================
  // Event Handlers
  // ======================================================================
  
  const handleLoaderOpen = useCallback(() => setLoaderOpen(true), []);
  const handleLoaderClose = useCallback(() => setLoaderOpen(false), []);

  const handleVegToggle = useCallback(() => {
    setFilterType((prevState) => (prevState === "veg" ? "all" : "veg"));
  }, []);

  const handleNonVegToggle = useCallback(() => {
    setFilterType((prevState) => (prevState === "nonVeg" ? "all" : "nonVeg"));
  }, []);

  const handleClearBtnClick = useCallback(() => {
    setSearchQuery("");
    setLandingSearchedProductsList(productsList || []);
  }, [productsList]);

  const handleSearchInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  }, []);

  // ======================================================================
  // Side Effects
  // ======================================================================
  
  // Client-side detection
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Initialize products list when available
  useEffect(() => {
    if (!isClient || !productsList) return;
    
    if (productsList.length === 0) {
      handleLoaderOpen();
    } else {
      handleLoaderClose();
      setLandingSearchedProductsList(productsList);
    }
  }, [isClient, productsList, handleLoaderOpen, handleLoaderClose]);

  // Filter products based on search query and filter type
  useEffect(() => {
    if (!productsList) return;
    
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
        keys: ["name", "category"],
        threshold: 0.3,
      });

      const searchResults = fuse
        .search(searchQuery)
        .map((result) => result.item);

      if (searchResults.length > 0) {
        filteredList = searchResults;
      } else {
        // No matches found; fallback to similar category with a broader threshold
        const broaderFuse = new Fuse(filteredList, {
          keys: ["category"],
          threshold: 0.6,
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

  // ======================================================================
  // Memoized Components
  // ======================================================================
  
  // Memoized category menu items
  const categoryMenuItems = useMemo(() => {
    if (!categoryList || !productsList) return null;
    
    return categoryList.map((category) => (
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
    ));
  }, [categoryList, productsList]);

  // Memoized product categories
  const productCategories = useMemo(() => {
    if (!isClient || !landingSearchedProductsList || !categoryList) return null;
    
    return categoryList.map((item: string) => (
      <Products
        key={item}
        productValue={filterProductsList(
          landingSearchedProductsList,
          item
        )}
      />
    ));
  }, [isClient, landingSearchedProductsList, categoryList]);

  // ======================================================================
  // Render Component
  // ======================================================================
  
  return (
    <section id="Landing" className={landingStyles.landingMainContainer}>
      <LoaderModal handleClose={handleLoaderClose} open={loaderOpen} />
      <div style={{ flex: 1 }}>
        <MenuComponent />
        
        {/* Banner and Carousel */}
        <div className={landingStyles.landingBannerContainer}>
          <Carousel
            className={landingStyles.landingCarouselMainContainer}
            responsive={CAROUSEL_RESPONSIVE_CONFIG}
            infinite
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

          {/* Branding */}
          <div className={landingStyles.brandingContainer}>
            <Image
              width={200}
              height={200}
              className={landingStyles.landingLogo}
              alt="ss-logo"
              src="https://raw.githubusercontent.com/CVSCharan/resturant-app-assets/refs/heads/main/restaurant-logo-img.png"
              priority
            />

            <Link
              href="/"
              className={`playwrite-gb-s-text ${landingStyles.landingBrand}`}
            >
              Restaurant Name
            </Link>
          </div>
        </div>

        {/* Menu Navigation */}
        <div id="MenuNav" className={landingStyles.menuNavContainer}>
          {categoryMenuItems}
        </div>

        {/* Search Bar */}
        <div className={landingStyles.menuSearchBarContainer}>
          <div className={landingStyles.menuSearchBar}>
            <input
              type="text"
              className={`quicksand-text ${landingStyles.searchInput}`}
              placeholder="Paneer 65, Chicken Dum Biryani, ...more"
              value={searchQuery}
              onChange={handleSearchInputChange}
            />

            <button
              onClick={handleClearBtnClick}
              className={landingStyles.searchBarClearBtn}
            >
              {searchQuery === "" ? "Search" : "Clear"}
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className={landingStyles.landingFiltersContainer}>
          <div className={landingStyles.landingFiltersSubContainer}>
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
          {productCategories}
        </div>

        {/* Footer */}
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
