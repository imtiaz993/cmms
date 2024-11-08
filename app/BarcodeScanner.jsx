import React, { useState } from 'react';
import BarcodeScannerComponent from "react-qr-barcode-scanner";

const BarcodeScanner = ({ onDetected }) => {
  const [barcode, setBarcode] = useState("");
  const [error, setError] = useState("");
  const audioRef = React.useRef(null);
  const isDetected = React.useRef(false);

  const handleScan = (err, result) => {
    if (err) {
      setError("Error accessing camera. Please check permissions.");
      console.error("Camera error:", err);
      return;
    }

    if (result && !isDetected.current) {
      // Handle detection only once per scan to prevent rapid repeats
      isDetected.current = true;
      const detectedCode = result.text;
      setBarcode(detectedCode);
      onDetected(detectedCode);

      // Play beep sound
      if (audioRef.current) {
        audioRef.current.play();
      }

      // Reset detection flag after 2 seconds
      setTimeout(() => {
        isDetected.current = false;
      }, 2000); // Cooldown time
    }
  };

  return (
    <div>
      <h1>Barcode Scanner</h1>
      <BarcodeScannerComponent
        width={500}
        height={500}
        onUpdate={handleScan}
      />
      {barcode && <p>Detected Barcode: {barcode}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Beep sound */}
      <audio ref={audioRef} src="/beep.mp3" preload="auto" />
    </div>
  );
};

export default BarcodeScanner;
