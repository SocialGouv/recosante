import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.circle`
  transform: rotate(${(props) => 34 * (props.value - 1)}deg);
  transform-origin: 71px 71.5px;
  opacity: ${(props) => (props.value > 0 && props.value < 7) ? 1 : 0};
  fill: ${(props) => props.theme.colors.atmo[props.value]};
  transition: transform ${(props) => (props.value ? props.value * 300 : 0)}ms
      ${(props) => (props.value ? 300 : 0)}ms ease-out,
    opacity ${(props) => (props.value ? 300 : 0)}ms
      ${(props) => (props.value ? 300 : 0)}ms ease-out;

  ${(props) => props.theme.mq.medium} {
    transition: none;
  }
`
export default function Circle(props) {
  return (
    <Wrapper
      value={props.value}
      cx='7'
      cy='66'
      r='15.6471'
      stroke='#fff'
      strokeWidth='3'
    />
  )
}
