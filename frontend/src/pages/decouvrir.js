import React from 'react'

import Web from 'components/layout/Web'

import Introduction from 'components/presentation/Introduction'
import Section1 from 'components/presentation/Section1'
import Section2 from 'components/presentation/Section2'
import Section3 from 'components/presentation/Section3'
import Data from 'components/Data'
import About from 'components/About'

export default function presentation() {
  return (
    <Web title={'Présentation'}>
      <Introduction />
      <Section1 />
      <Section2 />
      <Section3 />
      <Data />
      <About />
    </Web>
  )
}
