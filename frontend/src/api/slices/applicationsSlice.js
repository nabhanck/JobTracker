import axios from "axios";
import { data } from "react-router-dom";

export const getAllApplicationSlice = () => {
  return axios.get(`${import.meta.env.VITE_BACKEND_URL}/user/application/all`, {
    withCredentials: true,
  });
};

export const addNewApplicationSlice = (data) => {
  return axios.post(
    `${import.meta.env.VITE_BACKEND_URL}/user/application/add`,
    data,
    {
      withCredentials: true,
    }
  );
};

export const useUpdateApplicationSlice = (data) => {
  return axios.patch(
    `${import.meta.env.VITE_BACKEND_URL}/user/application/update`,
    data,
    { withCredentials: true }
  );
};

export const useGetApplicationDetailsSlice = (id) => {
  // console.log("iddd", id);
  return axios.get(
    `${import.meta.env.VITE_BACKEND_URL}/user/applicationDetails/${id}`,
    {
      withCredentials: true,
    }
  );
};

export const useDeleteApplicationSlice = (id) => {
  console.log("deleteiddd", id);
  return axios.delete(
    `${import.meta.env.VITE_BACKEND_URL}/user/application/delete/${id}`,
    { withCredentials: true }
  );
};
