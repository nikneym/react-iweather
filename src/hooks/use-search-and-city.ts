import { useQueries } from "@tanstack/react-query";
import getCityWeather from "../api/get-city-weather";
import searchLocation from "../api/search-location";

export default function useSearchAndCity(
  query: string,
  lat: string,
  lon: string
) {
  return useQueries({
    queries: [
      {
        queryKey: ["search", query],
        queryFn: () => searchLocation(query),
      },
      {
        queryKey: ["city", lat, lon],
        queryFn: () => getCityWeather(lat, lon),
      },
    ],
  });
}
