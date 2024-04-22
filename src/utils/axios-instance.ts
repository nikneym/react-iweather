import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://openweathermap.org/data/2.5/",
  responseType: "json",
  // cancel a request after 3 seconds passed
  timeout: 3000,
});

export default axiosInstance;
