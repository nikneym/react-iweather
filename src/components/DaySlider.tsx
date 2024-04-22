import classNames from "classnames";
import React, {
  type UIEvent,
  useCallback,
  useRef,
  useState,
  useEffect,
  useMemo,
} from "react";
import isOverflowing from "../utils/is-overflowing";
import useMediaQuery from "../hooks/use-media-query";
import { days } from "../utils/date-format";
import { type Daily } from "../api/get-city-weather";
import getWeatherIcon from "../utils/get-weather-icon";

interface Props {
  daily: Daily[];
}

export default function DaySlider({ daily }: Props) {
  const ulRef = useRef<HTMLUListElement>(null);
  // I'm aware that this can also be done with a single state but this is more readable
  const [showLeft, setShowLeft] = useState<boolean>(false);
  const [showRight, setShowRight] = useState<boolean>(false);

  const isSmallScreen = useMediaQuery("(min-width: 640px)");

  console.log(daily);

  useEffect(() => {
    const ul = ulRef.current;
    if (!ul) {
      return;
    }

    // reset the scroller
    ul.scrollLeft = 0;

    // if screen is initially overflowing, show the gradient on the right
    setShowRight(isOverflowing(ul));

    const onResize = () => setShowRight(isOverflowing(ul));

    // if screen is resized and got overflowed, show the gradient on the right
    window.addEventListener("resize", onResize);

    // cleanup
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const onScroll = useCallback((e: UIEvent<HTMLUListElement>) => {
    const ul = e.currentTarget;

    const maxRight = ul.scrollWidth - ul.offsetWidth;
    setShowLeft(ul.scrollLeft > 0);
    setShowRight(ul.scrollLeft < maxRight);
  }, []);

  const onClick = useCallback((e: React.MouseEvent<HTMLUListElement>) => {
    const ul = e.currentTarget;
    const bounds = ul.getBoundingClientRect();
    const x = e.clientX - bounds.left;

    const isClickedToRightHalf = x > bounds.width / 2;

    ul.scroll({
      left: isClickedToRightHalf ? ul.scrollWidth - ul.offsetWidth : 0,
      behavior: "smooth",
    });
  }, []);

  const items = useMemo(() => {
    const day = new Date().getDay();
    const items = new Array(8);

    for (let i = 0; i < 8; i++) {
      const {
        temp: { day: daytime, night },
        weather: [{ icon }],
      } = daily[i];

      let dayIndex = i + day;
      if (dayIndex > 7) {
        dayIndex -= 7;
      }
      const dayStr = days[dayIndex];

      items[i] = (
        <li
          className="inline-flex flex-col items-center gap-y-1 px-0.5 py-4"
          key={i}
        >
          <h4 className="relative text-heading-xs text-gray-200">
            {isSmallScreen ? dayStr : dayStr.substring(0, 3)}
          </h4>
          <img
            src={`/daily/${getWeatherIcon(icon)}.png`}
            className="relative min-w-[57px] max-w-[57px] select-none pointer-events-none"
            alt=""
          />
          <h4 className="relative text-heading-xs text-gray-100">
            {Math.ceil(daytime)}ºc
          </h4>
          <h4 className="relative text-heading-xs text-gray-400 -mt-1">
            {Math.ceil(night)}ºc
          </h4>
        </li>
      );
    }

    return items;
  }, [daily, isSmallScreen]);

  return (
    <ul
      className="flex flex-row items-center justify-between px-1 md:px-4 py-3 overflow-hidden hide-scrollbar select-none w-full h-full"
      ref={ulRef}
      onScroll={onScroll}
      onClick={onClick}
    >
      {/* gradient on right */}
      <span
        className={classNames(
          "absolute z-50 right-0 w-24 h-full bg-gradient-to-l from-gray-800 duration-500 pointer-events-none",
          showRight ? "opacity-100" : "opacity-0"
        )}
      />
      {/* gradient on left */}
      <span
        className={classNames(
          "absolute z-50 left-0 w-24 h-full bg-gradient-to-r from-gray-800 duration-500 pointer-events-none",
          showLeft ? "opacity-100" : "opacity-0"
        )}
      />
      {/* days */}
      {items}
    </ul>
  );
}
