import React from 'react'
import styled from 'styled-components'

import { useLocalUser, useSendProfileLink } from 'hooks/useUser'
import Button from 'components/base/Button'

const Wrapper = styled.div`
  position: absolute;
  z-index: 1200;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: stretch;
  padding: 2.5rem 2rem 1.5rem;
  background: ${(props) => props.theme.colors.background};
  border-radius: 2rem;
  opacity: ${(props) => (props.visible ? 1 : 0)};
  pointer-events: ${(props) => (props.visible ? 'inherit' : 'none')};
  transition: opacity ${(props) => (props.visible ? 300 : 0)}ms;

  ${(props) => props.theme.mq.smallish} {
    justify-content: flex-start;
  }
`
const Title = styled.h3`
  max-width: 31.5rem;
  margin: 0 auto;
  font-size: 2.5rem;
  text-align: center;

  ${(props) => props.theme.mq.smallish} {
    font-size: 1.5rem;
    margin: 0 auto 1rem;
  }
`
const Text = styled.p`
  font-size: 1.25rem;
  text-align: center;

  ${(props) => props.theme.mq.smallish} {
    font-size: 1rem;
  }
`
const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;

  ${(props) => props.theme.mq.small} {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 1rem;
    background-color: ${(props) => props.theme.colors.background};
    border-top: 0.25rem solid ${(props) => props.theme.colors.main};
  }
`
export default function Error(props) {
  const mutation = useSendProfileLink()
  const { user } = useLocalUser()

  return (
    <Wrapper visible={props.error}>
      {props?.error?.response?.data?.errors?.mail === 'mail already used' ? (
        mutation.isSuccess ? (
          <>
            <Title>Un compte est déjà associé à cet email</Title>
            <Text>
              Vous avez reçu un email contenant un lien pour modifier vos
              préférences à l'adresse : {user.mail}
            </Text>
            <ButtonWrapper></ButtonWrapper>
          </>
        ) : (
          <>
            <Title>Un compte est déjà associé à cet email</Title>
            <Text>
              Souhaitez-vous recevoir un email à cette adresse pour vous
              permettre d'éditer votre compte ?
            </Text>
            <ButtonWrapper>
              <Button onClick={props.reset} hollow noExpand>
                Essayer avec une autre adresse
              </Button>
              <Button
                onClick={() => mutation.mutate(user.mail)}
                fetching={mutation.isLoading}
                noExpand
              >
                Recevoir un email
              </Button>
            </ButtonWrapper>
          </>
        )
      ) : (
        <>
          <Title>Une erreur est survenue :(</Title>
          <Text>
            Vous pouvez réessayer dans quelques minutes. Si le problème
            persiste, n'hésitez pas à nous contacter pour nous le signaler.
          </Text>
          <ButtonWrapper>
            <Button
              to={'mailto:contact@recosante.beta.gouv.fr'}
              hollow
              noExpand
            >
              Nous contacter
            </Button>
            <Button onClick={props.reset} noExpand>
              Réessayer
            </Button>
          </ButtonWrapper>
        </>
      )}
    </Wrapper>
  )
}
