import { axiosInstance } from "./axios";

export const signup = async (data) => {
  const res = await axiosInstance.post("/auth/signup", data);
  return res.data;
}

export const getAuthUser = async () => {
  const res = await axiosInstance.get("/auth/me");
  return res.data;
};

export const completeOnboarding = async (userData) => {
  const res = await axiosInstance.post("/auth/onboarding", userData);
  return res.data;
}