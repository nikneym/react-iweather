import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://openweathermap.org/data/2.5/",
  responseType: "json",
});

export default axiosInstance;
