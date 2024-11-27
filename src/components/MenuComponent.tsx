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
        PaperProps={{
          elevation: 0,
          sx: {
            backgroundColor: "black",
            color: "white",
            borderRadius: "20px",
            mt: -1.5,
            width: 200,
            maxHeight: 250,
            overflow: "hidden",
            padding: "10px 0", // Padding at top and bottom
            border: "2px solid #295f98",
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "bottom" }}
        anchorOrigin={{ horizontal: "right", vertical: "top" }}
      >
        <div
          style={{
            maxHeight: 200,
            overflowY: "scroll",
          }}
          className="menu-scroll"
        >
          {categoryList.map((item, index) => (
            <React.Fragment key={index}>
              <MenuItem
                onClick={handleClose}
                sx={{
                  color: "white",
                  display: "flex", // Ensures flexbox for alignment
                  justifyContent: "center", // Vertically centers the content
                  alignItems: "center",
                  margin: "5px 0", // Gap between items
                  padding: "5px 16px", // Adjust padding for consistent layout
                  textAlign: "left", // Align text to the left
                  width: "100%", // Ensure full-width clickable area
                }}
              >
                <a
                  href={`#${item}`}
                  style={{
                    color: "white",
                    textDecoration: "none",
                    fontFamily: `"Josefin Sans", sans-serif`,
                    width: "100%", // Make the anchor take up full width
                  }}
                >
                  {item}
                </a>
              </MenuItem>
            </React.Fragment>
          ))}
        </div>
      </Menu>

      {/* Scoped styles for hiding scrollbar */}
      <style jsx>{`
        .menu-scroll {
          scrollbar-width: none; /* Hide scrollbar on Firefox */
        }
        .menu-scroll::-webkit-scrollbar {
          display: none; /* Hide scrollbar on Chrome, Safari, Edge */
        }
      `}</style>
    </>
  );
}
