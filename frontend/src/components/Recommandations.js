import React, { useState } from 'react'
import styled from 'styled-components'

import useRecommandations from 'hooks/useRecommandations'
import Option from 'components/subscription/question/Option'
import IndiceAtmo from 'utils/icons/IndiceAtmo'
import Raep from 'utils/icons/Raep'
import IndiceUv from 'utils/icons/IndiceUv'
import VigilanceMeteo from 'utils/icons/VigilanceMeteo'

const Options = styled.div`
  position: relative;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  margin: 2rem auto;

  ${(props) => props.theme.mq.small} {
    flex-direction: column;
    justify-content: flex-start;
    align-items: stretch;
  }
`
const NoIcon = styled.svg`
  width: 48px;
  height: 0rem;
`
const Type = styled.h2`
  margin-bottom: 2rem;
`
const Critere = styled.h3`
  margin-bottom: 1.5rem;
`
const SousCritere = styled.h4`
  margin-bottom: 1rem;
  color: ${(props) => props.theme.colors.text};
`
const Recommandation = styled.div`
  margin-bottom: 1rem;
  &:not(:last-child):after {
    content: " ";
    display: block;
    border-bottom: 2px solid transparent;
    border-image: linear-gradient(to right, #fff 0 25%, ${(props) => props.theme.colors.main}, #fff 75% 100%);
    border-image-slice: 1;
  }
`

