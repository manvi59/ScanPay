
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { RiArrowLeftSLine } from "react-icons/ri";
import MainHeader from "@/components/MainHeader/page";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// export const metadata = {
//   title: "theselfparking",
//   description: "theselfparking",
// };


export const metadata = {
  title: "TheSelfParking",
  description: "TheSelfParking",
  openGraph: {
    title: "TheSelfParking",
    description: "TheSelfParking",
    url: "http://theselfparking.com/",  
    siteName: "Theselfparking",
    images: [
      {
        url: "/tsp_logo.png",  
        width: 1200,
        height: 630,
        alt: "theselfparking logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "theselfparking",
    title: "theselfparking",
    description: "theselfparking",
    images: ["http://theselfparking.com/tsp_logo.png"],  
  },
};


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      {/* className={`${geistSans.variable} ${geistMono.variable}`} */}
      <body  >
        {/* <div className="parking-header">
        <div className="logo-circle">
          <img src="/tsp_logo.png" alt="logo"  height={100} width={100}  className="p-3"/>
        </div>
      </div> */}


            {/* <nav
      className="navbar ps-3  navbar-dark payment_background_light justify-content-start align-items-center"
      style={{ background: 'rgb(0, 0, 0)' }}
    >
      <div className="d-flex header_buttons">
        <button
          id="back1"
          type="button"
          className="btn btn-primary p-1"
          
        >
           <RiArrowLeftSLine  size={30}/>
        </button>
      </div>
      <a className="navbar-brand pt-0" style={{ paddingLeft: '1rem' }}>
        Pay Now
      </a>
    </nav> */}

    <MainHeader/>
      
      <div className="rootContainer">
        {children}
        <ToastContainer />
        </div>
        
      </body>
    </html>
  );
}
