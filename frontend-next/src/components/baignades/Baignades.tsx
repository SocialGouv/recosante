"use client";

import React, { useCallback, useRef, useState, useEffect } from 'react';
import { type Indicator } from '@/services/indicator';

interface BaignadesProps {
  place?: {
    code: string;
    nom: string;
  };
  data?: Indicator & {
    j0?: any;
    j1?: any;
  };
  day?: 'j0' | 'j1';
}

interface ChartProps {
  visible?: boolean;
  summary?: number[];
  value?: number;
}

function Chart({ visible, summary, value }: ChartProps) {
  const getStrokeColor = useCallback(
    (index: number) => {
      if (!visible) return "stroke-gray-300";
      if (value !== undefined && value < index) return "stroke-gray-300";
      if (value !== undefined && value < 2) return `stroke-baignades-${value}`;
      if (summary && summary[index] > 0) return `stroke-baignades-${index}`;
      return "stroke-gray-300";
    },
    [visible, value, summary]
  );

  return (
    <svg
      className="mx-auto h-12 w-auto overflow-visible"
      aria-hidden={true}
      viewBox="0 0 48 48"
    >
      <path
        style={{
          transition: visible
            ? "opacity 1200ms 900ms, stroke 400ms 900ms"
            : undefined,
        }}
        className={[
          "fill-none stroke-[3] [stroke-linecap:round] [stroke-linejoin:round]",
          getStrokeColor(2),
        ].join(" ")}
        d="M6 12C10.966 12 14.69 6 14.69 6C14.69 6 18.414 12 23.379 12C28.345 12 33.31 6 33.31 6C33.31 6 38.276 12 42 12"
      />
      <path
        style={{
          transition: visible
            ? "opacity 1200ms 600ms, stroke 400ms 600ms"
            : undefined,
        }}
        className={[
          "fill-none stroke-[3] [stroke-linecap:round] [stroke-linejoin:round]",
          getStrokeColor(1),
        ].join(" ")}
        d="M6 27C10.966 27 14.69 21 14.69 21C14.69 21 18.414 27 23.379 27C28.345 27 33.31 21 33.31 21C33.31 21 38.276 27 42 27"
      />
      <path
        style={{
          transition: visible
            ? "opacity 1200ms 300ms, stroke 400ms 300ms"
            : undefined,
        }}
        className={[
          "fill-none stroke-[3] [stroke-linecap:round] [stroke-linejoin:round]",
          getStrokeColor(0),
        ].join(" ")}
        d="M6 42C10.966 42 14.69 36 14.69 36C14.69 36 18.414 42 23.379 42C28.345 42 33.31 36 33.31 36C33.31 36 38.276 42 42 42"
      />
    </svg>
  );
}

