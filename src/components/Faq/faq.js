"use client";
import React, { useState } from "react";
import { FaCaretUp } from "react-icons/fa";
import { RiArrowDownSFill } from "react-icons/ri";
import "./faq.css";
import { CiLock } from "react-icons/ci";
import { AiOutlineSafetyCertificate } from "react-icons/ai";
import { GoDotFill } from "react-icons/go";

const Faq = () => {
  const faq_list = [
    {
      id: 1,
      question: "Why is my phone number required to start a session?",
      answer:
        "Ans: Your phone number is required to send a Session Start and Session Expiration alert to your phone. Also, you will receive a link to download your receipt for your session once it completes.",
    },
    {
      id: 2,
      question: "Will I get an SMS text alert for my session?",
      answer:
        "Ans: Yes, you will receive alerts for session Start & Stop and a reminder alert a few minutes before your session Expires.",
    },
    {
      id: 3,
      question: "How can I download the receipt for my session?",
      answer:
        "Ans: You will need to add your email address after the session starts in the required receipt field.Your receipt will be mailed to you after it completes. Also, you will receive a link to download the receipt in an SMS text form once the session expires.",
    },
    {
      id: 4,
      question:
        "What if the payment is successful, but the session didn’t start?",
      answer:
        "Ans: Try scanning the QR code again and enter your mobile number. If the issue persists, please contact customer support. ",
    },
    {
      id: 5,
      question: "Will the promo code apply to session extension also?",
      answer:
        "Ans: Yes, the Promo code will also be applied to the session extension, and a promo applies to a session as a whole.",
    },
  ];

  const [flag, setFlag] = useState(false);

  return (
    <>
    <div className="custom-card w-100 " style={{ marginTop: "30px" }}>
      <div className="faq_main ">
        <div className="parking_text mb-1">Frequently Asked Questions</div>
        {flag ? (
          <FaCaretUp size={20} onClick={() => setFlag(false)} />
        ) : (
          <RiArrowDownSFill size={25} onClick={() => setFlag(true)} />
        )}
      </div>

      {/* {flag && (
        <div className="faq_section ">
          {faq_list.map((item) => {
            return (
              <>
              <React.Fragment key={item?.id}> 
                <section   className="faq_box">
                  <h3 className="question"   >{item?.question}</h3>
                  <p className="answer">{item?.answer}</p>
                </section>
                </React.Fragment>
              </>
            );
          })}
        </div>
      )} */}

      {flag && (
        <div className="faq_section">
          {faq_list.map((item) => (
            <section key={item.id} className="faq_box">
              <h5 className="question">{item.question}</h5>
              <p className="answer">{item.answer}</p>
            </section>
          ))}
        </div>
      )}

    </div>
      {/* <div className="securityInfo">
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
      </div> */}
    </>
  );
};

export default Faq;
