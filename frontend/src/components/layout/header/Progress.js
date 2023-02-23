import React, { useContext } from 'react'
import styled from 'styled-components'

import ProfileContext from 'utils/ProfileContext'

const Wrapper = styled.div`
  position: fixed;
  z-index: 110;
  top: 0;
  left: 0;
  right: 0;
  height: 0.5rem;
  background-color: ${(props) => props.theme.colors.background};

  &:before {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: ${(props) => props.theme.colors.main};
    opacity: 0;
  }

  &:after {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: ${(props) => props.theme.colors.main};
    transform: scaleX(${(props) => props.current / props.total});
    transform-origin: left;
    transition: transform 600ms ease-in-out;
  }
`
export default function Progress() {
  const { form, profile } = useContext(ProfileContext)

  return (
    <Wrapper
      current={
        form ? form.filter((step) => profile && profile[step.name]).length : 0
      }
      total={form ? form.length : 10}
    />
  )
}
