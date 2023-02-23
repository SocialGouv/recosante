import React from 'react'

import Button from 'components/base/Button'

export default function InactiveProfile() {
  return (
    <div>
      <p>
        Votre compte est désactivé.
      </p>
      <Button.Wrapper left>
        <Button to='/'>Retourner à l'accueil</Button>
      </Button.Wrapper>
    </div>
  )
}