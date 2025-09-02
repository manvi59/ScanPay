// "use client";
// import Image from "next/image";
// import Link from "next/link";

// export default function BookingSuccess() {
//   return (
//     <div className="container d-flex flex-column align-items-center justify-content-center mt-5 text-center">
      
//       <h2 className="fw-bold mb-3">Booking Successful</h2>
//       <p className="text-muted mb-4">
//         Thank you for your booking. Your parking has been confirmed.
//       </p>

      
//       <div className="border rounded p-4 shadow-sm mb-4" style={{ maxWidth: "400px", width: "100%" }}>
//         <h5 className="mb-3">Booking Details</h5>
//         <p className="mb-1"><strong>Booking ID:</strong> #123456</p>
//         <p className="mb-1"><strong>Location:</strong> DT - SRQ Magazine</p>
//         <p className="mb-1"><strong>Duration:</strong> 2 Hours</p>
//         <p className="mb-0"><strong>Amount Paid:</strong> $10.00</p>
//       </div>

      
//       <Link href="/" className="btn btn-primary px-4 rounded-pill">
//         Go to Home
//       </Link>

      
//       <footer className="text-muted small mt-5">
//         DT - SRQ Magazine Operated by RM Parking Solutions LLC <br />
//         210 Avenida Madera, Sarasota FL, 34242
//       </footer>
//     </div>
//   );
// }


"use client";
import Image from "next/image";
import Link from "next/link";
// import { CheckCircle } from "lucide-react";
import { FaRegCheckCircle } from "react-icons/fa";

export default function BookingSuccess() {
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
             
          <p className="mb-2"><strong>Booking ID:</strong> #123456</p>
          <p className="mb-2"><strong>Location:</strong> DT - SRQ Magazine</p>
          <p className="mb-2"><strong>Duration:</strong> 2 Hours</p>
          <p className="mb-0"><strong>Amount Paid:</strong> $10.00</p>
    
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
        DT - SRQ Magazine Operated by RM Parking Solutions LLC <br />
        210 Avenida Madera, Sarasota FL, 34242
      </footer>
    </div>
  );
}
