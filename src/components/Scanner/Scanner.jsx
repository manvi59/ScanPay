// components/QrScannerComponent.js
'use client'; // for Next.js 13+ (App Router), otherwise not needed

import React, { useEffect, useRef, useState } from 'react';
import QrScanner from 'qr-scanner';

const Scanner = () => {
  const videoRef = useRef(null);
  const [qrResult, setQrResult] = useState('');

  useEffect(() => {
    let scanner;

    if (videoRef.current) {
      scanner = new QrScanner(videoRef.current, result => {
        setQrResult(result.data);
      }, {
        highlightScanRegion: true,
        highlightCodeOutline: true,
      });

      scanner.start();

      return () => {
        scanner.stop();
      };
    }
  }, []);

  return (
    <div>
      <video ref={videoRef} style={{ width: '100%', maxWidth: '400px' }}   />
      {qrResult && (
        <p><strong>Scanned QR Code:</strong> {qrResult}</p>
      )}
    </div>
  );
};

export default Scanner;
