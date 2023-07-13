import { useLocation } from "@reach/router";
import SearchInput from "components/search/SearchInput";
import { navigate } from "gatsby";
import React from "react";
import { formatPlaceUrl } from "utils/formatPlaceUrl";
import Logos from "./header/Logos";
import MobileSearch from "./header/MobileSearch";

export default function Header() {
  const { pathname } = useLocation();

  return (
    <header className="z-[1000] w-full bg-white px-4 py-0" role="banner">
      <div className="mx-auto flex max-w-6xl items-center	justify-between">
        <Logos />
        {pathname !== "/" && (
          <div className="relative hidden sm:block">
            <SearchInput
              className=" xl:transform-[initial] -top-4 left-auto right-0 !max-w-none !transform-none text-base xl:max-w-[initial]"
              placeholder="Entrez une ville"
              handlePlaceSelection={(place) => {
                navigate(formatPlaceUrl(place) + window.location.search);
              }}
            />
          </div>
        )}
        <MobileSearch />
      </div>
    </header>
  );
}
