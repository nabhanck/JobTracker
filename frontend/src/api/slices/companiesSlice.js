import axios from "axios";

export const listCompaniesSlice = () => {
  return axios.get(`${import.meta.env.VITE_BACKEND_URL}/user/listCompanies`, {
    withCredentials: true,
  });
};
