import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";

const Contact = () => {
  return (
    <div style={styles.container}>
      <a href="mailto:your-email@example.com" style={styles.icon}>
        <FontAwesomeIcon icon={faEnvelope} size="2x" />
      </a>
      <a
        href="https://wa.me/yourwhatsappnumber"
        target="_blank"
        rel="noopener noreferrer"
        style={styles.icon}
      >
        <div style={styles.whatsappBackground}>
          <FontAwesomeIcon
            icon={faWhatsapp}
            size="2x"
            style={styles.whatsappIcon}
          />
        </div>
      </a>
      <a href="tel:yourphonenumber" style={styles.icon}>
        <FontAwesomeIcon icon={faPhone} size="2x" />
      </a>
    </div>
  );
};

const styles = {
  container: {
    position: "fixed",
    left: "10px",
    top: "50%",
    transform: "translateY(-50%)",
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    zIndex: 1000,
  },
  icon: {
    color: "#fff", // Red color, you can change it as needed
    textDecoration: "none",
    backgroundColor: "#E50914",
    borderRadius: "50%",
    padding: "10px",
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
  },
};
export default Contact;
