import { axiosInstance } from "./axios";

export const signup = async (data) => {
  const res = await axiosInstance.post("/auth/signup", data);
  return res.data;
}