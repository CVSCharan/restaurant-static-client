"use client";
import React from "react";
import { Fab } from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";
import { useMenu } from "@/context/MenuContext";

const AddMenuItem = () => {
  const { setAddMenuModal } = useMenu();
  return (
    <>
      <Fab
        aria-label="add Menu Item"
        onClick={() => setAddMenuModal(true)}
        sx={{
          backgroundColor: "transparent",
          border: "2px solid #9b7ebd",
          color: "white",
          width: 45,
          height: 45,
          "&:hover": {
            backgroundColor: "black",
            border: "2px solid #295f98",
          },
        }}
      >
        <AddIcon />
      </Fab>
    </>
  );
};

export default AddMenuItem;
