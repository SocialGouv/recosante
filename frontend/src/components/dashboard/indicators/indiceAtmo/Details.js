import React from 'react'
import styled from 'styled-components'

import Element from './details/Element'

const Wrapper = styled.ul`
  display: flex;
  justify-content: space-between;
  margin: 0;
  padding: 0;
  font-size: inherit;

  ${(props) => props.theme.mq.small} {
    flex-direction: column;
    align-items: center;
  }

  li {
    list-style: none;
  }
`
export default function Details(props) {
  return props.data?.indice_atmo?.indice?.details ? (
    <Wrapper>
      {props.data.indice_atmo.indice.details.map((element) => (
        <li key={element.label}>
          <Element
            label={element.label}
            value={element.indice.value}
          />
        </li>
      ))}
    </Wrapper>
  ) : null
}
