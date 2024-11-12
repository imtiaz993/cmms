"use client";

import React, { useState } from "react";
import BarcodeScanner from "app/BarcodeScanner";

const App = () => {
  const [barcode, setBarcode] = useState("");

  const handleDetected = (code) => {
    setBarcode(code);
  };

  const handleError = (error) => {
    console.error(error);
  };

  return (
    <div>
      <h1>Barcode Scanner</h1>
      <BarcodeScanner onScan={handleDetected} onError={handleError} />
      {barcode && <p>Detected Barcode: {barcode}</p>}
    </div>
  );
};

export default App;
