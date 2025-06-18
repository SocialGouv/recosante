"use client";

import React, { useState, useRef, useCallback } from "react";
import Chart from "./Chart";
import SubscribeButton from "../SubscribeButton";
import { useModalContext } from "../../app/providers/ModalProvider";

interface PotentielRadonProps {
  place: {
    code: string;
    nom: string;
  };
  date?: string;
}

interface PotentielRadonData {
  potentiel_radon: {
    indice: {
      value: number;
      label: string;
    };
    advice: {
      main: string;
    };
    validity: {
      area: string;
    };
    sources: Array<{
      url: string;
      label: string;
    }>;
  };
}

export default function PotentielRadon({ place, date }: PotentielRadonProps) {
  // TODO: Remplacer par les vraies données de l'API
  const mockData: PotentielRadonData = {
    potentiel_radon: {
      indice: {
        value: 1,
        label: "Faible"
      },
      advice: {
        main: "Le potentiel radon est faible dans votre zone. Aucune mesure particulière n'est nécessaire. Le radon est un gaz radioactif naturel qui peut s'accumuler dans les bâtiments. Il est recommandé de maintenir une bonne aération de votre logement."
      },
      validity: {
        area: "votre commune"
      },
      sources: [{
        url: "https://www.irsn.fr",
        label: "IRSN"
      }]
    }
  };

  const { setModal } = useModalContext();
  const [showSeeMoreAdvice, setShowSeeMoreAdvice] = useState(false);
  const [seeMoreAdvice, setSeeMoreAdvice] = useState(false);

  const adviceRef = useRef<HTMLDivElement | null>(null);
  const onRefChange = useCallback((node: HTMLDivElement | null) => {
    if (node === null) {
      // DOM node referenced by ref has been unmounted
    } else {
      adviceRef.current = node;
      if (node.scrollHeight > node.clientHeight) {
        if (!showSeeMoreAdvice) setShowSeeMoreAdvice(true);
      }
    }
  }, [showSeeMoreAdvice]);

  // TODO: Remplacer isLoading et isError par les vraies données de l'API
  const isLoading = false;
  const isError = false;

  const radonLevels = [
    { value: 1, label: "Faible" },
    { value: 2, label: "Moyen" },
    { value: 3, label: "Élevé" }
  ];

  return (
    <article className="relative">
      <div className="relative w-full overflow-hidden rounded-t-lg bg-white drop-shadow-xl">
        <button
          type="button"
          className={[
            "flex w-full cursor-pointer items-baseline justify-between bg-blue-600/5 px-2 py-4 text-base font-medium text-blue-600",
            "after:absolute after:left-0 after:top-0 after:h-full after:w-full after:scale-x-0 after:transform after:bg-background after:opacity-70",
            isLoading ? "after:animate-fetching" : "",
          ].join(" ")}
          onClick={() => setModal("potentiel_radon")}
        >
          <h2 className="m-0 basis-3/4 text-left text-base font-medium text-blue-600">
            Potentiel Radon
          </h2>
          <span
            aria-label="Plus d'informations sur le potentiel radon"
            className="inline-flex h-4 w-4 items-center justify-center rounded-full border-2 border-blue-600 text-xs"
          >
            ?
          </span>
        </button>

        <div className="flex flex-col items-center justify-center p-3 [&_p]:mb-0">
          {!!isLoading && (
            <div className="flex flex-col items-center justify-center gap-x-4">
              <Chart onlyValue className="-mt-8" />
              <p className="text-center font-medium text-blue-600">Chargement...</p>
            </div>
          )}

          {!isLoading && !!isError && (
            <p className="text-center">
              <span className="mb-4 block text-3xl">Arf 🦖</span>
              Nous ne sommes malheureusement pas en mesure d'afficher le
              potentiel radon pour l'instant. Veuillez réessayer dans quelques
              instants.
            </p>
          )}

          {!isLoading && !isError && (
            <>
              <div className="flex w-full flex-col items-center justify-center gap-x-4 gap-y-2 xs:flex-row xs:items-start">
                {!mockData?.potentiel_radon?.advice?.main ? (
                  <p>Les données ne sont pas disponibles pour cette commune.</p>
                ) : (
                  <>
                    <div className="flex flex-col items-center">
                      <Chart
                        value={mockData.potentiel_radon.indice?.value}
                        visible={!!mockData.potentiel_radon.indice}
                        className="mx-auto h-12 w-auto"
                      />
                      <p className="text-center font-medium text-blue-600">
                        {mockData.potentiel_radon.indice?.label.replace(
                          " ",
                          "\u00A0"
                        )}
                      </p>
                    </div>
                    <div className="flex flex-col">
                      <div
                        className={[
                          "hyphens-auto text-justify font-light [&_li]:list-inside [&_li]:list-disc",
                          seeMoreAdvice ? "line-clamp-none" : "line-clamp-3",
                        ].join(" ")}
                        ref={onRefChange}
                        dangerouslySetInnerHTML={{
                          __html: mockData.potentiel_radon.advice.main,
                        }}
                      />
                      {!!showSeeMoreAdvice && (
                        <button
                          onClick={() => {
                            setSeeMoreAdvice(!seeMoreAdvice);
                          }}
                          type="button"
                          className={[
                            "ml-auto block font-light",
                            !seeMoreAdvice ? "-mt-6 bg-white py-px" : "",
                          ].join(" ")}
                        >
                          {!seeMoreAdvice ? "..." : ""}
                          <span className="ml-3 text-xs underline">
                            {!seeMoreAdvice ? "Voir plus" : "Voir moins"}
                          </span>
                        </button>
                      )}
                    </div>
                  </>
                )}
              </div>

              <ul className="mb-0 mt-2 flex w-full justify-between">
                {radonLevels.map((level) => (
                  <li key={level.value} className="flex shrink-0 grow basis-0">
                    <button
                      type="button"
                      className="relative flex grow cursor-pointer flex-col items-center gap-y-2 underline transition-colors"
                      onClick={() => setModal("potentiel_radon")}
                    >
                      <Chart
                        className="mx-auto -mb-2 h-10 w-auto"
                        value={level.value}
                        onlyValue
                        aria-hidden
                      />
                      {level.label}
                    </button>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>

        <SubscribeButton
          disabled
          onClick={() => setModal("donneesstatiques")}
          indicator="potentiel_radon"
          place={place}
        />
      </div>

      {!!mockData?.potentiel_radon?.validity?.area && (
        <p className="mb-0 text-xs font-light text-neutral-700 xl:mt-2">
          Données statiques valides pour {mockData.potentiel_radon.validity.area}.
          Données fournies par{" "}
          {mockData?.potentiel_radon?.sources && (
            <a
              href={mockData.potentiel_radon.sources[0].url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {mockData.potentiel_radon.sources[0].label}
            </a>
          )}
        </p>
      )}
    </article>
  );
} 