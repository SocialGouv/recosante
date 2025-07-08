"use client";

import React, { useState, useRef, useCallback } from "react";
import Chart from "./Chart";

interface IndiceUvProps {
  data?: any;
  day?: 'j0' | 'j1';
}

const maxValue = 11;

export default function IndiceUv({ data, day = 'j0' }: IndiceUvProps) {
  const currentData = data?.[day] || data?.j0 || data?.j1;
  const hasData = currentData && currentData.summary && currentData.summary.value !== null;
  
  const indicatorData = hasData ? {
    slug: 'indice-uv',
    label: currentData.summary.status,
    value: currentData.summary.value,
    unit: 'sur 11',
    validity: {
      start: currentData.diffusion_date || new Date().toISOString(),
      end: new Date().toISOString(),
    },
    advice: currentData.help_text || 'Protection nécessaire. Évitez l\'exposition entre 12h et 16h. Recherchez l\'ombre et portez des vêtements protecteurs.',
  } : {
    slug: 'indice-uv',
    label: 'Modéré',
    value: 5,
    unit: 'sur 11',
    validity: {
      start: new Date().toISOString(),
      end: new Date().toISOString(),
    },
    advice: 'Protection nécessaire. Évitez l\'exposition entre 12h et 16h. Recherchez l\'ombre et portez des vêtements protecteurs.',
  };

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
        <div className="flex w-full cursor-pointer items-baseline justify-between bg-orange-600/5 px-2 py-4 text-base font-medium text-orange-600">
          <h2 className="m-0 basis-3/4 text-left text-base font-medium text-orange-600">
            Indice UV (de&nbsp;1&nbsp;à&nbsp;{maxValue})
          </h2>
          <span className="inline-flex h-4 w-4 items-center justify-center rounded-full border-2 border-orange-600 text-xs">
            ?
          </span>
        </div>

        <div className="flex flex-col items-center justify-center p-3 [&_p]:mb-0">
          <div className="flex w-full flex-col items-center justify-center gap-x-4 gap-y-2 xs:flex-row xs:items-start">
            {!indicatorData?.advice ? (
              <p>Les données ne sont pas disponibles pour cette commune.</p>
            ) : (
              <>
                <div className="flex flex-col items-center">
                  <Chart value={indicatorData.value} />
                  <p className="text-center font-medium text-orange-600">
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
            {uvLevels.map((level) => (
              <li key={level.value} className="flex shrink-0 grow basis-0">
                <button
                  type="button"
                  className="relative flex grow cursor-pointer items-center gap-x-4 gap-y-2 underline transition-colors xs:flex-col xs:gap-x-0"
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
        </div>
      </div>

      {indicatorData.validity?.start && (
        <p className="mb-0 text-xs font-light text-neutral-700 xl:mt-2">
          Prévision pour le{" "}
          {new Date(indicatorData.validity.start).toLocaleDateString("fr", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}{" "}
          dans votre région.
        </p>
      )}
    </article>
  );
} 