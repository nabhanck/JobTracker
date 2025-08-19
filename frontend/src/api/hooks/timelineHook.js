import { useQuery } from "@tanstack/react-query";
import { getTimeLineSlice } from "../slices/timelineSlice";

export const useGetTimeLineHook = (drawerId) => {
  return useQuery({
    queryKey: ["getTimeline", drawerId],
    enabled: !!drawerId,
    queryFn: async (drawerId) => {
      const response = await getTimeLineSlice(drawerId);
      return response?.data;
    },
  });
};
