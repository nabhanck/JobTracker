import { useMutation, useQuery } from "@tanstack/react-query";
import {
  addNewApplicationSlice,
  getAllApplicationSlice,
  useDeleteApplicationSlice,
  useGetApplicationDetailsSlice,
  useUpdateApplicationSlice,
} from "../slices/applicationsSlice";

export const useGetAllApplicationsHook = (refreshAPI) => {
  return useQuery({
    queryKey: ["getAllApplications"],
    queryFn: async () => {
      const response = await getAllApplicationSlice();
      return response?.data;
    },
  });
};

export const useAddNewApplicationHook = (config, data) => {
  return useMutation({
    mutationKey: ["addNewApplication", data],
    mutationFn: async (data) => {
      const response = await addNewApplicationSlice(data);
      return response?.data;
    },
    ...config,
  });
};

export const useUpdateApplicationHook = (config, refreshAPI) => {
  return useMutation({
    mutationKey: ["updateApplications"],
    mutationFn: async (data) => {
      const response = await useUpdateApplicationSlice(data);
      return response?.data;
    },
    ...config,
  });
};

export const useGetApplicationDetailsHook = (id) => {
  return useQuery({
    queryKey: ["getApplicationDetails", id],
    queryFn: async () => {
      const response = await useGetApplicationDetailsSlice(id);
      return response?.data;
    },
  });
};

export const useDeleteApplicationHook = (config, id) => {
  return useMutation({
    mutationKey: ["deleteApplication", id],
    mutationFn: async (id) => {
      console.log("deleteiddd", id);
      const response = await useDeleteApplicationSlice(id);
      return response?.data;
    },
    ...config,
  });
};
