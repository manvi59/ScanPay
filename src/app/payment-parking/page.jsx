"use client";
import { useState } from "react";
import Head from "next/head";
import "../design/design.css";
import Image from "next/image";
import Link from "next/link";

import dynamic from "next/dynamic";
import "react-phone-input-2/lib/style.css";
import axios from "axios";
import showToast from "@/utils/showToast";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { parsePhoneNumberFromString } from "libphonenumber-js";
import FormPay from "react-bootstrap/Form";
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
      <div className="parking-container d-flex align-items-center justify-content-center my-3">
        <div className="parking-card pb-0 w-100 p-0 ">
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
      <div className="cart-details-container">
        <div className="payment-summary">
          <div className="summary-section">
            <h3 className="summary-title">Payment Details</h3>

            <div className="summary-row">
              <div className="summary-label">Parking Fee</div>
              <div className="summary-value">$8.00</div>
            </div>

            <div className="summary-row">
              <div className="summary-label">Convenience fee</div>
              <div className="summary-value">$0.75</div>
            </div>

            <div className="summary-row">
              <div className="summary-label">Sales Tax</div>
              <div className="summary-value">$0.61</div>
            </div>

            <div className="summary-row summary-total">
              <div className="summary-label">Total Due</div>
              <div className="summary-value">$9.36</div>
            </div>
          </div>
        </div>
      </div>

      {/* <div className="row mb-3">
        <div className="col">
          <div className="form-group">
            <label className="form-label" htmlFor="validationInput">Validation or Coupon?</label>
            <div className="input-group">
              <input
                type="text"
                className="form-control form-control-lg"
                id="validationInput"
                aria-describedby="validation"
                placeholder="Enter a code"
              />
              <button
                type="button"
                className="btn btn-lg btn-outline-primary"
                style={{
                  backgroundColor: 'white',
                  border: '2px solid rgb(95, 188, 94)',
                  color: 'rgb(95, 188, 94)'
                }}
              >
                Apply code
              </button>
            </div>
          </div>
        </div>
      </div> */}

      <div className="row mb-5">
        <div className="col-12">
          <Link href="/pay" className="w-100">
            <button
              id="submit-credit-card"
              type="button"
              className="btn btn-lg btn-block btn-primary w-100"
              // style={{
              //   backgroundColor: 'rgb(95, 188, 94)',
              //   border: '2px solid rgb(95, 188, 94)'
              // }}
            >
              Pay now
            </button>
          </Link>
        </div>
      </div>
    </div>

         
          
          {/* <div className=" d-flex justify-content-center">
            <div className="my-3" style={{ width: "50%" }}>
              <div className="mb-3 ">
                <label className="form-label ">Enter Your License Plate*</label>

                <FormPay.Control
                  type="text"
                  placeholder="Enter Your License Plate*"
                  style={{ height: "50px !important" }}
                />
              </div>
              <div className="mb-3 ">
                <label className="form-label ">Enter Your Email*</label>

                <FormPay.Control
                  type="text"
                  placeholder="Enter Your Email*"
                  style={{ height: "50px !important" }}
                />
              </div>
              <div className="mb-3 ">
                <label className="form-label ">Select Duration*</label>

                <FormPay.Select size="lg">
                  <option>1 hour</option>
                  <option>2 hour</option>
                </FormPay.Select>
              </div>

              <div className="bordered_row mb-3">
                <div className="row ">
                  <div className="col-8 text-capitalize fw-bolder fs-4">
                    Parking Total:
                  </div>
                  <div className="col-4 text-end text-nowrap fw-bolder fs-4">
                    $5.08
                  </div>
                </div>
                <div className="row mt-2">
                  <div className="col-12">
                    <label className="text-muted">
                      Includes $0.75 Processing Fee and all applicable taxes
                    </label>
                  </div>
                </div>
              </div>

               <button
                className="btn btn-secondary w-100 py-3 "
                disabled={!mobile}
              >
                Pay for Parking
              </button>

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
          </div> */}

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
