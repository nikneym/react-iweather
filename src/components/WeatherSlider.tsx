import Card from "./Card";
import { type ReactNode, useMemo, useRef } from "react";
import {
  CloudRain,
  Drop,
  type Icon,
  Sun,
  ThermometerSimple,
  Wind,
} from "@phosphor-icons/react";
import DaySlider from "./DaySlider";
import useSearchAndCity from "../hooks/use-search-and-city";
import { useParams } from "react-router-dom";
import { Location } from "../api/search-location";
import dateFormat from "../utils/date-format";

function WeatherInfo({
  icon: Icon,
  text,
  children,
}: {
  icon: Icon;
  text: string;
  children?: ReactNode;
}) {
  return (
    <li className="w-full flex flex-row items-center border-b last:border-none border-b-gray-700 py-4 px-0.5 gap-x-4 box-border">
      {/* left */}
      <Icon className="relative flex-shrink-0 text-gray-500 w-6 h-6" />
      <h4 className="relative flex-1 text-heading-xs text-gray-200 truncate">
        {text}
      </h4>
      {/* right */}
      <h3 className="relative text-heading-sm text-gray-100">{children}</h3>
    </li>
  );
}

interface WeatherVividBoxProps {
  location: Location;
  degree: number;
}

function WeatherVividBox({
  location: {
    name,
    sys: { country },
    weather: [{ description }],
  },
  degree,
}: WeatherVividBoxProps) {
  const dateRef = useRef<Date>(new Date());
  const { current: date } = dateRef;

  const hour = date.getHours();
  const isNight = hour > 17 && hour < 5;

  return (
    <div className="relative rounded-xl overflow-hidden w-full md:w-[335px] h-[304px] order-1 md:order-2 self-auto md:self-end z-50">
      {/* background svg */}
      <div className={isNight ? "bg-night" : "bg-day"} />
      {/* info wrapper */}
      <div className="absolute flex flex-col items-start justify-between top-0 left-0 p-5 w-full h-full select-none overflow-hidden">
        {/* top */}
        <div className="w-full">
          {/* location */}
          <h3 className="truncate text-heading-sm">
            {name}, {country}
          </h3>
          {/* date */}
          <span className="block truncate text-xs">{dateFormat(date)}</span>
        </div>
        {/* bottom */}
        <div className="relative flex flex-row items-center justify-between w-full">
          {/* weather data */}
          <div>
            <h1 className="text-heading-xl">{Math.ceil(degree)}ºc</h1>
            {/* <h2 className="text-heading-sm">26ºc / 32ºc</h2> */}
            <span className="text-sm">{description}</span>
          </div>
          {/* icons */}
          <div className="relative right-4 pointer-events-none select-none">
            <img
              className="relative animate-pulse-drop-shadow z-20"
              src={isNight ? "/icon/Moon.png" : "/icon/Sun.png"}
              alt={isNight ? "Moon" : "Sun"}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function WeatherSlider() {
  // Receive the GET params
  const { query, locationID, lat, lon } = useParams();
  // over the wire
  const [{ data: searchData, status: searchStatus }, { data, status }] =
    useSearchAndCity(query!, lat!, lon!);

  // get the current location
  const location = useMemo(() => {
    if (searchStatus === "success") {
      const { list } = searchData;
      // no items in the list
      if (list.length === 0) {
        throw new Error("No locations were found");
      }

      const locationIDAsNumber = parseInt(locationID!, 10);
      if (isNaN(locationIDAsNumber)) {
        throw new Error("Unknown ID");
      }

      const locationIndex = list.findIndex(
        ({ id }) => id === locationIDAsNumber
      );

      if (locationIndex < 0) {
        throw new Error("Unknown ID");
      }

      return list[locationIndex];
    }

    return null;
  }, [locationID, searchData, searchStatus]);

  const isVividBoxReady = location !== null && status === "success";

  return (
    <div className="relative flex flex-row justify-center items-center w-full gap-x-4">
      {/* weather wrapper */}
      <div className="relative self-center order-2 flex flex-row flex-wrap gap-x-2 gap-y-2 w-full md:w-[756px] p-2">
        {/* location and weather info */}
        {isVividBoxReady ? (
          <WeatherVividBox location={location} degree={data.current.temp} />
        ) : (
          <div className="vivid-box-skeleton" />
        )}

        {/* more weather info */}
        <Card className="order-2 md:order-1 flex-grow min-w-full md:min-w-96">
          <ul className="relative flex flex-col justify-normal md:justify-between min-h-full px-4 py-1">
            {/* skeleton animation */}
            {status === "pending" &&
              [...Array(5)].map((_, i) => (
                <li className="weather-info-skeleton" key={i}>
                  <div className="bg-gray-500 animate-pulse w-full h-6 rounded-full" />
                </li>
              ))}
            {/* actual data */}
            {status === "success" && (
              <>
                {/* thermal sensation */}
                <WeatherInfo icon={ThermometerSimple} text="Thermal sensation">
                  {Math.ceil(data.current.feels_like)}ºc
                </WeatherInfo>
                {/* probability of rain */}
                <WeatherInfo icon={CloudRain} text="Probability of rain">
                  {data.current.clouds}%
                </WeatherInfo>
                {/* wind speed */}
                <WeatherInfo icon={Wind} text="Wind speed">
                  {data.current.wind_speed} km/h
                </WeatherInfo>
                {/* air humidity */}
                <WeatherInfo icon={Drop} text="Air humidity">
                  {data.current.humidity}%
                </WeatherInfo>
                {/* uv index */}
                <WeatherInfo icon={Sun} text="UV Index">
                  {data.current.uvi}
                </WeatherInfo>
              </>
            )}
          </ul>
        </Card>
        {/* week info */}
        <Card className="w-full order-3 flex-grow">
          {status === "pending" && <div className="day-slider-skeleton" />}
          {status === "success" && <DaySlider daily={data.daily} />}
        </Card>
      </div>
    </div>
  );
}
