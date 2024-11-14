"use client";
import React, { useState, FormEvent, ChangeEvent, useEffect } from "react";
import Modal from "@mui/material/Modal";
import { useMenu } from "@/context/MenuContext";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import axios from "axios";
import addMenuModalStyles from "../styles/AddMenuModal.module.css";
import { useProducts } from "@/context/ProductsContext";

const AddMenuModal = () => {
  const { addMenuModal, setAddMenuModal } = useMenu();

  const { productInc, setProductInc } = useProducts();

  const [itemName, setItemName] = useState<string>("");
  const [itemDesc, setItemDesc] = useState<string>("");
  const [itemCategory, setItemCategory] = useState<string>("");
  const [itemPrice, setItemPrice] = useState<number | null>(null);
  const [itemIsVeg, setItemIsVeg] = useState<string>("veg");
  const [itemImgUrl, setItemImgUrl] = useState<string>("");
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [alertMsg, setAlertMsg] = useState<string>("");
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false); // Snackbar state

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  useEffect(() => {
    if (addMenuModal) {
      setItemName("");
      setItemDesc("");
      setItemCategory("");
      setItemPrice(null);
      setItemIsVeg("veg");
      setItemImgUrl("");
      setShowAlert(false);
    }
  }, [addMenuModal]);

  useEffect(() => {
    if (!snackbarOpen) {
      setAddMenuModal(false);
    }
  }, [snackbarOpen, setAddMenuModal]);

  const handleClose = () => {
    setAddMenuModal(false);
  };

  const handleModalAdd = async (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (itemName !== "") {
      if (itemDesc !== "") {
        if (itemCategory !== "") {
          if (itemImgUrl !== "") {
            if (itemPrice !== null) {
              setShowAlert(false);
              try {
                const response = await axios.post(
                  "http://localhost:8080/api/products/add",
                  {
                    name: itemName,
                    desc: itemDesc,
                    category: itemCategory,
                    price: itemPrice,
                    isVeg: itemIsVeg === "veg" ? 0 : 1,
                    imgUrl: itemImgUrl,
                  }
                );
                console.log(response.data); // Handle success
                setProductInc(!productInc);
                setSnackbarOpen(true);
              } catch (error) {
                console.error("There was an error!", error); // Handle error
              }
            } else {
              setAlertMsg("Please enter Price of the item.");
              setShowAlert(true);
            }
          } else {
            setAlertMsg("Please enter Image URL of the item.");
            setShowAlert(true);
          }
        } else {
          setAlertMsg("Please enter Category of the item.");
          setShowAlert(true);
        }
      } else {
        setAlertMsg("Please enter Description of the item.");
        setShowAlert(true);
      }
    } else {
      setAlertMsg("Please enter Name of the item.");
      setShowAlert(true);
    }
  };

  const handleModalCancel = () => {
    setAddMenuModal(false);
    setSnackbarOpen(false);
  };

  const handleItemName = (e: ChangeEvent<HTMLInputElement>) => {
    setItemName(e.target.value);
  };

  const handleItemDesc = (e: ChangeEvent<HTMLInputElement>) => {
    setItemDesc(e.target.value);
  };

  const handleItemCategory = (e: ChangeEvent<HTMLInputElement>) => {
    setItemCategory(e.target.value);
  };

  const handleItemPrice = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value ? parseFloat(e.target.value) : null;
    if (!isNaN(value as number) || value === null) {
      setItemPrice(value);
    }
  };

  const handleItemImgUrl = (e: ChangeEvent<HTMLInputElement>) => {
    setItemImgUrl(e.target.value);
  };

  const handleIsVeg = (e: ChangeEvent<HTMLSelectElement>) => {
    setItemIsVeg(e.target.value);
  };

  return (
    <Modal
      open={addMenuModal}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div className={addMenuModalStyles.menuModalMainContainer}>
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={3000} // Auto close after 3 seconds
          onClose={handleSnackbarClose}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <Alert
            onClose={handleSnackbarClose}
            severity="success"
            variant="outlined"
          >
            <h2
              className={`josefin-sans-text ${addMenuModalStyles.menuSnackbarHeading}`}
            >
              Item added successfully!
            </h2>
          </Alert>
        </Snackbar>
        <div className={addMenuModalStyles.menuModalContainerOne}>
          <div className={addMenuModalStyles.menuModalContainerOneSub}>
            <h2
              className={`quicksand-text ${addMenuModalStyles.menuModalHeading}`}
              id="modal-modal-title"
            >
              Menu Item
            </h2>
            <h3
              className={`josefin-sans-text ${addMenuModalStyles.menuModalDesc}`}
              id="modal-modal-description"
            >
              Add a new item to your Menu list.
            </h3>
          </div>
          <form
            id="add-menu-form"
            className={addMenuModalStyles.menuFormContainer}
          >
            <div className={addMenuModalStyles.menuFormContainerItems}>
              <div className={addMenuModalStyles.menuFormContainerItem}>
                <label
                  className={`josefin-sans-text ${addMenuModalStyles.menuFormContainerLabel}`}
                  htmlFor="menu-item-name"
                >
                  Name
                </label>
                <input
                  placeholder="eg: Paneer 65"
                  onChange={handleItemName}
                  type="text"
                  id="menu-item-name"
                  name="menu-item-name"
                  required
                  className={addMenuModalStyles.menuFormContainerInput}
                />
              </div>
              <div className={addMenuModalStyles.menuFormContainerItem}>
                <label
                  className={`josefin-sans-text ${addMenuModalStyles.menuFormContainerLabel}`}
                  htmlFor="menu-item-desc"
                >
                  Description
                </label>
                <input
                  placeholder="eg: Paneer 65 is a popular South Indian-inspired appetizer or snack that originated in the Hyderabadi cuisine."
                  onChange={handleItemDesc}
                  type="text"
                  id="menu-item-desc"
                  name="menu-item-desc"
                  required
                  className={addMenuModalStyles.menuFormContainerInput}
                />
              </div>
              <div className={addMenuModalStyles.menuFormContainerItem}>
                <label
                  className={`josefin-sans-text ${addMenuModalStyles.menuFormContainerLabel}`}
                  htmlFor="menu-item-category"
                >
                  Category
                </label>
                <input
                  placeholder="eg: Starter"
                  onChange={handleItemCategory}
                  type="text"
                  id="menu-item-category"
                  name="menu-item-category"
                  required
                  className={addMenuModalStyles.menuFormContainerInput}
                />
              </div>
              <div className={addMenuModalStyles.menuFormContainerItem}>
                <label
                  className={`josefin-sans-text ${addMenuModalStyles.menuFormContainerLabel}`}
                  htmlFor="menu-item-price"
                >
                  Price
                </label>
                <input
                  placeholder="eg: 240.00"
                  onChange={handleItemPrice}
                  type="number"
                  step="0.01" // Allows decimal values
                  id="menu-item-price"
                  name="menu-item-price"
                  required
                  value={itemPrice ?? ""} // Display as an empty string if null
                  className={addMenuModalStyles.menuFormContainerInput}
                />
              </div>
              <div className={addMenuModalStyles.menuFormContainerItem}>
                <label
                  className={`josefin-sans-text ${addMenuModalStyles.menuFormContainerLabel}`}
                  htmlFor="menu-item-isVeg"
                >
                  Veg / Non-Veg
                </label>
                <select
                  id="register-role"
                  value={itemIsVeg}
                  onChange={handleIsVeg}
                  className={addMenuModalStyles.menuCustomSelect}
                >
                  <option value="veg">Veg</option>
                  <option value="non-veg">Non-Veg</option>
                </select>
              </div>
              <div className={addMenuModalStyles.menuFormContainerItem}>
                <label
                  className={`josefin-sans-text ${addMenuModalStyles.menuFormContainerLabel}`}
                  htmlFor="menu-item-imgUrl"
                >
                  Image URL
                </label>
                <input
                  placeholder="eg: https://restaurant-item-img.png"
                  onChange={handleItemImgUrl}
                  type="text"
                  id="menu-item-imgUrl"
                  name="menu-item-imgUrl"
                  required
                  className={addMenuModalStyles.menuFormContainerInput}
                />
              </div>
            </div>
            {showAlert && (
              <Alert
                className={addMenuModalStyles.menuAlertMsg}
                severity="warning"
              >
                {alertMsg}
              </Alert>
            )}
            <div className={addMenuModalStyles.menuBtnContainer}>
              <button
                className={addMenuModalStyles.menuBtn}
                onClick={handleModalCancel}
                type="button"
              >
                Close
              </button>
              <button
                onClick={handleModalAdd}
                className={addMenuModalStyles.menuBtn}
                type="submit"
              >
                Add
              </button>
            </div>
          </form>
        </div>
      </div>
    </Modal>
  );
};

export default AddMenuModal;
