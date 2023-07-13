import MagicLink from "components/base/MagicLink";
import CloudAnimated from "components/search/CloudAnimated";
import SearchInput from "components/search/SearchInput";
import TitleAnimated from "components/search/TitleAnimated";
import { navigate } from "gatsby";
import React from "react";
import { formatPlaceUrl } from "utils/formatPlaceUrl";
import useIframe from "hooks/useIframe";
import SuggestionsButtons from "./search/SuggestionsButtons";

export default function Search({ handlePlaceSelection }) {
  const iframe = useIframe();

  return (
    <div
      iframe={iframe.toString()}
      className={[
        "relative -mx-4 flex flex-col items-center justify-start bg-gradient-to-r from-[#d1edff] via-[#f8fafd] to-[#d6eeff] px-4",
        // iframe ? "min-h-[50rem]" : "min-h-screen",
      ].join(" ")}
    >
      <section className="relative flex w-full flex-col pb-6">
        <CloudAnimated />
        <TitleAnimated />
        <div className="relative mb-4 px-2">
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
