"use client";
import { useEffect, useState } from "react";
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

import Loader from "@/components/Loader";
import { MdErrorOutline } from "react-icons/md";

export default function Design({ mainSlug }) {
  const [mobile, setMobile] = useState("");
  const [loading, setLoading] = useState(true);

  const [parkingData, setParkingData] = useState([]);
  // fetch parking data
  const UserAddress = async () => {
    try {
      const response = await axios.get(
        // `https://admin.theselfparking.com/api/parkingdata/${mainSlug}`,
        `https://admin.theselfparking.com/api/parkingdata/${mainSlug}`,
        { headers: { Accept: "application/json" } }
      );
      setParkingData(response?.data?.result?.parkingdata);
    } catch (error) {
      console.log(error);
      showToast(error, "error");
    } finally {
      setLoading(false); // hide loader after API finishes
    }
  };

  //  if (loading) return <Loader />;

  useEffect(() => {
    UserAddress();
  }, []);

  // Yup schema with phone validation
  // const validationSchema = Yup.object().shape({
  //   phone: Yup.string()
  //     .required("Phone number is required")
  //     .test("is-valid-phone", "Invalid phone number", function (value) {
  //       if (!value) return false;
  //       const phoneNumber = parsePhoneNumberFromString("+" + value);
  //       return phoneNumber ? phoneNumber.isValid() : false;
  //     }),
  // });

  const validationSchema = Yup.object().shape({
    phone: Yup.string()
      .required("Phone number is required")
      .test("is-valid-phone", "Invalid phone number", function (value) {
        if (!value) return false;

        // Ensure it starts with '+'
        const fullNumber = value.startsWith("+") ? value : `+${value}`;

        const phoneNumber = parsePhoneNumberFromString(fullNumber);

        return phoneNumber ? phoneNumber.isValid() : false;
      }),
  });

  

  // const handleSubmit = (values) => {
  //   if (typeof window !== "undefined") {
  //     localStorage.setItem("phone", values.phone);
  //   }

  //   if (parkingData?.slug && values.phone) {
  //     router.push(`/time_slot/${parkingData?.slug}`);
  //   }
  // };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
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
                    SoCal Parking Solutions LLC
                  </h6>
                  <hr />
                  <h1 className="fw-normal text-center">Pay for Parking</h1>
                  {/* <h1 className="fw-normal text-center mb-3">DT - SRQ Magazine</h1> */}
                  <h5 className="fw-normal text-center mb-3">
                    {parkingData?.pname}
                  </h5>
                  <p className="text-muted text-center small">
                    Enter your mobile number below to pay for parking:
                  </p>
                  <hr />

                  <Formik
                    initialValues={{ phone: "" }}
                    validationSchema={validationSchema}
                    // onSubmit={handleSubmit}
                  >
                    {({ setFieldValue, values, isValid, dirty }) => (
                      <Form>
                        <div className="my-3 ">
                          <label className="form-label fw-semibold">
                            Mobile*
                          </label>

                          <div className="phone2">
                            {/* <PhoneInput
                                    country={"us"}
                                    value={values.phone}
                                    onChange={(phone) => {
                                      setFieldValue("phone", phone);
                                      setFieldTouched("phone", true); // 👈 mark field as touched
                                    }}
                                    inputProps={{
                                      name: "phone",
                                      required: true,
                                    }}
                                    placeholder="Your Phone Number"
                                    enableSearch={true}
                                  />
                                 

                                    <ErrorMessage
                                    name="phone"
                                    render={(msg) => (
                                      <div className="error-message d-flex align-items-center">
                                        <MdErrorOutline size={18} className="me-1 error-message mt-0" />
                                        <span>{msg}</span>
                                      </div>
                                    )}
                                  /> */}

                            <PhoneInput
                              country={"us"}
                              value={values.phone}
                              onChange={(phone) =>
                                setFieldValue("phone", phone)
                              }
                              inputProps={{
                                name: "phone",
                                required: true,
                              }}
                              placeholder="Your Phone Number"
                              enableSearch={true}
                              countryCodeEditable={false}
                            />
                            <ErrorMessage
                              name="phone"
                              component="div"
                              className="error-message"
                            />
                          </div>
                        </div>

                        <Link
                          //  href={`/pay-parking?phone=${values.phone}`} as={`/pay-parking`} passHref
                          //  href={{
                          //   pathname: "/pay-parking",
                          //   query: { phone: values.phone }, // 👈 phone goes here
                          // }}
                          // as="/pay-parking"

                          href={
                            isValid && dirty
                              ? `/pay-parking/${mainSlug}?phone=${values.phone}`
                              : "#"
                          }
                        >
                          <button
                            className="btn btn-primary w-100 py-3 "
                            disabled={!(isValid && dirty)}
                          >
                            Continue
                          </button>
                        </Link>
                      </Form>
                    )}
                  </Formik>

                  {/* Footer */}
                  <p className="text-muted  mt-3 text-center">
                    By continuing you confirm that you have read and agree to
                    the{" "}
                    <Link
                      href="#"
                      className="text-primary text-decoration-none"
                    >
                      Terms of Service
                    </Link>
                    , the{" "}
                    <Link
                      href="#"
                      className="text-primary text-decoration-none"
                    >
                      Privacy Policy
                    </Link>{" "}
                    and the{" "}
                    <Link
                      href="#"
                      className="text-primary text-decoration-none"
                    >
                      Operator Terms
                    </Link>
                    .
                  </p>
                </div>
              </div>
            </div>
          </div>

          <footer className="parking-footer">
            <div
              className="footer-top d-flex justify-content-between align-items-center gap-4 mx-4  mx-lg-0"
              style={{ fontSize: "12px" }}
            >
              <p className="text-start">
                {parkingData?.pname} Operated by{" "}
                <a
                  href="https://socalpark.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  SoCal
                </a>
              </p>
              <p className="text-end">{parkingData?.paddress}</p>
            </div>

            <div className="footer-bottom text-center">
              <div className="powered-box py-3">
                Powered by <img src="/SoCal.png" alt="Oobeo" />
              </div>
            </div>
          </footer>
        </>
      )}
    </>
  );
}
