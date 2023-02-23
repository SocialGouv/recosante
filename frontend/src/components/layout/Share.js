import React, { useState, useEffect, useContext } from 'react'
import styled from 'styled-components'
import { useLocation } from '@reach/router'

import UXContext from 'utils/UXContext'
import Select from 'components/base/FancySelect'
import Panel from 'components/base/Panel'
import Integration from './share/Integration'
import Link from './share/Link'
import Mail from './share/Mail'
import Facebook from './share/Facebook'
import Twitter from './share/Twitter'
import Linkedin from './share/Linkedin'
import Whatsapp from './share/Whatsapp'
import Messenger from './share/Messenger'

const ShareButtons = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 2rem;

  svg {
    display: block;
    width: 3.5rem;
    height: auto;

    ${(props) => props.theme.mq.small} {
      width: 2.5rem;
    }

    path {
      fill: ${(props) => props.theme.colors.main};
    }
  }
`
export default function Share(props) {
  const {
    shareOpen,
    toggleShareOpen,
    typeShare,
    setTypeShare,
    toggleEmbedOpen,
  } = useContext(UXContext)

  let location = useLocation()
  const [url, setUrl] = useState()
  useEffect(() => {
    setUrl(
      `${window.location.origin}/${
        typeShare === 'result' ? location.pathname.substring(1) + location.search : ''
      }`
    )
  }, [location.search, location.pathname, typeShare])

  return (
    <Panel
      small={props.small}
      id={props.small ? 'share-mobile' : null}
      open={shareOpen}
      toggleClose={toggleShareOpen}
      index={1}
    >
      <h2>
        Partager{' '}
        <Select
          fancy
          value={typeShare}
          onChange={setTypeShare}
          options={[
            { value: 'simulator', label: `Recosanté` },
            {
              value: 'result',
              label: props.place ? props.place.nom : `cette ville`,
              disabled: !props.place,
            },
          ]}
        />
      </h2>
      <ShareButtons>
        <Integration onClick={() => toggleEmbedOpen()} />
        <Mail
          subject={props.messages.mail[typeShare].subject}
          body={props.messages.mail[typeShare].body}
          url={url}
        />
        <Facebook quote={props.messages.facebook[typeShare].quote} url={url} />
        <Twitter title={props.messages.twitter[typeShare].title} url={url} />
        <Linkedin url={url} />
        <Whatsapp title={props.messages.whatsapp[typeShare].title} url={url} />
        <Messenger url={url} />
      </ShareButtons>
      <Link url={url} />
    </Panel>
  )
}
