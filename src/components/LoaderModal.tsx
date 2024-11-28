import * as React from "react";
import Modal from "@mui/material/Modal";
import loaderModalStyles from "../styles/LoaderMoadl.module.css";

const style = {
  position: "absolute",
  transform: "translate(-50%, -50%)",
  width: "100%",
  height: "100%",
  bgcolor: "transparent",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

// Define the types for the props
interface LoaderModalProps {
  open: boolean; // Whether the modal is open
  handleClose: () => void; // Function to handle closing the modal
}

export default function LoaderModal({ open, handleClose }: LoaderModalProps) {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      className={loaderModalStyles.mainContainer}
    >
      <div className={loaderModalStyles.loader}></div>
    </Modal>
  );
}
