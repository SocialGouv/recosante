import React from 'react'
import styled from 'styled-components'

import Section from 'components/base/Section'

const Big = styled.div`
  font-size: 1.125rem;

  ${(props) => props.theme.mq.small} {
    font-size: 1rem;
  }
`
export default function InfoPollen() {
  return (
    <Section id='alertepollen' small>
      <Section.Title>Le saviez-vous ?</Section.Title>
      <Big>
        Lorsque vous faites du sport, ou que vous pratiquez un effort physique
        quel qu'il soit, la quantité d'air inhalé est 7 à 8 fois plus importante
        qu'au repos. Vous êtes donc plus exposé à la pollution de l'air.
        <br />
        <br />
        Même si les bénéfices de l'activité physique pour la santé sont
        largement supérieurs aux risques induits par la pollution de l'air, il
        existe des conseils simples à mettre en œuvre au quotidien pour réduire
        votre exposition aux polluants atmosphériques lorsque vous faites du
        vélo, de la course à pied, de la randonnée, ou toute autre activité
        physique à l’extérieur.
      </Big>
    </Section>
  )
}
