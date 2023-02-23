import React, { useState } from 'react'
import styled from 'styled-components'

import TextInput from 'components/base/TextInput'

const Wrapper = styled.div`
  position: relative;
  margin-bottom: 1.5rem;
  font-size: 1.375rem;

  ${(props) => props.theme.mq.small} {
    font-size: 1rem;
  }
`
const Label = styled.label`
  position: absolute;
  display: block;
  padding: 0.5em 0.75em;
  transform: translateY(${(props) => (props.small ? '-100%' : 0)});
  font-size: ${(props) => (props.small ? '0.6em' : '1em')};
  opacity: ${(props) => (props.small ? '1' : '0.7')};
  pointer-events: ${(props) => (props.small ? 'inherit' : 'none')};
  transition: all 200ms ease-out;
`
const Input = styled(TextInput)`
  margin: 0;

  ${(props) => props.theme.mq.small} {
    background-color: ${(props) => props.theme.colors.background};
  }
`
export default function MailInput(props) {
  const [focus, setFocus] = useState(false)

  return (
    <Wrapper className={props.className}>
      {props.label && (
        <Label htmlFor={props.name} small={focus || props.value}>
          {props.label}
        </Label>
      )}
      <Input
        type={'email'}
        name={props.name}
        value={props.value}
        onChange={props.onChange}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        required
      />
    </Wrapper>
  )
}
