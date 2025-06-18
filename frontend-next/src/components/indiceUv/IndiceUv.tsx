"use client";

import React, { useState, useRef, useCallback } from "react";
import Chart from "./Chart";
import SubscribeButton from "../SubscribeButton";
import { useModalContext } from "../../app/providers/ModalProvider";

interface IndiceUvProps {
  place: {
    code: string;
    nom: string;
  };
  date?: string;
}

interface IndiceUvData {
  indice_uv: {
    indice: {
      value: number;
      label: string;
    };
    advice: {
      main: string;
    };
    validity: {
      start: string;
      area: string;
    };
    sources: Array<{
      url: string;
      label: string;
    }>;
  };
}

const maxValue = 11;

export default function IndiceUv({ place, date }: IndiceUvProps) {
  // TODO: Remplacer par les vraies données de l'API
  const mockData: IndiceUvData = {
    indice_uv: {
      indice: {
        value: 5,
        label: "Modéré"
      },
      advice: {
        main: "Protection nécessaire. Évitez l'exposition entre 12h et 16h. Recherchez l'ombre. Portez des vêtements de protection, un chapeau à larges bords et des lunettes de soleil. Appliquez un écran solaire d'indice de protection 30+ sur les zones exposées."
      },
      validity: {
        start: "2024-04-15",
        area: "votre région"
      },
      sources: [{
        url: "https://www.meteofrance.com",
        label: "Météo-France"
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

  const uvLevels = [
    { range: "0 à 2", value: 1, label: "Faible" },
    { range: "3 à 5", value: 4, label: "Modéré" },
    { range: "6 à 7", value: 6, label: "Fort" },
    { range: "8 à 10", value: 9, label: "Très fort" },
    { range: "11", value: 11, label: "Extrême" }
  ];

  return (
    <article className="relative">
      <div className="relative w-full overflow-hidden rounded-t-lg bg-white drop-shadow-xl">
        <button
          type="button"
          className={[
            "flex w-full cursor-pointer items-baseline justify-between bg-orange-600/5 px-2 py-4 text-base font-medium text-orange-600",
            "after:absolute after:left-0 after:top-0 after:h-full after:w-full after:scale-x-0 after:transform after:bg-background after:opacity-70",
            isLoading ? "after:animate-fetching" : "",
          ].join(" ")}
          onClick={() => setModal("indice_uv")}
        >
          <h2 className="m-0 basis-3/4 text-left text-base font-medium text-orange-600">
            Indice UV (de&nbsp;1&nbsp;à&nbsp;{maxValue})
          </h2>
          <span
            aria-label="Plus d'informations sur l'indice UV"
            className="inline-flex h-4 w-4 items-center justify-center rounded-full border-2 border-orange-600 text-xs"
          >
            ?
          </span>
        </button>

        <div className="flex flex-col items-center justify-center p-3 [&_p]:mb-0">
          {!!isLoading && (
            <div className="flex flex-col items-center justify-center gap-x-4 md:min-h-[15rem]">
              <Chart />
              <p className="text-center font-medium text-orange-600">Chargement...</p>
            </div>
          )}

          {!isLoading && !!isError && (
            <p className="text-center">
              <span className="mb-4 block text-3xl">Arf 🦖</span>
              Nous ne sommes malheureusement pas en mesure d'afficher l'indice
              UV pour l'instant. Veuillez réessayer dans quelques instants.
            </p>
          )}

          {!isLoading && !isError && (
            <>
              <div className="flex w-full flex-col items-center justify-center gap-x-4 gap-y-2 xs:flex-row xs:items-start">
                {!mockData?.indice_uv?.advice?.main ? (
                  <p>Les données ne sont pas disponibles pour cette commune.</p>
                ) : (
                  <>
                    <div className="flex flex-col items-center">
                      <Chart value={mockData.indice_uv.indice?.value} />
                      <p className="text-center font-medium text-orange-600">
                        {mockData.indice_uv.indice?.label}
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
                          __html: mockData.indice_uv.advice.main,
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

              <ul className="mx-auto mb-0 mt-2 flex flex-col justify-between xs:mx-0 xs:w-full xs:flex-row">
                {uvLevels.map((level) => (
                  <li key={level.value} className="flex shrink-0 grow basis-0">
                    <button
                      type="button"
                      className="relative flex grow cursor-pointer items-center gap-x-4 gap-y-2 underline transition-colors xs:flex-col xs:gap-x-0"
                      onClick={() => setModal("indice_uv")}
                    >
                      <div
                        className={`h-4 w-4 rounded-sm bg-indiceuv-${level.value} transition-colors`}
                        aria-hidden
                      />
                      {level.range}
                    </button>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>

        <SubscribeButton place={place} indicator="indice_uv" />
      </div>

      {!!mockData?.indice_uv?.validity?.start && (
        <p className="mb-0 text-xs font-light text-neutral-700 xl:mt-2">
          Prévision pour le{" "}
          {new Date(mockData.indice_uv.validity.start).toLocaleDateString("fr", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}{" "}
          dans {mockData.indice_uv.validity.area}. Données fournies par{" "}
          {mockData.indice_uv.sources && (
            <a
              href={mockData.indice_uv.sources[0].url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {mockData.indice_uv.sources[0].label}
            </a>
          )}
        </p>
      )}
    </article>
  );
} 