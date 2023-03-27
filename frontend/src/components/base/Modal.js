import React, { useEffect, useCallback } from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  position: fixed;
  z-index: 1900;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  transform: translate3d(0, 0, 1em);
  pointer-events: ${(props) => (props.open ? 'inherit' : 'none')};
  visibility: ${(props) => (props.open ? 'visible' : 'hidden')};
`
const Background = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(${(props) => props.theme.colors.backgroundAlpha}, 0.2);
  backdrop-filter: blur(1rem);
  opacity: ${(props) => (props.open ? 1 : 0)};
  transition: all ${(props) => (props.open ? 300 : 0)}ms;
`
const Content = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: ${(props) => (props.large ? '48rem' : '35.5rem')};
  max-width: calc(100% - 1rem);
  max-height: ${(props) => (props.large ? 'calc(100% - 0.5rem)' : '90vh')};
  background: rgba(${(props) => props.theme.colors.backgroundAlpha}, 1);
  border: 1px solid rgba(${(props) => props.theme.colors.mainAlpha}, 0.1);
  border-radius: 1.5rem;
  box-shadow: 0 0 2rem 0 rgba(0, 0, 0, 0.2);

  opacity: ${(props) => (props.open ? 1 : 0)};
  transform: scale(${(props) => (props.open ? 1 : 0.7)})
    translateY(${(props) => (props.open ? 0 : '10em')});
  transition: opacity ${(props) => (props.open ? 300 : 0)}ms ease-in-out,
    transform ${(props) => (props.open ? 300 : 0)}ms ease-in-out;

  ${(props) => props.theme.mq.small} {
    ${(props) =>
      props.large &&
      `
      width: 100%;
      max-width: none;
      height: 100%;
      max-height: none;
      border: none;
      border-radius: 0;
      `}
  }
  overflow: hidden;
`
const ButtonClose = styled.div`
  position: absolute;
  z-index: 10000;
  top: 0.5em;
  right: 0.5em;
  font-size: 2em;
  font-weight: bold;
  transform: rotate(45deg);
  cursor: pointer;
  line-height: 0.5;
`
const Scroll = styled.div`
  height: 100%;
  overflow-y: auto;
  padding: 2rem 2rem 1.5rem;

  ${(props) => props.theme.mq.small} {
    padding: 1.5rem 1rem;
  }
`
export default React.forwardRef(function Modal(props, ref) {

  const escKeyDown = useCallback((e) => {
    if (e.key === 'Escape') {
      props.setOpen(false)
    }
  }, [props]);

  useEffect(() => {
    if (props.open) {
      document.addEventListener("keydown", escKeyDown)
    } else {
      document.removeEventListener("keydown", escKeyDown)
    }
    return () => {
      document.removeEventListener("keydown", escKeyDown);
    };
  }, [props.open, escKeyDown]);

  return (
    <Wrapper open={props.open}>
      <Background open={props.open} onClick={() => props.setOpen(false)} />
      <Content
        ref={ref}
        open={props.open}
        large={props.large}
        textColor={props.textColor}
        backgroundColor={props.backgroundColor}
      >
        <ButtonClose onClick={() => props.setOpen(false)}>+</ButtonClose>
        <Scroll>{props.children}</Scroll>
      </Content>
    </Wrapper>
  )
})
