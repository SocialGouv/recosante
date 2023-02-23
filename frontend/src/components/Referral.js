import React, { useState } from 'react'
import styled from 'styled-components'

import { useInscriptionPatients } from 'utils/api'
import TextInputWithLabel from 'components/base/TextInputWithLabel'
import TextArea from 'components/base/TextArea'
import Button from 'components/base/Button'
import Alert from 'components/base/Alert'

const Wrapper = styled.form`
  display: flex;
  flex-direction: column;
`
const Submit = styled(Button)`
  align-self: flex-end;
`
export default function Referral() {
  const [user, setUser] = useState('')
  const [patients, setPatients] = useState('')

  const mutation = useInscriptionPatients()

  const [error, setError] = useState(false)

  return (
    <Wrapper
      onSubmit={(e) => {
        e.preventDefault()
        if (!user || !patients) {
          setError(true)
        } else {
          setError(false)
          mutation.mutate(user, patients.replaceAll(', ', ',').split(','))

          window._paq &&
            window._paq.push(['trackEvent', 'Doctors', 'Mail', user])
        }
      }}
    >
      <TextInputWithLabel
        label='Votre nom et fonction'
        name='name'
        value={user.name}
        error={error && !user.name}
        onChange={({ value }) => setUser(value)}
      />
      <TextArea
        label='Les emails des patient·e·s que vous souhaitez inscrire'
        subtitle='Entrez un ou plusieurs email(s) séparés par des virgules (,).'
        name='patients'
        value={user.patients}
        error={error && !user.patients}
        onChange={({ value }) => setPatients(value)}
      />
      <Submit>Envoyer</Submit>
      {error && <Alert error>Merci de remplir tous les champs</Alert>}
      {mutation.isError && (
        <Alert error>
          Une erreur est survenue. Une ou plusieurs invitations n'ont pas pu
          être envoyé.
        </Alert>
      )}
      {mutation.isSuccess && <Alert>Les invitations ont été envoyées</Alert>}
    </Wrapper>
  )
}
