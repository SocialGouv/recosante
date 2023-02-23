import React from 'react'
import styled from 'styled-components'

import Card from 'components/misc/Card'
import Avalanches from './images/Avalanches.png'
import Canicule from './images/Canicule.png'
import Crues from './images/Crues.png'
import GrandFroid from './images/GrandFroid.png'
import Neige from './images/Neige.png'
import Orages from './images/Orages.png'
import PluieInondation from './images/PluieInondation.png'
import VaguesSubmersion from './images/VaguesSubmersion.png'
import Vent from './images/Vent.png'

const Wrapper = styled.div``
const Title = styled.h4`
  display: flex;
  align-items: center;
  font-weight: normal;
  line-height: 1.7;
  color: ${(props) => props.theme.colors.text};
`
const Icon = styled.div`
  position: relative;
  height: 1.5rem;
  width: 1.5rem;
  margin-right: 0.5rem;
  background-color: ${(props) =>
    props.theme.colors.vigilancemeteo[props.value]};
  border-radius: 0.25rem;

  img {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    height: calc(100% - 0.25rem);
    width: calc(100% - 0.25rem);
    object-fit: contain;
  }
`
export default function Element(props) {
  const images = {
    'Vent violent': Vent,
    Orages,
    Canicule,
    'Vagues-Submersion': VaguesSubmersion,
    'Neige-verglas': Neige,
    Avalanches,
    Crues,
    'Grand Froid': GrandFroid,
    'Pluie-Inondation': PluieInondation,
  }
  const value = ['Vert', 'Jaune', 'Orange', 'Rouge'].indexOf(props.indice.color)
  const tomorrow = new Date()
  tomorrow.setHours(24, 0, 0, 0)
  return (
    <Wrapper>
      <Title>
        <Icon value={value}>
          <img src={images[props.indice.label]} alt={props.indice.label} />
        </Icon>
        {props.indice.label}{' '}
        {props.validity.map((v, i) => (
          v.start ? (
            (!v.end || v.end >= tomorrow) ? (
              <React.Fragment key={v.start + '-' + v.end}>
                {i > 0 ? ' et ' : ''}
                à partir de{' '}
                {v.start.toLocaleTimeString('fr', {
                  hour: '2-digit'
                })}
              </React.Fragment>
            ) : (
              <React.Fragment key={v.start + '-' + v.end}>
                {i > 0 ? ' et ' : ''}
                de{' '}
                {v.start.toLocaleTimeString('fr', {
                  hour: '2-digit'
                })}{' '}
                à{' '}
                {v.end.toLocaleTimeString('fr', {
                  hour: '2-digit'
                })}
              </React.Fragment>
            )) : (
            <></>
          )
        ))}
      </Title>
      {props.indice.advice && (
        <Card.Recommandation
          dangerouslySetInnerHTML={{
            __html: props.indice.advice.main,
          }}
        />
      )}
    </Wrapper>
  )
}
