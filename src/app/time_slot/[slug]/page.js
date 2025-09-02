"use client";
import Header from "@/components/Header";
import React, { useEffect, useState } from "react";
import "../time_slot.css";
import { PiSealPercentLight } from "react-icons/pi";
import { MdEdit } from "react-icons/md";
import { FaCaretUp } from "react-icons/fa";
import { RiArrowDownSFill } from "react-icons/ri";
import Security from "@/components/Security/Security";
import Footer from "@/components/Footer/Footer";
import { useParams, useRouter } from "next/navigation";
import { IoCheckmarkCircleSharp } from "react-icons/io5";
import { IoCloseCircleSharp } from "react-icons/io5";
// import 'bootstrap/dist/css/bootstrap.min.css';
import { RxCross2 } from "react-icons/rx";
import axios from "axios";
import showToast from "@/utils/showToast";
import { Formik, Form, Field, ErrorMessage ,  } from "formik";
import * as Yup from "yup";
import RBForm from 'react-bootstrap/Form';
 
// import {Select} from 'react-bootstrap/Form';
const Page = () => {
  const [boxSelect, setBoxSelect] = useState(0);
  const [show, setShow] = useState(false);
  const [licenceValue, setLicenceValue] = useState("");
  const [emailValue, setEmailValue] = useState("");
  const [mainData, setMainData] = useState([]);
  const router = useRouter();

  const [phone, setPhone] = useState("");

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

  // useEffect(() => {
  //   if (typeof window !== "undefined") {
  //     const savedPhone = localStorage.getItem("phone");
  //     setPhone(savedPhone);
  //   }
  // }, []);

  // const [formData , setFormData]=useState({

  //   slug: '',
  //   phone: '',
  //   startdate: '',
  //   starttime: '',
  //   endtime: '',
  //   fcharge: '',
  //   charge: '',
  //   taxsum: '',
  //   email: '',
  //   license_plate: ''

  // })

  const params = useParams();

  // console.log(params?.slug , localStorage.getItem("phone"))

  const time_slotList = [
    {
      id: 1,
      duration: " 4 Hours 21 Minutes",
      endTime: "Until 05:30 PM",
      cost: "$27.00",
    },
    {
      id: 2,
      duration: "1 day",
      endTime: "Until tomorrow05:30 PM",
      cost: "$30.00",
    },
  ];

  const priceList = [
    {
      id: 1,
      title: "Parking Price",
      price: "$27.00",
    },
    {
      id: 2,
      title: "Service Price",
      price: "$1.33",
    },
  ];

  const getData = async () => {
    //  e.preventDefault()

    try {
      const response = await axios.post(
        "https://admin.theselfparking.com/api/parkingdetail/405-airport-parking",
        {
          slug: params?.slug,
          phone: localStorage.getItem("phone"),
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
    }
  };

  useEffect(() => {
    getData();

    if (typeof window !== "undefined") {
      const savedPhone = localStorage.getItem("phone");
      setPhone(savedPhone);
    }
  }, []);

  // console.log(mainData)

  function formatEndTime(endtime) {
    const date = new Date(endtime.replace(" ", "T")); // make it ISO-friendly
    return date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  }

  function formatHourOnly(duration) {
  if (!duration) return "";

  const match = duration.match(/(\d+)\s*hour/);
  if (match && match[1] !== "0") {
    return `${match[1]} hour`;
  }

  return ""; // return empty if 0 hours
}

  // console.log(licenceValue)
  // console.log(emailValue)

  return (
    <>
      <Header header_path="/" header_heading="650 17th Street" logo={true} />
         
      <Formik
        initialValues={{ licenceValue: "", emailValue: "" }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log("Submitting form:", values);
          // ✅ You don’t need to trigger checkout here — Footer handles it
        }}
      >
        {({ values, errors, touched, setFieldValue ,isValid}) => (
          <Form>
            <section className="mainContent" >
              <p
                className="MuiTypography-root MuiTypography-body1 css-1dgpugi-subHeading"
                data-testid="tariff-section-sub-heading"
              >
                <span>
                  <svg
                    className="MuiSvgIcon-root MuiSvgIcon-fontSizeSmall css-1odycxs-subHeadingIcon"
                    focusable="false"
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    data-testid="access-time-icon"
                  >
                    <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2M12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8"></path>
                    <path d="M12.5 7H11v6l5.25 3.15.75-1.23-4.5-2.67z"></path>
                  </svg>
                </span>
                Choose your time slot
              </p>

               <div className='d-flex my-4  justify-content-center mx-3 '>
        {/* <RBForm.Select size="lg" 
        onChange={(e)=> console.log(e.target.value)}
        >

         {mainData.map((item , indx)=>{
          return <>
          <option  key={indx}>{ formatHourOnly(item?.duration)}</option>
          </>
         })}
 

      </RBForm.Select> */}

      <RBForm.Select
  size="lg"
  onChange={(e) => {
    const selectedIndex = parseInt(e.target.value); // index as a number
    const selectedItem = mainData[selectedIndex];
    console.log("Index:", selectedIndex);
    console.log("Item:", selectedItem);
    setBoxSelect(selectedIndex)
  }}
>
  {mainData.map((item, index) => (
    <option key={index} value={index}>
      {formatHourOnly(item?.duration)}
    </option>
  ))}
</RBForm.Select>

       
    </div>

              {/* {mainData.map((item, indx) => (
                <div
                  className={indx === boxSelect ? "time_box" : `time_box2`}
                  key={indx}
                  onClick={() => setBoxSelect(indx)}
                  style={{ cursor: "pointer" }}
                >
                   <div>
                    <p className="parkingDuration">
                       {item?.duration}
                    </p>
                    <p className="endTime">
                       Until {formatEndTime(item?.endtime)}
                    </p>
                  </div>

                  <div>
                    <p className="parkingCost">${item?.charge}</p>
                  </div>
                </div>
              ))} */}

              <div className="mx-3 ">
                <div className="licence">
                  Enter license plate without spaces and dashes
                </div>
                {/* <img
          src="https://vehicle-plate-gmp-prod-us.s3.amazonaws.com/Lpr_vehicle_license_vpneparking.png"
          height="100%"
          width="100%"
        /> */}
                <div className="licence_main ">
                  {" "}
                  Enter with your represented as your licence plate
                </div>
                <div className=" d-flex justify-content-center gap-3 my-3 align-items-center ">
                  <div
                    className="text center plate_box   text-center "
                    style={{ width: "40%" }}
                  >
                    <span className="total_main ">ABC123</span>
                  </div>

                  <div>
                    <p className="total_main d-flex align-items-center gap-1">
                      {" "}
                      <IoCheckmarkCircleSharp
                        size={23}
                        style={{ color: "green" }}
                      />
                      ABC123
                    </p>
                    <p className="total_main d-flex align-items-center gap-1">
                      {" "}
                      <IoCloseCircleSharp
                        size={23}
                        style={{ color: "rgb(238, 37, 37)" }}
                      />
                      ABC 123
                    </p>
                  </div>
                </div>
              </div>

              {/* <div className="crossInput_main mt-3 d-flex align-items-center"  style={licenceValue ? { border: "2px solid rgb(241, 39, 39)" } : {}}
      >
         
        <input
          id="phone"
          name="phone"
          type="tel"
          value={licenceValue}
          onChange={(e) => setLicenceValue(e.target.value)}
          placeholder="Enter Licence Plate"
          className="crossInput"
          required
        />
        {licenceValue && (
        <RxCross2
          className="clear-icon "
          onClick={() => setLicenceValue('')}
          size={20}
          style={{cursor:"pointer", marginRight:"10px"}}
        />
      )} 
      </div> */}
              <div className="crossInput_main mt-3 d-flex align-items-center" style={values?.licenceValue ? { border: "2px solid rgb(241, 39, 39)" } : {}}>
                <Field
                  id="licenceValue"
                  name="licenceValue"
                  type="text"
                  placeholder="Enter Licence Plate"
                  className="crossInput"
                />
                {values?.licenceValue && (
                  <RxCross2
                    className="clear-icon"
                    onClick={() => setFieldValue("licenceValue", "")}
                    size={20}
                    style={{ cursor: "pointer", marginRight: "10px" }}
                  />
                )}
              </div>
              <ErrorMessage
                name="licenceValue"
                component="div"
                className="error_text ms-3"
              />
              {/* <div className="crossInput_main mt-3 d-flex align-items-center"  style={emailValue ? { border: "2px solid rgb(241, 39, 39)" } : {}}
      >
         
        <input
          id="email"
          name="email"
          type="email"
          value={emailValue}
          onChange={(e) => setEmailValue(e.target.value)}
           placeholder="Enter Email Address"
          className="crossInput"
          required
        />
        {emailValue && (
        <RxCross2
          className="clear-icon "
          onClick={() => setEmailValue('')}
          size={20}
          style={{cursor:"pointer", marginRight:"10px"}}
        />
      )} 
      </div> */}

              <div
                className="crossInput_main mt-3 d-flex align-items-center"
                style={
                  values?.emailValue
                    ? { border: "2px solid rgb(241, 39, 39)" }
                    : {}
                }
              >
                <Field
                  id="emailValue"
                  name="emailValue"
                  type="email"
                  placeholder="Enter Email Address"
                  className="crossInput"
                />
                {values?.emailValue && (
                  <RxCross2
                    className="clear-icon"
                    onClick={() => setFieldValue("emailValue", "")}
                    size={20}
                    style={{ cursor: "pointer", marginRight: "10px" }}
                  />
                )}
              </div>
              <ErrorMessage
                name="emailValue"
                component="div"
                className="error_text ms-3"
              />

           {/*   <div className="scan_box ">
                <div className="scan_box promo_text">
                  <PiSealPercentLight
                    size={23}
                    style={{ marginRight: "5px" }}
                  />
                  Promo Code
                </div>
                <button
                  className="ScanButton"
                  onClick={() => router.push("/scanner")}
                >
                  Scan or Add
                  <MdEdit />
                </button>
              </div>
*/}

              <div className="total_box scan_box mt-4">
                <div className="total_main">
                  Total:{" "}
                  <span className="total_payment">
                    ${mainData[boxSelect]?.final}
                  </span>{" "}
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    cursor: "pointer",
                  }}
                >
                  {show ? (
                    <>
                      Hide Breakup
                      <FaCaretUp size={20} onClick={() => setShow(false)} />
                    </>
                  ) : (
                    <>
                      View Breakup
                      <RiArrowDownSFill
                        size={25}
                        onClick={() => setShow(true)}
                      />
                    </>
                  )}
                </div>
              </div>

              {show && (
                <>
                  {/* {priceList.map((item) => {
            return (
              <div className="total_box scan_box" key={item?.id}>
                <div className="price_title">{item?.title} </div>
                <div> 
                  {item?.price}
 

                </div>
              </div>
            );
          })} */}

                  <div className="total_box scan_box">
                    <div className="price_title">Parking Price </div>
                    <div>${mainData[boxSelect]?.charge}</div>
                  </div>
                  <div className="total_box scan_box">
                    <div className="price_title">Service Price </div>
                    <div>${mainData[boxSelect]?.taxsum}</div>
                  </div>

                  <div className="total_box scan_box">
                    <div className="total_main">Total Cost </div>
                    <div className="total_payment">
                      ${mainData[boxSelect]?.final}
                    </div>
                  </div>
                </>
              )}

              {/* <div className="total_line">
                *Total Cost is inclusive of Service Fee of $1.00 + 0.5%
              </div> */}
            </section>
            <div style={{ paddingBottom: "30px" }}>
              <Security />
            </div>
            {/* <Footer licenceValue={licenceValue} emailValue={emailValue} slug={params?.slug} phone={phone}  
        mainData={mainData[boxSelect]}
        /> */}
            <Footer
              licenceValue={values.licenceValue}
              emailValue={values.emailValue}
              slug={params?.slug}
              phone={phone}
              mainData={mainData[boxSelect]}
              isValid={isValid}
            />
          </Form>
        )}
      </Formik>
    </>
  );
};

export default Page;
