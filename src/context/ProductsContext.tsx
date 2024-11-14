"use client";
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import axios from "axios";
import { CategoryList, Product } from "@/utils/types";
import { removeDuplicates } from "@/utils/helpers";

// Define the context state type
interface ProductsContextType {
  productsList: Product[];
  setProductsList: React.Dispatch<React.SetStateAction<Product[]>>;
  productInc: boolean;
  setProductInc: React.Dispatch<React.SetStateAction<boolean>>;
  categoryList: string[];
  categoryObjectArr: CategoryList[];
  isProductDescriptionChecked: boolean;
  setIsProductDescriptionChecked: React.Dispatch<React.SetStateAction<boolean>>;
  fetchProducts: () => Promise<void>;
}

// Create the context with a default value
const ProductsContext = createContext<ProductsContextType | undefined>(
  undefined
);

// Define the props for the ProductsProvider
interface ProductsProviderProps {
  children: ReactNode; // ReactNode allows any valid React child (elements, strings, numbers, etc.)
}

export const ProductsProvider: React.FC<ProductsProviderProps> = ({
  children,
}) => {
  const [productsList, setProductsList] = useState<Product[]>([]);
  const [categoryList, setCategoryList] = useState<string[]>([]);
  const [categoryObjectArr, setCategoryObjectArr] = useState<CategoryList[]>(
    []
  );
  const [productInc, setProductInc] = useState<boolean>(false);
  const [isProductDescriptionChecked, setIsProductDescriptionChecked] =
    useState<boolean>(false);

  const fetchProducts = async () => {
    let uniqueCategories;
    const duplicateCategories: string[] = [];
    try {
      const response = await axios.get<Product[]>(
        "https://restaurant-static-backend.onrender.com/api/products/list"
      );
      console.log("Products: ", response.data);

      setProductsList(response.data);

      response.data.forEach((item) => {
        duplicateCategories.push(item.category);
      });
      uniqueCategories = removeDuplicates(duplicateCategories);
      setCategoryList(uniqueCategories.sort());
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [productInc]);

  useEffect(() => {
    const tempCategoryArr: CategoryList[] = [];

    categoryList.forEach((category) => {
      const matchingProduct = productsList.find(
        (item) => item.category === category
      );

      if (matchingProduct) {
        tempCategoryArr.push({
          name: category,
          imgUrl: matchingProduct.image_url,
        });
      }
    });

    setCategoryObjectArr(tempCategoryArr);
  }, [categoryList, productsList]);

  useEffect(() => {
    console.log(categoryObjectArr);
  }, [categoryObjectArr]);

  return (
    <ProductsContext.Provider
      value={{
        productsList,
        setProductsList,
        productInc,
        setProductInc,
        categoryList,
        categoryObjectArr,
        isProductDescriptionChecked,
        setIsProductDescriptionChecked,
        fetchProducts,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};

// Custom hook to use the ProductsContext
export const useProducts = (): ProductsContextType => {
  const context = useContext(ProductsContext);
  if (!context) {
    throw new Error("useProducts must be used within a ProductsProvider");
  }
  return context;
};
