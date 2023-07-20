import React, { useContext, useCallback, useRef, useState } from "react";

import useIndicators from "hooks/useIndicators";
import Chart from "./potentielRadon/Chart";
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
    <article className="md:pl-6">
      <div className="w-full overflow-hidden rounded-t-lg bg-white drop-shadow-xl">
        <button
          type="button"
          className={[
            "flex w-full cursor-pointer items-baseline justify-between bg-main/5 px-2 py-4 text-base font-medium text-main",
            "after:absolute after:left-0 after:top-0 after:h-full after:w-full after:scale-x-0 after:transform after:bg-background after:opacity-70",
            isLoading ? "after:animate-fetching" : "",
          ].join(" ")}
          onClick={() => setModal("potentiel_radon")}
        >
          <h2 className="m-0 basis-3/4 text-left text-base font-medium text-main">
            Potentiel Radon
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
              Nous ne sommes malheureusement pas en mesure d'afficher le
              potentiel radon pour l'instant. Veuillez réessayer dans quelques
              instants.
            </p>
          ) : (
            <>
              <div className="flex items-start justify-center gap-x-4">
                {!data?.potentiel_radon?.advice?.main ? (
                  <p>Les données ne sont pas disponibles pour cette commune.</p>
                ) : (
                  <>
                    <div>
                      <Chart
                        value={data?.potentiel_radon?.indice?.value}
                        visible={!!data?.potentiel_radon?.indice}
                        className="mx-auto h-12 w-auto"
                      />
                      <p className="text-center font-medium text-main">
                        {data.potentiel_radon.indice?.label.replace(
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
                          __html: data.potentiel_radon.advice.main,
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
            </>
          )}
        </div>
      </div>
      {!!data?.potentiel_radon?.validity?.area && (
        <p className="mb-0 text-xs font-light text-neutral-700 xl:mt-2">
          Données statiques valides pour {data.potentiel_radon.validity.area}.
          Données fournies par{" "}
          {data.potentiel_radon.sources && (
            <a
              href={data.potentiel_radon.sources[0].url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {data.potentiel_radon.sources[0].label}
            </a>
          )}
        </p>
      )}
    </article>
  );
}
