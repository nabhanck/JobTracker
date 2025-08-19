import { useQuery } from "@tanstack/react-query";
import { listCompaniesSlice } from "../slices/companiesSlice";

export const useListCompaniesHook = () => {
  return useQuery({
    queryKey: ["listCompanies"],
    queryFn: async () => {
      const response = await listCompaniesSlice();
      return response?.data;
    },
  });
};
