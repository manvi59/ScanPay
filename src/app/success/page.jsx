 
"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaRegCheckCircle } from "react-icons/fa";

export default function BookingSuccess() {


    const [booking, setBooking] = useState(null);
    const [payData , setPayData]=useState("");
    const router = useRouter();
    
    useEffect(() => {
      if (typeof window !== "undefined") {
        const data = localStorage.getItem("booking_success");
        const main_data = localStorage.getItem("booking_data");
        if (data && main_data) {
          setBooking(JSON.parse(data));
          setPayData(JSON.parse(main_data))
        } 
        else {
          // If no data, redirect back home
          router.push("/");
        }
      }
    }, [router]);
  return (
    <div className="container d-flex flex-column align-items-center justify-content-center  text-center">
      {/* Success Icon */}
      <div className="mt-5 mb-3">
        <FaRegCheckCircle size={72} className="text-success" />
        {/* <CheckCircle   /> */}
      </div>

      {/* Heading */}
      <h2 className="fw-bold mb-2">Booking Confirmed!</h2>
      <p className="text-muted mb-4" style={{ maxWidth: "420px" }}>
        Thank you for booking with us. Your parking has been reserved successfully.  
      </p>

      {/* Booking Card */}
      <div
        className="bg-white border rounded-4 shadow-sm p-4 mb-4"
        style={{ maxWidth: "400px", width: "100%" }}
      >
        <h5 className="fw-semibold mb-3">Booking Details</h5>
        <div className="text-center">
             
          <p className="mb-2"><strong>Booking ID:</strong> {booking?.booking_id}</p>
          <p className="mb-2"><strong>Location:</strong> {payData?.pname}</p>
          {/* <p className="mb-2"><strong>Duration:</strong> 2 Hours</p> */}
          <p className="mb-2"><strong>Check-in:</strong>  {payData?.startdate && payData?.starttime
                ? new Date(
                    `${payData.startdate} ${payData.starttime}`
                  ).toLocaleString("en-US", {
                    hour: "numeric",
                    minute: "numeric",
                    hour12: true,
                    day: "numeric",
                    month: "short",
                    // year: "numeric",
                  })
                : ""}</p>
          <p className="mb-2"><strong>Checkout:</strong>   {payData?.endtime
                ? new Date(payData.endtime).toLocaleString("en-US", {
                    hour: "numeric",
                    minute: "numeric",
                    hour12: true,
                    day: "numeric",
                    month: "short",
                    // year: "numeric",
                  })
                : ""}</p>
          <p className="mb-0"><strong>Amount Paid:</strong> ${payData?.fcharge}</p>
    
        </div>
      </div>
 

      {/* CTA Button */}
      {/* <Link
        href="/"
        className="btn btn-success px-4 py-2 rounded-pill shadow-sm"
      >
        Go to Home
      </Link> */}

      {/* Footer */}
      <footer className="text-muted small mt-5">
        {/* DT - SRQ Magazine Operated by RM Parking Solutions LLC <br />
        210 Avenida Madera, Sarasota FL, 34242 */}
         {payData?.pname} Operated by SoCal <br></br> {payData?.paddress}
      </footer>
    </div>
  );
}
