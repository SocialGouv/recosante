import React from 'react'
import styled from 'styled-components'

import Marianne from 'components/base/Marianne'
import MagicLink from 'components/base/MagicLink'
import Logo from 'components/misc/Logo'

const Wrapper = styled(MagicLink)`
  display: flex;
  align-items: center;
`
export default function Logos() {
  return (
    <Wrapper to='/' aria-label='Aller à l’accueil - Recosanté - République Française, Liberté Égalité Fraternité'>
      <Marianne />
      <Logo link />
    </Wrapper>
  )
}
