import React from 'react'
import styled from 'styled-components'

import MagicLink from 'components/base/MagicLink'

const Wrapper = styled.div`
  border-top: 1px solid ${(props) => props.theme.colors.footer};
`
const ItemWrapper = styled.ul`
  display: flex;
  flex-wrap: wrap;
  max-width: 75em;
  margin: 0 auto;
  padding: 1rem 0.5rem;
  list-style-type: none;
`
const Item = styled.li`
  margin-right: 1rem;
  padding-right: 1rem;
  border-right: 1px solid ${(props) => props.theme.colors.input};
  &:last-child {
    margin: 0;
    padding: 0;
    border: none;
  }

  ${(props) => props.theme.mq.small} {
    margin: 0 0 1rem !important;
    border: none;
  }
`
const StyledMagicLink = styled(MagicLink)`
  display: block;
  font-size: 0.75rem;
  color: ${(props) => props.theme.colors.footer};
  text-decoration: none;
`
export default function Links() {
  return (
    <Wrapper>
      <ItemWrapper>
        <Item><StyledMagicLink to='/mentions-legales'>accessibilité : non conforme</StyledMagicLink></Item>
        <Item><StyledMagicLink to='/mentions-legales'>mentions légales</StyledMagicLink></Item>
        <Item><StyledMagicLink to='/donnees-personnelles'>données personnelles</StyledMagicLink></Item>
        <Item><StyledMagicLink to='/cookies'>gestion des cookies</StyledMagicLink></Item>
        <Item><StyledMagicLink to='/partenaires'>partenaires</StyledMagicLink></Item>
        <Item><StyledMagicLink to='/stats'>statistiques</StyledMagicLink></Item>
        <Item><StyledMagicLink to='/articles'>articles</StyledMagicLink></Item>
        <Item><StyledMagicLink to='/recommandations'>recommandations</StyledMagicLink></Item>
      </ItemWrapper>
    </Wrapper>
  )
}