export default function Baignades({ place, data, day = 'j0' }: BaignadesProps) {
  // États pour les boutons "voir plus/voir moins"
  const [showSeeMoreAdviceButton, setShowSeeMoreAdviceButton] = useState(false);
  const [seeMoreAdvice, setSeeMoreAdvice] = useState(false);
  const [showSeeMorePlagesButton, setShowSeeMorePlagesButton] = useState(false);
  const [seeMorePlages, setSeeMorePlages] = useState(false);

  const adviceRef = useRef<HTMLDivElement>(null);
  
  const onRefChange = useCallback(
    (node: HTMLDivElement | null) => {
      if (node === null) {
        // DOM node referenced by ref has been unmounted
      } else {
        const currentRef = node;
        if (currentRef?.scrollHeight && currentRef?.clientHeight && 
            currentRef.scrollHeight > currentRef.clientHeight) {
          if (!showSeeMoreAdviceButton) setShowSeeMoreAdviceButton(true);
        }
      }
    },
    [showSeeMoreAdviceButton]
  );

  // Utiliser les données de l'API si disponibles
  const baignadesData = data;

  console.log('baignadesData', baignadesData);
  
  // Extraire les données des eaux de baignade
  const j0Data = baignadesData?.j0;
  const j1Data = baignadesData?.j1;
  
  // Utiliser les données d'aujourd'hui (j0) par défaut
  const currentData = baignadesData?.[day] || baignadesData?.j0 || baignadesData?.j1;
  
  // Vérifier si on a des données
  const hasData = currentData && currentData.summary && currentData.summary.value !== null;
  const isHorsSaison = currentData?.summary?.status === "Aucune donnée" && 
                      currentData?.help_text?.includes("saison");
  const hasValues = currentData?.values && currentData.values.length > 0;
  
  const plages = hasValues ? currentData.values : [];
  const minimumPlagesInView = 5;

  useEffect(() => {
    setShowSeeMorePlagesButton((plages?.length || 0) > minimumPlagesInView);
  }, [plages?.length]);

  const isLoading = !baignadesData;
  const isError = false; // Pour l'instant, on gère les erreurs différemment

  // Fonction pour déterminer la couleur selon la valeur
  const getValueColor = (value: number) => {
    if (value === 1) return "bg-baignades-0"; // Bon
    if (value === 2) return "bg-baignades-1"; // Moyen
    if (value === 3) return "bg-baignades-2"; // Mauvais
    if (value === 4) return "bg-red-500"; // Très mauvais
    return "bg-gray-300"; // Par défaut
  };

  // Fonction pour obtenir le label selon la valeur
  const getValueLabel = (value: number) => {
    if (value === 1) return "Bon résultat";
    if (value === 2) return "Résultat moyen";
    if (value === 3) return "Mauvais résultat";
    if (value === 4) return "Baignade interdite";
    return "Pas de résultat";
  };

  return (
    <article className="relative">
      <div
        className={[
          "relative flex w-full flex-col overflow-hidden rounded-t-lg bg-white drop-shadow-xl",
          isLoading ? "h-full" : "",
        ].join(" ")}
      >
        <button
          type="button"
          className={[
            "flex w-full cursor-pointer items-baseline justify-between bg-blue-600/5 px-2 py-4 text-base font-medium text-blue-600",
            "after:absolute after:left-0 after:top-0 after:h-full after:w-full after:scale-x-0 after:transform after:bg-white after:opacity-70",
            isLoading ? "after:animate-pulse" : "",
          ].join(" ")}
          onClick={() => {
            // TODO: Implémenter l'ouverture de la modal
            console.log("Ouvrir modal baignades");
          }}
        >
          <h2 className="m-0 basis-3/4 text-left text-base font-medium text-blue-600">
            Qualité des eaux de baignade
          </h2>
          <span
            aria-label="Plus d'informations sur la qualité des eaux de baignade"
            className="inline-flex h-4 w-4 items-center justify-center rounded-full border-2 border-blue-600 text-xs"
          >
            ?
          </span>
        </button>
        <div className="flex grow flex-col items-center justify-center p-3 [&_p]:mb-0">
          {!!isLoading && (
            <div className="flex grow flex-col items-center justify-center gap-x-4">
              <Chart />
              <p className="text-center font-medium text-blue-600">Chargement...</p>
            </div>
          )}
          {!isLoading && !hasData && !isHorsSaison && (
            <p className="text-center">
              <span className="mb-4 block text-3xl">Zut 🦙</span>
              Nous ne sommes malheureusement pas en mesure d'afficher la qualité
              des eaux de baignade pour l'instant. Veuillez réessayer dans
              quelques instants.
            </p>
          )}
          {!isLoading && (isHorsSaison || !hasData) && (
            <div className="flex w-full flex-col items-center justify-center gap-x-4 gap-y-2 xs:flex-row xs:items-start">
              <div className="flex flex-col items-center">
                <Chart visible={false} />
                <p className="text-center font-medium text-blue-600">
                  {isHorsSaison ? "Hors saison" : "Pas de données"}
                </p>
              </div>
              <div className="flex grow flex-col">
                <p className="hyphens-auto text-justify font-light">
                  {isHorsSaison 
                    ? "La saison de baignade n'a pas encore officiellement débuté dans cette commune."
                    : "Il n'y a pas de sites de baignade en eau de mer ou en eau douce recensés pour cette commune."
                  }
                </p>
              </div>
            </div>
          )}
          {!isLoading && hasData && hasValues && (
            <>
              <div className="flex w-full flex-col items-center justify-center gap-x-4 gap-y-2 xs:flex-row xs:items-start">
                <div className="flex flex-col items-center">
                  <Chart
                    value={currentData.summary?.value || undefined}
                    visible={true}
                  />
                  <p className="text-center font-medium text-blue-600">
                    {currentData.summary?.status || "Pas de données"}
                  </p>
                </div>
                <div className="flex grow flex-col">
                  <div
                    className={[
                      "hyphens-auto text-justify font-light",
                      seeMoreAdvice ? "line-clamp-none" : "line-clamp-3",
                    ].join(" ")}
                    ref={onRefChange}
                  >
                    {currentData.summary?.recommendations?.[0] || currentData.help_text}
                  </div>
                  {!!showSeeMoreAdviceButton && (
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
              </div>

              <ul className="mb-0 mt-2 w-full flex-col justify-between xl:mt-6">
                {plages
                  ?.filter((_el: any, index: number) => {
                    if (seeMorePlages) return true;
                    return index < minimumPlagesInView;
                  })
                  .map((element: any) => {
                    return (
                      <li
                        key={element.slug}
                        className="mb-2 flex shrink-0 grow basis-0 flex-col"
                      >
                        <div className="relative flex w-full items-center justify-between gap-x-2">
                          <div className="relative">
                            {element.link ? (
                              <a
                                href={element.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="underline"
                              >
                                {element.name}
                              </a>
                            ) : (
                              <p className="m-0">{element.name}</p>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-x-3 pb-1">
                          <div
                            aria-hidden="true"
                            className={[
                              "h-4 w-4 shrink-0 rounded-sm transition-colors",
                              getValueColor(element.value),
                            ].join(" ")}
                          />
                          <p className="mb-0 text-start text-xs">
                            {getValueLabel(element.value)}
                          </p>
                        </div>
                      </li>
                    );
                  })}
              </ul>
              {!!showSeeMorePlagesButton && (
                <button
                  onClick={() => {
                    setSeeMorePlages(!seeMorePlages);
                  }}
                  type="button"
                  className={[
                    "mx-auto mt-2 rounded-full px-6 py-2 text-xs font-light",
                    seeMorePlages ? "underline" : "bg-blue-600 text-white",
                  ].join(" ")}
                >
                  {!seeMorePlages
                    ? `Voir ${(plages?.length || 0) - minimumPlagesInView} site${
                        ((plages?.length || 0) - minimumPlagesInView) > 1 ? "s" : ""
                      } de plus`
                    : "Voir moins"}
                </button>
              )}
            </>
          )}
        </div>
        {/* TODO: Ajouter le SubscribeButton */}
      </div>
      {currentData?.diffusion_date && (
        <p className="mb-0 text-xs font-light text-neutral-700 xl:mt-2">
          Données du {new Date(currentData.diffusion_date).toLocaleDateString("fr", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}.{" "}
          Données fournies par le{" "}
          <a
            href="https://baignades.sante.gouv.fr"
            target="_blank"
            rel="noopener noreferrer"
          >
            Ministère de la Santé et de la Prévention
          </a>
        </p>
      )}
    </article>
  );
} 