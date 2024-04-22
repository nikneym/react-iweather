import Header from "../components/Header";
import SearchBox from "../components/SearchBox";

export default function Page() {
  return (
    /* main wrapper */
    <main className="flex flex-col w-full gap-y-24">
      {/* header */}
      <Header />
      {/* body */}
      <div className="flex-1 self-center flex flex-col items-center gap-y-8 px-8 w-full md:w-[756px]">
        {/* landing text */}
        <div className="text-center space-y-1">
          <h1 className="text-gray-100 text-heading-md">
            Welcome to <span className="text-product">TypeWeather</span>
          </h1>
          <span className="text-gray-200">
            Choose a location to see the weather forecast
          </span>
        </div>
        {/* search input */}
        <SearchBox />
      </div>
    </main>
  );
}
