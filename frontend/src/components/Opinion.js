import React from 'react'
import styled from 'styled-components'
import { useLocation } from '@reach/router'

import { useAvis } from 'utils/api'
import Section from 'components/base/Section'

const Text = styled.p`
  ${(props) => props.theme.mq.small} {
    font-size: 1rem;
  }
`
export default function Opinion() {
  const location = useLocation()
  useAvis(location)

  return (
    <Section small first>
      <Section.Title>
        Votre avis a bien été
        <br />
        pris en compte
      </Section.Title>
      <Text>
        Merci pour votre contribution ! C'est grâce à vos retours que nous
        construisons un service utile !
      </Text>
    </Section>
  )
}
