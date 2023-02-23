import React, { useEffect, useContext } from 'react'
import styled from 'styled-components'

import useIframe from 'hooks/useIframe'
import ModalContext from 'utils/ModalContext'
import Button from 'components/base/Button'
import Select from 'components/base/FancySelect'
import { useUserMutation } from 'hooks/useUser'

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

  ${(props) => props.theme.mq.small} {
    padding: 1rem 1rem 0;
  }
`
const Title = styled.h3`
  max-width: 31.5rem;
  margin: 0 auto;
  font-size: 2.5rem;
  text-align: center;

  ${(props) => props.theme.mq.smallish} {
    font-size: 1.5rem;
  }
`
const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;

  ${(props) => props.theme.mq.small} {
    flex-direction: column;

    button {
      margin-bottom: 1rem;
    }
  }
`
const StyledButton = styled(Button)`
  ${(props) => props.theme.mq.small} {
    margin-bottom: 1rem;
  }
`
const Small = styled.span`
  display: none;
  ${(props) => props.theme.mq.small} {
    display: inline;
  }
`
const Large = styled.span`
  display: inline;
  ${(props) => props.theme.mq.small} {
    display: none;
  }
`
export default function Success(props) {
  const iframe = useIframe()

  const { setSubscription, setNeedConfirmation } = useContext(ModalContext)

  useEffect(() => {
    setNeedConfirmation(false)
  }, [setNeedConfirmation])
  const newsletter = props?.data?.data?.recommandations[0] === 'oui'
  if (props.data) {
    window?._paq?.push(['trackEvent', 'Subscription', 'Success'])
  }

  const mutation = useUserMutation()
  const uid = props?.data?.data?.uid
  const authentication_token = props?.data?.data?.authentication_token

  return (
    <Wrapper visible={props.data}>
      <Title>
        <strong>Félicitations</strong> !<br /> Vous êtes maintenant abonné·e aux{' '}
        <strong>indicateurs</strong>{' '}
        {newsletter ? (
          <>
            et aux <strong>recommandations hebdomadaires</strong>
          </>
        ) : (
          <>de votre choix</>
        )}
        .
      </Title>
      {uid && authentication_token && (
        <>
          <p>
            Une dernière chose... Dites-nous comment on s’est connu ?<br />
            Je vous ai découvert{' '}
            <Select
              fancy
              value={mutation?.data?.data?.connaissance_produit[0]}
              onChange={(value) => {
                mutation.mutate({ connaissance_produit: [value], uid: uid, authentication_token: authentication_token })
              }}
              options={[
                { value: '', label: '', disabled: true },
                { value: 'reseaux_sociaux', label: 'sur les réseaux sociaux' },
                { value: 'publicite', label: 'dans une publicité' },
                { value: 'ami', label: 'grâce à un·e proche' },
                { value: 'association', label: `via une association` },
                { value: 'medecin', label: 'grâce à mon médecin' },
                { value: 'pro', label: 'durant mon activité professionnelle' },
                { value: 'autrement', label: `par un autre moyen` },
              ]}
            />{' '}!
          </p>
          <ButtonWrapper newsletter={newsletter}>
            <StyledButton
              to={`/profil/?user=${uid}&token=${authentication_token}${iframe ? '&iframe=1' : ''
                }`}
              onClick={() => {
                window?._paq?.push(['trackEvent', 'Subscription', 'Profil', 'Informations'])
              }}
              hollow
            >
              Modifier mes informations
            </StyledButton>
            {newsletter ? (
              <StyledButton onClick={() => setSubscription(null)}>
                <Small>Revenir à l'accueil</Small>
                <Large>Fermer cette fenêtre</Large>
              </StyledButton>
            ) : (
              <StyledButton
                to={`/profil/?user=${uid}&token=${authentication_token}${iframe ? '&iframe=1' : ''
                  }`}
                onClick={() => {
                  window?._paq?.push(['trackEvent', 'Subscription', 'Profil', 'Recommandations'])
                }}
              >
                M’abonner aux recommandations
              </StyledButton>
            )}
          </ButtonWrapper>
        </>
      )}
    </Wrapper>
  )
}
