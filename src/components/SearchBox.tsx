import { AnimatePresence, motion } from "framer-motion";
import { type ChangeEvent, type ReactNode, useState } from "react";
import TextInput from "./TextInput";
import useDebounce from "../hooks/use-debounce";
import { z } from "zod";
import Spinner from "./svg/Spinner";
import useSearch from "../hooks/use-search";
import { Link, useNavigate } from "react-router-dom";

// schema we use for queries
const searchSchema = z.string().trim().min(1);

interface SearchErrorProps {
  children?: ReactNode;
}

// component we use for errors inside combobox
function SearchError({ children }: SearchErrorProps) {
  return <span className="px-5 py-4 text-gray-200">{children}</span>;
}

export default function SearchBox() {
  const navigate = useNavigate();
  const [query, setQuery] = useState<string | null>(null);
  const isQuery = query !== null;
  const [inputValue, setInputValue] = useState<string>("");

  const searchDebouncer = useDebounce<ChangeEvent<HTMLInputElement>>((e) => {
    let result;
    try {
      result = searchSchema.parse(e.target.value);
    } catch {
      // set search value to null to trigger re-render
      setQuery(null);
      return;
    }

    setQuery(result);
  }, 500);

  const { data, isFetching, isRefetching, status } = useSearch(query!, isQuery);

  return (
    <form
      className="relative w-full"
      /* if the user submitted from the text input, we can just route them to first result if we have any */
      onSubmit={(e) => {
        e.preventDefault();
        if (status === "success" && data.list.length !== 0) {
          const location = data.list[0];
          return navigate(`/city/${location.id}`);
        }
      }}
    >
      {/* Spinner */}
      {(isFetching || isRefetching) && (
        <Spinner className="absolute right-5 top-[17px] z-20 w-6 h-6 animate-spin text-product" />
      )}
      {/* search input */}
      <TextInput
        placeholder="Search location"
        name="search-input"
        id="search-input"
        autoComplete="off"
        list="autocompleteOff"
        value={inputValue}
        onChange={(e) => {
          setInputValue(e.target.value);
          searchDebouncer(e);
        }}
        /* focus to first link item if it exists */
        onKeyDown={(e) => {
          if (e.key === "ArrowDown") {
            e.preventDefault();
            const a = document.getElementById(
              "link-first"
            ) as HTMLLinkElement | null;

            if (!a) {
              return;
            }

            a.focus();
          } else if (e.key === "ArrowUp") {
            e.preventDefault();
            const a = document.getElementById(
              "link-last"
            ) as HTMLLinkElement | null;

            if (!a) {
              return;
            }

            a.focus();
          }
        }}
      />
      {/* show the results with an animation */}
      <AnimatePresence mode="wait">
        {isQuery && (
          <motion.div
            className="relative flex flex-col w-full z-50 mt-2 bg-[#1E1E29] rounded-lg gap-y-[1px] max-h-56 overflow-x-hidden overflow-y-auto top-0 hide-scrollbar drop-shadow-hard"
            /* make AnimatePresence track it's presence in the tree */
            key="combobox"
            /* make this div non-tabbable */
            tabIndex={-1}
            /* animations related */
            initial={{ opacity: 0, top: "12px" }}
            animate={{ opacity: 1, top: "0px" }}
            exit={{ opacity: 0, top: "12px" }}
          >
            {/* we've likely hit a rate limit or backend is unreachable for some other reason */}
            {status === "error" && (
              <SearchError>
                Encountered with an error while fetching data
              </SearchError>
            )}
            {/* request was successful */}
            {status === "success" &&
              /* show an error if there are no results */
              (data.list.length === 0 ? (
                <SearchError>No results were found</SearchError>
              ) : (
                /* show the list items if there are results */
                data.list.map((e, i) => (
                  <Link
                    className="px-5 py-4 bg-gray-500 hover:bg-gray-500/60 focus:bg-gray-500/60 outline-none transition-all text-left text-gray-100 w-full"
                    to={`/city/${e.id}`}
                    /* mark the first and the last links */
                    id={
                      i === 0
                        ? "link-first"
                        : i === data.list.length - 1
                        ? "link-last"
                        : undefined
                    }
                    /* these are needed since our input is a controlled component */
                    onClick={() => setInputValue(`${e.name}, ${e.sys.country}`)}
                    onFocus={() => setInputValue(`${e.name}, ${e.sys.country}`)}
                    /* cycle tabbing */
                    /* using onBlur here causes some errors with mouse interactions, it's better to stick to onKeyDown */
                    onKeyDown={(e) => {
                      if (e.key === "ArrowUp") {
                        e.preventDefault();
                        const el = e.currentTarget
                          .previousElementSibling as HTMLLinkElement | null;
                        if (!el) {
                          document.getElementById("search-input")!.focus();
                          return;
                        }

                        return el.focus();
                      } else if (e.key === "ArrowDown") {
                        e.preventDefault();
                        const el = e.currentTarget
                          .nextElementSibling as HTMLLinkElement | null;
                        if (!el) {
                          document.getElementById("search-input")!.focus();
                          return;
                        }

                        return el.focus();
                      } else if (e.key === "Tab") {
                        if (e.currentTarget.nextElementSibling !== null) return;
                        // we've reached to last element, return to input element
                        e.preventDefault();
                        document.getElementById("search-input")!.focus();
                      }
                    }}
                    key={i}
                  >
                    {e.name}, {e.sys.country}
                  </Link>
                ))
              ))}
          </motion.div>
        )}
      </AnimatePresence>
    </form>
  );
}
