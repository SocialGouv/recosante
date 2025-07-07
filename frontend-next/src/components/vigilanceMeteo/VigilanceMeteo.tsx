"use client";

import React, { useState, useRef, useCallback } from "react";
import Chart from "./Chart";
import SubscribeButton from "../SubscribeButton";
import { useModalContext } from "../../app/providers/ModalProvider";
import { type Indicator } from '@/services/indicator';

interface VigilanceMeteoProps {
  place?: {
    code: string;
    nom: string;
  };
  date?: string;
  data?: any;
  day?: 'j0' | 'j1';
}

export default function VigilanceMeteo({ place, date, data, day = 'j0' }: VigilanceMeteoProps) {
  const currentData = data?.[day] || data?.j0 || data?.j1;
  const hasData = currentData && currentData.summary && currentData.summary.value !== null;
  
  // Utiliser les données de l'API si disponibles
  const indicatorData = hasData ? {
    slug: 'alerte-meteo',
    label: currentData.summary.status,
    value: currentData.summary.value,
    unit: 'sur 4',
    validity: {
      start: currentData.diffusion_date || new Date().toISOString(),
      end: new Date().toISOString(),
    },
    advice: currentData.help_text || 'Pas de vigilance particulière. Conditions météorologiques normales.',
  } : {
    slug: 'alerte-meteo',
    label: 'Vigilance météo',
    value: 1,
    unit: 'sur 4',
    validity: {
      start: new Date().toISOString(),
      end: new Date().toISOString(),
    },
    advice: 'Pas de vigilance particulière. Conditions météorologiques normales.',
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

  const vigilanceLevels = [
    { value: 0, label: "Aucune", color: "Vert" },
    { value: 1, label: "Attentif", color: "Jaune" },
    { value: 2, label: "Très vigilant", color: "Orange" },
    { value: 3, label: "Absolue", color: "Rouge" }
  ];

  const vigilanceValue = ["Vert", "Jaune", "Orange", "Rouge"].indexOf(
    indicatorData?.value.toString()
  );

  return (
    <article className="relative">
      <div className="relative w-full overflow-hidden rounded-t-lg bg-white drop-shadow-xl">
        <button
          type="button"
          className={[
            "flex w-full cursor-pointer items-baseline justify-between bg-green-600/5 px-2 py-4 text-base font-medium text-green-600",
            "after:absolute after:left-0 after:top-0 after:h-full after:w-full after:scale-x-0 after:transform after:bg-background after:opacity-70",
            isLoading ? "after:animate-fetching" : "",
          ].join(" ")}
          onClick={() => setModal("vigilancemeteo")}
        >
          <h2 className="m-0 basis-3/4 text-left text-base font-medium text-green-600">
            Vigilance météo
          </h2>
          <span
            aria-label="Plus d'informations sur la vigilance météorologique"
            className="inline-flex h-4 w-4 items-center justify-center rounded-full border-2 border-green-600 text-xs"
          >
            ?
          </span>
        </button>

        <div className="flex flex-col items-center justify-center p-3 [&_p]:mb-0">
          {!!isLoading && (
            <div className="flex flex-col items-center justify-center gap-x-4">
              <Chart value={0} />
              <p className="text-center font-medium text-green-600">Chargement...</p>
            </div>
          )}

          {!isLoading && !!isError && (
            <p className="text-center">
              <span className="mb-4 block text-3xl">Arf 🦖</span>
              Nous ne sommes malheureusement pas en mesure d'afficher la vigilance
              météorologique pour l'instant. Veuillez réessayer dans quelques instants.
            </p>
          )}

          {!isLoading && !isError && (
            <>
              <div className="flex w-full flex-col items-center justify-center gap-x-4 gap-y-2 xs:flex-row xs:items-start">
                {!indicatorData?.advice ? (
                  <p>Les données ne sont pas disponibles pour cette commune.</p>
                ) : (
                  <>
                    <div className="flex flex-col items-center">
                      <Chart
                        value={vigilanceValue}
                        visible={!!indicatorData?.value}
                      />
                      <p className="text-center font-medium text-green-600">
                        {indicatorData.label}
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
                          __html: indicatorData.advice,
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
                {vigilanceLevels.map((level) => (
                  <li key={level.value} className="flex shrink-0 grow basis-0">
                    <button
                      type="button"
                      className="relative flex grow cursor-pointer items-center gap-x-4 gap-y-2 underline transition-colors xs:flex-col xs:gap-x-0"
                      onClick={() => setModal("vigilancemeteo")}
                    >
                      <div
                        className={[
                          "h-4 w-4 rounded-sm transition-colors",
                          level.value === 0 
                            ? "border-2 border-vigilancemeteo-0 bg-green-600/10" 
                            : level.value === 1
                            ? "bg-vigilancemeteo-1"  // Jaune - Attentif
                            : level.value === 2
                            ? "bg-vigilancemeteo-2"  // Orange - Très vigilant
                            : "bg-vigilancemeteo-3",  // Rouge - Absolue
                        ].join(" ")}
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

        <SubscribeButton place={place} indicator="vigilance_meteo" />
      </div>

      {!!indicatorData?.validity?.start && (
        <p className="mb-0 text-xs font-light text-neutral-700 xl:mt-2">
          Prévision pour le{" "}
          {new Date(indicatorData.validity.start).toLocaleDateString(
            "fr",
            {
              year: "numeric",
              month: "long",
              day: "numeric",
            }
          )}{" "}
          dans votre région.
        </p>
      )}
    </article>
  );
} 