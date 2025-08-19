import axios from "axios";

export const loginSlice = (data) => {
  return axios.post(`${import.meta.env.VITE_BACKEND_URL}/user/login`, data, {
    withCredentials: true,
  });
};

export const registerSlice = (registerData) => {
  return axios.post(
    `${import.meta.env.VITE_BACKEND_URL}/user/signup`,
    registerData,
    { withCredentials: true }
  );
};
