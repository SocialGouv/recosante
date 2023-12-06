import React from "react";

import Alerte from "./icons/Alerte";
import IndiceAtmo from "./icons/IndiceAtmo";
import IndiceUv from "./icons/IndiceUv";
import Quotidien from "./icons/Quotidien";
import Raep from "./icons/Raep";
import VigilanceMeteo from "./icons/VigilanceMeteo";

const indicateurs = {
  step: 1,
  name: "indicateurs",
  title: "Indicateurs",
  label: "Je choisis les indicateurs que je souhaite recevoir\u00A0:",
  options: [
    {
      value: "indice_atmo",
      label: `Qualité de l'air`,
      icon: <IndiceAtmo />,
    },
    {
      value: "raep",
      label: `Allergie aux pollens`,
      icon: <Raep />,
    },
    {
      value: "vigilance_meteo",
      label: `Vigilance météo`,
      icon: <VigilanceMeteo />,
    },
    {
      value: "indice_uv",
      label: `Indice UV`,
      icon: <IndiceUv />,
    },
  ],
  mandatory: true,
};

const indicateurs_frequence = {
  step: 2,
  name: "indicateurs_frequence",
  title: "Fréquence",
  label:
    "Je choisis à quelle fréquence je souhaite recevoir ces indicateurs\u00A0:",
  options: [
    {
      value: "alerte",
      label: `En cas de vigilance`,
      icon: <Alerte />,
      detail: {
        label:
          "Uniquement les jours où la situation nécessite d'adapter votre comportement.",
      },
    },
    {
      value: "quotidien",
      label: `Tous les jours`,
      icon: <Quotidien />,
      detail: {
        label:
          "Chaque matin, même lorsque la situation ne nécessite pas de vigilance particulière.",
      },
    },
  ],
  exclusive: true,
  mandatory: true,
};

const steps = {
  indicateurs,
  indicateurs_frequence,
  validation: {
    step: 4,
    name: "validation",
    title: "Validation",
    label:
      "Vos choix ont bien été pris en compte\u00A0! Merci de renseigner votre email ci-dessous afin de recevoir vos indicateurs. Vous pouvez également indiquer votre ville si vous le souhaitez.",
    mandatory: true,
  },
  // {
  //   name: "recommandations",
  //   title: "Recommandations",
  //   label:
  //     "Je choisis si je souhaite aussi recevoir des conseils adaptés à mes habitudes pour m’aider\u00A0à\u00A0agir\u00A0:",
  //   options: [
  //     {
  //       value: "oui",
  //       label: `M’abonner à la lettre d'information`,
  //       small: true,
  //       icon: <Newsletter />,
  //     },
  //     {
  //       value: "non",
  //       label: `Peut être plus tard`,
  //       icon: <NoNewsletter />,
  //     },
  //   ],
  //   exclusive: true,
  //   mandatory: true,
  // },
};

export default steps;
