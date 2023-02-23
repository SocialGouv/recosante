import React from 'react'

import Jardinage from './icons/Jardinage'
import Bricolage from './icons/Bricolage'
import Menage from './icons/Menage'
import Sport from './icons/Sport'
import Enfant from './icons/Enfant'
import NoEnfant from './icons/NoEnfant'
import Bois from './icons/Bois'
import Chaudiere from './icons/Chaudiere'
import Appoint from './icons/Appoint'
import Velo from './icons/Velo'
import Tec from './icons/Tec'
import Voiture from './icons/Voiture'
import Chat from './icons/Chat'
import Chien from './icons/Chien'

const steps = [
  {
    name: 'activites',
    title: 'Activités',
    label:
      'Je renseigne les activités que je pratique au moins 2h par semaine.',
    options: [
      {
        value: 'jardinage',
        label: `Jardinage`,
        icon: <Jardinage />,
      },
      {
        value: 'bricolage',
        label: `Bricolage`,
        icon: <Bricolage />,
      },
      {
        value: 'menage',
        label: `Ménage`,
        icon: <Menage />,
      },
      {
        value: 'sport',
        label: `Sport`,
        icon: <Sport />,
      },
    ],
  },
  {
    name: 'enfants',
    title: 'Enfants',
    label: 'Je renseigne si je vis avec des enfants de moins de 6 ans.',
    options: [
      {
        value: 'oui',
        label: `Un ou plusieurs enfants`,
        icon: <Enfant />,
      },
      {
        value: 'non',
        label: `Pas<br/>d’enfant`,
        icon: <NoEnfant />,
      },
    ],
    exclusive: true,
  },
  {
    name: 'chauffage',
    title: 'Chauffage',
    label: 'Je renseigne le mode de chauffage de mon logement.',
    options: [
      {
        value: 'bois',
        label: `Cheminée, insert ou poêle à bois`,
        icon: <Bois />,
      },
      {
        value: 'chaudiere',
        label: `Chaudière au fioul ou au gaz`,
        icon: <Chaudiere />,
      },
      {
        value: 'appoint',
        label: `Chauffage mobile d’appoint au fioul`,
        icon: <Appoint />,
      },
    ],
  },
  {
    name: 'deplacement',
    title: 'Transport',
    label: 'Je renseigne les modes de transport que j’utilise.',
    options: [
      {
        value: 'velo',
        label: `Vélo`,
        icon: <Velo />,
      },
      {
        value: 'tec',
        label: `Transport en commun`,
        icon: <Tec />,
      },
      {
        value: 'voiture',
        label: `Voiture`,
        icon: <Voiture />,
      },
    ],
  },
  {
    name: 'animaux_domestiques',
    title: 'Animaux',
    label: 'Je renseigne si je vis avec des animaux.',
    options: [
      {
        value: 'chat',
        label: `Chat`,
        icon: <Chat />,
      },
      {
        value: 'chien',
        label: `Chien`,
        icon: <Chien />,
      },
    ],
  },
]

export default steps
