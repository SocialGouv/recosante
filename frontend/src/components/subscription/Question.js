import React from 'react'
import styled from 'styled-components'

import { useLocalUser } from 'hooks/useUser'
import Option from './question/Option'
import Disclaimer from './question/Disclaimer'
import DisclaimerIos from './question/DisclaimerIos'

const Wrapper = styled.div`
  position: relative;
  z-index: 2;
  padding-top: 2rem;

  ${(props) => props.theme.mq.small} {
    flex: 1;
    padding-top: 1.5rem;
  }
`
const Label = styled.label`
  display: block;
  min-height: 2.75rem;
  margin-bottom: 1.625rem;
  font-weight: 300;
  text-align: center;

  ${(props) => props.theme.mq.smallish} {
    margin-bottom: 1.5rem;
  }
`
const Options = styled.div`
  position: relative;
  display: flex;
  flex-wrap: wrap;
  justify-content: ${(props) =>
    props.options.length === 4 ? 'space-between' : 'space-around'};
  margin: 0 -0.5rem 3.5rem;

  ${(props) => props.theme.mq.smallish} {
    justify-content: center;
    align-items: center;
    min-height: 22rem;
    margin-bottom: 1.5rem;
  }
  ${(props) => props.theme.mq.small} {
    flex-direction: column;
    justify-content: flex-start;
    align-items: stretch;
    margin-bottom: 4rem;
  }
`
export default function Question(props) {
  const { user, mutateUser } = useLocalUser()

  return (
    <Wrapper>
      <Label
        dangerouslySetInnerHTML={{
          __html: props.step.label,
        }}
      />
      <Options options={props.step.options}>
        {props.step.options.map((option) => (
          <Option
            key={option.value}
            option={option}
            active={
              user[props.step.name] &&
              user[props.step.name].includes(option.value)
            }
            checkbox={!props.step.exclusive}
            onClick={() => {
              mutateUser({
                [props.step.name]: props.step.exclusive
                  ? [option.value]
                  : user[props.step.name] &&
                    user[props.step.name].includes(option.value)
                  ? user[props.step.name].filter(
                      (userOption) => userOption !== option.value
                    )
                  : [...(user[props.step.name] || []), option.value],
              })
            }}
            setModal={props.setModal}
          />
        ))}
        {props.step.name === 'recommandations' && (
          <Disclaimer setModal={props.setModal} />
        )}
        {props.step.name === 'indicateurs_media' && <DisclaimerIos />}
      </Options>
    </Wrapper>
  )
}
