import React from 'react'

import useIframe from 'hooks/useIframe'
import Web from 'components/layout/Web'
import Search from 'components/Search'
import Newsletter from '../components/Newsletter'
import Data from 'components/Data'
import About from 'components/About'

export default function Index() {
  const iframe = useIframe()

  return (
    <Web>
      <Search iframe={iframe} />
      {!iframe && (
        <>
          <Newsletter />
          <Data />
          <About />
        </>
      )}
    </Web>
  )
}
