'use client'
import React, {  useState } from 'react'
import HelpModal from './HelpModal/HelpModal';
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { MdOutlineMailOutline } from "react-icons/md";
import { FaChevronLeft } from "react-icons/fa";
import { useRouter } from 'next/navigation';

const Header = (props) => {
const router =useRouter();
// console.log(props)
  
  const [showModal ,setShowModal]=useState(false);
  return (
    <>
    <div style={{position:"sticky",top:0 , background:"#fff" ,zIndex:"100"}}>

    <header className="header  py-4">
    <button className="backButton"   aria-label="Back"  onClick={()=>router.push(props?.header_path)}> {props?.header_path && <FaChevronLeft size={20}  /> }</button>
    <div className="parkingInfo d-flex align-items-center gap-3">
      {props?.logo && <img src="/tsp_logo.png" alt="logo"  height={100} width={100}/>}
     {/* {props?.header_heading &&  <span className='header_heading'>{props?.header_heading}</span>} */}
    </div>
    <button className="helpButton" onClick={()=>setShowModal(true)}>
      <div>Help</div>
    </button>
    {showModal && 
    // <HelpModal showModal={showModal}/>
    <Modal show={showModal} onHide={()=>setShowModal(false)}   centered>
    <Modal.Header closeButton>
      <button className="helpButton">
        <div>Help</div>
      </button>
    </Modal.Header>
    <Modal.Body>

      <div className="d-flex align-items-center gap-3">
          <div className="email_box d-flex">

      <MdOutlineMailOutline className="email-icon" />
          <div>Email Us</div>
          </div>
          <div className="email_link">laxpark@vpne.com</div>


      </div>
    </Modal.Body>
    <Modal.Footer>
          <div className="d-flex align-items-center justify-content-center gap-3">
              <div className="privacy" onClick={()=>router.push("/termsandconditions")}>Terms and Conditions</div>
              <div className="privacy" onClick={()=>router.push("/privacypolicy")}>Privacy Policy</div>
          </div>
       
    </Modal.Footer>
    <div>

    <p className="pop-version">©2025 @v6.72.03</p>
    </div>
  </Modal>
    }
  </header>
  <hr className="divider"/>
    </div>
    </>
  )
}

export default Header
