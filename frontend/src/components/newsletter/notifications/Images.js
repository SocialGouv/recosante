import React from 'react'
import styled from 'styled-components'
import { StaticImage } from 'gatsby-plugin-image'

const Wrapper = styled.div`
  position: relative;
  pointer-events: none;
`
const Ios = styled.div`
  position: absolute;
  top: 0;
  left: 50%;
  opacity: ${(props) => (props.isOnScreen ? 1 : 0)};
  transform: translate(
    calc(-50% - 2rem),
    ${(props) => (props.isOnScreen ? 0 : 12)}rem
  );
  width: 21.5rem;
  transition: transform 600ms ease-out, opacity 600ms;

  ${(props) => props.theme.mq.small} {
    position: relative;
    top: auto;
    left: auto;
    transform: none;
    width: 100%;
    transform: none;
    opacity: 1;
  }
`
const Macos = styled.div`
  position: absolute;
  top: 0;
  left: 50%;
  transform: translate(
    calc(-50% + 2rem),
    ${(props) => (props.isOnScreen ? 6 : 15)}rem
  );
  width: 22.5rem;
  opacity: ${(props) => (props.isOnScreen ? 1 : 0)};
  transition: transform 600ms ease-out 100ms, opacity 600ms 100ms;

  ${(props) => props.theme.mq.small} {
    display: none;
  }
`
export default function Images(props) {
  return (
    <Wrapper className={props.className}>
      <Ios isOnScreen={props.isOnScreen}>
        <StaticImage src={'./images/ios.png'} alt='Notification iOS' />
      </Ios>
      <Macos isOnScreen={props.isOnScreen}>
        <StaticImage src={'./images/macos.png'} alt='Notification macOS' />
      </Macos>
    </Wrapper>
  )
}
