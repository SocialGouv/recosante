import React, { useState } from 'react'
import styled from 'styled-components'
import AnimateHeight from 'react-animate-height'

import useWindowSize from 'hooks/useWindowSize'
import Subscribe from './Subscribe'

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  text-align: center;
`
const ButtonMore = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 2rem;
  height: 2rem;
  background-color: ${(props) => props.theme.colors.background};
  border: 0.125rem solid ${(props) => props.theme.colors.main};
  border-radius: 0.5rem;
  padding: 0;
  svg {
    width: 1rem;
    height: 1rem;
  }
  path {
    fill: ${(props) => props.theme.colors.main};
  }
`
export default function Recommandation(props) {
  const [open, setOpen] = useState(false)

  const { width } = useWindowSize()
  return width > 640 ? (
    props.children
  ) : (
    <>
      <AnimateHeight duration={300} height={open ? 'auto' : 0}>
        {props.children}
      </AnimateHeight>
      <Wrapper>
        <Subscribe
          indicateur={props.indicateur}
          place={props.place}
          disabled={props.disabled}
        />
        <ButtonMore onClick={() => setOpen((prevOpen) => !prevOpen)} noExpand>
          {open ? (
            <svg width='448' height='448' viewBox='0 0 448 448'>
              <path d='M408 184H272C63.9316 184 317.375 184 176 184H40C17.9102 184 0 201.91 0 224C0 246.09 17.9102 264 40 264H176C408.194 264 130.625 264 272 264H408C430.09 264 448 246.09 448 224C448 201.91 430.09 184 408 184Z' />
            </svg>
          ) : (
            <svg width='448' height='448' viewBox='0 0 448 448'>
              <path d='M408 184H272C267.582 184 264 180.418 264 176V40C264 17.9102 246.09 0 224 0C201.91 0 184 17.9102 184 40V176C184 180.418 180.418 184 176 184H40C17.9102 184 0 201.91 0 224C0 246.09 17.9102 264 40 264H176C180.418 264 184 267.582 184 272V408C184 430.09 201.91 448 224 448C246.09 448 264 430.09 264 408V272C264 267.582 267.582 264 272 264H408C430.09 264 448 246.09 448 224C448 201.91 430.09 184 408 184Z' />
            </svg>
          )}
        </ButtonMore>
      </Wrapper>
    </>
  )
}
