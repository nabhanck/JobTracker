import { useMutation } from "@tanstack/react-query";
import { createNewNoteSlice } from "../slices/notesSlice";

export const useCreateNewNoteHook = (config) => {
  return useMutation({
    mutationKey: ["createNewNote"],
    mutationFn: async ({ id, text }) => {
      //   console.log("thissId", id);
      const response = await createNewNoteSlice({ text }, id);
      return response?.data;
    },
    ...config,
  });
};
