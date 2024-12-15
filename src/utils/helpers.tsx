import { Product } from "./types";
import { useAuth } from "@/context/AuthContext";

export function removeDuplicates(arr: string[]) {
  return arr.filter((item, index) => arr.indexOf(item) === index);
}

export function filterProductsList(products: Product[], category: string) {
  return products.filter((item) => item.category === category);
}

export const resturantStockImages = [
  "https://raw.githubusercontent.com/CVSCharan/resturant-app-assets/refs/heads/main/restaurant-stock-img-1.jpg",
  "https://raw.githubusercontent.com/CVSCharan/resturant-app-assets/refs/heads/main/restaurant-stock-img-2.jpg",
  // "https://raw.githubusercontent.com/CVSCharan/resturant-app-assets/refs/heads/main/restaurant-stock-img-3.jpg",
  "https://raw.githubusercontent.com/CVSCharan/resturant-app-assets/refs/heads/main/restaurant-stock-img-4.jpg",
  // "https://raw.githubusercontent.com/CVSCharan/resturant-app-assets/refs/heads/main/restaurant-stock-img-5.jpg",
  "https://raw.githubusercontent.com/CVSCharan/resturant-app-assets/refs/heads/main/restaurant-stock-img-6.jpg",
];

export const checkLoginExpiery = (loggedInTime: string) => {
  const loggedInTimestamp = new Date(loggedInTime).getTime();
  const currentTime = Date.now();

  // Check if the session has expired (1 minute = 60,000 ms)
  return currentTime - loggedInTimestamp <= 1 * 60 * 1000;
};
