import React, { useContext, useCallback, useRef, useState } from "react";

import useIndicators from "hooks/useIndicators";
import Chart from "./indiceAtmo/Chart";
import ModalContext from "utils/ModalContext";

export default function IndiceAtmo(props) {
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
    <article className="md:pr-6">
      <div className="w-full overflow-hidden rounded-t-lg bg-white drop-shadow-xl">
        <button
          type="button"
          className={[
            "flex w-full cursor-pointer items-baseline justify-between bg-main/5 px-2 py-4 text-base font-medium text-main",
            "after:absolute after:left-0 after:top-0 after:h-full after:w-full after:scale-x-0 after:transform after:bg-background after:opacity-70",
            isLoading ? "after:animate-fetching" : "",
          ].join(" ")}
          onClick={() => setModal("indice_atmo")}
        >
          <h2 className="m-0 basis-3/4 text-left text-base font-medium text-main">
            Indice ATMO de la qualité de l'air
          </h2>
          <span
            aria-label="Plus d'informations sur l'indice ATMO"
            className="inline-flex h-4 w-4 items-center justify-center rounded-full border-2 border-main text-xs"
          >
            ?
          </span>
        </button>
        <div className="flex flex-col items-center justify-center p-3 [&_p]:mb-0">
          {isError ? (
            <p>
              Nous ne sommes malheureusement pas en mesure d'afficher l'indice
              de qualité de l'air pour l'instant. Veuillez réessayer dans
              quelques instants.
            </p>
          ) : (
            <>
              <div className="flex items-start justify-center gap-x-4">
                {!data?.indice_atmo?.advice?.main ? (
                  <p>Les données ne sont pas disponibles pour cette commune.</p>
                ) : (
                  <>
                    <div>
                      <Chart value={data.indice_atmo.indice?.value} />
                      <p className="-mt-4 text-center font-medium text-main">
                        {data.indice_atmo.indice?.label}
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
                          __html: data.indice_atmo.advice.main,
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
                {data?.indice_atmo?.indice?.details?.map((element) => (
                  <li
                    key={element?.label}
                    className="flex shrink-0 grow basis-0"
                  >
                    <button
                      type="button"
                      className="relative flex grow cursor-pointer flex-col items-center gap-y-2 underline transition-colors"
                      value={element.indice.value}
                      onClick={() => setModal(element.label.replace(",", ""))}
                    >
                      <div
                        className={[
                          "h-4 w-4 rounded-sm transition-colors",
                          element.indice.value > 0 && element.indice.value < 7
                            ? `opacity-100 bg-atmo-${element.indice.value}`
                            : "opacity-15 bg-main",
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
        <div>
          <button
            type="button"
            className="flex w-full items-center justify-center py-2 text-sm font-medium text-main underline transition-colors hover:bg-main/10"
            onClick={() => {
              mutateUser({
                indicateurs: ["vigilance_meteo"],
                commune: props.place,
              });
              setSubscription("indicators");
              window?._paq?.push([
                "trackEvent",
                "Subscription",
                "Indicateur",
                "vigilance_meteo",
              ]);
            }}
          >
            M'abonner à cet indicateur
            <svg
              className="ml-2 h-4 w-4"
              viewBox="0 0 17 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M13.8333 11.333H15.1666V12.6663H1.83325V11.333H3.16659V6.66634C3.16659 3.72082 5.5544 1.33301 8.49992 1.33301C11.4455 1.33301 13.8333 3.72082 13.8333 6.66634V11.333ZM6.49992 13.9997H10.4999V15.333H6.49992V13.9997Z"
                className="fill-main"
              />
            </svg>
          </button>
        </div>
      </div>
      {!!data?.indice_atmo?.validity?.start && (
        <p className="mb-0 text-xs font-light text-neutral-700 xl:mt-2">
          Prévision pour le{" "}
          {new Date(data.indice_atmo.validity.start).toLocaleDateString("fr", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}{" "}
          dans {data.indice_atmo.validity.area}. Données fournies par{" "}
          {data.indice_atmo.sources && (
            <a
              href={data.indice_atmo.sources[0].url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {data.indice_atmo.sources[0].label}
            </a>
          )}
        </p>
      )}
    </article>
  );
}
