import React from 'react'
import styled from 'styled-components'

import Button from 'components/base/Button'

const Wrapper = styled.ul`
  display: flex;
  flex-wrap: wrap;
  max-width: 35rem;
  margin: 0;
  padding: 0;

  ${(props) => props.theme.mq.medium} {
    justify-content: center;
    margin: 0 auto;
  }
  ${(props) => props.theme.mq.small} {
    display: none;
  }

  li {
    list-style: none;
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
      <li>
        <StyledButton hollow to='/place/75056/paris/'
          onClick={() => {
            window?._paq?.push(['trackEvent', 'Search', 'PlaceSuggestion', 'Paris'])
          }}
        >
          Paris
        </StyledButton>
      </li>
      <li>
        <StyledButton hollow to='/place/13055/marseille/'
          onClick={() => {
            window?._paq?.push(['trackEvent', 'Search', 'PlaceSuggestion', 'Marseille'])
          }}
        >
          Marseille
        </StyledButton>
      </li>
      <li>
        <StyledButton hollow to='/place/69123/lyon/'
          onClick={() => {
            window?._paq?.push(['trackEvent', 'Search', 'PlaceSuggestion', 'Lyon'])
          }}
        >
          Lyon
        </StyledButton>
      </li>
      <li>
        <StyledButton hollow to='/place/31555/toulouse/'
          onClick={() => {
            window?._paq?.push(['trackEvent', 'Search', 'PlaceSuggestion', 'Toulouse'])
          }}
        >
          Toulouse
        </StyledButton>
      </li>
      <li>
        <StyledButton hollow to='/place/06088/nice/'
          onClick={() => {
            window?._paq?.push(['trackEvent', 'Search', 'PlaceSuggestion', 'Nice'])
          }}
        >
          Nice
        </StyledButton>
      </li>
      <li>
        <StyledButton hollow to='/place/44109/nantes/'
          onClick={() => {
            window?._paq?.push(['trackEvent', 'Search', 'PlaceSuggestion', 'Nantes'])
          }}
        >
          Nantes
        </StyledButton>
      </li>
      <li>
        <StyledButton hollow to='/place/34172/montpellier/'
          onClick={() => {
            window?._paq?.push(['trackEvent', 'Search', 'PlaceSuggestion', 'Montpellier'])
          }}
        >
          Montpellier
        </StyledButton>
      </li>
      <li>
        <StyledButton hollow to='/place/67482/strasbourg/'
          onClick={() => {
            window?._paq?.push(['trackEvent', 'Search', 'PlaceSuggestion', 'Strasbourg'])
          }}
        >
          Strasbourg
        </StyledButton>
      </li>
    </Wrapper>
  )
}
