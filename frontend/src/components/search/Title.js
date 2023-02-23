import React from 'react'
import styled, { keyframes } from 'styled-components'

const simple = keyframes`
  from {
    opacity: 0;
  }
  5% {
    opacity: 1;
  }
  15% {
    opacity: 1;
  }
  20% {
    opacity: 0;
  }
  to {
    opacity: 0;
  }
`
const la = keyframes`
  from {
    opacity: 0;
  }
  5% {
    opacity: 1;
  }
  15% {
    opacity: 1;
  }
  20% {
    opacity: 0;
  }
  30% {
    opacity: 0;
  }
  35% {
    opacity: 1;
  }
  45% {
    opacity: 1;
  }
  55% {
    opacity: 0;
  }
  65% {
    opacity: 0;
  }
  70% {
    opacity: 1;
  }
  80% {
    opacity: 1;
  }
  85% {
    opacity: 0;
  }
  to {
    opacity: 0;
  }
`
const le = keyframes`
  from {
    opacity: 1;
  }
  5% {
    opacity: 0;
  }
  15% {
    opacity: 0;
  }
  20% {
    opacity: 1;
  }
  30% {
    opacity: 1;
  }
  35% {
    opacity: 0;
  }
  45% {
    opacity: 0;
  }
  55% {
    opacity: 1;
  }
  65% {
    opacity: 1;
  }
  70% {
    opacity: 0;
  }
  80% {
    opacity: 0;
  }
  85% {
    opacity: 1;
  }
  to {
    opacity: 1;
  }
`

const Wrapper = styled.h1`
  display: flex;
  flex-wrap: wrap;

  ${(props) => props.theme.mq.medium} {
    justify-content: center;
    font-size: 2.5rem;
  }
  ${(props) => props.theme.mq.small} {
    justify-content: center;
    font-size: 6.5vw;
  }
`
const Words = styled.span`
  flex-basis: 100%;
  margin-right: 0.3em;

  ${(props) => props.theme.mq.medium} {
    flex-basis: auto;
  }
`
const Pronouns = styled.span`
  position: relative;
  margin-right: 0.27em;
`
const Pronoun = styled.span`
  position: ${(props) => (props.absolute ? 'absolute' : 'static')};
  top: 0;
  left: 0;
  animation: ${(props) => (props.absolute ? le : la)} 30000ms infinite;
`
const Sentences = styled.strong`
  position: relative;
  height: 1.1em;

  ${(props) => props.theme.mq.medium} {
    flex-basis: 100%;
  }
`
const Sentence = styled.span`
  position: absolute;
  white-space: nowrap;

  ${(props) => props.theme.mq.medium} {
    left: 50%;
    transform: translateX(-50%);
  }
`
const Letter = styled.span`
  will-change: opacity;
  opacity: 0;
  animation: ${simple} 30000ms
    ${(props) => props.index * 5000 + props.position * 25}ms infinite;
`
export default function Title() {
  const sentences = [
    `pollution de l'air`,
    `risque d'allergie aux pollens`,
    `vigilance météo`,
    `rayonnement UV`,
    `qualité des eaux de baignade`,
    `niveau de risque radon`,
  ]
  return (
    <Wrapper aria-label='Découvrez la qualité de votre environnement'>
      <Words aria-hidden='true'>Découvrez </Words>
      <Pronouns aria-hidden='true'>
        <Pronoun>la </Pronoun>
        <Pronoun absolute>le </Pronoun>
      </Pronouns>
      <Sentences aria-hidden='true'>
        {sentences.map((sentence, index) => (
          <Sentence key={sentence} index={index}>
            {sentence.split('').map((letter, position) => (
              <Letter
                key={position + '_' + index}
                index={index}
                position={position}
                total={sentence.length}
              >
                {letter}
              </Letter>
            ))}
          </Sentence>
        ))}
      </Sentences>
      <Words aria-hidden='true'>près de chez vous</Words>
    </Wrapper>
  )
}
