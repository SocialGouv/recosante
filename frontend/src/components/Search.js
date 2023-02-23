import React from 'react'
import styled from 'styled-components'
import { navigate } from 'gatsby'
import { formatPlaceUrl } from 'utils/formatPlaceUrl'
import Section from 'components/base/Section'
import Background from 'components/misc/Background'
import Title from 'components/search/Title'
import Cloud from 'components/search/Cloud'
import SearchBar from 'components/search/SearchBar'
import Suggestions from './search/Suggestions'
import MagicLink from 'components/base/MagicLink'

const Wrapper = styled.div`
  position: relative;
  margin: 0 auto 10rem;
  padding: 0 0 6.5rem;

  ${(props) => props.theme.mq.medium} {
    min-height: ${(props) => (props.iframe ? '50rem' : '100vh')};
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0;
  }
  ${(props) => props.theme.mq.small} {
    margin-bottom: 5rem;
  }
`
const StyledSection = styled(Section)`
  position: relative;
  margin: 0 auto;
  ${(props) => props.theme.mq.medium} {
    padding: 0;
  }
`
const SearchBarSizer = styled.div`
  position: relative;
  height: 4.5rem;
  margin-bottom: 2.5rem;
`
const WidgetFooter = styled.div`
  position: absolute;
  bottom: 1rem;
  width: 100%;
  text-align: center;
`
const WidgetLink = styled(MagicLink)`
  font-size: 0.75rem;
  color: ${(props) => props.theme.colors.footer};
  text-decoration: none;
`

export default function Search(props) {
  return (
    <Wrapper iframe={props.iframe} className={props.className}>
      <Background />
      <StyledSection first>
        <Cloud />
        <Title />
        <SearchBarSizer>
          <SearchBar
            handlePlaceSelection={
              props.handlePlaceSelection ||
              ((place) => {
                navigate(formatPlaceUrl(place) + window.location.search)
              })
            }
          />
        </SearchBarSizer>
        <Suggestions />
      </StyledSection>
      {props.iframe && <WidgetFooter><WidgetLink to='https://recosante.beta.gouv.fr/donnees-personnelles'>En savoir plus sur la gestion de vos données personnelles</WidgetLink></WidgetFooter>}
    </Wrapper>
  )
}