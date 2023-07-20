import React, {
  useContext,
  useCallback,
  useRef,
  useState,
  useEffect,
} from "react";

import useIndicators from "hooks/useIndicators";
import ModalContext from "utils/ModalContext";
import SubscribeButton from "../SubscribeButton";

export default function Raep(props) {
  const { data, isError, isLoading } = useIndicators(
    props.place.code,
    props.date
  );

  const { setModal } = useContext(ModalContext);
  // advice
  const [showSeeMoreAdviceButton, setShowSeeMoreAdviceButton] = useState(false);
  const [seeMoreAdvice, setSeeMoreAdvice] = useState(false);
  // advice
  const [showSeeMoreAllergensButton, setShowSeeMoreAllergensButton] =
    useState(false);
  const [seeMoreAllergens, setSeeMoreAllergens] = useState(false);

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

  const allergens = data?.raep?.indice?.details
    .filter((allergen) => allergen.indice.value)
    .sort((a, b) => (a.indice.value > b.indice.value ? -1 : 1));

  const longestElementLabel = allergens?.reduce((longest, el) => {
    if (labels[el.label].length > longest.length) return labels[el.label];
    return longest;
  }, "");

  const minimumAllergensInView = 3;

  useEffect(() => {
    setShowSeeMoreAllergensButton(allergens?.length > minimumAllergensInView);
  }, [allergens?.length]);

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
          onClick={() => setModal("raep")}
        >
          <h2 className="m-0 basis-3/4 text-left text-base font-medium text-main">
            Risque d'allergies aux pollens
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
              Nous ne sommes malheureusement pas en mesure d'afficher le risque
              d'allergie aux pollens pour l'instant. Veuillez réessayer dans
              quelques instants.
            </p>
          ) : (
            <>
              <div className="flex items-start justify-center gap-x-4">
                {!data?.raep?.advice?.main ? (
                  <p>Les données ne sont pas disponibles pour cette commune.</p>
                ) : (
                  <>
                    <div>
                      <Chart
                        value={data.raep.indice?.value}
                        visible={!!data?.raep?.indice}
                      />
                      <p className="text-center font-medium text-main">
                        {data.raep.indice?.label}
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
                          __html: data.raep.advice.main,
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
                        value={element.indice.value}
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
                              {labels[element.label]}
                            </p>
                          </div>
                          <div
                            className="h-4 w-4 shrink basis-1/2 overflow-hidden rounded-full bg-main/10 transition-colors"
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
                        <div className="w-full border-main pb-1 xl:border-b">
                          <p className="mb-0  text-end text-xs font-light underline">
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
                    seeMoreAllergens ? "underline" : "bg-main text-white",
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
        <SubscribeButton place={props.place} indicator="raep" />
      </div>
      {!!data?.raep?.validity?.start && (
        <p className="mb-0 text-xs font-light text-neutral-700 xl:mt-2">
          Prévision pour le{" "}
          {new Date(data.raep.validity.start).toLocaleDateString("fr", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}{" "}
          dans {data.raep.validity.area}. Données fournies par{" "}
          {data.raep.sources && (
            <a
              href={data.raep.sources[0].url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {data.raep.sources[0].label}
            </a>
          )}
        </p>
      )}
    </article>
  );
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

function Chart({ value, visible }) {
  return (
    <svg
      className="mx-auto h-12 w-auto overflow-visible"
      aria-hidden={true}
      viewBox="0 0 77 111"
    >
      <circle
        style={{ transition: "opacity 1200ms 600ms, fill 400ms 600ms" }}
        className={visible && value > 0 ? `fill-raep-${value}` : "fill-main/10"}
        index={0}
        cx="23"
        cy="98"
        r="13"
      />
      <circle
        style={{ transition: "opacity 1200ms 900ms, fill 400ms 900ms" }}
        className={visible && value > 1 ? `fill-raep-${value}` : "fill-main/10"}
        index={1}
        cx="50"
        cy="78"
        r="12"
      />
      <circle
        style={{ transition: "opacity 1200ms 1200ms, fill 400ms 1200ms" }}
        className={visible && value > 2 ? `fill-raep-${value}` : "fill-main/10"}
        index={2}
        cx="16.5"
        cy="59.5"
        r="16.5"
      />
      <circle
        style={{ transition: "opacity 1200ms 1500ms, fill 400ms 1500ms" }}
        className={visible && value > 3 ? `fill-raep-${value}` : "fill-main/10"}
        index={3}
        cx="60.5"
        cy="45.5"
        r="16.5"
      />
      <circle
        style={{ transition: "opacity 1200ms 1800ms, fill 400ms 1800ms" }}
        className={visible && value > 4 ? `fill-raep-${value}` : "fill-main/10"}
        cx="25"
        cy="19"
        r="19"
      />
    </svg>
  );
}
