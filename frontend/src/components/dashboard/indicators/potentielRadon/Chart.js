import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.svg`
  width: auto;
  height: 8rem;
`
const Path = styled.path`
  fill: ${(props) => props.theme.colors.radon[props['data-value']]};
`
const Rect = styled.rect`
  fill: ${(props) =>
    props.visible && props.index < props['data-value']
      ? props.theme.colors.radon[props['data-value']]
      : props.theme.colors.main};
  opacity: ${(props) =>
    props.visible && props.index < props['data-value'] ? 1 : 0.15};
  transition: opacity ${(props) => (props.visible ? 1200 : 0)}ms
      ${(props) => (props.visible ? props.index * 300 + 1800 : 0)}ms,
    fill ${(props) => (props.visible ? 400 : 0)}ms
      ${(props) => (props.visible ? props.index * 300 + 1800 : 0)}ms;

  ${(props) => props.theme.mq.medium} {
    transition: none;
  }
`
export default function Chart(props) {
  const value = props.data ? props.data.potentiel_radon.indice.value : 0
  return (
    <Wrapper aria-hidden={true} width='110' height='110' viewBox='0 0 110 110' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <Path
        d='M108.474 51.4639L98.4736 41.4639L58.4736 1.46393C57.5359 0.526577 56.2644 0 54.9386 0C53.6127 0 52.3412 0.526577 51.4036 1.46393L11.4036 41.4639L1.40356 51.4639C0.492769 52.4069 -0.0112031 53.67 0.000189013 54.9809C0.0115811 56.2919 0.537425 57.546 1.46447 58.473C2.39151 59.4001 3.64557 59.9259 4.95655 59.9373C6.26754 59.9487 7.53055 59.4447 8.47356 58.5339L9.93856 57.0689V104.999C9.93856 106.325 10.4653 107.597 11.403 108.534C12.3407 109.472 13.6125 109.999 14.9386 109.999H94.9386C96.2646 109.999 97.5364 109.472 98.4741 108.534C99.4118 107.597 99.9386 106.325 99.9386 104.999V57.0689L101.404 58.5339C102.347 59.4447 103.61 59.9487 104.921 59.9373C106.232 59.9259 107.486 59.4001 108.413 58.473C109.34 57.546 109.866 56.2919 109.877 54.9809C109.888 53.67 109.384 52.4069 108.474 51.4639ZM89.9386 99.9989H19.9386V47.0689L54.9386 12.0689L89.9386 47.0689V99.9989Z'
        data-value={value}
      />
      <Rect
        x='28.1299'
        y='81.8076'
        width='53.617'
        height='10.2128'
        rx='4'
        visible={props.data}
        data-value={value}
        index={0}
      />
      <Rect
        x='28.1299'
        y='63.9351'
        width='53.617'
        height='10.2128'
        rx='4'
        visible={props.data}
        data-value={value}
        index={1}
      />
      <Rect
        x='28.1299'
        y='46.063'
        width='53.617'
        height='10.2128'
        rx='4'
        visible={props.data}
        data-value={value}
        index={2}
      />
    </Wrapper>
  )
}
