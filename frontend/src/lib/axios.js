import axios from 'axios';

const baseURL = import.meta.env.MODE === "development" ? "http://localhost:5001/api" : "/api"; // Use environment variable or default to localhost

export const axiosInstance = axios.create({
  baseURL: baseURL,
  withCredentials: true // Adjust the base URL as needed
});

