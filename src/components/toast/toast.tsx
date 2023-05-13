import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

type ToastType = "success" | "error";
type ToastPayload = {
  message: string;
  data?: string;
};

const notifyToast = (toastType: ToastType, toastPayload: ToastPayload) => {
  const message =
    toastPayload.message + " " + (toastPayload.data ? toastPayload.data : "");

  console.log(message);

  if (toastType == "success") {
    toast.success(message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }

  if (toastType == "error") {
    toast.error(message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }
};

export default notifyToast;
