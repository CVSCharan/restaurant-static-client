"use client";
import React, { useEffect, useState } from "react";
import { useProducts } from "@/context/ProductsContext";
import displayMenu from "../styles/DisplayMenuProducts.module.css";
import { filterProductsList } from "@/utils/helpers";
import { Product } from "@/utils/types";
import { Modal } from "@mui/material";
import Products from "./Products";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";

const DisplayMenuProducts = () => {
  const [showLoader, setShowLoader] = useState<boolean>(false);
  const { productsList, fetchProducts } = useProducts();
  const [filteredCategoryList, setFilteredCategoryList] = useState<Product[]>(
    []
  );
  const [filteredCategorayModalOpen, setFilteredCategorayModalOpen] =
    useState<boolean>(false);

  const { categoryObjectArr } = useProducts();

  const handleFilteredCategoryModalClose = () => {
    setFilteredCategorayModalOpen(false);
  };

  useEffect(() => {
    const loadProducts = async () => {
      if (productsList.length === 0) {
        setShowLoader(true); // Show the loader initially
        await fetchProducts(); // Call the fetchProducts function to get data
        setTimeout(() => {
          setShowLoader(false); // Hide the loader after 2 seconds
        }, 500);
      }
    };

    loadProducts();
    console.log(productsList);
  }, [productsList]);

  const onClickCategory = (category: string) => {
    console.log(category);
    setFilteredCategoryList(filterProductsList(productsList, category));
    console.log(filterProductsList(productsList, category));
    setFilteredCategorayModalOpen(true);
  };

  return (
    <section
      id="Display Menu Products"
      className={displayMenu.displayItemsMainContainer}
    >
      {showLoader ? (
        <div className={displayMenu.productsLoaderContainer}>
          <span className={displayMenu.productsLoader}></span>
        </div>
      ) : (
        <div className={displayMenu.displayProductsContainer}>
          {categoryObjectArr.map((item, index) => (
            <div
              onClick={() => onClickCategory(item.name)}
              className={displayMenu.displayProductsCard}
              key={index}
            >
              <img
                className={displayMenu.displayProductsImg}
                src={item.imgUrl}
                alt={`Category - ${item.name}`}
              />
              <h2
                className={`josefin-sans-text ${displayMenu.displayProductsHeading}`}
              >
                {item.name}
              </h2>
            </div>
          ))}
          <Modal
            open={filteredCategorayModalOpen}
            onClose={handleFilteredCategoryModalClose}
            aria-labelledby="category-products-modal-modal-title"
            aria-describedby="category-products-modal-modal-description"
            className={displayMenu.displayMenuCategoryModalContainer}
          >
            <div className={displayMenu.modalContentContainer}>
              <IconButton
                onClick={handleFilteredCategoryModalClose}
                className={displayMenu.closeIconButton}
                aria-label="close"
              >
                <CloseIcon />
              </IconButton>
              <Products productValue={filteredCategoryList} />
            </div>
          </Modal>
        </div>
      )}
    </section>
  );
};

export default DisplayMenuProducts;
