import React from 'react'
import styled from 'styled-components'
import { navigate } from 'gatsby'
import { useLocation } from '@reach/router'
import { formatPlaceUrl } from 'utils/formatPlaceUrl'
import Logos from './header/Logos'
import SearchBar from 'components/search/SearchBar'
import MobileSearch from './header/MobileSearch'

const Wrapper = styled.header`
  position: absolute;
  width: 100%;
  padding: 0 1rem;
  z-index: 1000;
  background: rgba(${(props) => props.theme.colors.backgroundAlpha}, 1);
`
const Content = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 73rem;
  margin: 0 auto;
`
const Search = styled.div`
  position: relative;

  ${(props) => props.theme.mq.small} {
    display: none;
  }
`
const StyledSearchBar = styled(SearchBar)`
  top: -1rem;
  left: auto;
  right: 0;
  font-size: 1rem;

  ${(props) => props.theme.mq.medium} {
    max-width: none;
    transform: none;
  }
`
export default function Header() {
  const { pathname } = useLocation()

  return (
    <Wrapper role='banner'>
      <Content>
        <Logos />
        {pathname !== '/' && (
          <Search>
            <StyledSearchBar
              placeholder='Entrez une ville'
              handlePlaceSelection={(place) => {
                navigate(formatPlaceUrl(place) + window.location.search)
              }}
            />
          </Search>
        )}
        <MobileSearch />
      </Content>
    </Wrapper>
  )
}
