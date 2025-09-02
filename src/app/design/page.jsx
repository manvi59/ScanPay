"use client";
import { useState } from "react";
import Head from "next/head";
import "./design.css";
import Image from "next/image";
import Link from "next/link";

import dynamic from "next/dynamic";
import "react-phone-input-2/lib/style.css";
import axios from "axios";
import showToast from "@/utils/showToast";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { parsePhoneNumberFromString } from "libphonenumber-js";
// const PhoneInput = dynamic(() => import("react-phone-input-2"), { ssr: false });
const PhoneInput = dynamic(
  () => import("react-phone-input-2").then((mod) => mod.default),
  { ssr: false }
);




export default function page() {
  const [mobile, setMobile] = useState("");

  return (
    <>
      <Head>
        <title>Pay for Parking</title>
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
          rel="stylesheet"
        />
      </Head>

      {/* Main container */}
      <div className="parking-container d-flex align-items-center justify-content-center  ">
        <div className="parking-card pb-0 ">
          <div className=" d-flex justify-content-center">
            <div className="scan-main" style={{ width: "65%" }}>
              <h6 className="text-muted text-center mb-2">
                RM Parking Solutions LLC
              </h6>
              <hr />
              <h1 className="fw-normal text-center">Pay for Parking</h1>
              <h1 className="fw-normal text-center mb-3">DT - SRQ Magazine</h1>
              <p className="text-muted text-center small">
                Enter your mobile number below to pay for parking:
              </p>
              <hr />

              <div className="my-3 ">
                <label className="form-label fw-semibold">Mobile*</label>
                {/* <div className="input-group">
              <span className="input-group-text">
                <Image
                  src="https://flagcdn.com/us.svg"
                  alt="US Flag"
                  width="25"
                  height="18"
                />
              </span>
              <input
                type="tel"
                className="form-control"
                placeholder="Enter mobile number"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
              />
            </div> */}

                <div className="phone2">
                  <PhoneInput
                    country={"us"}
                    // value={values.phone}
                    // onChange={(phone) => setFieldValue("phone", phone)}
                    inputProps={{
                      name: "phone",
                      required: true,
                    }}
                    style={{ height: "40px !important" }}
                    placeholder="Your Phone Number"
                    onChange={(phone) => setMobile(phone)}
                    enableSearch={true}
                  />
                  {/* <ErrorMessage
                                name="phone"
                                component="div"
                                className="error-message"
                              /> */}
                </div>
              </div>

              {/* Button */}
              <Link href="/pay-parking">
                <button
                  className="btn btn-primary w-100 py-3 "
                  disabled={!mobile}
                >
                  Continue
                </button>
              </Link>

              {/* Footer */}
              <p className="text-muted small mt-3 text-center">
                By continuing you confirm that you have read and agree to the{" "}
                <Link href="#" className="text-primary text-decoration-none">
                  Terms of Service
                </Link>
                , the{" "}
                <Link href="#" className="text-primary text-decoration-none">
                  Privacy Policy
                </Link>{" "}
                and the{" "}
                <Link href="#" className="text-primary text-decoration-none">
                  Operator Terms
                </Link>
                .
              </p>
            </div>
          </div>

          {/* Input Section */}
        </div>
      </div>

      <footer className="parking-footer">
        <div className="footer-top d-flex justify-content-between align-items-center gap-4 mx-2  mx-lg-0">
          <p className="text-start">
            DT - SRQ Magazine Operated by{" "}
            <a
              href="https://example.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              RM Parking Solutions LLC
            </a>
          </p>
          <p className="text-end">210 Avenida Madera, Sarasota FL, 34242</p>
        </div>

        <div className="footer-bottom text-center">
          <div className="powered-box py-3">
            Powered by <img src="/tsp_logo.png" alt="Oobeo" />
          </div>
        </div>
      </footer>
    </>
  );
}
