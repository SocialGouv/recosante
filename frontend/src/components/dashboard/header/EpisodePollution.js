import React, { useContext } from 'react'
import styled from 'styled-components'

import useIndicators from 'hooks/useIndicators'
import ModalContext from 'utils/ModalContext'
import Button from 'components/base/Button'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 18rem;
  margin: 0 auto 2rem;
  padding: 1.5rem 2rem 1.5rem;
  background: ${(props) => props.theme.colors.error};
  border-radius: 1.5rem;
  box-shadow: 0.25rem 0.25rem 1rem 0
    rgba(${(props) => props.theme.colors.backgroundAlpha}, 0.4);

  ${(props) => props.theme.mq.small} {
    padding: 1.5rem 1rem 1rem;
  }
`
const Title = styled.p`
  margin-bottom: 1rem;
  color: ${(props) => props.theme.colors.background};
  text-align: center;
`
export default function EpisodePollution(props) {
  const { data } = useIndicators(props.place.code, props.date)

  const { setEpisodePollution } = useContext(ModalContext)

  return data?.episodes_pollution?.advice ? (
    <Wrapper>
      <Title>Un épisode de pollution est prévu{' '}{props.date ? 'demain' : 'aujourd’hui'}</Title>
      <Button onClick={() => setEpisodePollution(true)}>En savoir plus</Button>
    </Wrapper>
  ) : null
}
