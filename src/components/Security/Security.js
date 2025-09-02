import React from 'react'
import { CiLock } from "react-icons/ci";
import { AiOutlineSafetyCertificate } from "react-icons/ai";
import { GoDotFill } from "react-icons/go";

const Security = () => {
  return (
     <div className="securityInfo">
            <div className="safe_box">
              <CiLock size={20} className="safe_icon" />
              <div className="safe_text">Secure SSL Encryption</div>
            </div>
            <div className="safe_box">
              <GoDotFill  className="dot"/>
    
            </div>
            <div className="safe_box">
              <AiOutlineSafetyCertificate size={20} className="safe_icon" />
              <div className="safe_text">100% Safe & Secure</div>
            </div>
          </div>
  )
}

export default Security
