"use client";

import React, { useState, useRef, useCallback, useEffect } from "react";
import Chart from "./Chart";
import SubscribeButton from "../SubscribeButton";
import { useModalContext } from "../../app/providers/ModalProvider";

interface BaignadesProps {
  place: {
    code: string;
    nom: string;
  };
}

interface BaignadesData {
  baignades: {
    indice: {
      label: string;
      summary: {
        "Bons résultats": number;
        "Résultats moyens": number;
        "Mauvais résultats": number;
        "Interdiction": number;
      };
      details: Array<{
        label: string;
        url?: string;
        sample: {
          label: string;
          date?: string;
        };
      }>;
    };
    advice: {
      main: string;
    };
    validity: {
      start: string;
      end: string;
      area: string;
    };
    sources: Array<{
      url: string;
      label: string;
    }>;
  };
}

export default function Baignades({ place }: BaignadesProps) {
  // TODO: Remplacer par les vraies données de l'API
  const mockData: BaignadesData = {
    baignades: {
      indice: {
        label: "Bons résultats",
        summary: {
          "Bons résultats": 3,
          "Résultats moyens": 1,
          "Mauvais résultats": 0,
          "Interdiction": 0
        },
        details: [
          {
            label: "Plage de la Grande Conche",
            url: "https://baignades.sante.gouv.fr",
            sample: {
              label: "Bon résultat",
              date: "15/07/2024"
            }
          },
          {
            label: "Plage de la Côte Sauvage",
            url: "https://baignades.sante.gouv.fr",
            sample: {
              label: "Bon résultat",
              date: "12/07/2024"
            }
          },
          {
            label: "Plage des Dunes",
            url: "https://baignades.sante.gouv.fr",
            sample: {
              label: "Bon résultat",
              date: "14/07/2024"
            }
          },
          {
            label: "Plage du Port",
            url: "https://baignades.sante.gouv.fr",
            sample: {
              label: "Résultat moyen",
              date: "13/07/2024"
            }
          },
          {
            label: "Plage de la Pointe",
            url: "https://baignades.sante.gouv.fr",
            sample: {
              label: "Bon résultat",
              date: "11/07/2024"
            }
          },
          {
            label: "Plage du Centre",
            url: "https://baignades.sante.gouv.fr",
            sample: {
              label: "Bon résultat",
              date: "10/07/2024"
            }
          }
        ]
      },
      advice: {
        main: "La qualité de l'eau est excellente pour la baignade. Vous pouvez vous baigner en toute sécurité. Surveillez les drapeaux de baignade et respectez les consignes de sécurité."
      },
      validity: {
        start: "2024-06-15",
        end: "2024-09-15",
        area: "votre région"
      },
      sources: [{
        url: "https://baignades.sante.gouv.fr",
        label: "Ministère de la Santé"
      }]
    }
  };

  const { setModal } = useModalContext();
  const [showSeeMoreAdviceButton, setShowSeeMoreAdviceButton] = useState(false);
  const [seeMoreAdvice, setSeeMoreAdvice] = useState(false);
  const [showSeeMorePlagesButton, setShowSeeMorePlagesButton] = useState(false);
  const [seeMorePlages, setSeeMorePlages] = useState(false);

  const adviceRef = useRef<HTMLDivElement | null>(null);
  const onRefChange = useCallback((node: HTMLDivElement | null) => {
    if (node === null) {
      // DOM node referenced by ref has been unmounted
    } else {
      adviceRef.current = node;
      if (node.scrollHeight > node.clientHeight) {
        if (!showSeeMoreAdviceButton) setShowSeeMoreAdviceButton(true);
      }
    }
  }, [showSeeMoreAdviceButton]);

  const plages = mockData?.baignades?.indice?.details;
  const minimumPlagesInView = 5;

  useEffect(() => {
    setShowSeeMorePlagesButton((plages?.length || 0) > minimumPlagesInView);
  }, [plages?.length]);

  // TODO: Remplacer isLoading et isError par les vraies données de l'API
  const isLoading = false;
  const isError = false;

  const getChartValue = (label: string) => {
    const values = [
      "Bons résultats",
      "Résultats moyens", 
      "Mauvais résultats",
      "Résultats mixtes",
    ];
    return values.indexOf(label);
  };

  const getSampleValue = (label: string) => {
    const values = [
      "Bon résultat",
      "Résultat moyen",
      "Mauvais résultat",
    ];
    return values.indexOf(label);
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
            "after:absolute after:left-0 after:top-0 after:h-full after:w-full after:scale-x-0 after:transform after:bg-background after:opacity-70",
            isLoading ? "after:animate-fetching" : "",
          ].join(" ")}
          onClick={() => setModal("baignades")}
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

          {!isLoading && !!isError && (
            <p className="text-center">
              <span className="mb-4 block text-3xl">Zut 🦙</span>
              Nous ne sommes malheureusement pas en mesure d'afficher la qualité
              des eaux de baignade pour l'instant. Veuillez réessayer dans
              quelques instants.
            </p>
          )}

          {!isLoading && !isError && (
            <>
              <div
                className={[
                  "flex w-full flex-col items-center justify-center gap-x-4 gap-y-2 xs:flex-row xs:items-start",
                  mockData?.baignades?.indice?.label === "Pas de sites"
                    ? "items-center"
                    : "",
                ].join(" ")}
              >
                {!mockData?.baignades?.advice?.main ? (
                  <>
                    {mockData?.baignades?.indice?.label === "Hors-saison"
                      ? "La saison de baignade n'a pas encore officiellement débuté dans cette commune."
                      : mockData?.baignades?.indice?.label === "Pas de sites"
                      ? "Il n'y a pas de sites de baignade en eau de mer ou en eau douce recensés pour cette commune."
                      : mockData?.baignades?.indice?.summary["Interdiction"] > 0
                      ? "Pour plus de renseignements sur les interdictions de baignade, veuillez contacter la mairie ou l'Agence régionale de santé (ARS)."
                      : "Les données ne sont pas disponibles pour cette commune."}
                  </>
                ) : (
                  <>
                    <div className="flex flex-col items-center">
                      <Chart
                        value={getChartValue(mockData.baignades.indice.label)}
                        summary={[
                          mockData.baignades.indice.summary["Bons résultats"],
                          mockData.baignades.indice.summary["Résultats moyens"],
                          mockData.baignades.indice.summary["Mauvais résultats"],
                        ]}
                        visible={!!mockData.baignades.indice}
                      />
                      <p className="text-center font-medium text-blue-600">
                        {mockData.baignades.indice.label === "Pas de sites"
                          ? "Pas\u00A0de\u00A0site"
                          : mockData.baignades.indice.label}
                      </p>
                    </div>
                    {plages && plages.length > 0 && (
                      <div className="flex grow flex-col">
                        <div
                          className={[
                            "hyphens-auto text-justify font-light",
                            seeMoreAdvice ? "line-clamp-none" : "line-clamp-3",
                          ].join(" ")}
                          ref={onRefChange}
                          dangerouslySetInnerHTML={{
                            __html: mockData.baignades.advice.main,
                          }}
                        />
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
                    )}
                  </>
                )}
              </div>

              {mockData?.baignades?.indice?.label !== "Pas de sites" && (
                <ul className="mb-0 mt-2 w-full flex-col justify-between xl:mt-6">
                  {plages
                    ?.filter((_el, index) => {
                      if (seeMorePlages) return true;
                      return index < minimumPlagesInView;
                    })
                    .map((element) => {
                      const sampleValue = getSampleValue(element?.sample?.label);
                      return (
                        <li
                          key={element?.label}
                          className="mb-2 flex shrink-0 grow basis-0 flex-col"
                        >
                          <div className="relative flex w-full items-center justify-between gap-x-2">
                            <div className="relative">
                              {element.url ? (
                                <a
                                  href={element.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="underline"
                                >
                                  {element.label}
                                </a>
                              ) : (
                                <p className="m-0">{element.label}</p>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center gap-x-3 pb-1">
                            {!element.sample.label ? (
                              <p className="mb-0 text-start text-xs">
                                Pas de résultats de prélèvements
                              </p>
                            ) : (
                              <>
                                <div
                                  aria-hidden="true"
                                  className={[
                                    "h-4 w-4 shrink-0 rounded-sm transition-colors",
                                    sampleValue >= 0
                                      ? `opacity-100 bg-baignades-${sampleValue}`
                                      : "opacity-15 bg-blue-600",
                                  ].join(" ")}
                                />
                                <p className="mb-0 text-start text-xs">
                                  {element.sample.label}{" "}
                                  {element.sample.date && (
                                    <span className="font-light">
                                      (prélèvement du {element.sample.date})
                                    </span>
                                  )}
                                </p>
                              </>
                            )}
                          </div>
                        </li>
                      );
                    })}
                </ul>
              )}
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

        <SubscribeButton
          disabled
          onClick={() => setModal("donneesrestreintes")}
          indicator="baignades"
          place={place}
        />
      </div>

      {!!mockData?.baignades?.validity?.start && (
        <p className="mb-0 text-xs font-light text-neutral-700 xl:mt-2">
          {mockData?.baignades?.indice?.label !== "Pas de sites" && (
            <>
              Saison ouverte du{" "}
              {new Date(mockData.baignades.validity.start).toLocaleDateString(
                "fr",
                {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                }
              )}{" "}
              au{" "}
              {new Date(mockData.baignades.validity.end).toLocaleDateString(
                "fr",
                {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                }
              )}{" "}
              dans {mockData.baignades.validity.area}.{" "}
            </>
          )}
          Données fournies par{" "}
          {mockData?.baignades?.sources && (
            <a
              href={mockData.baignades.sources[0].url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {mockData.baignades.sources[0].label}
            </a>
          )}
        </p>
      )}
    </article>
  );
} 