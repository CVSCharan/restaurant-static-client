import * as React from "react";
import Modal from "@mui/material/Modal";
import loaderModalStyles from "../styles/LoaderMoadl.module.css";

// Define the types for the props
interface LoaderModalProps {
  open: boolean; // Whether the modal is open
  handleClose: () => void; // Function to handle closing the modal
}

export default function LoaderModal({ open, handleClose }: LoaderModalProps) {
  const handleModalClose = () => {
    if (!open) {
      handleClose();
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleModalClose} // Custom close handler
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      className={loaderModalStyles.mainContainer}
    >
      <div className={loaderModalStyles.loader}></div>
    </Modal>
  );
}
