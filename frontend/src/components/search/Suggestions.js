import React from 'react'
import styled from 'styled-components'

import Button from 'components/base/Button'

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  max-width: 35rem;

  ${(props) => props.theme.mq.medium} {
    justify-content: center;
    margin: 0 auto;
  }
  ${(props) => props.theme.mq.small} {
    display: none;
  }
`
const StyledButton = styled(Button)`
  margin-right: 1rem;
  margin-bottom: 1rem;
  font-size: 1rem;
`
export default function Suggestions() {
  return (
    <Wrapper>
      <StyledButton hollow to='/place/75056/paris/'
        onClick={() => {
          window?._paq?.push(['trackEvent', 'Search', 'PlaceSuggestion', 'Paris'])
        }}
      >
        Paris
      </StyledButton>
      <StyledButton hollow to='/place/13055/marseille/'
        onClick={() => {
          window?._paq?.push(['trackEvent', 'Search', 'PlaceSuggestion', 'Marseille'])
        }}
      >
        Marseille
      </StyledButton>
      <StyledButton hollow to='/place/69123/lyon/'
        onClick={() => {
          window?._paq?.push(['trackEvent', 'Search', 'PlaceSuggestion', 'Lyon'])
        }}
      >
        Lyon
      </StyledButton>
      <StyledButton hollow to='/place/31555/toulouse/'
        onClick={() => {
          window?._paq?.push(['trackEvent', 'Search', 'PlaceSuggestion', 'Toulouse'])
        }}
      >
        Toulouse
      </StyledButton>
      <StyledButton hollow to='/place/06088/nice/'
        onClick={() => {
          window?._paq?.push(['trackEvent', 'Search', 'PlaceSuggestion', 'Nice'])
        }}
      >
        Nice
      </StyledButton>
      <StyledButton hollow to='/place/44109/nantes/'
        onClick={() => {
          window?._paq?.push(['trackEvent', 'Search', 'PlaceSuggestion', 'Nantes'])
        }}
      >
        Nantes
      </StyledButton>
      <StyledButton hollow to='/place/34172/montpellier/'
        onClick={() => {
          window?._paq?.push(['trackEvent', 'Search', 'PlaceSuggestion', 'Montpellier'])
        }}
      >
        Montpellier
      </StyledButton>
      <StyledButton hollow to='/place/67482/strasbourg/'
        onClick={() => {
          window?._paq?.push(['trackEvent', 'Search', 'PlaceSuggestion', 'Strasbourg'])
        }}
      >
        Strasbourg
      </StyledButton>
    </Wrapper>
  )
}
