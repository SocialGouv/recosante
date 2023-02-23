import React from 'react'
import styled from 'styled-components'
import { useStaticQuery, graphql } from 'gatsby'
import { MDXRenderer } from 'gatsby-plugin-mdx'

import Section from 'components/base/Section'
import Button from 'components/base/Button'

const StyledSection = styled(Section)`
  p {
    font-size: 1.25rem;
    text-align: center;

    ${(props) => props.theme.mq.small} {
      font-size: 1rem;
      text-align: left;
    }
  }
  h2 {
    text-align: center;

    ${(props) => props.theme.mq.small} {
      text-align: left;
    }
  }
`
const Title = styled.h1`
  font-size: 3rem;
  margin-bottom: 3rem;
  ${(props) => props.theme.mq.medium} {
    text-align: center;
  }
  ${(props) => props.theme.mq.small} {
    font-size: 1.5rem;
    text-align: left;
  }
`
const Left = styled.span`
  display: block;
`
const Right = styled.span`
  display: block;
  margin-bottom: 1rem;
  text-align: right;

  ${(props) => props.theme.mq.medium} {
    text-align: inherit;
  }
  ${(props) => props.theme.mq.small} {
    margin: 0;
  }
`
export default function What(props) {
  const data = useStaticQuery(
    graphql`
      query {
        mdx(slug: { eq: "medecins-introduction" }) {
          body
        }
      }
    `
  )

  return (
    <StyledSection first medium>
      <Title>
        <Left>
          <strong>Connaître</strong> son environnement,
        </Left>
        <Right>
          <strong>Agir</strong> pour sa santé
        </Right>
      </Title>
      <MDXRenderer>{(props.data || data).mdx.body}</MDXRenderer>
      <Button.Wrapper center>
        <Button to={'/kit_de_communication.zip'} hollow>
          Télecharger le kit de communication
        </Button>
        <Button
          hollow
          to='mailto:contact@recosante.beta.gouv.fr'
          onClick={() =>
            window._paq &&
            window._paq.push([
              'trackEvent',
              'Doctors',
              'Navigate',
              'Appointment',
            ])
          }
        >
          Prendre rendez-vous
        </Button>
        <Button
          to='/'
          onClick={() =>
            window._paq &&
            window._paq.push([
              'trackEvent',
              'Doctors',
              'Navigate',
              'Appointment',
            ])
          }
        >
          Découvrir Recosanté
        </Button>
      </Button.Wrapper>
    </StyledSection>
  )
}
