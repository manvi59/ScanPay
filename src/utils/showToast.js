// utils/ShowToast.js
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const showToast = (message, type = "info") => {
  const options = {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  };

  switch (type) {
    case "success":
      toast.success(message || "Success!", options);
      break;
    case "error":
      toast.error(message || "Something went wrong", options);
      break;
    default:
      toast.info(message || "Default message", options);
  }
};

export default showToast;
