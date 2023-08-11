import { useLocation } from "@reach/router";
import SearchInput from "components/search/SearchInput";
import { navigate } from "gatsby";
import React, { useState } from "react";
import { formatPlaceUrl } from "utils/formatPlaceUrl";
import Logos from "./header/Logos";
import MobileSearchModal from "./header/MobileSearchModal";

export default function Header() {
  const { pathname } = useLocation();
  const [openMobileSearchModal, setOpenMobileSearchModal] = useState(false);
  return (
    <header
      className="relative z-[1000] w-full bg-white px-4 py-0"
      role="banner"
    >
      <div className="mx-auto flex max-w-6xl items-center	justify-between">
        <Logos className="flex items-center justify-center" />
        {pathname !== "/" && (
          <div className="relative hidden md:block">
            <SearchInput
              className="w-80"
              placeholder="Entrez une ville"
              handlePlaceSelection={(place) => {
                navigate(formatPlaceUrl(place) + window.location.search);
              }}
            />
          </div>
        )}
        <MobileSearchModal
          open={openMobileSearchModal}
          setOpen={setOpenMobileSearchModal}
        >
          <button
            className={[
              "block border-none bg-none transition-opacity md:hidden",
              openMobileSearchModal
                ? "pointer-events-none opacity-0"
                : "opacity-100",
            ].join(" ")}
            onClick={() => setOpenMobileSearchModal(true)}
          >
            <svg viewBox="0 0 512.005 512.005" className="h-auto w-8 fill-main">
              <path
                d="M505.749,475.587l-145.6-145.6c28.203-34.837,45.184-79.104,45.184-127.317c0-111.744-90.923-202.667-202.667-202.667
			S0,90.925,0,202.669s90.923,202.667,202.667,202.667c48.213,0,92.48-16.981,127.317-45.184l145.6,145.6
			c4.16,4.16,9.621,6.251,15.083,6.251s10.923-2.091,15.083-6.251C514.091,497.411,514.091,483.928,505.749,475.587z
			 M202.667,362.669c-88.235,0-160-71.765-160-160s71.765-160,160-160s160,71.765,160,160S290.901,362.669,202.667,362.669z"
              />
            </svg>
          </button>
        </MobileSearchModal>
      </div>
    </header>
  );
}
