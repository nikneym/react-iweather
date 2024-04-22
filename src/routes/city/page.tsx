import Header from "../../components/Header";
import useMediaQuery from "../../hooks/use-media-query";
import WeatherSlider from "../../components/WeatherSlider";

export default function Page() {
  // media query that's same as tailwind's md
  const isMediumScreen = useMediaQuery("(min-width: 768px)");

  return (
    /* main wrapper */
    <main className="flex flex-col w-full gap-y-12 overflow-x-hidden">
      {/* header is only shown in wide screen in location page */}
      {isMediumScreen && <Header />}
      {/* infinite carousel wrapper */}
      <WeatherSlider />
    </main>
  );
}
