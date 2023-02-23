import React from 'react'

import Share from 'components/layout/Share'

export default function ShareWrapper(props) {
  return (
    <Share
      small={props.small}
      place={props.place}
      messages={{
        mail: {
          simulator: {
            subject: `Tu veux connaître la qualité de l'environnement autour de toi ?`,
            body: `C'est facile grâce à Recosanté ! Tu peux choisir les indicateurs qui t'intéressent (qualité de l'air, risque d'allergie aux pollens, qualité de l'eau de boisson, etc.) et tu les reçois à la fréquence que tu choisis : tous les jours ou uniquement quand il y a une vigilance. Recosanté propose aussi des recommandations associées pour limiter les effets de l'environnement sur la santé.
Et en plus, c'est complètement gratuit. Pour t'inscrire : `,
          },
          result: {
            subject: `Tu veux connaître la qualité de l'environnement à ${props.place?.nom} ?`,
            body: `En t'inscrivant à Recosanté, tu peux recevoir les indicateurs qui t'intéressent (qualité de l'air, risque d'allergie aux pollens, qualité de l'eau de boisson, etc.) pour connaître la qualité de l'environnement à ${props.place?.nom} tous les matins ou en cas de vigilance. C'est gratuit et l'inscription est très simple : `,
          },
        },
        facebook: {
          simulator: {
            quote: `Tu veux savoir si la qualité de l'air est bonne autour de chez toi ou s'il y a beaucoup de pollens aujourd'hui ? Inscris toi à Recosanté et reçois, à la fréquence que tu veux, des informations sur la qualité de ton environnement et sur les gestes à adopter pour protéger ta santé`,
          },
          result: {
            quote: `Tu veux savoir si la qualité de l'air est bonne à ${props.place?.nom} ou s'il y a beaucoup de pollens aujourd'hui ? Inscris toi à Recosanté et reçois, à la fréquence que tu veux, des informations sur la qualité de ton environnement et sur les gestes à adopter pour protéger ta santé`,
          },
        },
        twitter: {
          simulator: {
            title: `Tu veux savoir si la qualité de l'air est bonne autour de chez toi ou s'il y a beaucoup de pollens aujourd'hui ? Inscris toi à Recosanté et reçois, à la fréquence que tu veux, des informations sur la qualité de ton environnement et sur les gestes à adopter pour protéger ta santé`,
          },
          result: {
            title: `Tu veux savoir si la qualité de l'air est bonne à ${props.place?.nom} ou s'il y a beaucoup de pollens aujourd'hui ? Inscris toi à Recosanté et reçois, à la fréquence que tu veux, des informations sur la qualité de ton environnement et sur les gestes à adopter pour protéger ta santé`,
          },
        },
        whatsapp: {
          simulator: {
            title: `Tu veux savoir si la qualité de l'air est bonne autour de chez toi ou s'il y a beaucoup de pollens aujourd'hui ? Inscris toi à Recosanté et reçois, à la fréquence que tu veux, des informations sur la qualité de ton environnement et sur les gestes à adopter pour protéger ta santé`,
          },
          result: {
            title: `Tu veux savoir si la qualité de l'air est bonne à ${props.place?.nom} ou s'il y a beaucoup de pollens aujourd'hui ? Inscris toi à Recosanté et reçois, à la fréquence que tu veux, des informations sur la qualité de ton environnement et sur les gestes à adopter pour protéger ta santé`,
          },
        },
      }}
    />
  )
}
