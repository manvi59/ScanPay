"use client";
import { useEffect, useState } from "react";
import Head from "next/head";
import "../../design/design.css";
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
import { useParams, useRouter } from "next/navigation";
import Loader from "@/components/Loader";

export default function page() {
  const router = useRouter();
  const params = useParams();

  const [parkingData, setParkingData] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const main_data = localStorage.getItem("parking_data");
      if (main_data) {
        const data = JSON.parse(main_data);

        setParkingData(data);

        // console.log(data?.mainData)
      } else {
        router.push("/");
      }
    }
  }, [router]);

  const checkout = async () => {
    //  e.preventDefault()
    setLoading(true);

    const booking_data = {
      slug: params?.slug,
      phone: parkingData?.phone,
      startdate: new Date().toISOString().split("T")[0],
      starttime: new Date().toTimeString().split(" ")[0],
      endtime: parkingData?.mainData?.endtime,
      fcharge: parkingData?.mainData?.final,
      charge: parkingData?.mainData?.charge,
      taxsum: parkingData?.mainData?.taxsum,
      email: parkingData?.email,
      license_plate: parkingData?.licence,
    };

    try {
      const response = await axios.post(
        "https://admin.theselfparking.com/api/hjcheckout",
        booking_data,
        {
          headers: {
            Accept: "application/json",
          },
        }
      );
      router.push(`/pay`);
      
      // showToast("Proceed Payment ", "success");

      const ok = JSON.parse(response?.data?.result?.booking_data);
      booking_data["paddress"] = ok?.paddress;
      booking_data["pname"] = ok?.pname;
      localStorage.setItem("booking_data", JSON.stringify(booking_data));
        setLoading(false);
    } catch (error) {
      console.log(error);
      showToast(error, "error");
    } finally {
      setLoading(true);
    }
  };

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
          <div className="parking-container d-flex align-items-center justify-content-center my-3">
            <div className="parking-card pb-0 w-100 p-0 ">
              <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <div className="cart-details-container">
                  <div className="payment-summary">
                    <div className="summary-section">
                      <h3 className="summary-title">Payment Details</h3>

                      <div className="summary-row">
                        <div className="summary-label">Parking Fee</div>
                        <div className="summary-value">
                          ${parkingData?.mainData?.charge}
                        </div>
                      </div>

                      {parkingData?.mainData?.taxdata.map((items, indx)=>
                        
                      items?.tax_value &&(
                        <div className="summary-row" key={indx}>
                        <div className="summary-label">{items?.tax_desc}</div>
                        <div className="summary-value">
                          ${items?.tax_value}
                        </div>
                        
                      </div>
                      )
                      
 
                      )}

                      {/* <div className="summary-row">
                        <div className="summary-label">Convenience fee</div>
                        <div className="summary-value">
                          ${parkingData?.mainData?.taxdata[0]?.tax_value}
                        </div>
                      </div>

                      <div className="summary-row">
                        <div className="summary-label">Sales Tax</div>
                        <div className="summary-value">
                          ${parkingData?.mainData?.taxdata[1]?.tax_value}
                        </div>
                      </div> */}

                      <div className="summary-row summary-total">
                        <div className="summary-label">Total Due</div>
                        <div className="summary-value">
                          ${parkingData?.mainData?.final}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row mb-5">
                  <div className="col-12">
                    {/* <Link href="/pay" className="w-100"> */}
                    <button
                      onClick={() => checkout()}
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
                    {/* </Link> */}
                  </div>
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
                Powered by <img src="/SOCAL02.png" alt="Oobeo" />
              </div>
            </div>
          </footer>
        </>
      )}
    </>
  );
}
