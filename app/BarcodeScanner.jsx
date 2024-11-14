import React, { useEffect, useRef, useState } from 'react';
import { BrowserMultiFormatReader } from '@zxing/browser';

const ZXingScanner = ({ onScan, onError }) => {
  const videoRef = useRef(null);
  const beepSound = new Audio("/beep.mp3");

  useEffect(() => {
    const codeReader = new BrowserMultiFormatReader();

    codeReader.decodeFromVideoDevice(null, videoRef.current, (result, error) => {
      if (result) {
        onScan(result.getText(),beepSound);
      }
      if (error) {
        onError && onError(error);
      }
    });

  }, [onScan, onError]);

  return (
    <div>
      <h1 onClick={()=>{onScan("!@#",beepSound);}}>TEST</h1>
      <video ref={videoRef} style={{ width: '100%', height: '90dvh' }} />
    </div>
  );
};

export default ZXingScanner;
