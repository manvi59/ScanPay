"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import "./user.css";
import { FaChevronRight } from "react-icons/fa";
// import PhoneInput from "react-phone-input-2";
import dynamic from "next/dynamic";
import "react-phone-input-2/lib/style.css";
import axios from "axios";
import showToast from "@/utils/showToast";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { parsePhoneNumberFromString } from "libphonenumber-js";
// const PhoneInput = dynamic(() => import("react-phone-input-2"), { ssr: false });
const PhoneInput = dynamic(
  () => import("react-phone-input-2").then((mod) => mod.default),
  { ssr: false }
);


export default function User({mainSlug}) {
  const router = useRouter();
  const [parkingData, setParkingData] = useState([]);
  // fetch parking data
  const UserAddress = async () => {
    try {
      const response = await axios.get(
        // `https://admin.theselfparking.com/api/parkingdata/${mainSlug}`,
        `https://admin.theselfparking.com/api/parkingdata/${mainSlug}`,
        { headers: { Accept: "application/json" } }
      );
      setParkingData(response?.data?.result?.parkingdata);
    } catch (error) {
      console.log(error);
      showToast(error, "error");
    }
  };

  useEffect(() => {
    UserAddress();
  }, []);

  // Yup schema with phone validation
  const validationSchema = Yup.object().shape({
    phone: Yup.string()
      .required("Phone number is required")
      .test("is-valid-phone", "Invalid phone number", function (value) {
        if (!value) return false;
        const phoneNumber = parsePhoneNumberFromString("+" + value); // react-phone-input-2 gives number without "+"
        return phoneNumber ? phoneNumber.isValid() : false;
      }),
  });

  const handleSubmit = (values) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("phone", values.phone);
    }

    if (parkingData?.slug && values.phone) {
      router.push(`/time_slot/${parkingData?.slug}`);
    }
  };

  return (
    <div className="container d-flex justify-content-center card_main">
      <div className="custom-card w-100">
        <div className="boxyy">
          <div className="parkingLocation">
            <div className="parking_text">You’re Parking at</div>
            <div className="parking_main">{parkingData?.pname}</div>
            <div className="parking_text">{parkingData?.paddress}</div>
          </div>

          <Formik
            initialValues={{ phone: "" }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ setFieldValue, values }) => (
              <Form>
                <div className="phone2">
                  <PhoneInput
                    country={"us"}
                    value={values.phone}
                    onChange={(phone) => setFieldValue("phone", phone)}
                    inputProps={{
                      name: "phone",
                      required: true,
                    }}
                    placeholder="Your Phone Number"
                  />
                  <ErrorMessage
                    name="phone"
                    component="div"
                    className="error-message"
                  />
                </div>

                <div className="tncBlock">
                  By proceeding you accept our&nbsp;
                  <span onClick={() => router.push("/termsandconditions")}>
                    Terms and Conditions
                  </span>
                  &nbsp;and&nbsp;
                  <span onClick={() => router.push("/privacypolicy")}>
                    Privacy Policy
                  </span>
                </div>

                <button type="submit" className="proceedButton">
                  Proceed <FaChevronRight />
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}
