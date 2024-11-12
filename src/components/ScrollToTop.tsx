import React, { useEffect, useState } from "react";
import { Fab } from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <>
      {!isVisible && (
        <a href="#MenuNav">
          <Fab
            sx={{
              position: "fixed",
              bottom: "20px",
              right: "20px",
              backgroundColor: "black",
              border: "2px solid #fff",
              color: "white",
              width: 55,
              height: 55,
              zIndex: 1000,
              "&:hover": {
                backgroundColor: "black",
                border: "2px solid #9b7ebd",
              },
            }}
            aria-label="scroll to Top"
          >
            <RestaurantMenuIcon />
          </Fab>
        </a>
      )}
    </>
  );
};

export default ScrollToTop;
