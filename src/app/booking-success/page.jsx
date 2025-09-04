// "use client";
// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";

// export default function page() {
//   const [booking, setBooking] = useState(null);
//   const router = useRouter();

//   useEffect(() => {
//     if (typeof window !== "undefined") {
//       const data = localStorage.getItem("booking_success");
//       if (data) {
//         setBooking(JSON.parse(data));
//       } else {
//         // If no data, redirect back home
//         router.push("/");
//       }
//     }
//   }, [router]);

//   if (!booking) return null;

//   return (
//     // <div className="flex items-center justify-center  bg-green-100">
//     //   <div className="bg-green-500 text-white rounded-2xl shadow-lg p-10 max-w-md text-center">
//     //     <h1 className="text-2xl font-bold mb-4">✅ {booking.msg}</h1>
//     //     <p className="text-lg">Booking ID:</p>
//     //     <p className="text-xl font-mono bg-white text-green-700 p-2 rounded-lg inline-block mt-2">
//     //       {booking.booking_id}
//     //     </p>
//     //     <button
//     //       onClick={() => router.push("/")}
//     //       className="mt-6 px-6 py-2 bg-white text-green-600 font-semibold rounded-lg shadow hover:bg-green-200 transition"
//     //     >
//     //       Go to Home
//     //     </button>
//     //   </div>
//     // </div>

// <div className="d-flex justify-content-center align-items-center min-vh-100  text-white" style={{background:"#00D100"}}>
//   <div className="text-center p-4">
//     <h3 className="mb-3"> {booking.msg}</h3>
//     <p className="mb-1">Booking ID</p>
//     <h5 className="fw-bold">{booking.booking_id}</h5>
//     <button
//       onClick={() => router.push("/")}
//       className="btn btn-light mt-4 fw-semibold"
//     >
//       Go to Home
//     </button>
//   </div>
// </div>

//   );
// }

"use client";
import Header from "@/components/Header";
import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
// import { CheckCircle } from "react-bootstrap-icons";
import { CiCircleCheck } from "react-icons/ci";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const Page = () => {
  const [booking, setBooking] = useState(null);
  const [payData, setPayData] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const data = localStorage.getItem("booking_success");
      const main_data = localStorage.getItem("booking_data");
      if (data && main_data) {
        setBooking(JSON.parse(data));
        setPayData(JSON.parse(main_data));
      } else {
        // If no data, redirect back home
        router.push("/");
      }
    }
  }, [router]);

  if (!booking) return null;
  return (
    <>
      <Header header_path={`/`} header_heading="Complete Payment" logo={true} />

      {/* Confirmation Section */}
      <Card className="p-4  rounded-4 border-0">
        <div className="text-center ">
          <CiCircleCheck size={40} color="green" />
          <div className="d-flex  justify-content-center gap-2 text-center align-items-center">
            <h3 className="fw-bold mt-3">Parking Confirmed!</h3>
          </div>
          <p className="text-muted">You're all set. No attendant required!</p>
        </div>

        {/* Check-in / Checkout */}
        <Row className="text-center my-4">
          <Col>
            <h6 className="fw-bold">Check-in</h6>
            <p className="mb-0">
              {payData?.startdate && payData?.starttime
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
                : ""}
            </p>
          </Col>
          <Col className="d-flex align-items-center justify-content-center">
            <span className="fs-4">→</span>
          </Col>
          <Col>
            <h6 className="fw-bold">Checkout</h6>
            {/* <p className="mb-0">{payData?.endtime}</p> */}
            <p className="mb-0">
              {payData?.endtime
                ? new Date(payData.endtime).toLocaleString("en-US", {
                    hour: "numeric",
                    minute: "numeric",
                    hour12: true,
                    day: "numeric",
                    month: "short",
                    // year: "numeric",
                  })
                : ""}
            </p>
          </Col>
        </Row>

        {/* Location */}
        <div className="text-center border-top pt-3">
          <p className="mb-1 fw-semibold">{payData?.pname}</p>
          <small className="text-muted">{booking.booking_id}</small>
        </div>

        {/* License Plate */}
        <div className="my-4 d-flex justify-content-center">
          <Card className="p-3 border rounded-4 w-50 text-center">
            <p className="text-muted small mb-2">Parked with TheSelfParking</p>
            <h3 className="fw-bold">{payData?.license_plate}</h3>
          </Card>
        </div>

        {/* Rewards Section */}
        {/* <div className="my-3">
          <p className="text-center">
            🥳 You earned <b>9 free benefits</b> in the Way app
          </p>
          <Row className="g-3 text-center">
            <Col xs={4}>
              <Card className="p-3 border rounded-4 h-100">
                <small>Free Oil Change</small>
              </Card>
            </Col>
            <Col xs={4}>
              <Card className="p-3 border rounded-4 h-100">
                <small>10% off Parking</small>
              </Card>
            </Col>
            <Col xs={4}>
              <Card className="p-3 border rounded-4 h-100">
                <small>Up to 50% Cashback</small>
              </Card>
            </Col>
          </Row>
        </div> */}

        {/* Download Button */}
        {/* <div className="text-center mt-4">
          <Button
            variant="light"
            className="border rounded-4 w-100 py-3 fw-semibold"
          >
            Download The Way App
          </Button>
        </div> */}
      </Card>
    </>
  );
};

export default Page;