export default function Recommandations(props) {
  const types = {
    "episode_pollution": "Épisode de pollution",
    "indice_atmo": "Qualité de l’air",
    "pollens": "Risque d’allergie aux pollens",
    "vigilance_meteo": "Vigilance météo",
    "indice_uv": "Indice UV",
    "baignades": "Qualité des eaux de baignade",
    "radon": "Potentiel Radon"
  }
  let options = []
  Object.keys(types).map((t) => (
    options.push({
      value: t,
      label: types[t],
      icon: (t === 'indice_atmo') ? <IndiceAtmo /> : (t === 'pollens') ? <Raep /> : (t === 'vigilance_meteo') ? <VigilanceMeteo /> : (t === 'indice_uv') ? <IndiceUv /> : <NoIcon />
    })
  ))
  const { data } = useRecommandations()
  const groupBy = (objectArray, property) => {
    return objectArray.reduce((acc, obj) => {
      const key = obj[property];
      acc[key] ??= [];
      acc[key].push(obj);
      return acc;
    }, {});
  }
  let recommandations = {}
  const recommandationsByType = groupBy(data || props.recommandations, 'type')
  const recommandationsOzone = (ozone) => recommandationsByType["episode_pollution"]?.filter(r => r.ozone === ozone)
  recommandations["episode_pollution"] = {
    "ozone": recommandationsOzone(true),
    "pas_ozone": recommandationsOzone(false)
  }
  const compareCategories = (c1, c2) => (c1.categorie < c2.categorie ? 1 : -1);
  const recommandationsQa = (qa) => recommandationsByType["indice_atmo"]?.filter(r => r[qa] === true).sort(compareCategories);
  recommandations["indice_atmo"] = {
    "qa_bonne": recommandationsQa("qa_bonne"),
    "qa_mauvaise": recommandationsQa("qa_mauvaise"),
    "qa_evenement": recommandationsQa("qa_evenement"),
  }
  const recommandationsMinRaep = (min_raep) => recommandationsByType["pollens"]?.filter(r => r.min_raep === min_raep);
  recommandations["pollens"] = {
    "raep_0": recommandationsMinRaep(0),
    "raep_1-3": recommandationsMinRaep(1),
    "raep_4-5": recommandationsMinRaep(4)
  }
  const comparePhenomenes = (p1, p2) => (p1.vigilance_phenomene_ids > p2.vigilance_phenomene_ids ? 1 : -1);
  const recommandationsVigilanceCouleur = (vigilance_couleur_id) => recommandationsByType["vigilance_meteo"]?.filter(r => r.vigilance_couleur_ids?.includes(vigilance_couleur_id)).sort(comparePhenomenes);
  recommandations["vigilance_meteo"] = {
    "vigilance_verte": recommandationsVigilanceCouleur(1),
    "vigilance_jaune": recommandationsVigilanceCouleur(2),
    "vigilance_orange": recommandationsVigilanceCouleur(3),
    "vigilance_rouge": recommandationsVigilanceCouleur(4)
  }
  const recommandationsMinIndiceUV = (min_indice_uv) => recommandationsByType["indice_uv"]?.filter(r => r.min_indice_uv === min_indice_uv);
  recommandations["indice_uv"] = {
    "indice_uv_0": recommandationsMinIndiceUV(0),
    "indice_uv_1-2": recommandationsMinIndiceUV(1),
    "indice_uv_3-5": recommandationsMinIndiceUV(3),
    "indice_uv_6-7": recommandationsMinIndiceUV(6),
    "indice_uv_8-10": recommandationsMinIndiceUV(8),
    "indice_uv_11+": recommandationsMinIndiceUV(11)
  }
  recommandations["baignades"] = {
    "tous": recommandationsByType["baignades"],
  }
  recommandations["radon"] = {
    "tous": recommandationsByType["radon"],
  }
  const phenomenes = {
    1: "Vent violent",
    2: "Pluie-Inondation",
    3: "Orages",
    4: "Crues",
    5: "Neige-verglas",
    6: "Canicule",
    7: "Grand Froid",
    8: "Avalanches",
    9: "Vagues-Submersion"
  }
  const criteres = {
    "ozone": "Pollution à l’ozone",
    "pas_ozone": "Pollution au dioxyde d’azote, au dioxyde de soufre ou aux particules fines",
    "qa_bonne": "Indice ATMO bon (1) ou moyen (2)",
    "qa_mauvaise": "Indice ATMO de dégradé (3) à extrêmement mauvais (6)",
    "qa_evenement": "Événement (7)",
    "raep_0": "RAEP nul (0)",
    "raep_1-3": "RAEP très faible (1), faible (2) ou moyen (3)",
    "raep_4-5": "RAEP élevé (4) ou très élevé (5)",
    "vigilance_verte": "Vigilance verte",
    "vigilance_jaune": "Vigilance jaune",
    "vigilance_orange": "Vigilance orange",
    "vigilance_rouge": "Vigilance rouge",
    "indice_uv_0": "Nul (UV 0)",
    "indice_uv_1-2": "Faible (de UV 1 à UV 2)",
    "indice_uv_3-5": "Modéré (de UV 3 à UV 5)",
    "indice_uv_6-7": "Fort (de UV 6 à UV 7)",
    "indice_uv_8-10": "Très fort (de UV 8 à UV 10)",
    "indice_uv_11+": "Extrême (UV 11 et plus)"
  }
  let uniqueCategories = {
    "qa_bonne": [],
    "qa_mauvaise": []
  }
  const [filters, setFilters] = useState(Object.keys(types))
  return (
    <>
      <Options>
        {options.map((option) => (
          <Option
            key={option.value}
            option={option}
            active={
              filters.includes(option.value)
            }
            onClick={() => {
              let newFilters = filters
              if (filters.includes(option.value)) {
                if (filters.length > 1) {
                  newFilters = filters.filter(
                    (value) => value !== option.value
                  )
                }
              } else {
                newFilters = [...filters, option.value]
              }
              setFilters(newFilters)
            }}
          />
        ))}
      </Options>
      {
        Object.keys(types).map((t) => (
          <section id={t} key={t}>
            {recommandations[t] && (
              filters.includes(t) &&
              <>
                <Type>{types[t]}</Type>
                {Object.keys(recommandations[t]).map((c) => (
                  <section id={t + '-' + c} key={t + '-' + c}>
                    {criteres[c] && <Critere>{criteres[c]}</Critere>}
                    {recommandations[t][c]?.map((r, i) => (
                      <React.Fragment key={t + '-' + c + '-' + i}>
                        {t === "indice_atmo" &&
                          (r.categorie || (r.categorie = "Toute catégorie")) && uniqueCategories[c] && !uniqueCategories[c].includes(r.categorie) && uniqueCategories[c].push(r.categorie) &&
                          <SousCritere>{r.categorie}</SousCritere>}
                        {t === "vigilance_meteo" && phenomenes[r.vigilance_phenomene_ids] && <SousCritere>{phenomenes[r.vigilance_phenomene_ids]}</SousCritere>}
                        <Recommandation
                          dangerouslySetInnerHTML={{
                            __html: r.recommandation
                          }} />
                      </React.Fragment>
                    ))
                    }
                  </section>
                ))}
              </>
            )}
          </section>
        ))
      }
    </>
  )
}
