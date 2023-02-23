import React from 'react'
import styled from 'styled-components'

import Element from './details/Element'

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;

  ${(props) => props.theme.mq.small} {
    flex-direction: column;
    align-items: center;
  }
`
export default function Details(props) {
  return props.data?.indice_atmo?.indice?.details ? (
    <Wrapper>
      {props.data.indice_atmo.indice.details.map((element) => (
        <Element
          key={element.label}
          label={element.label}
          value={element.indice.value}
        />
      ))}
    </Wrapper>
  ) : null
}
