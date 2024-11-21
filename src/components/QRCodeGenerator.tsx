import { QRCode, Input, Button } from "antd";
import React, { useState, useRef } from "react";

const QRCodeComponent = () => {
  const [text, setText] = useState("");
  const qrCodeRef = useRef<HTMLDivElement>(null);

  const handleDownload = () => {
    if (qrCodeRef.current !== null) {
      // Explicitly check for null
      const canvas = qrCodeRef.current.querySelector("canvas");
      if (canvas) {
        const image = canvas.toDataURL("image/png"); // Convert canvas to PNG base64
        const link = document.createElement("a");
        link.href = image;
        link.download = "qr-code.png"; // Download file as "qr-code.png"
        link.click();
      } else {
        console.error("Canvas element not found in QRCode component.");
      }
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
