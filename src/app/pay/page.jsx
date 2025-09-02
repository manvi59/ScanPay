"use client";
import Image from "next/image";
import Link from "next/link";
import "../design/design.css"


import Modal from "react-bootstrap/Modal";
import ProgressBar from "react-bootstrap/ProgressBar";

import axios from "axios";
import showToast from "@/utils/showToast";
import { useParams, useRouter } from "next/navigation";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { GrCreditCard } from "react-icons/gr";

 
export default function CardInput() {
  const [show, setShow] = useState(false);
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [cardName, setcardName] = useState("");
  const [postal, setPostal] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const router = useRouter();

  const parms = useParams();
  const [bookingData, setBookingData] = useState([]);
  const [processModal, setProcessModal] = useState(false);
  const [paymentCount, setPaymentCount] = useState(0);

  const handleChange = (e) => {
    const formatted = formatCardNumber(e.target.value);
    setCardNumber(formatted);
  };

  const handleExpiryChange = (e) => {
    const formatted = formatExpiry(e.target.value);
    setExpiry(formatted);

    const cleanDigits = formatted.replace(/\D/g, "");
    const month = cleanDigits.slice(0, 2);
    const year = cleanDigits.slice(2);

    setMonth(month);
    setYear(year);
  };

  const makePaymnet = async (values) => {
    let data = localStorage.getItem("booking_data");

    if (!data) {
      showToast("No booking data found", "error");
      return;
    }

    data = JSON.parse(data);

    // 🔑 Split expiry into MM and YYYY
    const [month, year] = values?.expiry.split(" / ");

    try {
      const response = await axios.post(
        "https://admin.theselfparking.com/api/makepaymnet",
        {
          slug: data?.slug,
          phone: data?.phone,
          startdate: data?.startdate,
          starttime: data?.starttime,
          endtime: data?.endtime,
          fcharge: data?.fcharge,
          charge: data?.charge,
          taxsum: data?.taxsum,
          email: data?.email,
          license_plate: data?.license_plate,

          // ✅ Corrected here
          card_no: values?.cardNumber,
          ccExpiryMonth: month,
          ccExpiryYear: year,
          cvvNumber: values?.cvv,
          amount: data?.fcharge,
          name: values?.cardName,
          vehicle_type: "1",
          couponcode: "",
        },
        {
          headers: {
            Accept: "application/json",
          },
        }
      );

      const resData = response.data;

      if (resData.status === false && resData.errors) {
        Object.keys(resData.errors).forEach((field) => {
          resData.errors[field].forEach((msg) => {
            showToast(`${field}: ${msg}`, "error");
          });
        });
        return;
      }

      if (resData.status === false && resData.error) {
        showToast(resData.error, "error");
        return;
      }

      if (resData.status === false && resData.msg) {
        showToast(resData.msg, "error");
        return;
      }

      if (response.data.status === true) {
        showToast("Payment successful", "success");
        localStorage.setItem("booking_success", JSON.stringify(response.data));
        setProcessModal(true);
        setPaymentCount(paymentCount + 1);
        router.push("/booking-success");
      }
    } catch (error) {
      console.error("Axios error:", error);
      if (error.response?.data?.errors) {
        Object.keys(error.response.data.errors).forEach((field) => {
          error.response.data.errors[field].forEach((msg) => {
            showToast(`${field}: ${msg}`, "error");
          });
        });
      } else if (error.response?.data?.error) {
        showToast(error.response.data.error, "error");
      } else {
        showToast("Something went wrong. Please try again.", "error");
      }
    }
  };

  const PaymentSchema = Yup.object().shape({
    cardName: Yup.string()
      .required("Card name is required")
      .matches(/^[a-zA-Z ]+$/, "Only letters allowed"),

    cardNumber: Yup.string()
      .required("Card number is required")
      .matches(/^\d{4} \d{4} \d{4} \d{4}$/, "Must be 16 digits"),

    expiry: Yup.string()
      .required("Expiry date is required")
      .matches(/^(0[1-9]|1[0-2]) \/ \d{4}$/, "Format MM / YYYY"),

    cvv: Yup.string()
      .required("CVV is required")
      .matches(/^\d{3,4}$/, "CVV must be 3 or 4 digits"),

    postal: Yup.string()
      .required("Postal code is required")
      .matches(/^\d{4,6}$/, "Postal code must be 4–6 digits"),
  });

  const formatCardNumber = (value) => {
    const digits = value.replace(/\D/g, "").slice(0, 16);
    const parts = digits.match(/.{1,4}/g);
    return parts ? parts.join(" ") : "";
  };

  const formatExpiry = (value) => {
    const digits = value.replace(/\D/g, "").slice(0, 6); // MMYYYY
    if (digits.length <= 2) return digits;
    return `${digits.slice(0, 2)} / ${digits.slice(2)}`;
  };

  const handleCvvChange = (value) => {
    return value.replace(/\D/g, "").slice(0, 4);
  };

  const handlePostal = (value) => {
    return value.replace(/\D/g, "").slice(0, 13);
  };

  return (

    <>
     {/* <div className="parking-container d-flex align-items-center justify-content-center shadow px-0 pt-0  mt-5">
       <div className="parking-card pb-0 px-0 w-100 pt-0 "> */}
  <Formik
    initialValues={{
      cardName: "",
      cardNumber: "",
      expiry: "",
      cvv: "",
      postal: "",
    }}
    validationSchema={PaymentSchema}
    validateOnMount={true}
    onSubmit={(values) => {
      // console.log("✅ Payment Data:", values);
      // makePayment(values);
    }}
  >
    {({ values, setFieldValue, isValid, dirty }) => (
      <Form>
        <div className="mx-4" style={{marginTop:"100px"}}>
          <div className=" row d-flex align-items-center border rounded p-3 ">
            {/* Card Logo */}
            <div className=" d-flex col-xl-5 col-lg-5 col-md-12 col-12 px-0">
              
              <GrCreditCard size={25} className="me-2" />

            <Field
              name="cardNumber"
              className="border-0 pay-input  "
              value={values.cardNumber}
              onChange={(e) =>
                setFieldValue("cardNumber", formatCardNumber(e.target.value))
              }
              
              placeholder="Card Number"
            />
            </div>




            <Field
              name="expiry"
              className="border-0 pay-input col-xl-2 col-lg-2 col-md-4 col-4 mt-lg-0  mt-3 px-0"
              value={values.expiry}
              onChange={(e) =>
                setFieldValue("expiry", formatExpiry(e.target.value))
              }
              placeholder="MM / YYYY"
               
            />
            

            <Field
              name="cvv"
              className="border-0 pay-input col-xl-2 col-lg-2 col-md-4 col-4 mt-lg-0  mt-3 px-0"
              value={values.cvv}
              onChange={(e) =>
                setFieldValue("cvv", handleCvvChange(e.target.value))
              }
               
              placeholder="CVV"
            />
            

            <Field
              name="postal"
              className="border-0 pay-input col-xl-3 col-lg-3 col-md-4 col-4 mt-lg-0  mt-3 px-0"
              type="text"
              placeholder="Postal code"

              value={values.postal}
              onChange={(e) =>
                setFieldValue("postal", handlePostal(e.target.value))
              }
               
            />
           </div> 
          <div>
     {/* <ErrorMessage name="cardNumber" co mponent="div" className="error_text" />
      <ErrorMessage name="expiry" component="div" className="error_text" />
       <ErrorMessage name="cvv" component="div" className="error_text" />
       <ErrorMessage name="postal" component="div" className="error_text" />  */}


          </div>
          <div className="row my-4">
            <div className="col-12 px-0">
              <Link href="/success" className="w-100">
                <button
                  id="submit-credit-card"
                  type="button"
                  className="btn btn-lg btn-block btn-primary w-100"
                  // style={{
                  //   backgroundColor: "rgb(95, 188, 94)",
                  //   border: "2px solid rgb(95, 188, 94)",
                  // }}
                >
                  Pay now
                </button>
              </Link>
            </div>
          </div>

          
        </div>
      </Form>
    )}
  </Formik>

  {/* </div>
   </div> */}

  
       <footer className="parking-footer">
        <div className="footer-top d-flex justify-content-between align-items-center gap-4 mx-4  mx-lg-0" style={{fontSize:"12px"}}>
          <p className="text-start">
            DT - SRQ Magazine Operated by{" "}
            <a
              href="https://example.com"
              target="_blank"
              rel="noopener noreferrer"
            >
            SoCal
            </a>
          </p>
          <p className="text-end">210 Avenida Madera, Sarasota FL, 34242</p>
        </div>

        <div className="footer-bottom text-center">
          <div className="powered-box py-3">
            Powered by <img src="/SOCAL02.png" alt="Oobeo" />
          </div>
        </div>
      </footer>
    </>
  );
}
