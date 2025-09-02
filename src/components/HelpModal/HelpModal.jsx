import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { MdOutlineMailOutline } from "react-icons/md";
import "./HelpModal.css"

const HelpModal = ({ showModal }) => {
  console.log(showModal);
  const [show, setShow] = useState(showModal);
//   const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <Modal show={show} onHide={()=>setShow(false)}   centered>
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
                <div className="privacy">Terms and Conditions</div>
                <div className="privacy">Privacy Policy</div>
            </div>
         
      </Modal.Footer>
      <div>

      <p className="pop-version">©2025 @v6.72.03</p>
      </div>
    </Modal>
  );
};

export default HelpModal;
