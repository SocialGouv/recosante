import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  position: relative;
  margin-top: 1rem;
  padding: 1.5rem 1.5rem 1.5rem 1.8125rem;
  color: ${(props) => props.theme.colors.text};
  background-color: ${(props) => props.theme.colors.tile};

  &:before {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    width: 0.3125rem;
    background-color: ${(props) =>
      props.error ? props.theme.colors.error : props.theme.colors.success};
  }

  ${(props) => props.theme.mq.medium} {
    padding: 1rem 1rem 1rem calc(1rem + 0.3125rem);
  }

  p:last-child {
    margin: 0;
  }
`
export default function Alert(props) {
  return (
    <Wrapper className={props.className} error={props.error}>
      {props.children}
    </Wrapper>
  )
}
