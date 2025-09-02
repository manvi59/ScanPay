"use client";
import React, { useEffect } from "react";
import "./footer.css";
import { FaChevronRight } from "react-icons/fa";
import { IoMdInformationCircle } from "react-icons/io";
import { useRouter } from "next/navigation";
import { Emilys_Candy } from "next/font/google";
import axios from "axios";
import showToast from "@/utils/showToast";

const Footer = ({
  licenceValue,
  emailValue,
  slug,
  phone,
  mainData,
  isValid,
}) => {
  // console.log(licenceValue.length)

  // console.log(licenceValue , emailValue , slug , phone , mainData)
  const router = useRouter();

  const checkout = async () => {
    //  e.preventDefault()

    const booking_data = {
      slug: slug,
      phone: phone,
      startdate: new Date().toISOString().split("T")[0],
      starttime: new Date().toTimeString().split(" ")[0],
      endtime: mainData?.endtime,
      fcharge: mainData?.final,
      charge: mainData?.charge,
      taxsum: mainData?.taxsum,
      email: emailValue,
      license_plate: licenceValue,
    };

    try {
      const response = await axios.post(
        "https://admin.theselfparking.com/api/hjcheckout",
        {
          slug: slug,
          phone: phone,
          startdate: new Date().toISOString().split("T")[0],
          starttime: new Date().toTimeString().split(" ")[0],
          endtime: mainData?.endtime,
          fcharge: mainData?.final,
          charge: mainData?.charge,
          taxsum: mainData?.taxsum,
          email: emailValue,
          license_plate: licenceValue,
        },
        {
          headers: {
            Accept: "application/json",
          },
        }
      );
      showToast("Proceed Payment ", "success");
      // console.log("hhhhhhhhhhhhh", response?.data?.result?.chargearray);
      router.push(`/payments/${slug}`);
      
      // booking_data["paddress"]=response?.data?
      const ok= JSON.parse(response?.data?.result?.booking_data)
      booking_data["paddress"]=ok?.paddress
      // console.log("jjjjjjjjjjjjj",booking_data  )
      localStorage.setItem("booking_data", JSON.stringify(booking_data));
       // localStorage.setItem(response?.data?.result?.booking_data)
    } catch (error) {
      console.log(error);
      showToast(error, "error");
    }
  };

  return (
    <>
      <div className="custom-card  footer">
        {/* <div className="info_box">
          <IoMdInformationCircle />
          <span>Maximum parking duration is 1 Day</span>
        </div> */}
        <button
          className={
            licenceValue && emailValue && isValid
              ? "paymentBtn"
              : "paymentBtn_disabled"
          }
          // onClick={()=>router.push("/payments")}
          onClick={checkout}
        >
          <div className=" ">Proceed to Payment </div>
          <div className="payment_div">
            ${mainData?.final} <FaChevronRight />
          </div>
        </button>
      </div>
    </>
  );
};

export default Footer;
