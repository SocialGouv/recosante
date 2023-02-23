import React, { useContext } from 'react'
import styled from 'styled-components'
import StyleContext from 'utils/StyleContext'

const Wrapper = styled.svg`
  overflow: visible;
  width: auto;
  height: 10rem;
  transform: rotate(-90deg);
`

const Circle = styled.circle`
  stroke: ${(props) => props.theme.colors.indiceuv[props.value]};
  stroke-dashoffset: ${(props) => 2 * Math.PI * props.r * (1 - props.value / props.maxValue)};
  stroke-width: ${(props) => 2 * props.r}};
  stroke-dasharray: ${(props) => 2 * Math.PI * props.r};
  transition: stroke-dashoffset ${(props) => ( props.value ? 3 : 0)}s ease-in-out;
`

const Path = styled.path`
  stroke: ${(props) =>
    props.visible ? props.theme.colors.indiceuv[props.value]
      : props.theme.colors.main};
  opacity: ${(props) =>
    props.visible ? 1 : 0.15};
  transition: opacity ${(props) => (props.visible ? 1000 : 0)}ms
                      ${(props) => (props.visible ? 2000 : 0)}ms
                      ease-in-out,
              stroke  ${(props) => (props.visible ? 500 : 0)}ms
                      ${(props) => (props.visible ? 2000 : 0)}ms
                      ease-in-out;
  stroke-width: 3;
  stroke-linecap: round;
  stroke-linejoin: round;
`

export default function Chart(props) {
  const { themes, theme } = useContext(StyleContext)
  let value = props.data?.indice_uv?.indice?.value || 0
  const maxValue = 11
  value = Math.min(value, maxValue)
  return (
    <Wrapper width='48' height='48' viewBox='0 0 48 48'>
      <circle
        cx='24'
        cy='24'
        r='12'
        fill={themes[theme].colors.main}
        opacity="0.15"
      />
      <Circle
        value={value}
        maxValue={maxValue}
        cx='24'
        cy='24'
        r='6'
        fill="none"
      />
      <Path // 4
        visible={value > 3}
        value={value}
        d='M15.6553 38.4141L13.0001 43.0529'
      />
      <Path // 10
        visible={value > 9}
        value={value}
        d='M35 4.94727L32.3448 9.58602'
      />
      <Path // 5
        visible={value > 4}
        value={value}
        d='M9.58691 32.3447L4.94815 34.9999'
      />
      <Path // 11
        visible={value > 10}
        value={value}
        d='M43.0527 13L38.414 15.6552'
      />
      <Path // 0
        visible={value > 0}
        value={value}
        d='M46 24L40.6896 24'
      />
      <Path // 6
        visible={value > 5}
        value={value}
        d='M7.31055 24H2.00019'
      />
      <Path // 1
        visible={value > 0}
        value={value}
        d='M43.0527 35L38.414 32.3448'
      />
      <Path // 7
        visible={value > 6}
        value={value}
        d='M9.58691 15.6548L4.94815 12.9996'
      />
      <Path // 2
        visible={value > 1}
        value={value}
        d='M35 43.0527L32.3448 38.414'
      />
      <Path // 8
        visible={value > 7}
        value={value}
        d='M15.6553 9.58594L13.0001 4.94717'
      />
      <Path // 9
        visible={value > 8}
        value={value}
        d='M24 7.31055L24 2.00019'
      />
      <Path // 3 
        visible={value > 2}
        value={value}
        d='M24 46V40.6896'
      />
    </Wrapper>
  )
}
