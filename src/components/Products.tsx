"use client";
import { ProductsProps } from "@/utils/types";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import productStyles from "../styles/Products.module.css";
// import { useProducts } from "@/context/ProductsContext";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

const Products: React.FC<ProductsProps> = ({ productValue }) => {
  const pathname = usePathname();
  // const { isProductDescriptionChecked, setIsProductDescriptionChecked } =
  //   useProducts();
  const [visibleDescIndex, setVisibleDescIndex] = useState<number | null>(null);

  useEffect(() => {
    console.log("Route Name:", pathname);
  }, [pathname]);

  const sortedProducts = [...productValue].sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  useEffect(() => {
    const handleVoicesChanged = () => {
      console.log("Available voices:", window.speechSynthesis.getVoices());
    };

    window.speechSynthesis.addEventListener(
      "voiceschanged",
      handleVoicesChanged
    );

    return () => {
      window.speechSynthesis.removeEventListener(
        "voiceschanged",
        handleVoicesChanged
      );
    };
  }, []);

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
    const speakDescription = (description: string) => {
      const utterance = new SpeechSynthesisUtterance(description);
      utterance.lang = "en-US";

      // Slow down the voice rate for better clarity
      utterance.rate = 0.85; // Adjust this value for desired pace (default is 1)

      // Stop any ongoing speech
      window.speechSynthesis.cancel();

      // Get all available voices
      const voices = window.speechSynthesis.getVoices();

      // Select a sweet female voice
      const sweetFemaleVoice = voices.find(
        (voice) =>
          voice.lang === "en-US" &&
          (voice.name.includes("Female") || voice.name.includes("Samantha"))
      );

      // If a suitable voice is found, set it
      if (sweetFemaleVoice) {
        utterance.voice = sweetFemaleVoice;
      }

      // Speak the description
      window.speechSynthesis.speak(utterance);
    };

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
                  visibleDescIndex === index
                    ? productStyles.productsLandingCardDesc
                    : productStyles.productsLandingCard
                }
                key={index}
              >
                <div
                  className={
                    visibleDescIndex === index
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
                    <button
                      onClick={() =>
                        setVisibleDescIndex(
                          visibleDescIndex === index ? null : index
                        )
                      }
                      className={`quicksand-text ${productStyles.productsLandingShowDesc}`}
                    >
                      Description{" "}
                      {visibleDescIndex === index ? (
                        <KeyboardArrowUpIcon />
                      ) : (
                        <KeyboardArrowDownIcon />
                      )}
                    </button>
                  </div>
                </div>
                {visibleDescIndex === index && (
                  <div
                    className={productStyles.productsLandingCardContainerTwo}
                  >
                    <button
                      className={productStyles.speakButton}
                      style={{ cursor: "pointer" }}
                      onClick={() => speakDescription(item.description)}
                    >
                      <VolumeUpIcon />
                    </button>
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
