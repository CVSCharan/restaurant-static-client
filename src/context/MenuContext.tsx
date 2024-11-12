"use client";
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

// Define the context state type
interface MenuContextType {
  addMenuModal: boolean;
  setAddMenuModal: React.Dispatch<React.SetStateAction<boolean>>;
}

// Create the context with a default value
const MenuContext = createContext<MenuContextType | undefined>(undefined);

// Define the props for the MenuProvider
interface MenuProviderProps {
  children: ReactNode; // ReactNode allows any valid React child (elements, strings, numbers, etc.)
}

export const MenuProvider: React.FC<MenuProviderProps> = ({ children }) => {
  const [addMenuModal, setAddMenuModal] = useState<boolean>(false);

  useEffect(() => {
    setAddMenuModal(addMenuModal);
  }, [addMenuModal]);

  return (
    <MenuContext.Provider value={{ addMenuModal, setAddMenuModal }}>
      {children}
    </MenuContext.Provider>
  );
};

// Custom hook to use the MenuContext
export const useMenu = (): MenuContextType => {
  const context = useContext(MenuContext);
  if (!context) {
    throw new Error("useMenu must be used within a MenuProvider");
  }
  return context;
};
