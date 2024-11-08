"use client";

import React, { useState, useRef } from "react";
import BarcodeScanner from "./BarcodeScanner";

const App = () => {
  const [barcode, setBarcode] = useState("");
  const audioRef = useRef(null);

  const handleDetected = (code) => {
    setBarcode(code);

    // Play the beep sound
    if (audioRef.current) {
      audioRef.current.play();
    }
  };

  return (
    <div>
      <h1>Barcode Scanner</h1>
      <BarcodeScanner onDetected={handleDetected} />
      {barcode && <p>Detected Barcode: {barcode}</p>}

      {/* Beep sound */}
      <audio ref={audioRef} src="/beep.mp3" />
    </div>
  );
};

export default App;
