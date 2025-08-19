import { useMutation, useQuery } from "@tanstack/react-query";
import { loginSlice, registerSlice } from "../slices/authSlice";

export const useLoginHook = (data) => {
  return useMutation({
    mutationKey: ["login", data],
    mutationFn: async (data) => {
      const response = await loginSlice(data);
      return response?.data;
    },
  });
};

export const useRegisterHook = (registerData) => {
  return useMutation({
    mutationKey: ["register", registerData],
    mutationFn: async (registerData) => {
      const response = await registerSlice(registerData);
      return response?.data;
    },
  });
};
