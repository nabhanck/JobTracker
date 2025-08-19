import axios from "axios";

export const createNewNoteSlice = (data, id) => {
  return axios.post(
    `${import.meta.env.VITE_BACKEND_URL}/user/application/note/add/${id}`,
    data,
    { withCredentials: true }
  );
};
