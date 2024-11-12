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

const Landing = () => {
  const { productsList, categoryList } = useProducts();
  const [searchQuery, setSearchQuery] = useState("");
  const [landingSearchedProductsList, setLandingSearchedProductsList] =
    useState<Product[]>([]);

  const [isClient, setIsClient] = useState<boolean>(false);
  // const [isVegFilter, setIsVegFilter] = useState<boolean>(false);
  // const [isNonVegFilter, setIsNonVegFilter] = useState<boolean>(false);

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
    setLandingSearchedProductsList(productsList);
  }, [productsList]);

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

  // Filter products based on the search query and switches
  const filteredProductsList = productsList?.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleClearBtnClick = () => {
    setSearchQuery("");
    setLandingSearchedProductsList(productsList);
  };

  useEffect(() => {
    if (searchQuery !== "") {
      setLandingSearchedProductsList(filteredProductsList);
    } else {
      setLandingSearchedProductsList(productsList);
    }
  }, [searchQuery]);

  return (
    <section id="Landing" className={landingStyles.landingMainContainer}>
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
            <div className={landingStyles.landingCarouselContainer} key={index}>
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
            width={70}
            height={70}
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
    </section>
  );
};

export default Landing;
