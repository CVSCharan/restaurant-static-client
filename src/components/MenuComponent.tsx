import React from "react";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { useProducts } from "@/context/ProductsContext";

export default function MenuComponent() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const { categoryList } = useProducts();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <div
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          backgroundColor: "black",
          border: "2px solid #fff",
          borderRadius: "50%",
          color: "white",
          width: 55,
          height: 55,
          zIndex: 1000,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Tooltip title="Restaurant Menu">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            aria-controls={open ? "restaurant-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <RestaurantMenuIcon sx={{ fontSize: 30, color: "white" }} />
          </IconButton>
        </Tooltip>
      </div>

      <Menu
        anchorEl={anchorEl}
        id="restaurant-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            backgroundColor: "black",
            color: "white",
            overflow: "visible",
            borderRadius: "20px",
            // Remove the blur or shadow effect for better clarity on mobile
            filter: "none",
            mt: -1.5,
            width: 200, // Set width of the menu
            maxHeight: 200, // Set maxHeight to allow scrolling
            overflowY: "auto", // Enable vertical scrolling
            display: "flex",
            flexDirection: "column", // Ensure items are stacked vertically
            "& .MuiMenuItem-root": {
              width: "100%", // Make each MenuItem take up full width
              display: "flex",
              justifyContent: "center", // Center the text inside each menu item
              textAlign: "center",
            },
            "&::before": {
              content: '""',
              display: "block",
              position: "absolute",
              bottom: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "black",
              transform: "translateY(50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "bottom" }}
        anchorOrigin={{ horizontal: "right", vertical: "top" }}
      >
        {categoryList.map((item, index) => (
          <React.Fragment key={index}>
            <MenuItem
              onClick={handleClose}
              sx={{ color: "white", textAlign: "center" }}
            >
              <a
                href={`#${item}`}
                style={{
                  color: "white",
                  textDecoration: "none",
                  fontFamily: `"Josefin Sans", sans-serif`,
                }}
              >
                {item}
              </a>
            </MenuItem>
          </React.Fragment>
        ))}
      </Menu>

      {/* Add Media Query for Mobile View */}
      <style jsx>{`
        @media (max-width: 600px) {
          .MuiMenu-root {
            width: 100% !important; /* Make the menu width take up the full screen on mobile */
            max-height: 80vh; /* Limit the height of the menu on mobile */
          }
          .MuiMenuItem-root {
            padding: 10px 15px; /* Adjust padding for better readability */
            font-size: 16px; /* Increase font size for better readability on mobile */
          }
        }
      `}</style>
    </>
  );
}
