import React, { useEffect } from "react";

import Highlighter from "react-highlight-words";

export default function SuggestionsList({
  current,
  setCurrent,
  results,
  isFetching,
  handleSuggestionClick,
  search,
}) {
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.code === "ArrowDown") {
        e.preventDefault();
        current < results.length - 1
          ? setCurrent((prevCurrent) => prevCurrent + 1)
          : setCurrent(0);
      }
      if (e.code === "ArrowUp") {
        e.preventDefault();
        current > 0 && setCurrent((prevCurrent) => prevCurrent - 1);
      }
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [current, setCurrent, results]);

  if (!results?.length) {
    return null;
  }

  return (
    <div className="z-10 mb-1 max-h-80 overflow-y-auto border-x border-b border-main/20 bg-white">
      {results.map((result, index) => {
        return (
          <button
            type="button"
            className={[
              "inline-flex w-full cursor-pointer gap-x-1 bg-white py-3 pl-4 pr-8 !transition-colors !duration-200 hover:bg-main/20 [&_mark]:bg-transparent [&_mark]:text-text [&_mark]:opacity-80",
              index === current ? "bg-main/10" : "",
              isFetching ? "opacity-30" : "opacity-100",
            ].join(" ")}
            style={{
              fontSize: "clamp(0.875rem, 0.875em, 1rem)",
            }}
            key={result["code"]}
            onClick={() => {
              handleSuggestionClick(result);
            }}
            onMouseDown={(e) => e.preventDefault()} // prevent losing focus and losing list on click
          >
            <span>
              <Highlighter
                searchWords={search.split(" ")}
                autoEscape={true}
                textToHighlight={result["nom"]}
              />
            </span>
            <span className="shrink-0 opacity-100">
              (
              {result["codesPostaux"].length > 2
                ? result["codesPostaux"][0] +
                  " ... " +
                  result["codesPostaux"][result["codesPostaux"].length - 1]
                : result["codesPostaux"].join(", ")}
              )
            </span>
          </button>
        );
      })}
    </div>
  );
}
