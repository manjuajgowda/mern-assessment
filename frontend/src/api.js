import axios from "axios";

const API = axios.create({
  baseURL: "https://mern-assessment-3.onrender.com/api",
});

API.interceptors.request.use(
  (req) => {
    const token = localStorage.getItem("token");

    if (token) {
      req.headers = {
        ...req.headers,
        Authorization: `Bearer ${token}`,
      };
    }

    return req;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default API;
