"use client";
import { useEffect, useState } from "react";
import Head from "next/head";
import "../../design/design.css";
import Image from "next/image";
import Link from "next/link";
import "react-phone-input-2/lib/style.css";
import axios from "axios";
import showToast from "@/utils/showToast";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import FormPay from "react-bootstrap/Form";
import { useParams, useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import Loader from "@/components/Loader";
import { MdErrorOutline } from "react-icons/md";
  
 
export default function page() {
  const [loading, setLoading]=useState(true);
   
  const params = useParams();

  const searchParams = useSearchParams();
  const phone = searchParams.get("phone");
  // const slug = searchParams.get("slug");
  // console.log(params?.slug)

  const [boxSelect, setBoxSelect] = useState(0);
  const [mainData, setMainData] = useState([]);
  

  const validationSchema = Yup.object({
    licenceValue: Yup.string()
      // .matches(/^[A-Z0-9]+$/, "Only letters & numbers allowed")
      // .min(2, "Too short")
      // .max(10, "Too long")
      .required("Licence plate is required"),
    emailValue: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
  });

  const getData = async () => {
    //  e.preventDefault()

    try {
      const response = await axios.post(
        `https://admin.theselfparking.com/api/parkingdetail/${params?.slug}`,
        {
          slug: params?.slug,
          // phone: localStorage.getItem("phone"),
          phone: phone,
          startdate: new Date().toISOString().split("T")[0],
          starttime: new Date().toTimeString().split(" ")[0],
        },
        {
          headers: {
            Accept: "application/json",
          },
        }
      );
      // showToast("successfull post ", "success")
      // console.log("hhhhhhhhhhhhh", response?.data?.result?.chargearray);
      setMainData(response?.data?.result?.chargearray);
    } catch (error) {
      console.log(error);
      showToast(error, "error");
    }finally{
      setLoading(false)
    }
  };

  useEffect(() => {
    getData();

    // if (typeof window !== "undefined") {
    //   const savedPhone = localStorage.getItem("phone");
    //   setPhone(savedPhone);
    // }
  }, []);

  // function formatHourOnly(duration) {
  //   if (!duration) return "";

  //   const match = duration.match(/(\d+)\s*hour/);
  //   if (match && match[1] !== "0") {
  //     return `${match[1]} hour`;
  //   }

  //   return "0 hour"; // return empty if 0 hours
  // }


   function formatHourOnly(durationStr) {
  const regex = /(\d+)\s*hours?,\s*(\d+)\s*minutes?/i;
  const match = durationStr.match(regex);

  if (!match) return durationStr; // fallback if no match

  const hours = parseInt(match[1], 10);
  const minutes = parseInt(match[2], 10);

  if (hours === 0) {
    return `${minutes} min`;
  }

  if (minutes === 0) {
    return `${hours} hour`;
  }

  // Custom format: "2.15 hour" means 2 hours and 15 minutes
  const paddedMinutes = minutes.toString().padStart(2, '0');
  return `${hours} hour ${paddedMinutes} min`;
}


const parkingData=(values)=>{
   const parking_data={
    phone:phone,
    email:values?.emailValue,
    licence:values?.licenceValue,
    mainData:mainData[boxSelect]


  }
    localStorage.setItem("parking_data", JSON.stringify(parking_data));
}

  return (
    <>
    {loading &&  <Loader/>}
      <Head>
        <title>Pay for Parking</title>
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
          rel="stylesheet"
        />
      </Head>

      {/* Main container */}
      <div className="parking-container d-flex align-items-center justify-content-center my-3  ">
        <div className="parking-card p-0 ">
          <h1 className="fw-normal text-center">Pay for Parking</h1>
          {/* <h5 className=" text-center mb-2">RM Parking Solutions LLC</h5> */}
          <h6 className="fw-normal  text-muted text-center my-3">
            DT - SRQ Magazine
          </h6>

          <Formik
            initialValues={{ licenceValue: "", emailValue: "" }}
            validationSchema={validationSchema}
            onSubmit={(values) => {
              // console.log("Submitting form:", values);
             }}
          >
            {({
              values,
              errors,
              touched,
              setFieldValue,
              setFieldTouched,
              isValid,
              dirty,
            }) => (
              <Form>
                <div className=" d-flex justify-content-center">
                  <div className="my-3 scan-main" style={{ width: "65%" }}>
                    <div className="mb-3 ">
                      <label className="form-label ">
                        Enter Your License Plate*
                      </label>
               
                      <FormPay.Control
                        type="text"
                        placeholder="Enter Your License Plate*"
                        style={{ height: "50px !important" }}
                        onChange={(e) => {
                          setFieldValue("licenceValue", e?.target?.value);
                          setFieldTouched("licenceValue", true); // 👈 mark field as touched
                        }}
                      />

                      {/* <ErrorMessage
                        name="licenceValue"
                        component="div"
                        className="error_text "
                      /> */}
                      <ErrorMessage
                            name="licenceValue"
                            render={(msg) => (
                              <div className="error-message d-flex align-items-center text-danger">
                                <MdErrorOutline size={18} className="me-1 error-message mt-0" />
                                <span>{msg}</span>
                              </div>
                            )}
                          />
                    </div>
                    <div className="mb-3 ">
                      <label className="form-label ">Enter Your Email*</label>

                      <FormPay.Control
                        type="text"
                        placeholder="Enter Your Email*"
                        style={{ height: "50px !important" }}
                        onChange={(e) => {
                          setFieldValue("emailValue", e?.target?.value);
                          setFieldTouched("emailValue", true);
                        }}
                      />
                      {/* <ErrorMessage
                        name="emailValue"
                        component="div"
                        className="error_text "
                      /> */}
                      <ErrorMessage
                            name="emailValue"
                            render={(msg) => (
                              <div className="error-message d-flex align-items-center text-danger">
                                <MdErrorOutline size={18} className="me-1 error-message mt-0" />
                                <span>{msg}</span>
                              </div>
                            )}
                          />
                    </div>
                    <div className="mb-3 ">
                      <label className="form-label ">Select Duration*</label>

                
                      <FormPay.Select
                        size="lg"
                        onChange={(e) => {
                          const selectedIndex = parseInt(e.target.value);
                          const selectedItem = mainData[selectedIndex];
                          // console.log("Index:", selectedIndex);
                          // console.log("Item:", selectedItem);
                          setBoxSelect(selectedIndex);
                        }}
                      >
                        {mainData.map((item, index) => (
                          <option key={index} value={index}>
                            {/* {item?.duration} */}
                            {formatHourOnly(item?.duration)}
                          </option>
                        ))}
                      </FormPay.Select>
                    </div>

                    <div
                      className={`bordered_row mb-3  ${
                        isValid && dirty ? "d-block" : "d-none"
                      }`}
                    >
                      <div className="row ">
                        <div className="col-8 text-capitalize fw-bolder fs-4">
                          Parking Total:
                        </div>
                        <div className="col-4 text-end text-nowrap fw-bolder fs-4">
                          ${mainData[boxSelect]?.final}
                        </div>
                      </div>
                      <div className="row mt-2">
                        <div className="col-12">
                          <label className="text-muted">
                            Includes ${mainData[boxSelect]?.taxsum} Processing
                            Fee and all applicable taxes
                          </label>
                        </div>
                      </div>
                    </div>

                    {/* Button */}
                    <Link href={`${isValid && dirty ? `/payment-parking/${params?.slug}` :"#"}`} 
                    onClick={()=>isValid && dirty && parkingData(values)}  
                    
                    >
                      <button
                        className={`btn btn-primary w-100 py-3 
                   `}
                        disabled={!(isValid && dirty)}

                        // style={{background:"#89CFF0 !important" , border:"1px solid #89CFF0 !important", color:"rgb(33, 37, 41) !important", fontWeight:"500"}}
                      >
                        Pay for Parking
                      </button>
                    </Link>

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
              </Form>
            )}
          </Formik>
          {/* Input Section */}
        </div>
      </div>

      <footer className="parking-footer">
        <div
          className="footer-top d-flex justify-content-between align-items-center gap-4 mx-4  mx-lg-0"
          style={{ fontSize: "12px" }}
        >
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
