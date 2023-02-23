import React, { useState } from 'react'
import styled from 'styled-components'

import { useLocalUser, useUserMutation } from 'hooks/useUser'
import { useAvailability } from 'hooks/useSearch'
import TextInput from 'components/base/TextInput'
import Alert from 'components/base/Alert'
import MagicLink from 'components/base/MagicLink'
import SearchBar from 'components/search/SearchBar'
import NavigationIdentity from './identity/NavigationIdentity'
import Error from './identity/Error'
import Success from './identity/Success'

const Wrapper = styled.div`
  padding-top: 2rem;

  ${(props) => props.theme.mq.small} {
    padding-top: 1.5rem;
  }
`
const Label = styled.label`
  display: block;
  margin-bottom: 3rem;
  font-weight: 300;
  text-align: center;

  ${(props) => props.theme.mq.smallish} {
    margin-bottom: 6rem;
  }
`

const SearchBarWrapper = styled.div`
  position: relative;
  width: 22.25rem;
  height: 3rem;
  margin: 0 auto 3rem;

  ${(props) => props.theme.mq.smallish} {
    margin-bottom: 6rem;
  }
  ${(props) => props.theme.mq.small} {
    width: 100%;
  }
`
const StyledSearchBar = styled(SearchBar)`
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  transform: none !important;
  font-size: 1.25rem;
  ${(props) => props.error && `border-color: ${props.theme.colors.error}`}
`
const StyledAlert = styled(Alert)`
  margin: -2rem 0 1rem;
`
const MailInput = styled(TextInput)`
  display: block;
  width: 22.25rem;
  margin: 0 auto 5.5rem;
  font-size: 1.25rem;

  ${(props) => props.theme.mq.smallish} {
    margin-bottom: 7rem;
  }
  ${(props) => props.theme.mq.small} {
    width: 100%;
  }
`
const DataDisclaimer = styled.div`
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 22.25rem;
  text-align: center;
  font-size: 0.75rem;
  font-weight: lighter;
  color: ${(props) => props.theme.colors.footer};
`

export default function Identity(props) {
  const { user, mutateUser } = useLocalUser()

  const { data: availability } = useAvailability(user.commune?.code)
  const mutation = useUserMutation()

  const [error, setError] = useState(false)

  return (
    <Wrapper>
      <Label>Je valide mes informations personnelles.</Label>
      <SearchBarWrapper>
        <StyledSearchBar
          initialValue={user.commune && user.commune.nom}
          handlePlaceSelection={(place) => {
            mutateUser({ commune: place })
          }}
          error={error && !user.commune}
        />
      </SearchBarWrapper>
      {availability && !availability.availability && (
        <StyledAlert error>
          Les indicateurs de cette commune ne sont pas disponibles. Vous pouvez
          quand même vous inscrire à la lettre d'information hebdomadaire si
          vous le souhaitez
        </StyledAlert>
      )}
      <form
        onSubmit={(e) => {
          e.preventDefault()
          e.stopPropagation()
          if (!user.commune) {
            setError(true)
          } else {
            setError(false)
            mutation.mutate(user)
          }
        }}
      >
        <MailInput
          type='email'
          name='email'
          placeholder='Entrez votre email'
          value={user.mail}
          onChange={({ value }) => mutateUser({ mail: value })}
          required
        />
        <DataDisclaimer>Les <MagicLink to='https://recosante.beta.gouv.fr/donnees-personnelles'>données collectées</MagicLink> lors de votre inscription sont utilisées dans le cadre d’une mission de service public dont les responsables de traitement sont la DGS et la DGPR. Recosanté suit l’ouverture et les interactions avec les emails reçus. Vous pouvez à tout moment vous opposer à ces traitements en vous désinscrivant.</DataDisclaimer>
        <NavigationIdentity
          setPreviousStep={props.setPreviousStep}
          fetching={mutation.isLoading}
        />
      </form>
      <Error error={mutation.error} reset={mutation.reset} />
      <Success data={mutation.data} />
    </Wrapper>
  )
}
