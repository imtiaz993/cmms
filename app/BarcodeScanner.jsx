import React, { useEffect, useRef, useState } from 'react';
import { BrowserMultiFormatReader } from '@zxing/browser';

const ZXingScanner = ({ onScan, onError }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    const codeReader = new BrowserMultiFormatReader();

    codeReader.decodeFromVideoDevice(null, videoRef.current, (result, error) => {
      if (result) {
        onScan(result.getText());
      }
      if (error) {
        onError && onError(error);
      }
    });

  }, [onScan, onError]);

  return (
    <div>
      <video ref={videoRef} style={{ width: '100%', height: 'auto' }} />
    </div>
  );
};

export default ZXingScanner;
