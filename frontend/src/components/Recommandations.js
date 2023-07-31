import React, { useState } from "react";
import styled from "styled-components";

import Option from "components/subscription/question/Option";
import useRecommandations from "hooks/useRecommandations";
import IndiceAtmo from "utils/icons/IndiceAtmo";
import IndiceUv from "utils/icons/IndiceUv";
import Raep from "utils/icons/Raep";
import VigilanceMeteo from "utils/icons/VigilanceMeteo";
import Baignades from "../utils/icons/Baignades";
import Radon from "../utils/icons/Radon";
import Pollution from "../utils/icons/Pollution";

const Recommandation = styled.div`
  margin-bottom: 1rem;
  &:not(:last-child):after {
    content: " ";
    display: block;
    border-bottom: 2px solid transparent;
    border-image: linear-gradient(
      to right,
      #fff 0 25%,
      ${(props) => props.theme.colors.main},
      #fff 75% 100%
    );
    border-image-slice: 1;
  }
`;

export default function Recommandations(props) {
  const types = {
    episode_pollution: "Épisode de pollution",
    indice_atmo: "Qualité de l’air",
    pollens: "Risque d’allergie aux pollens",
    vigilance_meteo: "Vigilance météo",
    indice_uv: "Indice UV",
    baignades: "Qualité des eaux de baignade",
    radon: "Potentiel Radon",
  };
  let options = [];
  const icons = {
    indice_atmo: <IndiceAtmo />,
    pollens: <Raep />,
    vigilance_meteo: <VigilanceMeteo />,
    indice_uv: <IndiceUv />,
    baignades: <Baignades />,
    radon: <Radon />,
    episode_pollution: <Pollution />,
    // episode_pollution: <svg className="h-0 w-12" />,
  };
  for (const type of Object.keys(types)) {
    options.push({
      value: type,
      label: types[type],
      icon: icons[type],
    });
  }
  const { data } = useRecommandations();
  const groupBy = (objectArray, property) => {
    return objectArray.reduce((acc, obj) => {
      const key = obj[property];
      acc[key] ??= [];
      acc[key].push(obj);
      return acc;
    }, {});
  };
  let recommandations = {};
  const recommandationsByType = groupBy(data || props.recommandations, "type");
  const recommandationsOzone = (ozone) =>
    recommandationsByType["episode_pollution"]?.filter(
      (r) => r.ozone === ozone
    );
  recommandations["episode_pollution"] = {
    ozone: recommandationsOzone(true),
    pas_ozone: recommandationsOzone(false),
  };
  const compareCategories = (c1, c2) => (c1.categorie < c2.categorie ? 1 : -1);
  const recommandationsQa = (qa) =>
    recommandationsByType["indice_atmo"]
      ?.filter((r) => r[qa] === true)
      .sort(compareCategories);
  recommandations["indice_atmo"] = {
    qa_bonne: recommandationsQa("qa_bonne"),
    qa_mauvaise: recommandationsQa("qa_mauvaise"),
    qa_evenement: recommandationsQa("qa_evenement"),
  };
  const recommandationsMinRaep = (min_raep) =>
    recommandationsByType["pollens"]?.filter((r) => r.min_raep === min_raep);
  recommandations["pollens"] = {
    raep_0: recommandationsMinRaep(0),
    "raep_1-3": recommandationsMinRaep(1),
    "raep_4-5": recommandationsMinRaep(4),
  };
  const comparePhenomenes = (p1, p2) =>
    p1.vigilance_phenomene_ids > p2.vigilance_phenomene_ids ? 1 : -1;
  const recommandationsVigilanceCouleur = (vigilance_couleur_id) =>
    recommandationsByType["vigilance_meteo"]
      ?.filter((r) => r.vigilance_couleur_ids?.includes(vigilance_couleur_id))
      .sort(comparePhenomenes);
  recommandations["vigilance_meteo"] = {
    vigilance_verte: recommandationsVigilanceCouleur(1),
    vigilance_jaune: recommandationsVigilanceCouleur(2),
    vigilance_orange: recommandationsVigilanceCouleur(3),
    vigilance_rouge: recommandationsVigilanceCouleur(4),
  };
  const recommandationsMinIndiceUV = (min_indice_uv) =>
    recommandationsByType["indice_uv"]?.filter(
      (r) => r.min_indice_uv === min_indice_uv
    );
  recommandations["indice_uv"] = {
    indice_uv_0: recommandationsMinIndiceUV(0),
    "indice_uv_1-2": recommandationsMinIndiceUV(1),
    "indice_uv_3-5": recommandationsMinIndiceUV(3),
    "indice_uv_6-7": recommandationsMinIndiceUV(6),
    "indice_uv_8-10": recommandationsMinIndiceUV(8),
    "indice_uv_11+": recommandationsMinIndiceUV(11),
  };
  recommandations["baignades"] = {
    tous: recommandationsByType["baignades"],
  };
  recommandations["radon"] = {
    tous: recommandationsByType["radon"],
  };
  const phenomenes = {
    1: "Vent violent",
    2: "Pluie-Inondation",
    3: "Orages",
    4: "Crues",
    5: "Neige-verglas",
    6: "Canicule",
    7: "Grand Froid",
    8: "Avalanches",
    9: "Vagues-Submersion",
  };
  const criteres = {
    ozone: "Pollution à l’ozone",
    pas_ozone:
      "Pollution au dioxyde d’azote, au dioxyde de soufre ou aux particules fines",
    qa_bonne: "Indice ATMO bon (1) ou moyen (2)",
    qa_mauvaise: "Indice ATMO de dégradé (3) à extrêmement mauvais (6)",
    qa_evenement: "Événement (7)",
    raep_0: "RAEP nul (0)",
    "raep_1-3": "RAEP très faible (1), faible (2) ou moyen (3)",
    "raep_4-5": "RAEP élevé (4) ou très élevé (5)",
    vigilance_verte: "Vigilance verte",
    vigilance_jaune: "Vigilance jaune",
    vigilance_orange: "Vigilance orange",
    vigilance_rouge: "Vigilance rouge",
    indice_uv_0: "Nul (UV 0)",
    "indice_uv_1-2": "Faible (de UV 1 à UV 2)",
    "indice_uv_3-5": "Modéré (de UV 3 à UV 5)",
    "indice_uv_6-7": "Fort (de UV 6 à UV 7)",
    "indice_uv_8-10": "Très fort (de UV 8 à UV 10)",
    "indice_uv_11+": "Extrême (UV 11 et plus)",
  };
  let uniqueCategories = {
    qa_bonne: [],
    qa_mauvaise: [],
  };
  const [filters, setFilters] = useState([]);
  return (
    <>
      <div className="relative my-8 flex flex-col items-stretch justify-start overflow-hidden md:flex-row">
        {options.map((option) => (
          <Option
            key={option.value}
            option={option}
            active={filters.includes(option.value)}
            onClick={() => {
              let newFilters = filters;
              if (filters.includes(option.value)) {
                if (filters.length > 1) {
                  newFilters = filters.filter(
                    (value) => value !== option.value
                  );
                }
              } else {
                newFilters = [...filters, option.value];
              }
              setFilters(newFilters);
            }}
          />
        ))}
      </div>
      {filters.map((t) => {
        return (
          <details open className="flex flex-col" id={t} key={t}>
            {recommandations[t] && (
              <>
                <summary>
                  <h2 className="mb-8 mr-auto inline-block rounded bg-main p-4 text-white">
                    {types[t]}
                  </h2>
                </summary>
                {Object.keys(recommandations[t]).map((c) => (
                  <section id={t + "-" + c} key={t + "-" + c}>
                    {criteres[c] && <h3 className="mb-6">{criteres[c]}</h3>}
                    {recommandations[t][c]?.map((r, i) => (
                      <React.Fragment key={t + "-" + c + "-" + i}>
                        {t === "indice_atmo" &&
                          (r.categorie || (r.categorie = "Toute catégorie")) &&
                          uniqueCategories[c] &&
                          !uniqueCategories[c].includes(r.categorie) &&
                          uniqueCategories[c].push(r.categorie) && (
                            <h4 className="mb-4 text-text">{r.categorie}</h4>
                          )}
                        {t === "vigilance_meteo" &&
                          phenomenes[r.vigilance_phenomene_ids] && (
                            <h4 className="mb-4 text-text">
                              {phenomenes[r.vigilance_phenomene_ids]}
                            </h4>
                          )}
                        <Recommandation
                          dangerouslySetInnerHTML={{
                            __html: r.recommandation,
                          }}
                        />
                      </React.Fragment>
                    ))}
                  </section>
                ))}
              </>
            )}
          </details>
        );
      })}
    </>
  );
}
