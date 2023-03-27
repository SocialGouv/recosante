import React from 'react'
import styled from 'styled-components'
import { StaticImage } from 'gatsby-plugin-image'

const Wrapper = styled.div`
  position: absolute;
  z-index: -1;
  pointer-events: none;
  top: 50%;
  left: calc(50%);
  transform: translate(-50%, -50%);
  width: 80rem;

  ${(props) => props.theme.mq.small} {
    width: 175vw;
  }
`
const Background = styled.div`
  opacity: ${(props) => (props.isOnScreen ? 1 : 0)};
  transform: translateY(${(props) => (props.isOnScreen ? 0 : '9rem')});
  transition: transform 600ms ease-out, opacity 600ms;

  ${(props) => props.theme.mq.small} {
    transform: none;
    opacity: 1;
  }
`
const Tablet = styled.div`
  position: absolute !important;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transform: translateY(${(props) => (props.isOnScreen ? 0 : '12rem')});
  opacity: ${(props) => (props.isOnScreen ? 1 : 0)};
  transition: transform 600ms ease-out, opacity 600ms;

  ${(props) => props.theme.mq.small} {
    transform: none;
    opacity: 1;
  }
`
export default function Mockup(props) {
  return (
    <>
      <Wrapper className={props.className}>
        <Background isOnScreen={props.isOnScreen}>
          <StaticImage src={'./mockup/background.jpg'} alt='' placeholder='none' />
        </Background>
        <Tablet isOnScreen={props.isOnScreen}>
          {props.type === 'baignades' ? (
            <StaticImage src='./mockup/tablet-baignades.png' alt='' placeholder='none' />
          ) : (props.type === 'uv' ? (
            <StaticImage src='./mockup/tablet-uv.png' alt='' placeholder='none' />
          ) : (props.type === 'qa' ? (
            <StaticImage src='./mockup/tablet-qa.png' alt='' placeholder='none' />
          ) : (
            <StaticImage src='./mockup/tablet.png' alt='' placeholder='none' />
          )))}
        </Tablet>
      </Wrapper>
    </>
  )
}
