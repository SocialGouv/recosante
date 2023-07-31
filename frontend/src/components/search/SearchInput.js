import React, { useEffect, useRef, useState } from "react";

import useDebounce from "hooks/useDebounce";
import { useSearch } from "hooks/useSearch";
import SuggestionsList from "./SuggestionsList";
import GeolocButton from "./GeolocButton";

export default function SearchInput({
  initialValue,
  handlePlaceSelection,
  className = "",
  placeholder,
}) {
  const [search, setSearch] = useState(initialValue || "");

  const debouncedSearch = useDebounce(search);

  const { data, isFetching } = useSearch(debouncedSearch);

  const [focus, setFocus] = useState(false);
  const input = useRef(null);
  const [current, setCurrent] = useState(0);
  useEffect(() => {
    if (!focus) {
      setCurrent(0);
    }
  }, [focus]);
  const selectPlace = (place) => {
    window?._paq?.push(["trackEvent", "Search", "PlaceInput", place.nom]);
    setSearch(place.nom);
    handlePlaceSelection(place);
    setFocus(false);
  };

  const suggestion = data && data[current];
  const suggestionVisible =
    data?.length > 0 && focus && !!suggestion && !!search;

  return (
    <form
      className={[
        "z-[100] mx-auto w-full border border-b-2 border-main/5 border-b-main bg-white/30 text-[2rem] focus:border-main/20",
        "max-w-xs xl:left-auto xl:mx-0 xl:max-w-2xl xl:translate-x-0",
        "text-xl xl:text-base",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      focus={focus.toString()}
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        if (current > -1 && data[current]) {
          selectPlace(data[current]);
        }
      }}
    >
      <div className="relative overflow-hidden">
        <input
          ref={input}
          type="text"
          className="w-full border-none bg-transparent py-2 pl-4 pr-3 text-base text-text outline-main placeholder:text-text/80 focus:border-main/20"
          title={placeholder || "Entrez votre ville ici"}
          placeholder={placeholder || "Entrez votre ville ici"}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
        />
        <div
          className={[
            "pointer-events-none absolute left-0 top-0 flex items-center whitespace-nowrap transition-opacity duration-200",
            suggestionVisible
              ? isFetching
                ? "opacity-25"
                : "opacity-75"
              : "opacity-0",
            suggestionVisible ? "duration-200" : "duration-0",
          ].join(" ")}
        >
          <div className="py-2 pl-4 pr-3 text-base opacity-0">{search}</div>
          {suggestion && (
            <div className="relative mt-[0.1rem] truncate pl-4 text-sm before:absolute before:left-[0.1rem] before:top-1/2 before:h-px before:w-2 before:bg-text">
              {suggestion["nom"]}
            </div>
          )}
        </div>
        <button
          className={[
            "absolute bottom-0 right-0 top-0 m-px cursor-pointer border-none bg-gradient-to-r from-white/10 to-[#eef7ff] to-[30%] pl-6 pr-3 transition-opacity focus:opacity-100 focus:outline-none",
            suggestionVisible
              ? "visible opacity-100 duration-500"
              : "pointer-events-none invisible opacity-0 duration-0",
          ].join(" ")}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          aria-label="Valider cette ville"
        >
          <svg
            width="42"
            height="42"
            viewBox="0 0 42 42"
            className="block h-auto w-4"
          >
            <path
              className="fill-main"
              d="M2.52447 23.948C2.69632 23.9759 2.87024 23.9888 3.04425 23.9865L32.6744 23.9865L32.0283 24.287C31.3968 24.5859 30.8222 24.9928 30.3304 25.4891L22.0214 33.7981C20.9271 34.8427 20.7432 36.5232 21.5857 37.7798C22.5662 39.1189 24.4465 39.4096 25.7856 38.4291C25.8938 38.3499 25.9967 38.2635 26.0933 38.1705L41.1187 23.1451C42.2929 21.9722 42.2939 20.0695 41.121 18.8953C41.1203 18.8945 41.1194 18.8937 41.1187 18.8929L26.0933 3.86753C24.9181 2.69564 23.0154 2.69827 21.8435 3.87344C21.7512 3.96594 21.6651 4.06436 21.5857 4.16803C20.7432 5.42463 20.9271 7.10512 22.0214 8.14976L30.3154 16.4738C30.7563 16.9152 31.2632 17.2853 31.818 17.5707L32.7195 17.9764L3.20963 17.9764C1.6745 17.9194 0.327661 18.9917 0.0392677 20.5006C-0.2264 22.1389 0.886232 23.6823 2.52447 23.948Z"
            />
          </svg>
        </button>
        <GeolocButton
          visible={!suggestionVisible}
          handlePlaceSelection={selectPlace}
        />
      </div>
      {!!data?.length && !!focus && (
        <div className="relative sm:absolute sm:top-full">
          <SuggestionsList
            search={debouncedSearch}
            results={data?.filter((_, i) => i < 7)}
            focus
            current={current}
            isFetching={isFetching}
            setCurrent={setCurrent}
            handleSuggestionClick={(place) => {
              selectPlace(place);
            }}
          />
        </div>
      )}
    </form>
  );
}
