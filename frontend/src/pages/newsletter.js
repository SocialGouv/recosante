import React from 'react'

import Web from 'components/layout/Web'
import Search from 'components/Search'
import Newsletter from '../components/Newsletter'
import Widget from 'components/Widget'
import Data from 'components/Data'
import About from 'components/About'

export default function NewsletterPage() {
  return (
    <Web title={`Lettre d'information`}>
      <Newsletter first />
      <Search />
      <Widget />
      <Data />
      <About />
    </Web>
  )
}
