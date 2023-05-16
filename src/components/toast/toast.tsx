import { ToastOptions, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

type ToastType = "success" | "error";
type ToastPayload = {
  message: string;
  data?: string;
};

const toastConfig: ToastOptions = {
  position: "top-right",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
};

const notifyToast = (toastType: ToastType, toastPayload: ToastPayload) => {
  const message =
    toastPayload.message + " " + (toastPayload.data ? toastPayload.data : "");

  if (toastType == "success") {
    toast.success(message, toastConfig);
  }

  if (toastType == "error") {
    toast.error(message, toastConfig);
  }
};

export default notifyToast;
