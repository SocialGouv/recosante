import React from 'react'
import styled from 'styled-components'

import Submit from './textInput/Submit'
import Geoloc from './textInput/Geoloc'

const Wrapper = styled.div`
  position: relative;
  // overflow: hidden;
`
const Input = styled.input`
  width: 100%;
  padding: 0.375em 2.25em 0.375em 0.75em;
  font-size: 1em;
  line-height: 1.55;
  color: ${(props) => props.theme.colors.text};
  background: transparent;
  border: none;

  &::placeholder {
    color: ${(props) => props.theme.colors.text};
    opacity: 0.4;
  }
  &:focus {
    outline: none;
  }
`
const Suggestion = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  white-space: nowrap;
  opacity: ${(props) => (props.visible ? (props.isFetching ? 0.25 : 0.75) : 0)};
  pointer-events: none;
  transition: opacity ${(props) => (props.visible ? 200 : 0)}ms;
`
const Invisible = styled.div`
  opacity: 0;
  padding: 0.375em 0.25em 0.375em 0.75em;
  font-size: 1em;
  line-height: 1.55;
`
const Visible = styled.div`
  position: relative;
  margin-top: 0.1em;
  padding-left: 1em;
  font-size: 0.875rem;

  &:before {
    content: '';
    position: absolute;
    top: 50%;
    left: 0.1em;
    width: 0.5em;
    height: 1px;
    background-color: ${(props) => props.theme.colors.text};
  }
`
export default React.forwardRef(function TextInput(props, ref) {
  return (
    <Wrapper>
      <Input
        ref={ref}
        type='text'
        placeholder={props.placeholder || 'Entrez votre ville'}
        value={props.search}
        onChange={(e) => props.setSearch(e.target.value)}
        onFocus={() => props.setFocus(true)}
        onBlur={() => props.setFocus(false)}
      />
      <Suggestion
        visible={props.suggestion && props.suggestionVisible && props.search}
        isFetching={props.isFetching}
      >
        <Invisible>{props.search}</Invisible>
        {props.suggestion && <Visible>{props.suggestion['nom']}</Visible>}
      </Suggestion>
      <Submit
        visible={props.suggestion && props.suggestionVisible && props.search}
        setFocus={props.setFocus}
      />
      <Geoloc
        visible={!(props.suggestion && props.suggestionVisible && props.search)}
        handlePlaceSelection={props.handlePlaceSelection}
      />
    </Wrapper>
  )
})
