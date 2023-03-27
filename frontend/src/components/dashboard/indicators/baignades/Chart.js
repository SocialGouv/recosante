import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.svg`
  overflow: visible;
  width: auto;
  height: 10rem;
`
const Path = styled.path`
  stroke: ${(props) =>
    props.visible && props.index <= props['data-value']
      ? props['data-value'] > 2 ?
        props['data-summary'][props.index] > 0 ?
          props.theme.colors.baignades[props.index]
          : props.theme.colors.disabled
        : props.theme.colors.baignades[props['data-value']]
      : props.theme.colors.disabled};
  transition: opacity ${(props) => (props.visible ? 1200 : 0)}ms
                      ${(props) => (props.visible ? props.index * 300 + 300 : 0)}ms,
              stroke  ${(props) => (props.visible ? 400 : 0)}ms
                      ${(props) => (props.visible ? props.index * 300 + 300 : 0)}ms;
  ${(props) => props.theme.mq.medium} {
    transition: none;
  }
  stroke-width: 3;
  stroke-linecap: round;
  stroke-linejoin: round;
  fill: none;
`

export default function Chart(props) {
  const indice = props?.data?.baignades?.indice
  const value = ['Bons résultats', 'Résultats moyens', 'Mauvais résultats', 'Résultats mixtes'].indexOf(
    indice?.label
  )
  const summary = [indice?.summary['Bons résultats'], indice?.summary['Résultats moyens'], indice?.summary['Mauvais résultats']]
  return (
    <Wrapper aria-hidden={true} width='48' height='48' viewBox='0 0 48 48'>
      <Path
        visible={props.data}
        data-value={props.data ? value : 0}
        index={2}
        data-summary={summary}
        d="M6 12C10.966 12 14.69 6 14.69 6C14.69 6 18.414 12 23.379 12C28.345 12 33.31 6 33.31 6C33.31 6 38.276 12 42 12"
      />
      <Path
        visible={props.data}
        data-value={props.data ? value : 0}
        index={1}
        data-summary={summary}
        d="M6 27C10.966 27 14.69 21 14.69 21C14.69 21 18.414 27 23.379 27C28.345 27 33.31 21 33.31 21C33.31 21 38.276 27 42 27"
      />
      <Path
        visible={props.data}
        data-value={props.data ? value : 0}
        index={0}
        data-summary={summary}
        d="M6 42C10.966 42 14.69 36 14.69 36C14.69 36 18.414 42 23.379 42C28.345 42 33.31 36 33.31 36C33.31 36 38.276 42 42 42"
      />
    </Wrapper>
  )
}
