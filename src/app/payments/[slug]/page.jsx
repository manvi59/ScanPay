'use client'
import Header from "@/components/Header";
import React, { useEffect, useState } from "react";
import "../payments.css";
import { CiCreditCard2 } from "react-icons/ci";
import Button from "react-bootstrap/Button";
// import {Modal,ProgressBar} from "react-bootstrap/Modal";
import Modal from "react-bootstrap/Modal";
import ProgressBar from "react-bootstrap/ProgressBar";

import axios from "axios";
import showToast from "@/utils/showToast";
import { useParams, useRouter } from "next/navigation";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
const page = () => {

  const [show, setShow] = useState(false);
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [cardName , setcardName]=useState("");
  const [postal , setPostal]=useState("")
  const [month , setMonth]=useState("");
  const [year , setYear]=useState("");
  const router=useRouter();

  const parms=useParams()
  const [bookingData , setBookingData]=useState([]);
  const [processModal , setProcessModal]=useState(false);
  const [paymentCount , setPaymentCount]=useState(0);


  useEffect(()=>{
    let book_data = localStorage.getItem("booking_data");
    book_data = JSON.parse(book_data);
    setBookingData(book_data);
    

  },[])

 
  // const formatCardNumber = (value) => {
  //   const digits = value.replace(/\D/g, '').slice(0, 16);
  //   const parts = digits.match(/.{1,4}/g);
  //   return parts ? parts.join(' ') : '';
  // };

  const handleChange = (e) => {
    const formatted = formatCardNumber(e.target.value);
    setCardNumber(formatted);
  };

  // const formatExpiry = (value) => {
  //   const digits = value.replace(/\D/g, '').slice(0, 6); // Allow 6 digits: MMYYYY
  //   if (digits.length <= 2) return digits;
    
  //   return `${digits.slice(0, 2)} / ${digits.slice(2)}`;
  // };

  const handleExpiryChange = (e) => {
    const formatted = formatExpiry(e.target.value);
    setExpiry(formatted);

     const cleanDigits = formatted.replace(/\D/g, ''); // remove non-digits
  const month = cleanDigits.slice(0, 2);
  const year = cleanDigits.slice(2);

  setMonth(month);
  setYear(year);
 
  };
 
  // const handleCvvChange = (e) => {
  //   const digits = e.target.value.replace(/\D/g, '').slice(0, 4); // Max 4 digits
  //   setCvv(digits);
  // };

//    const makePaymnet = async () => {
//     //  e.preventDefault()
// let data=localStorage.getItem("booking_data");
// data =JSON.parse(data)
// // console.log( data?.slug)

//     try {
//       const response = await axios.post(
//         "https://admin.theselfparking.com/api/makepaymnet",
//          {
         
//       slug: data?.slug,
//     phone: data?.phone,
//     startdate: data?.startdate,
//     starttime: data?.starttime,
//     endtime: data?.endtime,
//     fcharge: data?.fcharge,
//     charge: data?.charge,
//     taxsum: data?.taxsum,
//     email: data?.email,
//     license_plate: data?.license_plate,
//     card_no: cardNumber,
//     ccExpiryMonth: month,
//     ccExpiryYear: year,
//     cvvNumber:cvv,
//     amount: data?.fcharge,
//     email: data?.email,
//     name: cardName
//          },
//         {
//           headers: {
//             Accept: "application/json",
//           },
//         }
//       );
      

//       if (response.data.status === false) {
//     // API returned failure even though HTTP was 200
//     showToast(response.data.error, "error");
//     return; // stop execution
//   }
//       showToast("successfull  done makePayment", "success")
//       // console.log("hhhhhhhhhhhhh", response?.data?.result?.chargearray);
//        console.log(response?.data)

//     } catch (error) {
//       console.log(error);
//       showToast(error, "error");
//     }
//   };


  // console.log(localStorage.getItem("booking_data"))

  // console.log(cardName , cardNumber , expiry, cvv, postal )
  

//   const makePaymnet = async (values) => {
//   let data = localStorage.getItem("booking_data");
//   if (!data) {
//     showToast("No booking data found", "error");
//     return;
//   }

//   data = JSON.parse(data);

//   try {
//     const response = await axios.post(
//       "https://admin.theselfparking.com/api/makepaymnet",
//       {
//         slug: data?.slug,
//         phone: data?.phone,
//         startdate: data?.startdate,
//         starttime: data?.starttime,
//         endtime: data?.endtime,
//         fcharge: data?.fcharge,
//         charge: data?.charge,
//         taxsum: data?.taxsum,
//         email: data?.email,
//         license_plate: data?.license_plate,
//         card_no: values?.cardNumber,
//         ccExpiryMonth: values?.expiry,
//         ccExpiryYear: year,
//         cvvNumber: cvv,
//         amount: data?.fcharge,
//         name: values?.cardName,
//         vehicle_type: '1',
//         couponcode: ''
//       },
//       {
//         headers: {
//           Accept: "application/json",
//         },
//       }
//     );

//     const resData = response.data;

//     // ✅ Case 1: Validation errors (errors object present)
//     if (resData.status === false && resData.errors) {
//       Object.keys(resData.errors).forEach((field) => {
//         resData.errors[field].forEach((msg) => {
//           showToast(`${field}: ${msg}`, "error");
//         });
//       });
//       return;
//     }

//     // ✅ Case 2: Generic error (error message present)
//     if (resData.status === false && resData.error) {
//       showToast(resData.error, "error");
//       return;
//     }

//     // ✅ Case 3: Custom message error
//     if (resData.status === false && resData.msg) {
//       showToast(resData.msg, "error");
//       return;
//     }

//     // ✅ Success flow

//     if (response.data.status === true) {
//   // Save booking info
//    showToast("Payment successful ", "success");
//     // console.log("Payment response:", resData);
//   localStorage.setItem("booking_success", JSON.stringify(response.data));

//   // Redirect to success page
//   router.push("/booking-success");
// }
    

//   } catch (error) {
//     console.error("Axios error:", error);

//     // Axios can throw different error structures
//     if (error.response?.data?.errors) {
//       // validation errors inside catch
//       Object.keys(error.response.data.errors).forEach((field) => {
//         error.response.data.errors[field].forEach((msg) => {
//           showToast(`${field}: ${msg}`, "error");
//         });
//       });
//     } else if (error.response?.data?.error) {
//       showToast(error.response.data.error, "error");
//     } else {
//       showToast("Something went wrong. Please try again.", "error");
//     }
//   }
// };


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
      setProcessModal(true)
      setPaymentCount(paymentCount+1);
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
  return (
    <>
      <Header
        header_path={`/time_slot/${parms?.slug}`}
        header_heading="Complete Payment"
        logo={true}
      />
      <div className="card-session d-flex m-3 align-items-center gap-2">
        {/* <CiCreditCard2 className="pay_card " size={25} /> */}

        <div className="pay_text ms-2">Pay With Card</div>
        

        <img src="/socalpayment.png"  className="pay-card"/>
      </div>
      
      <hr className="payment_divider " />
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
      {({ values, setFieldValue , isValid ,  dirty  }) => (
        <Form>

      <div className="d-flex justify-content-center">
        <div className="payment_form  w-100 mx-5">
          {/* <div className="cardInput mx-auto  my-3 w-100">
            <div className="mb-1 card_text">Card Name</div>
            <input
             type="text"
             id="cardName"
             name="cardName"
             value={cardName}
             onChange={(e)=>setcardName(e.target.value)}
            //  placeholder="1234 5678 9012 3456"
             maxLength={19}
              placeholder="Enter Your Card Name"
              required
              style={{ width: "100%" }}
            />
          </div>
          <div className="cardInput mx-auto  my-3 w-100">
            <div className="mb-1 card_text">Card Number</div>
            <input
             type="text"
             id="cardNumber"
             name="cardNumber"
             value={cardNumber}
             onChange={handleChange}
            //  placeholder="1234 5678 9012 3456"
             maxLength={19}
              placeholder="Enter Your Card Number"
              required
              style={{ width: "100%" }}
            />
          </div>
          <div className="cardInput mx-auto  my-3 w-100">
            <div className="mb-1 card_text">Expiration Date</div>
            <input
              type="text"
              id="expiry"
              name="expiry"
              value={expiry}
              onChange={handleExpiryChange}
              // placeholder="MM / YY"
              maxLength={9}
              placeholder="MM / YYYY"
              required
              style={{ width: "100%" }}
            />
          </div>
          <div className="cardInput mx-auto  my-3 w-100">
            <div className="mb-1 card_text">CVV Number</div>
            <input
              type="text"
              id="cvv"
              value={cvv}
              onChange={handleCvvChange}
              // placeholder="123"
              maxLength={4}
              placeholder="Enter the CVV number"
              required
              style={{ width: "100%" }}
            />
          </div>
          <div className="cardInput mx-auto  my-3 w-100">
            <div className="mb-1 card_text">Postal Code</div>
            <input
              id="phone"
              name="phone"
              type="tel"
              value={postal}
              onChange={(e) => setPostal(e.target.value)}
              placeholder="Postal Code"
              required
              style={{ width: "100%" }}
            />
          </div> */}

          <div className="cardInput mx-auto  my-3 w-100">
            <div className="mb-1 card_text">Card Name</div>
            <Field
              name="cardName"
              type="text"
              placeholder="Enter Your Card Name"
              // className="form-control"
              style={{ width: "100%" }}
            />
            <ErrorMessage name="cardName" component="div" className="error_text" />
          </div>

          {/* Card Number */}
          <div className="cardInput my-3">
            <div className="mb-1 card_text">Card Number</div>
            <Field
              name="cardNumber"
              value={values.cardNumber}
              onChange={(e) =>
                setFieldValue("cardNumber", formatCardNumber(e.target.value))
              }
                style={{ width: "100%" }}
              placeholder="1234 5678 9012 3456"
             />
            <ErrorMessage name="cardNumber" component="div" className="error_text" />
          </div>

          {/* Expiry */}
          <div className="cardInput my-3">
            <div className="mb-1 card_text">Expiration Date</div>
            <Field
              name="expiry"
              value={values.expiry}
              onChange={(e) =>
                setFieldValue("expiry", formatExpiry(e.target.value))
              }
              placeholder="MM / YYYY"
                 style={{ width: "100%" }}
            />
            <ErrorMessage name="expiry" component="div" className="error_text" />
          </div>

          {/* CVV */}
          <div className="cardInput my-3">
            <div className="mb-1 card_text">CVV Number</div>
            <Field
              name="cvv"
              value={values.cvv}
              onChange={(e) =>
                setFieldValue("cvv", handleCvvChange(e.target.value))
                
              }
                style={{ width: "100%" }}
              placeholder="Enter CVV"
             />
            <ErrorMessage name="cvv" component="div" className="error_text" />
          </div>

          {/* Postal */}
          <div className="cardInput my-3">
            <div className="mb-1 card_text">Postal Code</div>
            <Field
              name="postal"
              type="text"
              placeholder="Postal Code"
                 style={{ width: "100%" }}
            />
            <ErrorMessage name="postal" component="div" className="error_text" />
          </div>
          <div className="cardInput mx-auto  my-3 w-100">
            <div className="mb-1 card_text">Powered by</div>
            {/* <img
              width="200"
              data-testid="gateway-logo-default"
              src="https://guest-simplypark.parknpay.us/qr/static/media/GPI_logo.5d8f79f59e375161fdb1.png"
              alt=""
            /> */}
            <div className="d-flex gap-2">

            <img
              width="100"
              height="50"
              data-testid="gateway-logo-default"
              src="/imune_payment.png"
              alt=""
            />
            <img
              width="100"
              height="50"
              data-testid="gateway-logo-default"
              src="/norton-payment.png"
              alt=""
            />
            </div>
          </div>
        </div>
      </div>
      <div
        className="footer custom-card w-100 d-flex justify-content-center"
        style={{ marginTop: "30px" }}
      >
        <button className="proceedButton mx-4" style={{ width: "100%" }} 
        // onClick={()=>setShow(true)} 
        onClick={()=>isValid && dirty && paymentCount<1?makePaymnet(values):makePaymnet==1 && isValid && dirty ?showToast("success","alredy paid"):""} 
        // disabled={!(isValid && dirty && paymentCount < 1)}
        type="submit"
        >
          Pay ${bookingData?.fcharge}
        </button>

        {processModal?
           <Modal show={processModal} onHide={() => setProcessModal(false)} centered>
      <Modal.Body className="text-center p-5">
        <h4 className="fw-bold">Congratulations.</h4>
        <p className="mt-3 mb-2">
          We are completing your reservation.
        </p>
        <p className="text-muted" style={{ fontSize: "14px" }}>
          Please don’t refresh this page or hit the back button while we process your request.
        </p>

        {/* Progress bar */}
        <div className="mt-4">
          <ProgressBar
            now={50}
            striped
            animated
            variant="primary"
            style={{ height: "6px" }}
          />
        </div>

        <p className="mt-3 text-muted" style={{ fontSize: "14px" }}>
          This may take up to a minute.
        </p>
      </Modal.Body>
    </Modal>
    :""
        }

        {show  && 
        <Modal show={show} onHide={() => setShow(false)} centered>
          <Modal.Header closeButton>
            <button className="helpButton">
              <div>Retry Payment</div>
            </button>
          </Modal.Header>
          <Modal.Body>
            <div className="d-flex align-items-center gap-3 justify-content-center ">
              <div className=" ">
                 <img src="https://guest-simplypark.parknpay.us/qr/static/media/paymentFailed.be563df40cbe450d943f5593862046e7.svg" 
                 />
              </div>
              <div className="header_heading">
              Payment Failed
              </div>
             </div>
              <div className="mt-3">The Bank couldn't process your payment</div>
          </Modal.Body>
          <Modal.Footer>
           
          <button className="proceedButton mx-4" style={{ width: "100%" }} onClick={()=>setShow(true)}>
           Retry Payment
        </button>
          </Modal.Footer>

        </Modal>
}
      </div>

      </Form>
      )}
    </Formik>

    </>
  );
};

export default page;
