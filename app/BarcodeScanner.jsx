import React, { useEffect, useRef } from "react";
import { BrowserMultiFormatReader } from "@zxing/browser";

const ZXingScanner = ({ onScan, onError }) => {
  const videoRef = useRef(null);
  const beepSound = useRef(new Audio("/beep.mp3"));

  useEffect(() => {
    const codeReader = new BrowserMultiFormatReader();

    codeReader.decodeFromVideoDevice(
      null,
      videoRef.current,
      (result, error) => {
        if (result) {
          onScan(result.getText(), beepSound.current);
        }
        if (error) {
          onError && onError(error);
        }
      }
    );
  }, [onScan, onError]);

  useEffect(() => {
    document.getElementById("beepInitializer").click();
  }, []);

  return (
    <div
      id="beepInitializer"
      onClick={() => {
        beepSound.current.play();
      }}
    >
      <video ref={videoRef} style={{ width: "100%", height: "90dvh" }} />
    </div>
  );
};

export default ZXingScanner;
