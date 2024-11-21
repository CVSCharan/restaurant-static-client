import { QRCode, Input, Button } from "antd";
import React, { useState, useRef } from "react";

const QRCodeComponent = () => {
  const [text, setText] = useState("");
  const qrCodeRef = useRef();

  const handleDownload = () => {
    const canvas = qrCodeRef.current.querySelector("canvas");
    if (canvas) {
      const image = canvas.toDataURL("image/png"); // Get QR code as base64 PNG
      const link = document.createElement("a");
      link.href = image;
      link.download = "qr-code.png"; // File name for the download
      link.click();
    } else {
      console.error("No canvas element found in QR code component.");
    }
  };

  return (
    <div>
      <div ref={qrCodeRef}>
        <QRCode
          value={text}
          icon="https://raw.githubusercontent.com/CVSCharan/resturant-app-assets/refs/heads/main/restaurant-logo-img.png"
          fgColor="#FFFFFF" // QR code dots in white
          bgColor="#FFFFFF" // Background color (dark)
        />
      </div>
      <Input
        placeholder="Enter text for QR code"
        maxLength={60}
        value={text}
        onChange={(e) => setText(e.target.value)}
        style={{ marginTop: "10px", marginBottom: "10px" }}
      />
      <Button type="primary" onClick={handleDownload}>
        Export QR Code
      </Button>
    </div>
  );
};

export default QRCodeComponent;