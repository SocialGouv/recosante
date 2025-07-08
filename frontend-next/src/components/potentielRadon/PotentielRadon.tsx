"use client";

import React, { useState, useCallback } from 'react';

interface PotentielRadonProps {
  // Props pour compatibilité future
}

interface ChartProps {
  value?: number;
  visible?: boolean;
  onlyValue?: boolean;
  className?: string;
}

function Chart({ value = 2, visible = true, onlyValue = false, className = "" }: ChartProps) {
  return (
    <svg
      aria-hidden={true}
      className={className}
      viewBox="0 0 110 110"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M108.474 51.4639L98.4736 41.4639L58.4736 1.46393C57.5359 0.526577 56.2644 0 54.9386 0C53.6127 0 52.3412 0.526577 51.4036 1.46393L11.4036 41.4639L1.40356 51.4639C0.492769 52.4069 -0.0112031 53.67 0.000189013 54.9809C0.0115811 56.2919 0.537425 57.546 1.46447 58.473C2.39151 59.4001 3.64557 59.9259 4.95655 59.9373C6.26754 59.9487 7.53055 59.4447 8.47356 58.5339L9.93856 57.0689V104.999C9.93856 106.325 10.4653 107.597 11.403 108.534C12.3407 109.472 13.6125 109.999 14.9386 109.999H94.9386C96.2646 109.999 97.5364 109.472 98.4741 108.534C99.4118 107.597 99.9386 106.325 99.9386 104.999V57.0689L101.404 58.5339C102.347 59.4447 103.61 59.9487 104.921 59.9373C106.232 59.9259 107.486 59.4001 108.413 58.473C109.34 57.546 109.866 56.2919 109.877 54.9809C109.888 53.67 109.384 52.4069 108.474 51.4639ZM89.9386 99.9989H19.9386V47.0689L54.9386 12.0689L89.9386 47.0689V99.9989Z"
        className={onlyValue ? "fill-none" : `fill-radon-${value}`}
      />
      <rect
        x="28.1299"
        y="81.8076"
        width="53.617"
        height="10.2128"
        rx="4"
        style={{
          transition: visible ? "opacity 1200ms 300ms, fill 400ms 300ms" : undefined,
        }}
        className={value > 0 ? `fill-radon-${value}` : "fill-blue-600/10"}
      />
      <rect
        x="28.1299"
        y="63.9351"
        width="53.617"
        height="10.2128"
        rx="4"
        style={{
          transition: visible ? "opacity 1200ms 600ms, fill 400ms 600ms" : undefined,
        }}
        className={value > 1 ? `fill-radon-${value}` : "fill-blue-600/10"}
      />
      <rect
        x="28.1299"
        y="46.063"
        width="53.617"
        height="10.2128"
        rx="4"
        style={{
          transition: visible ? "opacity 1200ms 900ms, fill 400ms 900ms" : undefined,
        }}
        className={value > 2 ? `fill-radon-${value}` : "fill-blue-600/10"}
      />
    </svg>
  );
}

export default function PotentielRadon({}: PotentielRadonProps) {
  // Données mockées pour le potentiel radon (données statiques)
  const mockData = {
    potentiel_radon: {
      indice: {
        value: 2,
        label: "Potentiel\u00A0moyen"
      },
      advice: {
        main: "Le potentiel radon de votre commune est moyen. Il est recommandé de mesurer la concentration en radon dans votre logement, particulièrement dans les pièces de vie du rez-de-chaussée et du sous-sol. Des mesures simples peuvent être mises en place pour réduire l'exposition."
      },
      validity: {
        area: "votre commune"
      },
      sources: [
        {
          label: "IRSN",
          url: "https://www.irsn.fr"
        }
      ]
    }
  };

  const [showSeeMoreAdvice, setShowSeeMoreAdvice] = useState(false);
  const [seeMoreAdvice, setSeeMoreAdvice] = useState(false);

  const onRefChange = useCallback(
    (node: HTMLDivElement | null) => {
      if (node === null) {
        // DOM node referenced by ref has been unmounted
      } else {
        const currentRef = node;
        if (currentRef?.scrollHeight && currentRef?.clientHeight && 
            currentRef.scrollHeight > currentRef.clientHeight) {
          if (!showSeeMoreAdvice) setShowSeeMoreAdvice(true);
        }
      }
    },
    [showSeeMoreAdvice]
  );

  // TODO: Implémenter le ModalContext
  const setModal = (modalName: string) => {
    console.log('Ouvrir modal:', modalName);
  };

  return (
    <article className="relative">
      <div className="relative w-full overflow-hidden rounded-t-lg bg-white drop-shadow-xl">
        <button
          type="button"
          className="flex w-full cursor-pointer items-baseline justify-between bg-blue-600/5 px-2 py-4 text-base font-medium text-blue-600"
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
            <li className="flex shrink-0 grow basis-0">
              <button
                type="button"
                className="relative flex grow cursor-pointer flex-col items-center gap-y-2 underline transition-colors"
                onClick={() => setModal("potentiel_radon")}
              >
                <Chart
                  className="mx-auto -mb-2 h-10 w-auto"
                  value={1}
                  onlyValue
                  aria-hidden
                />
                Faible
              </button>
            </li>
            <li className="flex shrink-0 grow basis-0">
              <button
                type="button"
                className="relative flex grow cursor-pointer flex-col items-center gap-y-2 underline transition-colors"
                onClick={() => setModal("potentiel_radon")}
              >
                <Chart
                  className="mx-auto -mb-2 h-10 w-auto"
                  value={2}
                  onlyValue
                  aria-hidden
                />
                Moyen
              </button>
            </li>
            <li className="flex shrink-0 grow basis-0">
              <button
                type="button"
                className="relative flex grow cursor-pointer flex-col items-center gap-y-2 underline transition-colors"
                onClick={() => setModal("potentiel_radon")}
              >
                <Chart
                  className="mx-auto -mb-2 h-10 w-auto"
                  value={3}
                  onlyValue
                  aria-hidden
                />
                Élevé
              </button>
            </li>
          </ul>
        </div>
        {/* TODO: Ajouter le SubscribeButton */}
      </div>
      {!!mockData?.potentiel_radon?.validity?.area && (
        <p className="mb-0 text-xs font-light text-neutral-700 xl:mt-2">
          Données statiques valides pour {mockData.potentiel_radon.validity.area}.
          Données fournies par{" "}
          {mockData.potentiel_radon.sources && (
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