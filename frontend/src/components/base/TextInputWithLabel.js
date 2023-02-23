import React from 'react'
import styled from 'styled-components'

import TextInput from 'components/base/TextInput'

const Wrapper = styled.div`
  margin-bottom: 1rem;
`
const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  color: ${(props) => props.theme.colors[props.error ? 'error' : 'text']};
`
export default function TextInputWithLabel(props) {
  return (
    <Wrapper className={props.className}>
      {props.label && (
        <Label htmlFor={props.name} error={props.error}>
          {props.label}
        </Label>
      )}
      <TextInput
        type={props.type}
        name={props.name}
        value={props.value}
        error={props.error}
        onChange={props.onChange}
      />
    </Wrapper>
  )
}
