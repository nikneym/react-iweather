import { useQuery } from "@tanstack/react-query";
import searchLocation from "../api/search-location";

export default function useSearch(query: string, enabled: boolean) {
  return useQuery({
    queryKey: ["search", query],
    queryFn: () => searchLocation(query),
    enabled: enabled,
  });
}
