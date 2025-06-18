"use client";

import React, { useState, useRef, useCallback, useEffect } from "react";
import Chart from "./Chart";
import SubscribeButton from "../SubscribeButton";
import { useModalContext } from "../../app/providers/ModalProvider";

interface RaepProps {
  place: {
    code: string;
    nom: string;
  };
  date?: string;
}

const labels = {
  ambroisies: "Ambroisies",
  cypres: "Cupressacées",
  noisetier: "Noisetier",
  aulne: "Aulne",
  peuplier: "Peuplier",
  saule: "Saule",
  frene: "Frêne",
  charme: "Charme",
  bouleau: "Bouleau",
  platane: "Platane",
  chene: "Chêne",
  olivier: "Olivier",
  tilleul: "Tilleul",
  chataignier: "Châtaignier",
  rumex: "Rumex",
  graminees: "Graminées",
  plantain: "Plantain",
  urticacees: "Urticacées",
  armoises: "Armoises",
};

interface RaepData {
  raep: {
    indice: {
      value: number;
      label: string;
      details: Array<{
        label: string;
        indice: {
          value: number;
        };
      }>;
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

export default function Raep({ place, date }: RaepProps) {
  // TODO: Remplacer par les vraies données de l'API
  const mockData: RaepData = {
    raep: {
      indice: {
        value: 3,
        label: "Moyen",
        details: [
          { label: "graminees", indice: { value: 3 } },
          { label: "bouleau", indice: { value: 2 } },
          { label: "platane", indice: { value: 1 } },
          { label: "chene", indice: { value: 2 } },
          { label: "frene", indice: { value: 1 } }
        ]
      },
      advice: {
        main: "Le risque d'allergie est moyen. Les personnes sensibles peuvent ressentir des symptômes. Prenez vos médicaments par précaution et évitez les activités extérieures prolongées."
      },
      validity: {
        start: "2024-04-15",
        area: "votre région"
      },
      sources: [{
        url: "https://www.pollens.fr",
        label: "RNSA"
      }]
    }
  };

  const { setModal } = useModalContext();
  const [showSeeMoreAdviceButton, setShowSeeMoreAdviceButton] = useState(false);
  const [seeMoreAdvice, setSeeMoreAdvice] = useState(false);
  const [showSeeMoreAllergensButton, setShowSeeMoreAllergensButton] = useState(false);
  const [seeMoreAllergens, setSeeMoreAllergens] = useState(false);

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

  const allergens = mockData?.raep?.indice?.details
    .filter((allergen) => allergen.indice.value)
    .sort((a, b) => (a.indice.value > b.indice.value ? -1 : 1));

  const longestElementLabel = allergens?.reduce((longest, el) => {
    if (labels[el.label as keyof typeof labels].length > longest.length) {
      return labels[el.label as keyof typeof labels];
    }
    return longest;
  }, "");

  const minimumAllergensInView = 3;

  useEffect(() => {
    if (typeof window !== 'undefined' && window.innerWidth < 768) {
      setShowSeeMoreAllergensButton(allergens?.length > minimumAllergensInView);
    } else {
      setSeeMoreAllergens(true);
    }
  }, [allergens?.length]);

  // TODO: Remplacer isLoading et isError par les vraies données de l'API
  const isLoading = false;
  const isError = false;

  return (
    <article className="relative">
      <div className={[
        "relative flex w-full flex-col overflow-hidden rounded-t-lg bg-white drop-shadow-xl",
        isLoading ? "h-full" : "",
      ].join(" ")}>
        <button
          type="button"
          className={[
            "flex w-full cursor-pointer items-baseline justify-between bg-yellow-600/5 px-2 py-4 text-base font-medium text-yellow-600",
            "after:absolute after:left-0 after:top-0 after:h-full after:w-full after:scale-x-0 after:transform after:bg-background after:opacity-70",
            isLoading ? "after:animate-fetching" : "",
          ].join(" ")}
          onClick={() => setModal("raep")}
        >
          <h2 className="m-0 basis-3/4 text-left text-base font-medium text-yellow-600">
            Risque d'allergies aux pollens
          </h2>
          <span
            aria-label="Plus d'informations sur le risque d'allergie aux pollens"
            className="inline-flex h-4 w-4 items-center justify-center rounded-full border-2 border-yellow-600 text-xs"
          >
            ?
          </span>
        </button>

        <div className="flex grow flex-col items-center justify-center p-3 [&_p]:mb-0">
          {!!isLoading && (
            <div className="flex grow flex-col items-center justify-center gap-x-4 md:min-h-[22rem]">
              <Chart />
              <p className="text-center font-medium text-yellow-600">Chargement...</p>
            </div>
          )}

          {!isLoading && !!isError && (
            <p className="items-center text-center md:min-h-[10rem]">
              <span className="mb-4 block text-3xl">Oups 🦔</span>
              Nous ne sommes malheureusement pas en mesure d'afficher le risque
              d'allergie aux pollens pour l'instant. Veuillez réessayer dans
              quelques instants.
            </p>
          )}

          {!isLoading && !isError && (
            <>
              <div className="flex w-full flex-col items-center justify-center gap-x-4 gap-y-2 xs:flex-row xs:items-start">
                {!mockData?.raep?.advice?.main ? (
                  <p>Les données ne sont pas disponibles pour cette commune.</p>
                ) : (
                  <>
                    <div className="flex flex-col items-center">
                      <Chart
                        value={mockData.raep.indice.value}
                        visible={!!mockData?.raep?.indice}
                      />
                      <p className="text-center font-medium text-yellow-600">
                        {mockData.raep.indice.label}
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
                          __html: mockData.raep.advice.main,
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
                  </>
                )}
              </div>

              <ul className="mb-0 mt-4 w-full flex-col justify-between xl:mt-6">
                {allergens
                  ?.filter((el, index) => {
                    if (seeMoreAllergens) return true;
                    return index < minimumAllergensInView;
                  })
                  .map((element) => (
                    <li
                      key={element?.label}
                      className="mb-2 flex shrink-0 grow basis-0"
                    >
                      <button
                        type="button"
                        className="relative flex w-full flex-col transition-colors"
                        onClick={() => setModal(element.label.replace(",", ""))}
                      >
                        <div className="relative flex w-full items-center justify-between gap-x-2">
                          <div className="relative shrink basis-52">
                            <p
                              className="pointer-events-none invisible m-0 opacity-0"
                              aria-hidden
                            >
                              {longestElementLabel}
                            </p>
                            <p className="absolute left-0 top-0 m-0">
                              {labels[element.label as keyof typeof labels]}
                            </p>
                          </div>
                          <div
                            className="h-4 w-4 shrink basis-1/2 overflow-hidden rounded-full bg-yellow-600/10 transition-colors"
                            aria-hidden
                          >
                            <div
                              className={[
                                "h-full transition-colors",
                                `bg-raep-${element.indice.value} w-${element.indice.value}/5`,
                              ].join(" ")}
                            />
                          </div>
                        </div>
                        <div className="w-full border-yellow-600 pb-1 xl:border-b">
                          <p className="mb-0 text-end text-xs font-light underline">
                            Voir plus
                          </p>
                        </div>
                      </button>
                    </li>
                  ))}
              </ul>

              {!!showSeeMoreAllergensButton && (
                <button
                  onClick={() => {
                    setSeeMoreAllergens(!seeMoreAllergens);
                  }}
                  type="button"
                  className={[
                    "mx-auto mt-2 rounded-full px-6 py-2 text-xs font-light",
                    seeMoreAllergens ? "underline" : "bg-yellow-600 text-white",
                  ].join(" ")}
                >
                  {!seeMoreAllergens
                    ? `Voir ${
                        allergens.length - minimumAllergensInView
                      } allergène${
                        allergens.length - minimumAllergensInView > 1 ? "s" : ""
                      } de plus`
                    : "Voir moins"}
                </button>
              )}
            </>
          )}
        </div>

        <SubscribeButton place={place} indicator="raep" />
      </div>

      {!!mockData?.raep?.validity?.start && (
        <p className="mb-0 text-xs font-light text-neutral-700 xl:mt-2">
          Prévision pour le{" "}
          {new Date(mockData.raep.validity.start).toLocaleDateString("fr", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}{" "}
          dans {mockData.raep.validity.area}. Données fournies par{" "}
          {mockData.raep.sources && (
            <a
              href={mockData.raep.sources[0].url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {mockData.raep.sources[0].label}
            </a>
          )}
        </p>
      )}
    </article>
  );
} 