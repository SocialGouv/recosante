import React from 'react'

import useIframe from 'hooks/useIframe'
import Web from 'components/layout/Web'
import Dashboard from 'components/Dashboard'
import Newsletter from '../components/Newsletter'
import Data from 'components/Data'
import About from 'components/About'

export default function Place(props) {
  const iframe = useIframe()

  return (
    <Web title={props.pageContext.place.nom} place={props.pageContext.place}>
      <Dashboard place={props.pageContext.place} iframe={iframe} />
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
