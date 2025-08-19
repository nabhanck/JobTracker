import { useQuery } from "@tanstack/react-query";
import {
  getApplicationStatsSlice,
  getMonthlyAnalyticsSlice,
} from "../slices/statsSlice";

export const useMonthlyAnalyticsHook = () => {
  return useQuery({
    queryKey: ["getMonthlyAnalytics"],
    queryFn: async () => {
      const response = await getMonthlyAnalyticsSlice();
      return response?.data;
    },
  });
};

export const useApplicationStatsHook = () => {
  return useQuery({
    queryKey: ["getApplicationStats"],
    queryFn: async () => {
      const response = await getApplicationStatsSlice();
      return response?.data;
    },
  });
};
