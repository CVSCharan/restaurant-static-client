import React from "react";
import Image from "next/image";
import menuStyles from "./menu.module.css";
import AddMenuItem from "@/components/AddMenuItem";
import AddMenuModal from "@/components/AddMenuModal";
import DisplayMenuProducts from "@/components/DisplayMenuProducts";

const Products = () => {
  return (
    <section id="menu" className={menuStyles.menuMainContainer}>
      <div className={menuStyles.menuContainerOne}>
        <Image
          width={70}
          height={70}
          className={menuStyles.menuLogo}
          alt="ss-logo"
          src={process.env.RESTURANT_LOGO_URL as string}
        />
        <a
          href="/"
          className={`playwrite-gb-s-text ${menuStyles.menuHeadingOne}`}
        >
          Restaurant Name
        </a>
      </div>
      <div className={menuStyles.menuContainerTwo}>
        <div className={menuStyles.menuContainerTwoSubOne}>
          <h2 className={`quicksand-text ${menuStyles.menuHeadingTwo}`}>
            Menu Items
          </h2>
          <div className={menuStyles.menuAddContainer}>
            <AddMenuItem />
          </div>
        </div>
        <AddMenuModal />
        <div className={menuStyles.menuContainerTwoSubTwo}>
          <DisplayMenuProducts />
        </div>
      </div>
    </section>
  );
};

export default Products;
