'use client'
import React, { useState } from 'react';
import styles from './StartSession.module.css';
import User from '../user/page';

const StartSession = () => {
  const [phone, setPhone] = useState('1234567890');

  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
  };

  const handleSubmit = () => {
    alert(`Proceeding with phone number: ${phone}`);
  };

  return (
    <div className={styles.rootContainer}>
      {/* <header className={styles.header}>
        <button className={styles.backButton} disabled aria-label="Back" />
        <div className={styles.parkingInfo}>
          <img src="https://tenant-logo-gmp-prod.s3.amazonaws.com/vpneparking.png" alt="logo" />
        </div>
        <button className={styles.helpButton}>
          <p>Help</p>
        </button>
      </header> */}

      <hr className={styles.divider} />

      <div className={styles.box}>
        <div className={styles.parkingLocation}>
          <p>You’re Parking at</p>
          <div className={styles.parkingName}>650 17th Street</div>
          <p>650 17th St, Denver, CO 80202</p>
        </div>

        <div className={styles.phoneInput}>
          <label htmlFor="phone">Phone</label>
          <input
            id="phone"
            name="phone"
            type="tel"
            value={phone}
            onChange={handlePhoneChange}
            placeholder="Your Phone Number"
            required
          />
        </div>

        <div className={styles.tncBlock}>
          By proceeding you accept our&nbsp;
          <a href="https://termsandconditions-simplypark.parknpay.us" target="_blank" rel="noopener noreferrer">Terms and Conditions</a>
          &nbsp;& and &nbsp;
          <a href="https://privacypolicy-simplypark.parknpay.us" target="_blank" rel="noopener noreferrer">Privacy Policy</a>
        </div>

        <button className={styles.proceedButton} onClick={handleSubmit}>
          Proceed →
        </button>
      </div>

      <div className={styles.securityInfo}>
        <div>
          🔒 Secure SSL Encryption
        </div>
        <div>
          🛡️ 100% Safe & Secure
        </div>
      </div>
      {/* <User/> */}
    </div>
  );
};

export default StartSession;
