import React, { useEffect, useContext } from 'react'
import styled from 'styled-components'
import { toast } from 'react-toastify'
import { useStaticQuery, graphql } from 'gatsby'

import ModalContext from 'utils/ModalContext'
import { useUser, useUserMutation } from 'hooks/useUser'
import useNotificationsPrompt from 'hooks/useNotificationsPrompt'
import Option from 'components/subscription/question/Option'

const Wrapper = styled.div`
  margin-top: ${(props) => (props.large ? 3 : 0)}rem;
  padding-top: ${(props) => (props.large ? 3 : 0)}rem;
  border-top: ${(props) => (props.large ? 0.25 : 0)}rem solid
    rgba(${(props) => props.theme.colors.mainAlpha}, 0.2);
`
const Title = styled.h3``
const Text = styled.p``
const Options = styled.div`
  position: relative;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  margin: 0 -0.5rem 2rem;

  ${(props) => props.theme.mq.small} {
    flex-direction: column;
    justify-content: flex-start;
    align-items: stretch;
  }
`
export default function Step(props) {
  const { applicationServerKey } = useStaticQuery(
    graphql`
      query {
        applicationServerKey {
          application_server_key
        }
      }
    `
  )
  const notifications = useNotificationsPrompt(
    '/sw.js',
    applicationServerKey.application_server_key
  )

  const { setModal } = useContext(ModalContext)

  const { data } = useUser()
  const mutation = useUserMutation()

  useEffect(() => {
    if (mutation.isSuccess) {
      toast.dismiss()
      toast.success('Informations mises à jour.')
    }
  }, [mutation.isSuccess])
  useEffect(() => {
    if (mutation.isError) {
      toast.dismiss()
      toast.error(`Vos modifications n'ont pas été sauvegardées.`)
    }
  }, [mutation.isError])

  return (
    <Wrapper large={props.large} id={props.step.name}>
      <Title as={props.large ? 'h2' : 'h3'}>{props.step.title}</Title>
      <Text
        dangerouslySetInnerHTML={{
          __html: props.step.label,
        }}
      />
      {data && (
        <Options>
          {props.step.options.map((option) => (
            <Option
              key={option.value}
              option={option}
              active={
                data[props.step.name] &&
                data[props.step.name].includes(option.value)
              }
              onClick={() => {
                mutation.mutate({
                  [props.step.name]: props.step.exclusive
                    ? [option.value]
                    : data[props.step.name] &&
                      data[props.step.name].includes(option.value)
                    ? data[props.step.name].filter(
                        (userOption) => userOption !== option.value
                      )
                    : [...(data[props.step.name] || []), option.value],
                })
                if (option.value === 'notifications_web') {
                  notifications.subscribe().then((pushSubscription) => {
                    pushSubscription &&
                      mutation.mutate({
                        webpush_subscriptions_info:
                          JSON.stringify(pushSubscription),
                      })
                  })
                }
              }}
              setModal={setModal}
              checkbox={!props.step.exclusive}
            />
          ))}
        </Options>
      )}
    </Wrapper>
  )
}
