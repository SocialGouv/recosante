import MagicLink from "components/base/MagicLink";
import CloudAnimated from "components/search/CloudAnimated";
import SearchInput from "components/search/SearchInput";
import TitleAnimated from "components/search/TitleAnimated";
import { navigate } from "gatsby";
import React from "react";
import { formatPlaceUrl } from "utils/formatPlaceUrl";
import useIframe from "hooks/useIframe";
import SuggestionsButtons from "./search/SuggestionsButtons";

export default function Search({ handlePlaceSelection, fullScreen }) {
  const iframe = useIframe();

  return (
    <div
      iframe={iframe.toString()}
      className={[
        "relative box-border flex w-full flex-col items-center justify-start bg-gradient-to-r from-[#d1edff] via-[#f8fafd] to-[#d6eeff]",
        // iframe ? "min-h-[50rem]" : "min-h-screen",
        fullScreen ? "min-h-screen" : "",
      ].join(" ")}
    >
      <section className="relative mx-auto flex w-full max-w-6xl flex-col pb-6 xl:pt-24">
        <div className="flex flex-col px-6 xl:flex-row-reverse xl:items-start xl:justify-center xl:px-0">
          <CloudAnimated />
          <TitleAnimated />
        </div>
        <div className="relative mb-4 px-6 xl:my-8 xl:px-0">
          <SearchInput
            handlePlaceSelection={(place) => {
              if (handlePlaceSelection) {
                handlePlaceSelection(place);
              } else {
                navigate(formatPlaceUrl(place) + window.location.search);
              }
            }}
          />
        </div>
        <SuggestionsButtons />
      </section>
      {!!iframe && (
        <div className="mt-auto w-full text-center">
          <MagicLink
            className="text-xs text-footer no-underline"
            to="https://recosante.beta.gouv.fr/donnees-personnelles"
          >
            En savoir plus sur la gestion de vos données personnelles
          </MagicLink>
        </div>
      )}
    </div>
  );
}
