import React from 'react'
import styled from 'styled-components'

import Logos from './header/Logos'
import Partners from './footer/Partners'
import Links from './footer/Links'
import MobileButtons from './footer/MobileButtons'

const Wrapper = styled.footer`
  position: relative;
  padding-top: 2rem;
  background-color: ${(props) => props.theme.colors.background};
  border-top: 2px solid ${(props) => props.theme.colors.main};
`
const Content = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  max-width: 75em;
  margin: 0 auto 2rem;
  padding: 0 1rem;

  ${(props) => props.theme.mq.medium} {
    flex-direction: column;
  }
`
const Right = styled.div`
  max-width: 42.75rem;
`
const Description = styled.p`
  ${(props) => props.theme.mq.medium} {
    margin-top: 1rem;
  }
`

export default function Footer() {
  return (
    <Wrapper>
      <Content>
        <MobileButtons iframe={false} />
        <Logos />
        <Right>
          <Description>
            Recosanté est un service public qui vous aide à connaître votre
            environnement et à agir pour protéger votre santé.
          </Description>
          <Partners />
        </Right>
      </Content>
      <Links />
    </Wrapper>
  )
}
