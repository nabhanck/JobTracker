import axios from "axios";

export const getTimeLineSlice = (drawerId) => {
  // console.log("drawerId", drawerId);
  return axios.get(
    `${import.meta.env.VITE_BACKEND_URL}/user/application/timeline/${
      drawerId?.queryKey[1]
    }`,
    {
      withCredentials: true,
    }
  );
};
