'use client';

import React, { useCallback, useRef, useState } from "react";
import Chart from "./indiceAtmo/Chart";
import SubscribeButton from "./SubscribeButton";
import { type Indicator } from "@/services/indicator";

interface IndiceAtmoProps {
  place?: {
    code: string;
    nom: string;
  };
  date?: string;
  data?: any;
  day?: 'j0' | 'j1';
}

// Données mockées pour l'exemple - à remplacer par de vraies données d'API
const mockData = {
  indice_atmo: {
    indice: {
      value: 3,
      label: "Moyen",
      details: [
        { label: "Ozone (O₃)", indice: { value: 3 } },
        { label: "Dioxyde d'azote (NO₂)", indice: { value: 2 } },
        { label: "Particules (PM₁₀)", indice: { value: 4 } },
        { label: "Particules fines (PM₂,₅)", indice: { value: 3 } },
      ]
    },
    advice: {
      main: "La qualité de l'air est moyenne. Les personnes sensibles peuvent ressentir des effets sur leur santé. Il est recommandé de limiter les activités physiques intenses en extérieur."
    },
    validity: {
      start: "2024-01-15",
      area: "la commune"
    },
    sources: [
      {
        label: "Atmo France",
        url: "https://atmo-france.org"
      }
    ]
  }
};

export default function IndiceAtmo({ place, date, data, day = 'j0' }: IndiceAtmoProps) {
  const currentData = data?.[day] || data?.j0 || data?.j1;
  const hasData = currentData && currentData.summary && currentData.summary.value !== null;
  
  const indicatorData = hasData ? {
    indice_atmo: {
      indice: {
        value: currentData.summary.value,
        label: currentData.summary.status,
        details: currentData.details?.details || mockData.indice_atmo.indice.details
      },
      advice: {
        main: currentData.help_text || mockData.indice_atmo.advice.main
      },
      validity: {
        start: currentData.diffusion_date || new Date().toISOString(),
        area: "la commune"
      },
      sources: currentData.details?.sources || mockData.indice_atmo.sources
    }
  } : mockData;
  
  const isLoading = false;
  const isError = false;
  
  // TODO: Implémenter le ModalContext
  const setModal = (modalName: string) => {
    console.log('Ouvrir modal:', modalName);
  };

  const [showSeeMoreAdvice, setShowSeeMoreAdvice] = useState(false);
  const [seeMoreAdvice, setSeeMoreAdvice] = useState(false);

  const adviceRef = useRef<HTMLDivElement>(null);
  const onRefChange = useCallback(
    (node: HTMLDivElement | null) => {
      if (node) {
        if (node.scrollHeight && node.clientHeight && 
            node.scrollHeight > node.clientHeight) {
          if (!showSeeMoreAdvice) setShowSeeMoreAdvice(true);
        }
      }
    },
    [showSeeMoreAdvice]
  );

  return (
    <article className="relative">
      <div className="relative w-full overflow-hidden rounded-t-lg bg-white drop-shadow-xl">
        <button
          type="button"
          className={[
            "flex w-full cursor-pointer items-baseline justify-between bg-blue-600/5 px-2 py-4 text-base font-medium text-blue-600",
            "after:absolute after:left-0 after:top-0 after:h-full after:w-full after:scale-x-0 after:transform after:bg-gray-100 after:opacity-70",
            isLoading ? "after:animate-pulse" : "",
          ].join(" ")}
          onClick={() => setModal("indice_atmo")}
        >
          <h2 className="m-0 basis-3/4 text-left text-base font-medium text-blue-600">
            Indice ATMO de la qualité de l'air
          </h2>
          <span
            aria-label="Plus d'informations sur l'indice ATMO"
            className="inline-flex h-4 w-4 items-center justify-center rounded-full border-2 border-blue-600 text-xs"
          >
            ?
          </span>
        </button>
        <div className="flex flex-col items-center justify-center p-3 [&_p]:mb-0">
          {!!isLoading && (
            <div className="flex flex-col items-center justify-center gap-x-4 md:min-h-[12.5rem]">
              <Chart />
              <p className="text-center font-medium text-blue-600">Chargement...</p>
            </div>
          )}
          {!isLoading && !!isError && (
            <p className="text-center">
              <span className="mb-4 block text-3xl">Oups 🦔</span>
              Nous ne sommes malheureusement pas en mesure d'afficher l'indice
              de qualité de l'air pour l'instant. Veuillez réessayer dans
              quelques instants.
            </p>
          )}
          {!isLoading && !isError && (
            <>
              <div className="flex w-full flex-col items-center justify-center gap-x-4 gap-y-2 xs:flex-row xs:items-start">
                {!indicatorData?.indice_atmo?.advice?.main ? (
                  <p>Les données ne sont pas disponibles pour cette commune.</p>
                ) : (
                  <>
                    <div className="flex flex-col items-center">
                      <Chart value={indicatorData.indice_atmo.indice?.value} />
                      <p className="-mt-4 text-center font-medium text-blue-600">
                        {indicatorData.indice_atmo.indice?.label}
                      </p>
                    </div>
                    <div className="flex flex-col">
                      <div
                        className={[
                          "hyphens-auto text-justify font-light",
                          seeMoreAdvice ? "line-clamp-none" : "line-clamp-3",
                        ].join(" ")}
                        ref={onRefChange}
                        dangerouslySetInnerHTML={{
                          __html: indicatorData.indice_atmo.advice.main,
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
                {indicatorData?.indice_atmo?.indice?.details?.map((element: any) => (
                  <li
                    key={element?.label}
                    className="flex shrink-0 grow basis-0"
                  >
                    <button
                      type="button"
                      className="relative flex grow cursor-pointer items-center gap-x-4 gap-y-2 underline transition-colors xs:flex-col xs:gap-x-0"
                      value={element.indice.value}
                      onClick={() => setModal(element.label.replace(",", ""))}
                    >
                      <div
                        className={[
                          "h-4 w-4 rounded-sm transition-colors",
                          element.indice.value > 0 && element.indice.value < 7
                            ? `opacity-100 bg-atmo-${element.indice.value}`
                            : "opacity-15 bg-blue-600",
                        ].join(" ")}
                        aria-hidden
                      />
                      {element.label}
                    </button>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
        <SubscribeButton place={place} indicator="indice_atmo" />
      </div>
      {!!indicatorData?.indice_atmo?.validity?.start && (
        <p className="mb-0 text-xs font-light text-neutral-700 xl:mt-2">
          Prévision pour le{" "}
          {new Date(indicatorData.indice_atmo.validity.start).toLocaleDateString("fr", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}{" "}
          dans {indicatorData.indice_atmo.validity.area}. Données fournies par{" "}
          {indicatorData.indice_atmo.sources && (
            <a
              href={indicatorData.indice_atmo.sources[0].url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              {indicatorData.indice_atmo.sources[0].label}
            </a>
          )}
        </p>
      )}
    </article>
  );
} 