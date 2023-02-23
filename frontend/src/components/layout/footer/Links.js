import React from 'react'
import styled from 'styled-components'

import MagicLink from 'components/base/MagicLink'

const Wrapper = styled.div`
  border-top: 1px solid ${(props) => props.theme.colors.footer};
`
const ItemWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  max-width: 75em;
  margin: 0 auto;
  padding: 1rem 0.5rem;
`
const Item = styled(MagicLink)`
  display: block;
  margin-right: 1rem;
  padding-right: 1rem;
  font-size: 0.75rem;
  color: ${(props) => props.theme.colors.footer};
  text-decoration: none;
  border-right: 1px solid ${(props) => props.theme.colors.input};

  &:last-child {
    margin: 0;
    padding: 0;
    border: none;
  }

  ${(props) => props.theme.mq.small} {
    margin: 0 0 1rem;
    border: none;
  }
`
export default function Links() {
  return (
    <Wrapper>
      <ItemWrapper>
        <Item to='/mentions-legales'>accessibilité : non conforme</Item>
        <Item to='/mentions-legales'>mentions légales</Item>
        <Item to='/donnees-personnelles'>données personnelles</Item>
        <Item to='/cookies'>gestion des cookies</Item>
        <Item to='/partenaires'>partenaires</Item>
        <Item to='/stats'>statistiques</Item>
        <Item to='/articles'>articles</Item>
        <Item to='/recommandations'>recommandations</Item>
      </ItemWrapper>
    </Wrapper>
  )
}
