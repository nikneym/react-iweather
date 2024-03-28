import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import TextInput from "./TextInput";

export default function SearchBox() {
  const comboBoxRef = useRef<HTMLDivElement>(null);
  const [showResults, setShowResults] = useState<boolean>(false);

  useEffect(() => {
    const comboBox = comboBoxRef.current;
    if (!comboBox) {
      return;
    }

    comboBox.scrollTop = 0;
  }, [showResults, comboBoxRef]);

  return (
    <div className="relative w-full">
      {/* search input */}
      <TextInput
        placeholder="Search location"
        name="search-input"
        id="search-input"
        autoComplete="off"
        list="autocompleteOff"
        onChange={(e) => {
          console.log(e.target.value);
          setShowResults(true);
        }}
      />
      {/* relative wrapper for absolute combobox */}
      <div className="relative">
        {/* show the results with an animation */}
        <AnimatePresence mode="wait">
          {showResults && (
            <motion.div
              className="absolute flex flex-col w-full z-50 mt-2 bg-[#1E1E29] rounded-lg gap-y-[1px] max-h-64 overflow-x-hidden overflow-y-auto top-0 hide-scrollbar"
              /* make it non-tabbable */
              tabIndex={-1}
              animate={{ opacity: [0, 1], top: ["-10px", "0px"] }}
              exit={{ opacity: [1, 0], top: ["0px", "10px"] }}
              ref={comboBoxRef}
            >
              {[...Array(10)].map((e, i) => (
                <button
                  className="px-5 py-4 bg-gray-500 hover:bg-gray-500/60 focus:bg-gray-500/60 outline-none transition-all text-left text-gray-100 w-full"
                  type="button"
                  key={i}
                >
                  Istanbul, IST - Turkey
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
