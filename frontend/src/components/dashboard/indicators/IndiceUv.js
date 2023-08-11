import React, { useContext, useCallback, useRef, useState } from "react";

import useIndicators from "hooks/useIndicators";
import ModalContext from "utils/ModalContext";
import SubscribeButton from "../SubscribeButton";

const maxValue = 11;
export default function IndiceUv(props) {
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
    <article className="relative">
      <div className="relative w-full overflow-hidden rounded-t-lg bg-white drop-shadow-xl">
        <button
          type="button"
          className={[
            "flex w-full cursor-pointer items-baseline justify-between bg-main/5 px-2 py-4 text-base font-medium text-main",
            "after:absolute after:left-0 after:top-0 after:h-full after:w-full after:scale-x-0 after:transform after:bg-background after:opacity-70",
            isLoading ? "after:animate-fetching" : "",
          ].join(" ")}
          onClick={() => setModal("indice_uv")}
        >
          <h2 className="m-0 basis-3/4 text-left text-base font-medium text-main">
            Indice UV (de 1 à {maxValue})
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
            <div className="flex flex-col items-center justify-center gap-x-4 md:min-h-[15rem]">
              <Chart />
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
                {!data?.indice_uv?.advice?.main ? (
                  <p>Les données ne sont pas disponibles pour cette commune.</p>
                ) : (
                  <>
                    <div className="flex flex-col items-center">
                      <Chart value={data.indice_uv.indice?.value} />
                      <p className="text-center font-medium text-main">
                        {data.indice_uv.indice?.label}
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
                          __html: data.indice_uv.advice.main,
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
                    onClick={() => setModal("indice_uv")}
                  >
                    <div
                      className="h-4 w-4 rounded-sm bg-indiceuv-1 transition-colors"
                      aria-hidden
                    />
                    0 à 2
                  </button>
                </li>
                <li className="flex shrink-0 grow basis-0">
                  <button
                    type="button"
                    className="relative flex grow cursor-pointer flex-col items-center gap-y-2 underline transition-colors"
                    onClick={() => setModal("indice_uv")}
                  >
                    <div
                      className="h-4 w-4 rounded-sm bg-indiceuv-4 transition-colors"
                      aria-hidden
                    />
                    3 à 5
                  </button>
                </li>
                <li className="flex shrink-0 grow basis-0">
                  <button
                    type="button"
                    className="relative flex grow cursor-pointer flex-col items-center gap-y-2 underline transition-colors"
                    onClick={() => setModal("indice_uv")}
                  >
                    <div
                      className="h-4 w-4 rounded-sm bg-indiceuv-6 transition-colors"
                      aria-hidden
                    />
                    6 à 7
                  </button>
                </li>
                <li className="flex shrink-0 grow basis-0">
                  <button
                    type="button"
                    className="relative flex grow cursor-pointer flex-col items-center gap-y-2 underline transition-colors"
                    onClick={() => setModal("indice_uv")}
                  >
                    <div
                      className="h-4 w-4 rounded-sm bg-indiceuv-9 transition-colors"
                      aria-hidden
                    />
                    8 à 10
                  </button>
                </li>
                <li className="flex shrink-0 grow basis-0">
                  <button
                    type="button"
                    className="relative flex grow cursor-pointer flex-col items-center gap-y-2 underline transition-colors"
                    onClick={() => setModal("indice_uv")}
                  >
                    <div
                      className="h-4 w-4 rounded-sm bg-indiceuv-11 transition-colors"
                      aria-hidden
                    />
                    11
                  </button>
                </li>
              </ul>
            </>
          )}
        </div>
        <SubscribeButton place={props.place} indicator="indice_uv" />
      </div>
      {!!data?.indice_uv?.validity?.start && (
        <p className="mb-0 text-xs font-light text-neutral-700 xl:mt-2">
          Prévision pour le{" "}
          {new Date(data.indice_uv.validity.start).toLocaleDateString("fr", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}{" "}
          dans {data.indice_uv.validity.area}. Données fournies par{" "}
          {data.indice_uv.sources && (
            <a
              href={data.indice_uv.sources[0].url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {data.indice_uv.sources[0].label}
            </a>
          )}
        </p>
      )}
    </article>
  );
}

function Chart({ value }) {
  value = Math.min(value, maxValue);
  return (
    <svg
      className="h-16 w-auto -rotate-90 overflow-visible"
      aria-hidden={true}
      viewBox="0 0 48 48"
    >
      <circle cx="24" cy="24" r="12" className="fill-main/10" />
      <circle
        className={[`stroke-indiceuv-${value}`, "stroke-[12]"].join(" ")}
        style={{
          strokeDashoffset: 2 * Math.PI * 6 * (1 - value / maxValue),
          strokeDasharray: 2 * Math.PI * 6,
          strokeWidth: 2 * 6,
          transition: `stroke-dashoffset ${value > 0 ? 3 : 0}s ease-in-out`,
        }}
        cx="24"
        cy="24"
        r="6"
        fill="none"
      />
      <path // 4
        className={[
          "stroke-[3] [stroke-linecap:round] [stroke-linejoin:round]",
          value > 3
            ? `stroke-indiceuv-${value} transition-all delay-[2000ms] duration-1000`
            : "stroke-main/10",
        ].join(" ")}
        d="M15.6553 38.4141L13.0001 43.0529"
      />
      <path // 10
        className={[
          "stroke-[3] [stroke-linecap:round] [stroke-linejoin:round]",
          value > 9
            ? `stroke-indiceuv-${value} transition-all delay-[2000ms] duration-1000`
            : "stroke-main/10",
        ].join(" ")}
        d="M35 4.94727L32.3448 9.58602"
      />
      <path // 5
        className={[
          "stroke-[3] [stroke-linecap:round] [stroke-linejoin:round]",
          value > 4
            ? `stroke-indiceuv-${value} transition-all delay-[2000ms] duration-1000`
            : "stroke-main/10",
        ].join(" ")}
        d="M9.58691 32.3447L4.94815 34.9999"
      />
      <path // 11
        className={[
          "stroke-[3] [stroke-linecap:round] [stroke-linejoin:round]",
          value > 10
            ? `stroke-indiceuv-${value} transition-all delay-[2000ms] duration-1000`
            : "stroke-main/10",
        ].join(" ")}
        d="M43.0527 13L38.414 15.6552"
      />
      <path // 0
        className={[
          "stroke-[3] [stroke-linecap:round] [stroke-linejoin:round]",
          value > 0
            ? `stroke-indiceuv-${value} transition-all delay-[2000ms] duration-1000`
            : "stroke-main/10",
        ].join(" ")}
        d="M46 24L40.6896 24"
      />
      <path // 6
        className={[
          "stroke-[3] [stroke-linecap:round] [stroke-linejoin:round]",
          value > 5
            ? `stroke-indiceuv-${value} transition-all delay-[2000ms] duration-1000`
            : "stroke-main/10",
        ].join(" ")}
        d="M7.31055 24H2.00019"
      />
      <path // 1
        className={[
          "stroke-[3] [stroke-linecap:round] [stroke-linejoin:round]",
          value > 0
            ? `stroke-indiceuv-${value} transition-all delay-[2000ms] duration-1000`
            : "stroke-main/10",
        ].join(" ")}
        d="M43.0527 35L38.414 32.3448"
      />
      <path // 7
        className={[
          "stroke-[3] [stroke-linecap:round] [stroke-linejoin:round]",
          value > 6
            ? `stroke-indiceuv-${value} transition-all delay-[2000ms] duration-1000`
            : "stroke-main/10",
        ].join(" ")}
        d="M9.58691 15.6548L4.94815 12.9996"
      />
      <path // 2
        className={[
          "stroke-[3] [stroke-linecap:round] [stroke-linejoin:round]",
          value > 1
            ? `stroke-indiceuv-${value} transition-all delay-[2000ms] duration-1000`
            : "stroke-main/10",
        ].join(" ")}
        d="M35 43.0527L32.3448 38.414"
      />
      <path // 8
        className={[
          "stroke-[3] [stroke-linecap:round] [stroke-linejoin:round]",
          value > 7
            ? `stroke-indiceuv-${value} transition-all delay-[2000ms] duration-1000`
            : "stroke-main/10",
        ].join(" ")}
        d="M15.6553 9.58594L13.0001 4.94717"
      />
      <path // 9
        className={[
          "stroke-[3] [stroke-linecap:round] [stroke-linejoin:round]",
          value > 8
            ? `stroke-indiceuv-${value} transition-all delay-[2000ms] duration-1000`
            : "stroke-main/10",
        ].join(" ")}
        d="M24 7.31055L24 2.00019"
      />
      <path // 3
        className={[
          "stroke-[3] [stroke-linecap:round] [stroke-linejoin:round]",
          value > 2
            ? `stroke-indiceuv-${value} transition-all delay-[2000ms] duration-1000`
            : "stroke-main/10",
        ].join(" ")}
        d="M24 46V40.6896"
      />
    </svg>
  );
}
