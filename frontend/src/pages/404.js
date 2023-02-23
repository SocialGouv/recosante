import React from 'react'
import styled from 'styled-components'

import Web from 'components/layout/Web'
import Section from 'components/base/Section'
import Button from 'components/base/Button'

const StyledSection = styled(Section)`
  display: flex;
  flex-direction: column;
  align-items: center;
`
export default function NotFound() {
  return (
    <Web title={'404'}>
      <StyledSection first small>
        <h1>404</h1>
        <p>Cette page n’existe pas (ou plus).</p>
        <Button to='/'>Retourner à l'accueil</Button>
      </StyledSection>
    </Web>
  )
}
