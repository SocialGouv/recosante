import React from 'react'

import IndiceAtmo from './icons/IndiceAtmo'
import Raep from './icons/Raep'
import IndiceUv from './icons/IndiceUv'
import VigilanceMeteo from './icons/VigilanceMeteo'
import Quotidien from './icons/Quotidien'
import Alerte from './icons/Alerte'
import Email from './icons/Email'
import Notification from './icons/Notification'
import Newsletter from './icons/Newsletter'
import NoNewsletter from './icons/NoNewsletter'

const steps = [
  {
    name: 'indicateurs',
    title: 'Indicateurs',
    label: 'Je choisis les indicateurs que je souhaite recevoir.',
    options: [
      {
        value: 'indice_atmo',
        label: `Indice de qualité de l'air`,
        icon: <IndiceAtmo />,
      },
      {
        value: 'raep',
        label: `Risque d'allergie aux pollens`,
        icon: <Raep />,
      },
      {
        value: 'vigilance_meteo',
        label: `Vigilance météorologique`,
        icon: <VigilanceMeteo />,
      },
      {
        value: 'indice_uv',
        label: `Indice UV`,
        icon: <IndiceUv />,
      },
    ],
    mandatory: true,
  },
  {
    name: 'indicateurs_frequence',
    title: 'Fréquence',
    label:
      'Je choisis à quelle fréquence je souhaite recevoir ces indicateurs.',
    options: [
      {
        value: 'alerte',
        label: `En cas<br />de vigilance`,
        icon: <Alerte />,
        detail: {
          label: `Uniquement les jours où la situation nécessite d'adapter votre comportement.`,
        },
      },
      {
        value: 'quotidien',
        label: `Tous les<br />jours`,
        icon: <Quotidien />,
        detail: {
          label:
            'Chaque matin, même lorsque la situation ne nécessite pas de vigilance particulière.',
        },
      },
    ],
    exclusive: true,
    mandatory: true,
  },
  {
    name: 'indicateurs_media',
    title: 'Média',
    label: 'Je choisis de quelle façon je souhaite recevoir ces indicateurs.',
    options: [
      {
        value: 'mail',
        label: `Email`,
        icon: <Email />,
      },
      {
        value: 'notifications_web',
        label: `Notification`,
        icon: <Notification />,
        detail: {
          label: `Qu'est ce que c'est ?`,
          modal: 'notifications',
        },
      },
    ],
    exclusive: true,
    mandatory: true,
  },
  {
    name: 'recommandations',
    title: 'Recommandations',
    label:
      'Je choisis si je souhaite aussi recevoir des conseils adaptés à mes habitudes pour m’aider&#160;à&#160;agir.',
    options: [
      {
        value: 'oui',
        label: `M’abonner à la lettre d'information`,
        small: true,
        icon: <Newsletter />,
      },
      {
        value: 'non',
        label: `Peut être<br />plus tard`,
        icon: <NoNewsletter />,
      },
    ],
    exclusive: true,
    mandatory: true,
  },
]

export default steps
