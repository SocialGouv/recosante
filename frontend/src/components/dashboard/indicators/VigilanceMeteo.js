import React, { useContext, useCallback, useRef, useState } from "react";

import useIndicators from "hooks/useIndicators";
import Chart from "./vigilanceMeteo/Chart";
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

  console.log(data);

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
          {isError ? (
            <p>
              Nous ne sommes malheureusement pas en mesure d'afficher l'indice
              UV pour l'instant. Veuillez réessayer dans quelques instants.
            </p>
          ) : (
            <>
              <div className="flex items-start justify-center gap-x-4">
                {!data?.vigilance_meteo?.advice?.main ? (
                  <p>Les données ne sont pas disponibles pour cette commune.</p>
                ) : (
                  <>
                    <div>
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

// import React from "react";

// import MagicLink from "components/base/MagicLink";
// import Card from "components/misc/Card";
// import useIndicators from "hooks/useIndicators";
// import Chart from "./vigilanceMeteo/Chart";
// import Details from "./vigilanceMeteo/Details";

// export default function VigilanceMeteo(props) {
//   const { data, isError, isLoading } = useIndicators(
//     props.place.code,
//     props.date
//   );

//   return (
//     <Card columns={6}>
//       <Card.Content>
//         <Card.Header>
//           <Card.Info>
//             <Card.Title isLoading={isLoading} indicateur="vigilancemeteo">
//               Vigilance météo
//             </Card.Title>
//             <Card.Value isError={isError}>
//               {isError
//                 ? "Arf 🦖"
//                 : data &&
//                   (data.vigilance_meteo.indice?.label
//                     ? data.vigilance_meteo.indice.label
//                     : "Pas de données")}
//             </Card.Value>
//           </Card.Info>
//           <Chart data={data && !data.vigilance_meteo.error && data} />
//         </Card.Header>
//         <Card.Mobile indicateur="vigilancemeteo" place={props.place}>
//           <Card.Details>
//             <Details data={data && !data.vigilance_meteo.error && data} />
//           </Card.Details>
//           <Card.Recommandation
//             dangerouslySetInnerHTML={{
//               __html: isError
//                 ? `<p>Nous ne sommes malheureusement pas en mesure d'afficher la vigilance météo pour l'instant. Veuillez réessayer dans quelques instants.</p>`
//                 : data &&
//                   (data.vigilance_meteo.error
//                     ? `<p>Les données ne sont pas disponibles pour cette commune.</p>`
//                     : data.vigilance_meteo.advice &&
//                       data.vigilance_meteo.advice.main),
//             }}
//           />
//         </Card.Mobile>
//         <Card.SubscribeWrapper>
//           <Card.Subscribe indicateur="vigilance_meteo" place={props.place} />
//         </Card.SubscribeWrapper>
//       </Card.Content>
//       {data &&
//         data.vigilance_meteo &&
//         data.vigilance_meteo.validity &&
//         data.vigilance_meteo.sources && (
//           <Card.Source>
//             <p>
//               Prévision{" "}
//               {data.vigilance_meteo.validity.start ? (
//                 <>
//                   du{" "}
//                   {new Date(
//                     data.vigilance_meteo.validity.start
//                   ).toLocaleDateString("fr", {
//                     year: "numeric",
//                     month: "long",
//                     day: "numeric",
//                     hour: "2-digit",
//                   })}{" "}
//                   au{" "}
//                   {new Date(
//                     data.vigilance_meteo.validity.end
//                   ).toLocaleDateString("fr", {
//                     year: "numeric",
//                     month: "long",
//                     day: "numeric",
//                     hour: "2-digit",
//                   })}{" "}
//                   dans
//                 </>
//               ) : (
//                 <> dans </>
//               )}{" "}
//               {data.vigilance_meteo.validity.area}
//             </p>
//             <p>
//               Données fournies par{" "}
//               <MagicLink to={data.vigilance_meteo.sources[0].url}>
//                 {data.vigilance_meteo.sources[0].label}
//               </MagicLink>
//             </p>
//           </Card.Source>
//         )}
//     </Card>
//   );
// }
