
"use client";
import React from "react";

export default function Loader() {
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#fff", // match page background
        flexDirection: "column",
      }}
    >
      {/* Animated circle */}
      <div className="loader"></div>
      {/* <p style={{ marginTop: "16px", fontSize: "16px", color: "#333" }}>
        Loading, please wait...
      </p> */}

      <style jsx>{`
        .loader {
          border: 4px solid #f3f3f3; /* Light gray */
          border-top: 5px solid #007bff; /* Theme primary blue */
          border-radius: 50%;
          width: 70px;
          height: 70px;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}
