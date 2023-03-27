import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.circle`
  transform: rotate(${(props) => 34 * (props['data-value'] - 1)}deg);
  transform-origin: 71px 71.5px;
  opacity: ${(props) => (props['data-value'] > 0 && props['data-value'] < 7) ? 1 : 0};
  fill: ${(props) => props.theme.colors.atmo[props['data-value']]};
  transition: transform ${(props) => (props['data-value'] ? props['data-value'] * 300 : 0)}ms
      ${(props) => (props['data-value'] ? 300 : 0)}ms ease-out,
    opacity ${(props) => (props['data-value'] ? 300 : 0)}ms
      ${(props) => (props['data-value'] ? 300 : 0)}ms ease-out;

  ${(props) => props.theme.mq.medium} {
    transition: none;
  }
`
export default function Circle(props) {
  return (
    <Wrapper
      data-value={props.value}
      cx='7'
      cy='66'
      r='15.6471'
      stroke='#fff'
      strokeWidth='3'
    />
  )
}
