import SearchBox from "../components/SearchBox";
import BrandLogo from "../components/svg/BrandLogo";

export default function Page() {
  return (
    /* main wrapper */
    <main className="flex flex-col w-full h-[100vh]">
      {/* header */}
      <div className="flex flex-row items-center justify-center py-12 px-[94px]">
        <BrandLogo className="flex-shrink-0" />
      </div>
      {/* body */}
      <div className="flex-1 self-center flex flex-col items-center gap-y-8 mt-[144px] px-8 w-full md:w-[756px]">
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
      {/* footer */}
      <footer className="px-8 py-12 text-center text-sm text-gray-200">
        Halil Durak's submission, check out{" "}
        <a
          href="https://github.com/nikneym/react-iweather"
          className="text-product underline underline-offset-2 decoration-dotted"
          target="_blank"
        >
          GitHub
        </a>
      </footer>
    </main>
  );
}
