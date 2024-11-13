"use client";

import React, { useState } from "react";
import BarcodeScanner from "app/BarcodeScanner";
import axios from "axios";

const App = () => {
  const [barcode, setBarcode] = useState("");
  const beepSound = new Audio("/beep.mp3");

  const handleDetected = async (code) => {
    setBarcode(code);
    beepSound.play();
    try {
      const response = await axios.get(`http://34.102.44.108:8000/`, {
        params: {
          action: "getProductByBarcode",
          barcode: code,
          store_id: 111,
        },
      });
      console.log(response);
      
    } catch (error) {
      console.error("Error fetching product data:", error);
    }
  };

  const handleError = () => {};

  return (
    <div>
      <h1>Barcode Scanner</h1>
      <BarcodeScanner onScan={handleDetected} onError={handleError} />
      {barcode && <p>Detected Barcode: {barcode}</p>}
    </div>
  );
};

export default App;
