"use client";
import { ProductsProps } from "@/utils/types";
import React, { useEffect } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import productStyles from "../styles/Products.module.css";
import { useProducts } from "@/context/ProductsContext";

const Products: React.FC<ProductsProps> = ({ productValue }) => {
  const pathname = usePathname();
  const { isProductDescriptionChecked } = useProducts();

  useEffect(() => {
    console.log("Route Name:", pathname);
  }, [pathname]);

  const sortedProducts = [...productValue].sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  // Calculate Veg and Non-Veg counts
  const vegCount = sortedProducts.filter((item) => item.is_veg === 0).length;
  const nonVegCount = sortedProducts.filter((item) => item.is_veg !== 0).length;

  const renderAdminView = () => {
    return (
      <div className={productStyles.productsMainContainer}>
        <h2
          className={`josefin-sans-text ${productStyles.productsCategoryHeading}`}
        >
          {sortedProducts[0]?.category}
        </h2>
        <ul className={productStyles.productStylesContiner}>
          {sortedProducts.map((item, index) => (
            <li className={productStyles.productsCard} key={index}>
              <div className={productStyles.productsCardContainerOne}>
                <Image
                  width={220}
                  height={220}
                  className={productStyles.productsCardImg}
                  src={item.image_url}
                  alt={`${item.name} - img`}
                />
                <div className={productStyles.productsCardContainerOneSubOne}>
                  <h3
                    className={`quicksand-text ${productStyles.productsTitle}`}
                  >
                    {item.name}
                  </h3>
                  <h3
                    className={`quicksand-text ${productStyles.productsTitle}`}
                  >
                    ₹ {item.price}
                  </h3>
                  <span className={`quicksand-text ${productStyles.isVegImg}`}>
                    {item.is_veg == 0 ? "🌱 Veg" : "🍗 Non-Veg"}
                  </span>
                </div>
              </div>
              <div className={productStyles.productsCardContainerTwo}>
                <h3 className={`quicksand-text ${productStyles.productsDesc}`}>
                  {item.description}
                </h3>
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  const renderLandingView = () => {
    return (
      sortedProducts.length !== 0 && (
        <div
          id={`${sortedProducts[0]?.category}`}
          className={productStyles.productsLandingMainContainer}
        >
          <h2
            className={`josefin-sans-text ${productStyles.productsCategoryHeading}`}
          >
            {sortedProducts[0]?.category}
          </h2>
          <h2
            className={`josefin-sans-text ${productStyles.productsCategoryHeading}`}
          >
            {vegCount !== 0 && nonVegCount !== 0
              ? `🌱 : ${vegCount}   🍗 : ${nonVegCount}`
              : vegCount !== 0 && nonVegCount === 0
              ? `🌱 : ${vegCount}`
              : vegCount === 0 && nonVegCount !== 0
              ? `🍗 : ${nonVegCount}`
              : `🌱 : ${vegCount}   🍗 : ${nonVegCount}`}
          </h2>
          <ul className={productStyles.productLandingStylesContiner}>
            {sortedProducts.map((item, index) => (
              <li
                className={
                  isProductDescriptionChecked
                    ? productStyles.productsLandingCardDesc
                    : productStyles.productsLandingCard
                }
                key={index}
              >
                <div
                  className={
                    isProductDescriptionChecked
                      ? productStyles.productsLandingCardContainerOneDesc
                      : productStyles.productsLandingCardContainerOne
                  }
                >
                  <Image
                    width={220}
                    height={220}
                    className={productStyles.productsLandingCardImg}
                    src={item.image_url}
                    alt={`${item.name} - img`}
                  />
                  <div
                    className={
                      productStyles.productsLandingCardContainerOneSubOne
                    }
                  >
                    <h3
                      className={`quicksand-text ${productStyles.productsLandingTitle}`}
                    >
                      {item.name}
                    </h3>
                    <h3
                      className={`quicksand-text ${productStyles.productsLandingTitle}`}
                    >
                      ₹ {item.price}
                    </h3>
                    <span
                      className={`quicksand-text ${productStyles.isVegImgLanding}`}
                    >
                      {item.is_veg == 0 ? "🌱 Veg" : "🍗 Non-Veg"}
                    </span>
                  </div>
                </div>
                {isProductDescriptionChecked && (
                  <div
                    className={productStyles.productsLandingCardContainerTwo}
                  >
                    <h3
                      className={`quicksand-text ${productStyles.productsLandingDesc}`}
                    >
                      {item.description}
                    </h3>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      )
    );
  };

  return <>{pathname === "/" ? renderLandingView() : renderAdminView()}</>;
};

export default Products;
