import React, { useContext } from "react";

import useIndicators from "hooks/useIndicators";
import ModalContext from "utils/ModalContext";

export default function EpisodePollution({ place, date }) {
  const { data } = useIndicators(place.code, date);

  const { setEpisodePollution } = useContext(ModalContext);

  if (!data?.episodes_pollution?.advice) return null;

  return (
    <div className="mx-auto mb-8 flex max-w-xs flex-col gap-y-6 rounded-lg border-2 border-red-500 bg-white p-6 xl:mx-0">
      <p className="m-0 rounded-full bg-red-500 text-center text-white">
        ⚠️ Avertissement
      </p>
      <p className="m-0 text-center font-medium">
        Un épisode de pollution est prévu {date ? "demain" : "aujourd’hui"}
      </p>
      <button
        type="button"
        className="text-center text-main underline"
        onClick={() => setEpisodePollution(true)}
      >
        En savoir plus
      </button>
    </div>
  );
}
