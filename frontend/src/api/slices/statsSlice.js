import axios from "axios";

export const getMonthlyAnalyticsSlice = () => {
  return axios.get(
    `${import.meta.env.VITE_BACKEND_URL}/user/application/graphStats`,
    { withCredentials: true }
  );
};

export const getApplicationStatsSlice = () => {
  return axios.get(
    `${import.meta.env.VITE_BACKEND_URL}/user/application/stats`,
    { withCredentials: true }
  );
};
