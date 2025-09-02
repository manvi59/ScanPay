import Image from "next/image";
import styles from "./page.module.css";
import Header from "@/components/Header";
import User from "./user/page";
import Faq from "@/components/Faq/faq";
import Security from "@/components/Security/Security";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


export default function Home() {
  return (
    <div 
    className="rootContainer" 
    >
      <Header header_path="" header_heading="" logo={true}/>
      <User/>
      <Faq/>
      <Security/>
       <ToastContainer />
      </div>

  );
}
