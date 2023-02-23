import React from 'react'
import styled from 'styled-components'

import Web from 'components/layout/Web'
import Section from 'components/base/Section'
import Profile from 'components/subscription/Profile'

const StyledSection = styled(Section)``
export default function Profil(props) {
  return (
    <Web title={'Profil'}>
      <StyledSection first medium>
        <Profile />
      </StyledSection>
    </Web>
  )
}
