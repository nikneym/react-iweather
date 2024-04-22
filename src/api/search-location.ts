import axiosInstance from "../utils/axios-instance";

interface Weather {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface Location {
  id: number;
  name: string;
  coord: {
    lat: number;
    lon: number;
  };
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };
  dt: number;
  wind: {
    speed: number;
    deg: number;
  };
  sys: {
    country: string;
  };
  /* FIXME: these two likely return some other types too, but we don't need them for this project anyway */
  rain: null;
  snow: null;
  clouds: {
    all: number;
  };
  weather: Weather[];
}

interface ResponseData {
  message: string;
  cod: number;
  count: number;
  list: Location[];
}

export default async function searchLocation(
  location: string
): Promise<ResponseData> {
  const { data } = await axiosInstance({
    method: "GET",
    url: `find?q=${location}&appid=439d4b804bc8187953eb36d2a8c26a02&units=metric`,
  });

  return data;
}
