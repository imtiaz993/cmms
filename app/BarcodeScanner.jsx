import React, { useEffect, useRef } from "react";
import { BrowserMultiFormatReader } from "@zxing/browser";

const ZXingScanner = ({ onScan, onError }) => {
  const videoRef = useRef(null);
  const beepSound = new Audio("/beep.mp3");

  useEffect(() => {
    const codeReader = new BrowserMultiFormatReader();

    codeReader.decodeFromVideoDevice(
      null,
      videoRef.current,
      (result, error) => {
        if (result) {
          onScan(result.getText(), beepSound);
        }
        if (error) {
          onError && onError(error);
        }
      }
    );
  }, [onScan, onError]);

  return (
    <div>
      <button
        onClick={() => {
          onScan("850033937077", beepSound);
        }}
      >
        TEST
      </button>
      <video ref={videoRef} style={{ width: "100%", height: "90dvh" }} />
    </div>
  );
};

export default ZXingScanner;
