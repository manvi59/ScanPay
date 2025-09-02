 
"use client";
import Header from "@/components/Header";
import React, { useState } from "react";
import "../time_slot/time_slot.css";
import { PiSealPercentLight } from "react-icons/pi";
import { MdEdit } from "react-icons/md";
import { FaCaretUp } from "react-icons/fa";
import { RiArrowDownSFill } from "react-icons/ri";
import Security from "@/components/Security/Security";
import Footer from "@/components/Footer/Footer";
import { useRouter } from "next/navigation";
import { IoCheckmarkCircleSharp } from "react-icons/io5";
import { IoCloseCircleSharp } from "react-icons/io5";
// import 'bootstrap/dist/css/bootstrap.min.css';
import { RxCross2 } from "react-icons/rx";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";


const Page = () => {
  const [boxSelect, setBoxSelect] = useState(1);
  const [show, setShow] = useState(false);
  const [licenceValue, setLicenceValue] = useState("");
  const router = useRouter();

  const images = [
    "/car.jpg",
    "/car.jpg",
    "/car.jpg"
  ];

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
      title: "Subtotal",
      price: "$18.00",
    },
    {
      id: 2,
      title: "Taxes and Fees",
      price: "$15.33",
    },
  ];

  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [showTimeList, setShowTimeList] = useState(false);

  const times = [
    "1:00 PM", "1:30 PM", "2:00 PM", "2:30 PM",
    "3:00 PM", "3:30 PM", "4:00 PM", "4:30 PM"
  ];

  return (
    <>
      <Header header_path="/" header_heading="650 17th Street" logo={true}/>
      <section className="mainContent"> 

        <div className="w-full h-48">
      <Swiper
        modules={[Navigation, Pagination]}
        navigation
        pagination={{ clickable: true }}
        spaceBetween={10}
        slidesPerView={1}
        className="h-full"
      >
        {images.map((src, idx) => (
          <SwiperSlide key={idx}>
            <img
              src={src}
              alt={`Slide ${idx + 1}`}
              className="w-full h-48 object-cover rounded-lg"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
      {/* <p
        className="MuiTypography-root MuiTypography-body1 css-1dgpugi-subHeading"
        data-testid="tariff-section-sub-heading"
      >
        
        Choose your time slot
      </p> */}

      <div className="m-4 flex flex-col gap-4" style={{borderBottom:"1px solid #ddd"}}>
        {/* Location */}
        <div className="text-sm">
          <p className="font-medium">
            54 Murray Street, 110 Church Street, Garage of Hidden Charms
          </p>
        </div>
      </div>

       

    

      <div className="mx-3 ">
        {/* <div className="licence">Enter license plate without spaces and dashes</div> */}
        {/* <img
          src="https://vehicle-plate-gmp-prod-us.s3.amazonaws.com/Lpr_vehicle_license_vpneparking.png"
          height="100%"
          width="100%"
        /> */}
        <div className="licence_main  mt-0"> Your reservation info</div>
        {/* <div className=" d-flex justify-content-center gap-3 my-3 align-items-center ">
        <div className="text center plate_box   text-center " style={{width:"40%"}}>
         <span className="total_main ">
         ABC123
          </span>  

        </div>

      <div>
       <p className="total_main d-flex align-items-center gap-1"> <IoCheckmarkCircleSharp size={23} style={{color:"green"}} />ABC123</p>
         <p className="total_main d-flex align-items-center gap-1"> <IoCloseCircleSharp size={23} style={{color:"rgb(238, 37, 37)"}} />ABC 123</p>
      </div>

        </div> */}

        {/* <div className="d-flex justify-content-center gap-3 my-3 align-items-center ">

        <div className="licenceInput d-block">
          <label htmlFor="phone" className="parkingDuration2">End Date</label>
          <input
            id="phone"
            name="date"
            type="date"
            
            placeholder="Enter Validation Code Here"
            required
            style={{ width: "100%" }}
            className="mx-0 mb-3 mt-1"
          />
        </div>
        
        <div className="licenceInput d-block">
          <label htmlFor="phone" className="parkingDuration2">End Time</label>
          <input
            id="phone"
            name="date"
            type="time"
           
            placeholder="Enter Validation Code Here"
            required
            style={{ width: "100%" }}
            className="mx-0 mb-3 mt-1"
          />
        </div>
        </div> */}

        <div className="d-flex justify-content-center gap-3 my-3 align-items-center">
      
      {/* Date Picker */}
      <div className="licenceInput d-block position-relative">
        <label htmlFor="endDate" className="parkingDuration2">End Date</label>
        <input
          id="endDate"
          name="endDate"
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className=" mx-0 mb-3 mt-1"
          style={{ minWidth: "150px" }}
        />
      </div>

      {/* Time Picker */}
      <div className="licenceInput d-block position-relative" style={{ minWidth: "150px" }}>
        <label htmlFor="endTime" className="parkingDuration2">End Time</label>
        <div
          className="form-control mx-0 mb-3 mt-1 d-flex justify-content-between align-items-center"
          style={{ cursor: "pointer" , padding:"0.9rem"}}
          onClick={() => setShowTimeList(!showTimeList)}
        >
          {selectedTime || "Select Time"}
          <span className="ms-2">&#9662;</span>
        </div>

        {showTimeList && (
          <ul
            className="list-group position-absolute w-100 shadow"
            style={{
              top: "70px",
              zIndex: 10,
              maxHeight: "200px",
              overflowY: "auto",
              
            }}
          >
            {times.map((time, index) => (
              <li
                key={index}
                className="list-group-item list-group-item-action"
                onClick={() => {
                  setSelectedTime(time);
                  setShowTimeList(false);
                }}
              >
                {time}
              </li>
            ))}
          </ul>
        )}
      </div>

    </div>

         <div
          className={`timeSlot_box`}
          // key={item?.id}
          // onClick={() => setBoxSelect(item?.id)}
          style={{ cursor: "pointer" }}
        >
          <div>
            <p className="parkingDuration2">4 Hours 21 Minutes</p>
            <p className="endTime2">Until 05:30 PM</p>
          </div>

          <div>
            <p className="parkingDuration2">$27.00</p>
            <p className="endTime2">Total</p>
          </div>
        </div>
        
      </div>

      <div className="input-fields my-4 mx-3">
        <div className="licenceInput d-block">
          <label htmlFor="phone" className="parkingDuration2">Email Address*</label>
          <input
            id="phone"
            name="date"
            type="text"
            // value={phone}
            // onChange={(e) => setValidationValue(e.target.value)}
            placeholder="Enter Email Address"
            required
            style={{ width: "100%" }}
            className="mx-0 mb-3 mt-1"
          />
        </div>
        
        <div className="licenceInput d-block">
          <label htmlFor="phone" className="parkingDuration2">Licence Plate*</label>
          <input
            id="phone"
            name="date"
            type="text"
            // value={phone}
            // onChange={(e) => setValidationValue(e.target.value)}
            placeholder="Enter Licence Plate"
            required
            style={{ width: "100%" }}
            className="mx-0 mb-3 mt-1"
          />
        </div>
      </div>


      {/* <div className="scan_box ">
        <div className="scan_box promo_text">
          <PiSealPercentLight size={23} style={{ marginRight: "5px" }} />
          Promo Code
        </div>
        <button className="ScanButton" onClick={() => router.push("/scanner")}>
          Scan or Add
          <MdEdit />
        </button>
      </div> */}
      <div className="total_box2 scan_box">
        <div className="total_main2">
          Payment Summery
        </div>
        
      </div>

      
        <>
          {priceList.map((item) => {
            return (
              <div className="total_box2 scan_box" key={item?.id}>
                <div className="endTime2">{item?.title} </div>
                <div className="endTime2 text-black">{item?.price}</div>
              </div>
            );
          })}

          <div className="total_box2 scan_box border-top">
            <div className="total_main2 ">Grand Total </div>
            <div className="total_payment2">$23.20</div>
          </div>
        </>
    

      {/* <div className="total_line">
        *Total Cost is inclusive of Service Fee of $1.00 + 0.5%
      </div> */}
      </section>

        <div className="mx-3 my-4 ">
        {/* <div className="licence">Enter license plate without spaces and dashes</div> */}
        {/* <img
          src="https://vehicle-plate-gmp-prod-us.s3.amazonaws.com/Lpr_vehicle_license_vpneparking.png"
          height="100%"
          width="100%"
        /> */}
        <div className="licence_main  "> Choose your Payment method</div>
        <p className="secure-text">all payments are secure and encrypted</p>
        <div>
          <div className=" mx-0  row  mb-3 ">
            <div className="col-6">

              <button className=" w-100 border px-2 py-3  rounded text-sm bg-white ">
                <img src="/apple-pay.png"  height="20" width="17" className="me-2" />
                Apple Pay</button>
            </div>
            <div className="col-6">

              <button className="w-100  border px-2 py-3 rounded bg-white">Credit Card</button>
            </div>
            </div>
        </div>
        
      </div>

         <div className="input-fields mt-4 mx-3">
        <div className="licenceInput d-block">
          <label htmlFor="phone" className="parkingDuration2">Name on Card*</label>
          <input
            id="phone"
            name="date"
            type="text"
            // value={phone}
            // onChange={(e) => setValidationValue(e.target.value)}
            placeholder="Enter Email Address"
            required
            style={{ width: "100%" }}
            className="mx-0 mb-3 mt-1"
          />
        </div>
        
        <div className="licenceInput d-block">
          <label htmlFor="phone" className="parkingDuration2">Card Number*</label>
          <input
            id="phone"
            name="date"
            type="text"
            // value={phone}
            // onChange={(e) => setValidationValue(e.target.value)}
            placeholder="0000 0000 0000 0000"
            required
            style={{ width: "100%" }}
            className="mx-0 mb-3 mt-1"
          />
        </div>
      </div>

        <div className="d-flex justify-content-center gap-3 mb-3 align-items-center mx-3 ">

        <div className="licenceInput d-block">
          <label htmlFor="phone" className="parkingDuration2">Expiration*</label>
          <input
            id="phone"
            name="date"
            type="text"
            // value={phone}
            // onChange={(e) => setValidationValue(e.target.value)}
            placeholder="MM/YY"
            required
            style={{ width: "100%" }}
            className="mx-0 mb-3 mt-1"
          />
        </div>
        
        <div className="licenceInput d-block">
          <label htmlFor="phone" className="parkingDuration2">CVC*</label>
          <input
            id="phone"
            name="date"
            type="text"
            // value={phone}
            // onChange={(e) => setValidationValue(e.target.value)}
            placeholder="123"
            required
            style={{ width: "100%" }}
            className="mx-0 mb-3 mt-1"
          />
        </div>
        </div>
        <div className="mx-3">
          <button
                      className="proceedButton"
                      // onClick={handleSubmit}
                      // onClick={() => router.push("/time_slot")}
                    >
                     Confirm & Pay
                    </button>
          </div>

            


      <div style={{ paddingBottom: "30px" }}>
        <Security />
      </div>
        {/* <Footer licenceValue={licenceValue} /> */}
    </>
  );
};

export default Page;
