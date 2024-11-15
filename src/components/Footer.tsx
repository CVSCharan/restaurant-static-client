import React, { useState } from "react";
import footerStyles from "../styles/Footer.module.css";

const Footer = () => {
  // State for form inputs
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  // Handler for input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handler for form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
    // You can add API call or any other logic here
    setFormData({
      name: "",
      email: "",
      message: "",
    });
  };

  return (
    <div className={footerStyles.footerMainContainer}>
      <div className={footerStyles.footerContainerOne}>
        <div className={footerStyles.footerContainerOneSubOne}>
          <h2 className={`cinzel-text ${footerStyles.footerAddressHeading}`}>
            Dine With Us
          </h2>
          <h3 className={`macondo-regular ${footerStyles.footerAddressTitle}`}>
            Address :
          </h3>
          <h3 className={`josefin-sans-text  ${footerStyles.footerAddress}`}>
            Address Line 1,
          </h3>
          <h3 className={`josefin-sans-text  ${footerStyles.footerAddress}`}>
            Address Line 2,
          </h3>
          <h3 className={`josefin-sans-text  ${footerStyles.footerAddress}`}>
            Landmark, Postal Code, India.
          </h3>
        </div>
        <div className={footerStyles.footerContainerOneSubTwo}>
          <h2 className={`cinzel-text ${footerStyles.footerOpenHoursHeading}`}>
            Open Hours
          </h2>
          <h3 className={`josefin-sans-text  ${footerStyles.footerOpenHours}`}>
            Sunday - Saturday : 10:00 AM - 11 PM
          </h3>
        </div>
      </div>
      <div className={footerStyles.footerContainerTwo}>
        <h2 className={`cinzel-text ${footerStyles.footerContactUsHeading}`}>
          Contact Us
        </h2>
        <form
          className={footerStyles.contactUsFormContainer}
          onSubmit={handleSubmit}
        >
          <div className={footerStyles.contactUsFormContainerSub}>
            <label
              className={`playwrite-gb-s-text ${footerStyles.contactUsFormLabel}`}
              htmlFor="conatct-us-name"
            >
              Name
            </label>
            <input
              id="contact-us-name"
              type="text"
              placeholder="Your Name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className={footerStyles.contactUsInput}
              required
            />
          </div>
          <div className={footerStyles.contactUsFormContainerSub}>
            <label
              className={`playwrite-gb-s-text ${footerStyles.contactUsFormLabel}`}
              htmlFor="contact-us-email"
            >
              E-mail
            </label>
            <input
              id="contact-us-email"
              placeholder="Your E-mail"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className={footerStyles.contactUsInput}
              required
            />
          </div>
          <div className={footerStyles.contactUsFormContainerSub}>
            <label
              className={`playwrite-gb-s-text ${footerStyles.contactUsFormLabel}`}
              htmlFor="contact-us-message"
            >
              Message
            </label>
            <input
              id="contact-us-message"
              placeholder="Your Message"
              type="text"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              className={footerStyles.contactUsInput}
              required
            />
          </div>
          <button type="submit" className={footerStyles.contactUsSubmitBtm}>
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default Footer;
