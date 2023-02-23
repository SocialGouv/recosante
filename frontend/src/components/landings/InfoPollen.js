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
        Il existe un lien entre les polluants présents dans l'air et les
        pollens. Une forte concentration de polluants peut aggraver les
        symptomes allergiques. C'est pourquoi Recosanté vous informe sur la
        qualité de l'air et sur le risque d'allergie aux pollens.
      </Big>
    </Section>
  )
}
