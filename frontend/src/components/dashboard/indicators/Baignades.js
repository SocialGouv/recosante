import React, {
  useContext,
  useCallback,
  useRef,
  useState,
  useEffect,
} from "react";

import useBaignades from "hooks/useBaignades";
import ModalContext from "utils/ModalContext";
import SubscribeButton from "../SubscribeButton";

export default function Baignades(props) {
  const { data, isError, isLoading } = useBaignades(props.place.code);

  const { setModal } = useContext(ModalContext);
  // advice
  const [showSeeMoreAdviceButton, setShowSeeMoreAdviceButton] = useState(false);
  const [seeMoreAdvice, setSeeMoreAdvice] = useState(false);
  // advice
  const [showSeeMorePlagesButton, setShowSeeMorePlagesButton] = useState(false);
  const [seeMorePlages, setSeeMorePlages] = useState(false);

  const adviceRef = useRef(null);
  const onRefChange = useCallback(
    (node) => {
      if (node === null) {
        // DOM node referenced by ref has been unmounted
      } else {
        adviceRef.current = node;
        if (adviceRef.current?.scrollHeight > adviceRef.current?.clientHeight) {
          if (!showSeeMoreAdviceButton) setShowSeeMoreAdviceButton(true);
        }
      }
    },
    [showSeeMoreAdviceButton]
  );

  const plages = data?.baignades?.indice?.details;

  const minimumPlagesInView = 5;

  useEffect(() => {
    setShowSeeMorePlagesButton(plages?.length > minimumPlagesInView);
  }, [plages?.length]);

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
          onClick={() => setModal("baignades")}
        >
          <h2 className="m-0 basis-3/4 text-left text-base font-medium text-main">
            Qualité des eaux de baignade
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
              Nous ne sommes malheureusement pas en mesure d'afficher la qualité
              des eaux de baignade pour l'instant. Veuillez réessayer dans
              quelques instants.
            </p>
          ) : (
            <>
              <div className="flex items-start justify-center gap-x-4">
                {!data?.baignades?.advice?.main ? (
                  <>
                    {data?.baignades?.indice?.label === "Hors-saison"
                      ? "La saison de baignade n'a pas encore officiellement débuté dans cette commune."
                      : data?.baignades?.indice?.label === "Pas de sites"
                      ? "Il n'y a pas de sites de baignade en eau de mer ou en eau douce recensés pour cette commune."
                      : data?.baignades?.indice?.summary["Interdiction"] > 0
                      ? "Pour plus de renseignements sur les interdictions de baignade, veuillez contacter la mairie ou l'Agence régionale de santé (ARS)."
                      : "Les données ne sont pas disponibles pour cette commune."}
                  </>
                ) : (
                  <>
                    <div>
                      <Chart
                        value={[
                          "Bons résultats",
                          "Résultats moyens",
                          "Mauvais résultats",
                          "Résultats mixtes",
                        ].indexOf(data?.baignades?.indice?.label)}
                        summary={[
                          data?.baignades?.indice?.summary["Bons résultats"],
                          data?.baignades?.indice?.summary["Résultats moyens"],
                          data?.baignades?.indice?.summary["Mauvais résultats"],
                        ]}
                        visible={!!data?.baignades?.indice}
                      />
                      <p className="text-center font-medium text-main">
                        {data?.baignades.indice?.label === "Pas de sites"
                          ? "Pas\u00A0de\u00A0site"
                          : data?.baignades.indice?.label}
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
                          __html: data?.baignades.advice.main,
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
              <ul className="mb-0 mt-2 w-full flex-col justify-between xl:mt-6">
                {plages
                  ?.filter((el, index) => {
                    if (seeMorePlages) return true;
                    return index < minimumPlagesInView;
                  })
                  .map((element) => {
                    const sampleValue = [
                      "Bon résultat",
                      "Résultat moyen",
                      "Mauvais résultat",
                    ].indexOf(element?.sample?.label);
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
                                    : "opacity-15 bg-main",
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
              {!!showSeeMorePlagesButton && (
                <button
                  onClick={() => {
                    setSeeMorePlages(!seeMorePlages);
                  }}
                  type="button"
                  className={[
                    "mx-auto mt-2 rounded-full px-6 py-2 text-xs font-light",
                    seeMorePlages ? "underline" : "bg-main text-white",
                  ].join(" ")}
                >
                  {!seeMorePlages
                    ? `Voir ${plages.length - minimumPlagesInView} site${
                        plages.length - minimumPlagesInView > 1 ? "s" : ""
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
          place={props.place}
        />
      </div>
      {!!data?.baignades?.validity?.start && (
        <p className="mb-0 text-xs font-light text-neutral-700 xl:mt-2">
          {data?.baignades?.indice?.label !== "Pas de sites" && (
            <>
              Saison ouverte du{" "}
              {new Date(data?.baignades?.validity.start).toLocaleDateString(
                "fr",
                {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                }
              )}{" "}
              au{" "}
              {new Date(data?.baignades?.validity.end).toLocaleDateString(
                "fr",
                {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                }
              )}{" "}
              dans {data?.baignades?.validity.area}.{" "}
            </>
          )}
          Données fournies par{" "}
          {data?.baignades?.sources && (
            <a
              href={data?.baignades?.sources[0].url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {data?.baignades?.sources[0].label}
            </a>
          )}
        </p>
      )}
    </article>
  );
}

function Chart({ visible, summary, value }) {
  const getStrokeColor = useCallback(
    (index) => {
      if (!visible) return "stroke-disabled";
      if (value < index) return "stroke-disabled";
      if (value < 2) return `stroke-baignades-${value}`;
      if (summary[index] > 0) return `stroke-baignades-${index}`;
      return "stroke-disabled";
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
            : null,
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
            : null,
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
            : null,
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
