"use client";
// pages/qr-scanner.js
import Header from "@/components/Header";
import Scanner from "@/components/Scanner/Scanner";
import dynamic from "next/dynamic";
import "@/components/Footer/footer.css";
import { useState } from "react";

// // Prevent server-side rendering since camera access only works in the browser
// const QrScannerComponent = dynamic(() => import('@/components/Scanner/Scanner.jsx'), {
//   ssr: false,
// });

export default function QrScannerPage() {
  const [validationValue, setValidationValue] = useState("");
  return (
    <>
      <Header  header_path="/time_slot" header_heading="Validate Parking" logo={true}/>
      <div style={{ background: "rgb(79, 78, 78)" }} className="p-3">
        <p className="text-center text-white">
          place the code inside the frame
        </p>
        <div className="d-flex justify-content-center align-items-center ">
          <Scanner />
        </div>
      </div>
      <div className="footer custom-card w-100 " style={{ marginTop: "30px" }}>
        <div className="text-center">
          <div style={{ color: "rgb(107, 107, 107)", fontSize: "14px" }}>
            or
          </div>
          <div className="mt-3 validation_heading">Enter Validation Code</div>
        </div>
        <div className="licenceInput">
          {/* <label htmlFor="phone">Phone</label> */}
          <input
            id="phone"
            name="phone"
            type="tel"
            // value={phone}
            onChange={(e) => setValidationValue(e.target.value)}
            placeholder="Enter Validation Code Here"
            required
            style={{ width: "100%" }}
            className="mx-0 my-3"
          />
        </div>
        <button
          className={validationValue ? "paymentBtn" : "paymentBtn_disabled"}
          style={{
            display: "flex",
            justifyContent: "center",
          }}
          // onClick={handleSubmit}
          // onClick={()=>router.push("/time_slot")}
        >
          Validate
        </button>
      </div>
    </>
  );
}
