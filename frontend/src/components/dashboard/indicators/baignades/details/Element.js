import React from 'react'
import styled from 'styled-components'
import MagicLink from 'components/base/MagicLink'
import Excellent from './images/Excellent.png'
import Bon from './images/Bon.png'
import Suffisant from './images/Suffisant.png'
import Insuffisant from './images/Insuffisant.png'
import InterdictionImage from './images/Interdiction.png'

const ranking_images = {
  'Excellent': Excellent,
  'Bon': Bon,
  'Suffisant': Suffisant,
  'Insuffisant': Insuffisant,
}

const Wrapper = styled.div`
  margin-bottom: 2rem;
  &:last-child {
    margin-bottom: 0;
  }
`
const Title = styled.h3`
  font-weight: normal;
  line-height: 0.75;
  margin-bottom: 1rem;
  color: ${(props) => props.theme.colors.text};
  font-size: inherit;
`
const StyledMagicLink = styled(MagicLink)`
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`
const Interdiction = styled.div`
  position: relative;
  margin-top: 0.5rem;
  padding-left: 3.5rem;
  line-height: 3rem;
  color: ${(props) => props.theme.colors.error};

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 3rem;
    height: 3rem;
    background: ${(props) => 'url(' + InterdictionImage + ')'};
    background-repeat: no-repeat;
    background-size: 100% auto;
    background-position: center;
  }

  > div {
    display: inline-block;
    vertical-align: middle;
    line-height: 1.25rem;
  }
`
const Sample = styled.div`
  position: relative;
  padding-left: 3.5rem;
  transition: color 300ms ease-out;
  line-height: 1.5rem;
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 3rem;
    height: 1.5rem;
    background-color: ${(props) => props.theme.colors.main};
    opacity: ${(props) => 0.15};
    border-radius: 0.25rem;
  }

  &:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: ${(props) => (props.value >= 0) ? ((props.value + 1) / 3) * 3 : 0}rem;
    height: 1.5rem;
    background-color: ${(props) => (props.value >= 0) ? props.theme.colors.baignades[props.value] : props.theme.colors.main};
    border-radius: ${(props) =>
    props.value < 2 ? '0.25rem 0 0 0.25rem' : '0.25rem'};
  }
`
const Date = styled.span`
  font-weight: lighter;
`
const Ranking = styled.div`
  position: relative;
  margin-top: 0.5rem;
  padding-left: 3.5rem;
  line-height: 3rem;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 3rem;
    height: 3rem;
    background: ${(props) => 'url(' + ranking_images[props.label] + ')'};
    background-repeat: no-repeat;
    background-size: 100% auto;
    background-position: center;
  }
`
const Year = styled.span`
  font-weight: lighter;
`

export default function Element(props) {
  const value = ['Bon résultat', 'Résultat moyen', 'Mauvais résultat'].indexOf(
    props?.sample?.label
  )
  return props?.label ? (
    <Wrapper>
      <Title>
        {props?.url ? <StyledMagicLink to={props.url}>{props.label}</StyledMagicLink> : props.label}
      </Title>
      {props?.sample && (<Sample value={value}>
        {props.sample.label ? `${props.sample.label}` : 'Pas de résultats de prélèvements'}
        {props.sample.date && (<> <Date>(prélèvement du {props.sample.date})</Date></>)}
      </Sample>)}
      {['Excellent', 'Bon', 'Suffisant', 'Insuffisant'].includes(props?.ranking?.label) && (
        <Ranking label={props.ranking.label}>
          {props.ranking.label}
          {props.ranking.year && (<> <Year>(classement de {props.ranking.year})</Year></>)}
        </Ranking>)}
      {props?.interdiction && (<Interdiction>
        <div>
          Interdiction {props.interdiction.type ? `${props.interdiction.type}` : ''} de baignade
          {props.interdiction.reason && (<> pour raison {props.interdiction.reason}</>)}
          {props.interdiction.date && (<> <Date>({props.interdiction.date})</Date></>)}
        </div>
      </Interdiction>)}
    </Wrapper>
  ) : null
}
