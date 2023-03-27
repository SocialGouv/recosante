import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

import { useUser, useUserMutation } from 'hooks/useUser'
import TextInput from 'components/base/TextInput'
import Button from 'components/base/Button'

const Wrapper = styled.div`
  height: 3.5rem;
  margin-bottom: 6rem;
`
const Title = styled.h3``
const Email = styled.p`
  position: relative;
  color: ${(props) => props.theme.colors.main};
  cursor: pointer;
  word-break: break-all;

  &:after {
    content: '(Éditer)';
    margin-left: 0.5rem;
    font-size: 0.875rem;
    font-weight: 300;
    color: ${(props) => props.theme.colors.main};
    text-decoration: underline;
  }
`
const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  max-width: 22.25rem;
`
const StyledTextInput = styled(TextInput)`
  font-size: 1.125rem;
`
export default function Mail() {
  const { data } = useUser()
  const mutation = useUserMutation()

  const [active, setActive] = useState(false)

  const [answer, setAnswer] = useState('')
  useEffect(() => {
    setAnswer(data && (data.mail ? data.mail : ''))
  }, [data])

  return data ? (
    <Wrapper>
      <Title>Email</Title>
      {active ? (
        <Form
          onSubmit={(e) => {
            e.preventDefault()
            mutation.mutate({ mail: answer })
            setActive(false)
          }}
        >
          <StyledTextInput
            name={'email'}
            value={answer}
            onChange={(e) => setAnswer(e.value)}
          />
          <Button fetching={mutation.isLoading} noExpand>
            Valider
          </Button>
        </Form>
      ) : (
        <Email
          tabIndex={0}
          onClick={() => setActive(true)}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              e.currentTarget.click()
            }
          }}>
          {data.mail}
        </Email>
      )}
    </Wrapper>
  ) : null
}
