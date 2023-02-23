import React, { useContext } from 'react'
import styled, { keyframes } from 'styled-components'

import ModalContext from 'utils/ModalContext'

const fetching = keyframes`
  from {
    transform: scaleX(0);
    transform-origin: left;
  }
  50% {
    transform: scaleX(1);
    transform-origin: left;
  }
  50.1% {
    transform: scaleX(1);
    transform-origin: right;
  }
  to {
    transform: scaleX(0);
    transform-origin: right;
  }
`
const Wrapper = styled.h2`
  position: relative;
  margin-bottom: 1.5rem;
  font-size: 1.125rem;
  font-weight: normal;
  cursor: pointer;

  &:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background-color: ${(props) => props.theme.colors.background};
    opacity: 0.7;
    transform: scaleX(0);
    animation: ${(props) => (props.isLoading ? fetching : '')} 1000ms infinite;
  }

  ${(props) => props.theme.mq.small} {
    margin: 0 -1rem 1rem;
    font-size: 1rem;
    text-align: center;
  }
`
const Superscript = styled.sup`
  font-size: 0.625rem;
  color: ${(props) => props.theme.colors.main};
`
export default function Title(props) {
  const { setModal } = useContext(ModalContext)
  return (
    <Wrapper
      isLoading={props.isLoading}
      onClick={() => setModal(props.indicateur)}
    >
      {props.children}
      <Superscript> (?)</Superscript>
    </Wrapper>
  )
}
