import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.input`
  width: 100%;
  margin-bottom: 1rem;
  padding: 0.5em 0.75em;
  line-height: inherit;
  background-color: ${(props) => props.theme.colors.input};
  box-shadow: inset 0 -2px 0 0 ${(props) => props.theme.colors[props.error ? 'error' : 'main']};
  border: none;
  border-radius: 0.25em 0.25em 0 0;
`
export default function TextInput(props) {
  return (
    <Wrapper
      className={props.className}
      autoComplete={props.autoComplete}
      type={props.type || 'text'}
      id={props.name}
      name={props.name}
      list={props.list}
      value={props.value}
      error={props.error}
      placeholder={props.placeholder}
      required={props.required}
      onChange={(e) => {
        props.onChange({ value: e.currentTarget.value, name: props.name })
      }}
      onFocus={props.onFocus}
      onBlur={props.onBlur}
    />
  )
}
