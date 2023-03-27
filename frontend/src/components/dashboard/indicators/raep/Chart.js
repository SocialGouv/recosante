import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.svg`
  overflow: visible;
  width: auto;
  height: 8rem;
`
const Circle = styled.circle`
  fill: ${(props) =>
    props.visible && props.index < props['data-value']
      ? props.theme.colors.raep[props['data-value']]
      : props.theme.colors.main};
  opacity: ${(props) =>
    props.visible && props.index < props['data-value'] ? 1 : 0.15};
  transition: opacity ${(props) => (props.visible ? 1200 : 0)}ms
      ${(props) => (props.visible ? props.index * 300 + 600 : 0)}ms,
    fill ${(props) => (props.visible ? 400 : 0)}ms
      ${(props) => (props.visible ? props.index * 300 + 600 : 0)}ms;

  ${(props) => props.theme.mq.medium} {
    transition: none;
  }
`
export default function Chart(props) {
  let value = props.data?.raep?.indice?.value || 0
  return (
    <Wrapper aria-hidden={true} width='77' height='111' viewBox='0 0 77 111'>
      <Circle
        visible={props.data}
        data-value={value}
        index={0}
        cx='23'
        cy='98'
        r='13'
      />
      <Circle
        visible={props.data}
        data-value={value}
        index={1}
        cx='50'
        cy='78'
        r='12'
      />
      <Circle
        visible={props.data}
        data-value={value}
        index={2}
        cx='16.5'
        cy='59.5'
        r='16.5'
      />
      <Circle
        visible={props.data}
        data-value={value}
        index={3}
        cx='60.5'
        cy='45.5'
        r='16.5'
      />
      <Circle
        visible={props.data}
        data-value={value}
        index={4}
        cx='25'
        cy='19'
        r='19'
      />
    </Wrapper>
  )
}
