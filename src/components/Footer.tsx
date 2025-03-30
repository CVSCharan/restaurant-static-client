import React, { useState } from "react";
import footerStyles from "../styles/Footer.module.css";
import Image from "next/image";

/**
 * Footer Component - Displays restaurant contact information and contact form
 */
const Footer: React.FC = () => {
  // State for form inputs
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  // State for form submission feedback
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Handler for input changes
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
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
    setFormSubmitted(true);

    // Reset the submission message after 3 seconds
    setTimeout(() => {
      setFormSubmitted(false);
    }, 3000);
  };

  return (
    <div className={footerStyles.footerMainContainer}>
      <div className={footerStyles.footerDecorativeElement}></div>

      <div className={footerStyles.footerContainerOne}>
        <div className={footerStyles.footerContainerOneSubOne}>
          <h2 className={`cinzel-text ${footerStyles.footerAddressHeading}`}>
            Dine With Us
          </h2>
          <div className={footerStyles.footerDivider}></div>

          <h3 className={`macondo-regular ${footerStyles.footerAddressTitle}`}>
            Address:
          </h3>
          <h3 className={`josefin-sans-text ${footerStyles.footerAddress}`}>
            123 Gourmet Avenue,
          </h3>
          <h3 className={`josefin-sans-text ${footerStyles.footerAddress}`}>
            Culinary District,
          </h3>
          <h3 className={`josefin-sans-text ${footerStyles.footerAddress}`}>
            Foodie City, 500001, India.
          </h3>

          <div className={footerStyles.footerContactInfo}>
            <div className={footerStyles.footerContactItem}>
              <span className={footerStyles.footerContactIcon}>📞</span>
              <span className={footerStyles.footerContactText}>
                +91 98765 43210
              </span>
            </div>
            <div className={footerStyles.footerContactItem}>
              <span className={footerStyles.footerContactIcon}>✉️</span>
              <span className={footerStyles.footerContactText}>
                info@restaurant.com
              </span>
            </div>
          </div>
        </div>

        <div className={footerStyles.footerContainerOneSubTwo}>
          <h2 className={`cinzel-text ${footerStyles.footerOpenHoursHeading}`}>
            Open Hours
          </h2>
          <div className={footerStyles.footerDivider}></div>

          <div className={footerStyles.footerHoursContainer}>
            <div className={footerStyles.footerHoursItem}>
              <span className={footerStyles.footerHoursDay}>
                Monday - Friday:
              </span>
              <span className={footerStyles.footerHoursTime}>
                10:00 AM - 11:00 PM
              </span>
            </div>
            <div className={footerStyles.footerHoursItem}>
              <span className={footerStyles.footerHoursDay}>Saturday:</span>
              <span className={footerStyles.footerHoursTime}>
                9:00 AM - 11:30 PM
              </span>
            </div>
            <div className={footerStyles.footerHoursItem}>
              <span className={footerStyles.footerHoursDay}>Sunday:</span>
              <span className={footerStyles.footerHoursTime}>
                10:00 AM - 10:00 PM
              </span>
            </div>
          </div>

          <div className={footerStyles.footerSocialLinks}>
            <a href="#" className={footerStyles.footerSocialIcon}>
              <Image
                src="/facebook-icon.png"
                alt="Facebook"
                width={24}
                height={24}
              />
            </a>
            <a href="#" className={footerStyles.footerSocialIcon}>
              <Image
                src="/instagram-icon.png"
                alt="Instagram"
                width={24}
                height={24}
              />
            </a>
            <a href="#" className={footerStyles.footerSocialIcon}>
              <Image
                src="/twitter-icon.png"
                alt="Twitter"
                width={24}
                height={24}
              />
            </a>
          </div>
        </div>
      </div>

      <div className={footerStyles.footerContainerTwo}>
        <h2 className={`cinzel-text ${footerStyles.footerContactUsHeading}`}>
          Contact Us
        </h2>
        <div className={footerStyles.footerDivider}></div>

        <form
          className={footerStyles.contactUsFormContainer}
          onSubmit={handleSubmit}
        >
          <div className={footerStyles.contactUsFormContainerSub}>
            <label
              className={`playwrite-gb-s-text ${footerStyles.contactUsFormLabel}`}
              htmlFor="contact-us-name"
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
            <textarea
              id="contact-us-message"
              placeholder="Your Message"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              className={footerStyles.contactUsTextarea}
              rows={4}
              required
            />
          </div>

          <button type="submit" className={footerStyles.contactUsSubmitBtn}>
            Send Message
          </button>

          {formSubmitted && (
            <div className={footerStyles.formSubmissionMessage}>
              {`Thank you for your message! We'll get back to you soon.`}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Footer;
