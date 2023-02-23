import React, { useRef } from 'react'
import styled from 'styled-components'

import useOnScreen from 'hooks/useOnScreen'
import Section from 'components/base/Section'

const Columns = styled.div`
  display: flex;
  flex-direction: ${(props) => (props.invert ? 'row' : 'row-reverse')};
  align-items: center;
  margin-left: -1rem;
  margin-right: -1rem;

  ${(props) => props.theme.mq.medium} {
    flex-direction: column-reverse;
    align-items: center;
    margin-bottom: 3rem;
  }
`
function Wrapper(props) {
  const ref = useRef()
  const isOnScreen = useOnScreen(ref, '-200px', 0)
  return (
    <Section ref={ref}>
      <Columns invert={props.invert} className={isOnScreen ? 'onScreen' : null}>
        {props.children}
      </Columns>
    </Section>
  )
}

Wrapper.Content = styled.div`
  flex: 1;
  margin: 0 1rem;

  p {
    margin-bottom: 1rem;
  }
`
Wrapper.Image = styled.div`
  position: relative;
  width: ${(props) => props.width};
  max-width: 90vw;
  margin: 0 1rem;
  border-radius: 1.5rem;
  box-shadow: 1rem 1rem 4rem rgba(0, 0, 0, 0.2);
  overflow: hidden;
  opacity: 0;
  transform: translateY(80%);
  transition: opacity 600ms, transform 600ms ease-in-out;

  .onScreen & {
    opacity: 1;
    transform: translateY(0);
  }
  img {
    border-radius: 1.5rem;
  }

  ${(props) => props.theme.mq.medium} {
    margin-bottom: 2rem;
    opacity: 1;
    transform: translateY(0);
  }
`
export default Wrapper
