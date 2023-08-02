import React, { useContext, useCallback, useRef, useState } from "react";

import useIndicators from "hooks/useIndicators";
import ModalContext from "utils/ModalContext";
import SubscribeButton from "../SubscribeButton";

export default function VigilanceMeteo(props) {
  const { data, isError, isLoading } = useIndicators(
    props.place.code,
    props.date
  );
  const { setModal } = useContext(ModalContext);
  const [showSeeMoreAdvice, setShowSeeMoreAdvice] = useState(false);
  const [seeMoreAdvice, setSeeMoreAdvice] = useState(false);

  const adviceRef = useRef(null);
  const onRefChange = useCallback(
    (node) => {
      if (node === null) {
        // DOM node referenced by ref has been unmounted
      } else {
        adviceRef.current = node;
        if (adviceRef.current?.scrollHeight > adviceRef.current?.clientHeight) {
          if (!showSeeMoreAdvice) setShowSeeMoreAdvice(true);
        }
      }
    },
    [showSeeMoreAdvice]
  );

  return (
    <article className="relative md:pl-6">
      <div className="relative w-full overflow-hidden rounded-t-lg bg-white drop-shadow-xl">
        <button
          type="button"
          className={[
            "flex w-full cursor-pointer items-baseline justify-between bg-main/5 px-2 py-4 text-base font-medium text-main",
            "after:absolute after:left-0 after:top-0 after:h-full after:w-full after:scale-x-0 after:transform after:bg-background after:opacity-70",
            isLoading ? "after:animate-fetching" : "",
          ].join(" ")}
          onClick={() => setModal("vigilancemeteo")}
        >
          <h2 className="m-0 basis-3/4 text-left text-base font-medium text-main">
            Vigilance météo
          </h2>
          <span
            aria-label="Plus d'informations sur l'indice ATMO"
            className="inline-flex h-4 w-4 items-center justify-center rounded-full border-2 border-main text-xs"
          >
            ?
          </span>
        </button>
        <div className="flex flex-col items-center justify-center p-3 [&_p]:mb-0">
          {!!isLoading && (
            <div className="flex flex-col items-center justify-center gap-x-4">
              <Chart value={0} />
              <p className="text-center font-medium text-main">Chargement...</p>
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
              <div className="flex w-full items-start justify-center gap-x-4">
                {!data?.vigilance_meteo?.advice?.main ? (
                  <p>Les données ne sont pas disponibles pour cette commune.</p>
                ) : (
                  <>
                    <div className="flex flex-col items-center">
                      <Chart
                        value={["Vert", "Jaune", "Orange", "Rouge"].indexOf(
                          data?.vigilance_meteo?.indice?.color
                        )}
                        visible={!!data?.vigilance_meteo?.indice}
                      />
                      <p className="text-center font-medium text-main">
                        {data.vigilance_meteo.indice?.label}
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
                          __html: data.vigilance_meteo.advice.main,
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
                    onClick={() => setModal("vigilancemeteo")}
                  >
                    <div
                      className="h-4 w-4 rounded-sm border-2 border-vigilancemeteo-0 bg-main/10 transition-colors"
                      aria-hidden
                    />
                    Aucune
                  </button>
                </li>
                <li className="flex shrink-0 grow basis-0">
                  <button
                    type="button"
                    className="relative flex grow cursor-pointer flex-col items-center gap-y-2 underline transition-colors"
                    onClick={() => setModal("vigilancemeteo")}
                  >
                    <div
                      className="h-4 w-4 rounded-sm bg-vigilancemeteo-1 transition-colors"
                      aria-hidden
                    />
                    Attentif
                  </button>
                </li>
                <li className="flex shrink-0 grow basis-0">
                  <button
                    type="button"
                    className="relative flex grow cursor-pointer flex-col items-center gap-y-2 underline transition-colors"
                    onClick={() => setModal("vigilancemeteo")}
                  >
                    <div
                      className="h-4 w-4 rounded-sm bg-vigilancemeteo-2 transition-colors"
                      aria-hidden
                    />
                    Très vigilant
                  </button>
                </li>
                <li className="flex shrink-0 grow basis-0">
                  <button
                    type="button"
                    className="relative flex grow cursor-pointer flex-col items-center gap-y-2 underline transition-colors"
                    onClick={() => setModal("vigilancemeteo")}
                  >
                    <div
                      className="h-4 w-4 rounded-sm bg-vigilancemeteo-3 transition-colors"
                      aria-hidden
                    />
                    Absolue
                  </button>
                </li>
              </ul>
            </>
          )}
        </div>
        <SubscribeButton place={props.place} indicator="vigilance_meteo" />
      </div>
      {!!data?.vigilance_meteo?.validity?.start && (
        <p className="mb-0 text-xs font-light text-neutral-700 xl:mt-2">
          Prévision pour le{" "}
          {new Date(data.vigilance_meteo.validity.start).toLocaleDateString(
            "fr",
            {
              year: "numeric",
              month: "long",
              day: "numeric",
            }
          )}{" "}
          dans {data.vigilance_meteo.validity.area}. Données fournies par{" "}
          {data.vigilance_meteo.sources && (
            <a
              href={data.vigilance_meteo.sources[0].url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {data.vigilance_meteo.sources[0].label}
            </a>
          )}
        </p>
      )}
    </article>
  );
}

function Chart({ visible, value }) {
  return (
    <svg
      className="h-16 w-auto overflow-visible"
      aria-hidden={true}
      width="162"
      height="106"
      viewBox="0 0 162 106"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M75.2201 19.1614L74.8686 19.7522V20.4397C74.8686 35.2422 73.0783 44.0997 66.1837 49.6182C62.6664 52.4334 57.6044 54.5601 50.2196 55.967C42.837 57.3736 33.3037 58.03 20.9932 58.03H18.4932V60.53C18.4932 75.0698 30.5882 86.8286 45.0562 86.8286H132.318C146.786 86.8286 158.881 75.0698 158.881 60.53C158.881 48.2045 150.144 37.8927 138.742 35.0245C137.85 16.9374 122.858 2.5 104.553 2.5C92.3369 2.5 81.3296 8.89376 75.2201 19.1614Z"
        style={{
          transition: visible ? "opacity 1200ms 900ms, fill 400ms 900ms" : null,
        }}
        className={[
          "fill-main10",
          "stroke-white",
          value > 2 ? "fill-disabled" : `fill-vigilancemeteo-${value}`,
        ].join(" ")}
        strokeWidth="5"
      />
      <path
        d="M39.8779 29.6389C29.8053 29.6389 21.3465 36.6211 19.069 45.9974C9.70198 48.2678 2.5 56.6987 2.5 66.8068C2.5 78.6507 12.3477 88.2165 24.1198 88.2165H93.4555C105.228 88.2165 115.075 78.6507 115.075 66.8068C115.075 56.8977 108.148 48.5984 99.052 46.1384C98.1421 31.6719 86.0864 20.1841 71.3942 20.1841C62.3293 20.1841 54.0847 24.5342 48.9637 31.6617C46.1497 30.3378 43.0606 29.6389 39.8779 29.6389Z"
        style={{
          transition: visible ? "opacity 1200ms 600ms, fill 400ms 600ms" : null,
        }}
        className={[
          "fill-main10",
          "stroke-white",
          value > 1 ? "fill-disabled" : `fill-vigilancemeteo-${value}`,
        ].join(" ")}
        strokeWidth="5"
      />
      <path
        d="M68.4558 54.0074C59.9952 54.0074 52.8771 59.8096 50.8549 67.6418C43.0317 69.6567 37.0459 76.7476 37.0459 85.2432C37.0459 95.3028 45.4062 103.417 55.3941 103.417H112.866C122.853 103.417 131.214 95.3028 131.214 85.2432C131.214 76.933 125.482 69.9653 117.91 67.7807C116.994 55.7092 106.882 46.1704 94.5792 46.1704C87.0473 46.1704 80.1847 49.7282 75.8474 55.5773C73.5453 54.5489 71.0364 54.0074 68.4558 54.0074Z"
        style={{
          transition: visible ? "opacity 1200ms 300ms, fill 400ms 300ms" : null,
        }}
        className={[
          "fill-main10",
          "stroke-white",
          value > 0 ? "fill-disabled" : `fill-vigilancemeteo-${value}`,
        ].join(" ")}
        strokeWidth="5"
      />
    </svg>
  );
}
