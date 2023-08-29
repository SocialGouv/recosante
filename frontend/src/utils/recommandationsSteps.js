import React from "react";

import Appoint from "./icons/Appoint";
import Bois from "./icons/Bois";
import Bricolage from "./icons/Bricolage";
import Chat from "./icons/Chat";
import Chaudiere from "./icons/Chaudiere";
import Chien from "./icons/Chien";
import Enfant from "./icons/Enfant";
import Jardinage from "./icons/Jardinage";
import Menage from "./icons/Menage";
import NoEnfant from "./icons/NoEnfant";
import Sport from "./icons/Sport";
import Tec from "./icons/Tec";
import Velo from "./icons/Velo";
import Voiture from "./icons/Voiture";

const steps = {
  activites: {
    step: 1,
    name: "activites",
    title: "Activités",
    label:
      "Je renseigne les activités que je pratique au moins 2h par semaine\u00a0:",
    options: [
      {
        value: "jardinage",
        label: `Jardinage`,
        icon: <Jardinage />,
      },
      {
        value: "bricolage",
        label: `Bricolage`,
        icon: <Bricolage />,
      },
      {
        value: "menage",
        label: `Ménage`,
        icon: <Menage />,
      },
      {
        value: "sport",
        label: `Sport`,
        icon: <Sport />,
      },
    ],
  },
  enfants: {
    step: 2,
    name: "enfants",
    title: "Enfants",
    label: "Je renseigne si je vis avec des enfants de moins de 6 ans\u00a0:",
    options: [
      {
        value: "oui",
        label: `Un ou plusieurs enfants`,
        icon: <Enfant />,
      },
      {
        value: "non",
        label: `Pas<br />d’enfant`,
        icon: <NoEnfant />,
      },
    ],
    exclusive: true,
  },
  chauffage: {
    step: 3,
    name: "chauffage",
    title: "Chauffage",
    label: "Je renseigne le mode de chauffage de mon logement\u00a0:",
    options: [
      {
        value: "bois",
        label: `Cheminée, insert ou poêle à bois`,
        icon: <Bois />,
      },
      {
        value: "chaudiere",
        label: `Chaudière au fioul ou au gaz`,
        icon: <Chaudiere />,
      },
      {
        value: "appoint",
        label: `Chauffage mobile d’appoint au fioul`,
        icon: <Appoint />,
      },
    ],
  },
  deplacement: {
    step: 4,
    name: "deplacement",
    title: "Transport",
    label: "Je renseigne les modes de transport que j’utilise\u00a0:",
    options: [
      {
        value: "velo",
        label: `Vélo`,
        icon: <Velo />,
      },
      {
        value: "tec",
        label: `Transport en commun`,
        icon: <Tec />,
      },
      {
        value: "voiture",
        label: `Voiture`,
        icon: <Voiture />,
      },
    ],
  },
  animaux_domestiques: {
    step: 5,
    name: "animaux_domestiques",
    title: "Animaux",
    label: "Je renseigne si je vis avec des animaux\u00a0:",
    options: [
      {
        value: "chat",
        label: `Chat`,
        icon: <Chat />,
      },
      {
        value: "chien",
        label: `Chien`,
        icon: <Chien />,
      },
    ],
  },
};

export default steps;
