import axios from "axios";
import { toast } from "react-toastify";
const backendUrl = process.env.REACT_APP_BACKEND_URL;

export const registerApi = async (formData) => {
  try {
    const res = await axios.post(`${backendUrl}auth/register`, formData);
    toast.success(res?.data?.message);
    return true;
  } catch (error) {
    toast.error(error?.response?.data?.errorMessage);
    return false;
  }
};

export const loginApi = async (formData) => {
  try {
    const res = await axios.post(`${backendUrl}auth/login`, formData);
    toast.success(res?.data?.message);
    const resData = res?.data;
    localStorage.setItem("token", JSON.stringify(resData?.token));
    localStorage.setItem("name", JSON.stringify(resData?.name));
    localStorage.setItem("userId", JSON.stringify(resData?.userId));
    return true;
  } catch (error) {
    toast.error(error?.response?.data?.errorMessage);
    return false;
  }
};
