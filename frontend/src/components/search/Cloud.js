import React, { useState } from 'react'
import styled, { keyframes } from 'styled-components'

const bolt = keyframes`
  from {
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  20% {
    opacity: 0;  
  }
  30% {
    opacity: 1;  
  }
  40% {
    opacity: 0;  
  }
  50% {
    opacity: 1;  
  }
  to {
    opacity: 0;  
  }
`
const rain = keyframes`
  from {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }

  to {
    opacity: 0;  
  }
`
const Wrapper = styled.svg`
  position: absolute;
  top: 10rem;
  left: calc(100% - 7rem);
  width: 14rem;
  height: auto;
  cursor: ${(props) => (props.animated ? 'none' : 'pointer')};
  -webkit-tap-highlight-color: rgba(255, 255, 255, 0);

  ${(props) => props.theme.mq.medium} {
    top: auto;
    bottom: calc(100% - 1.5rem);
    left: calc(50% - 2.275rem);
    width: 10rem;
  }
`
const Bolt = styled.path`
  fill: #fffd53 !important;
  opacity: 0;
  animation: ${(props) => (props.animated && props.animation === 1 ? bolt : '')}
    1500ms;
`
const Raindrop = styled.path`
  opacity: 0;
  animation: ${(props) => (props.animated && props.animation === 2 ? rain : '')}
    1000ms;
  animation-delay: ${(props) => props.index * 300}ms;
  fill: ${(props) => props.theme.colors.main};
`
const Ray = styled.path`
  stroke-dasharray: ${(props) => props.length * 2};
  stroke-dashoffset: ${(props) =>
    props.animated && props.animation === 3
      ? -props.length * 2
      : props.length * 2};
  transition: stroke-dashoffset ${(props) => (props.animated ? 1700 : 0)}ms
    ease-out ${(props) => props.index * 50}ms;
`
export default function Cloud() {
  const [animated, setAnimated] = useState(false)
  const [animation, setAnimation] = useState(0)

  return (
    <Wrapper
      onClick={() => {
        window._paq?.push(['trackEvent', 'Misc', 'Nuage'])
        if (!animated) {
          setAnimation((prevAnimation) =>
            prevAnimation < 3 ? prevAnimation + 1 : 1
          )
          setAnimated(true)
          setTimeout(() => setAnimated(false), 1900)
        }
      }}
      animated={animated}
      width='127'
      height='89'
      viewBox='0 0 127 89'
      fill='none'
    >
      <Bolt
        animated={animated}
        animation={animation}
        d='M30.8054 70.6072H21.8963L26.6318 62.3906H15.9216L11.1914 75.9087H18.7959L15.4251 88.3906L30.8054 70.6072Z'
        fill='#F0E65F'
      />
      <Raindrop
        index={0}
        animated={animated}
        animation={animation}
        d='M24.1386 73.349C23.7928 73.349 23.4433 73.2504 23.1342 73.0443C22.3006 72.4885 22.0753 71.3623 22.631 70.5288L24.445 67.8079C25.0007 66.9743 26.127 66.7492 26.9604 67.3048C27.794 67.8606 28.0193 68.9868 27.4635 69.8203L25.6496 72.5412C25.3 73.0655 24.7248 73.349 24.1386 73.349Z'
      />
      <Raindrop
        index={0}
        animated={animated}
        animation={animation}
        d='M8.72066 73.349C8.37488 73.349 8.02536 73.2504 7.7162 73.0443C6.88259 72.4885 6.65732 71.3623 7.21306 70.5288L9.02699 67.8079C9.58261 66.9743 10.7091 66.7492 11.5424 67.3048C12.3761 67.8606 12.6013 68.9868 12.0456 69.8203L10.2317 72.5412C9.88202 73.0655 9.30678 73.349 8.72066 73.349Z'
      />
      <Raindrop
        index={0}
        animated={animated}
        animation={animation}
        d='M41.3711 73.349C41.0253 73.349 40.6758 73.2504 40.3666 73.0443C39.533 72.4885 39.3077 71.3623 39.8635 70.5288L41.6774 67.8079C42.2331 66.9743 43.3593 66.7492 44.1928 67.3048C45.0264 67.8606 45.2517 68.9868 44.696 69.8203L42.882 72.5412C42.5324 73.0655 41.9572 73.349 41.3711 73.349Z'
      />
      <Raindrop
        index={1}
        animated={animated}
        animation={animation}
        d='M32.2988 76.9779C31.953 76.9779 31.6035 76.8792 31.2943 76.6731C30.4607 76.1174 30.2354 74.9912 30.7912 74.1577L32.6051 71.4368C33.1607 70.6032 34.2872 70.3782 35.1206 70.9337C35.9542 71.4894 36.1794 72.6156 35.6237 73.4491L33.8098 76.17C33.4601 76.6943 32.8849 76.9779 32.2988 76.9779Z'
      />
      <Raindrop
        index={1}
        animated={animated}
        animation={animation}
        d='M15.9746 76.9779C15.6288 76.9779 15.2793 76.8792 14.9701 76.6731C14.1365 76.1174 13.9112 74.9912 14.467 74.1577L16.2809 71.4368C16.8365 70.6032 17.9629 70.3782 18.7964 70.9337C19.63 71.4894 19.8552 72.6156 19.2995 73.4491L17.4856 76.17C17.1359 76.6943 16.5607 76.9779 15.9746 76.9779Z'
      />
      <Raindrop
        index={2}
        animated={animated}
        animation={animation}
        d='M24.1386 83.3256C23.7928 83.3256 23.4433 83.2269 23.1342 83.0208C22.3006 82.4651 22.0753 81.3389 22.631 80.5054L24.445 77.7845C25.0007 76.9509 26.127 76.7257 26.9604 77.2814C27.794 77.8371 28.0193 78.9633 27.4635 79.7968L25.6496 82.5177C25.3 83.042 24.7248 83.3256 24.1386 83.3256Z'
      />
      <Raindrop
        index={2}
        animated={animated}
        animation={animation}
        d='M40.4628 83.3256C40.1171 83.3256 39.7675 83.2269 39.4584 83.0208C38.6248 82.4651 38.3995 81.3389 38.9553 80.5054L40.7692 77.7845C41.3248 76.9509 42.4511 76.7257 43.2846 77.2814C44.1182 77.8371 44.3435 78.9633 43.7878 79.7968L41.9738 82.5177C41.6242 83.042 41.049 83.3256 40.4628 83.3256Z'
      />

      <Raindrop
        index={2}
        animated={animated}
        animation={animation}
        d='M7.81246 83.3256C7.46668 83.3256 7.11716 83.2269 6.808 83.0208C5.97439 82.4651 5.74912 81.3389 6.30486 80.5054L8.11878 77.7845C8.67441 76.9509 9.80085 76.7257 10.6342 77.2814C11.4678 77.8371 11.6931 78.9633 11.1374 79.7968L9.32345 82.5177C8.97382 83.042 8.39858 83.3256 7.81246 83.3256Z'
      />
      <path
        d='M50.8382 42.0684C52.567 32.6379 45.3017 24 35.7969 24C30.3044 24 25.3894 26.9137 22.6809 31.4238C18.9866 30.23 15.1881 30.7388 12.0586 32.8931C8.93075 35.0463 7.06275 38.4554 6.91152 42.184C2.73212 44.153 0 48.3145 0 52.8867C0 53.6698 0.0768047 54.4532 0.228148 55.2152C1.32913 60.7581 6.23545 64.7812 11.8945 64.7812H45.9922C52.6133 64.7812 58 59.4454 58 52.8867C58 48.2066 55.1606 43.982 50.8382 42.0684ZM45.9922 61.3828H11.8945C7.25 61.3828 3.39844 57.6179 3.39844 52.8867C3.39844 49.3467 5.72489 46.1442 9.18756 44.9179L10.394 44.4907L10.3164 43.2131C10.1339 40.2111 11.5056 37.3996 13.9857 35.6923C16.6083 33.8868 19.8256 33.7621 22.7706 35.0975L24.3012 35.7916L25.012 34.2686C26.96 30.0952 31.1934 27.3984 35.7969 27.3984C42.3555 27.3984 47.6914 32.7343 47.6914 39.293C47.6914 41.233 47.2821 42.4076 46.8296 43.9629C48.0966 44.6206 48.3017 44.7425 48.7283 44.8886C52.2412 46.0919 54.6016 49.3061 54.6016 52.8867C54.6016 57.5715 50.7394 61.3828 45.9922 61.3828Z'
        fill='white'
      />
      <mask
        id='rainbow'
        mask-type='alpha'
        maskUnits='userSpaceOnUse'
        x='22'
        y='-11'
        width='119'
        height='64'
      >
        <path
          d='M50.8389 42.0677C52.5677 32.6373 45.3024 23.9994 35.7976 23.9994C30.3051 23.9994 25.3901 26.9131 22.6816 31.4231L39.0007 -10.5L139.5 -7.5L140.001 52.8861L50.8389 42.0677Z'
          fill='white'
        />
      </mask>
      <g mask='url(#rainbow)'>
        <Ray
          animated={animated}
          animation={animation}
          index={0}
          length={142.89474487304688}
          d='M28.0605 44.993C28.0614 -11.0078 124.061 -11.0081 124.061 44.9922'
          stroke='#FF5354'
          strokeWidth='5'
        />
        <Ray
          animated={animated}
          animation={animation}
          index={1}
          length={127.05452728271484}
          d='M33.0605 44.9922C33.0605 -4.34115 119.061 -4.34115 119.061 44.9922'
          stroke='#F0E65F'
          strokeWidth='5'
        />
        <Ray
          animated={animated}
          animation={animation}
          index={2}
          length={112.74224853515625}
          d='M38.0605 44.9922C38.0605 0.992189 114.061 0.992189 114.061 44.9922'
          stroke='#4FCBAD'
          strokeWidth='5'
        />
        <Ray
          animated={animated}
          animation={animation}
          index={3}
          length={96.90538024902344}
          d='M43.0605 44.9922C43.0605 7.65913 109.061 7.65858 109.061 44.9922'
          stroke='#4BF0E6'
          strokeWidth='5'
        />
        <Ray
          animated={animated}
          animation={animation}
          index={4}
          length={82.59152221679688}
          d='M48.0605 44.9922C48.0605 12.9924 104.061 12.992 104.061 44.9922'
          stroke='#D364D3'
          strokeWidth='5'
        />
      </g>
    </Wrapper>
  )
}
