import { useLocation } from "@reach/router";
import SearchBar from "components/search/SearchBar";
import { navigate } from "gatsby";
import React from "react";
import styled from "styled-components";
import { formatPlaceUrl } from "utils/formatPlaceUrl";
import Logos from "./header/Logos";
import MobileSearch from "./header/MobileSearch";

const StyledSearchBar = styled(SearchBar)`
  top: -1rem;
  left: auto;
  right: 0;
  font-size: 1rem;

  ${(props) => props.theme.mq.medium} {
    max-width: none;
    transform: none;
  }
`;

export default function Header() {
  const { pathname } = useLocation();

  return (
    <header className="absolute w-full py-0 px-4 z-[1000] bg-white" role="banner">
      <div className="flex justify-between items-center max-w-6xl	mx-auto">
        <Logos />
        {pathname !== "/" && (
          <div className="hidden sm:block relative">
            <StyledSearchBar
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
