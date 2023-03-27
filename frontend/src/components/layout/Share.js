import React, { useState, useEffect, useContext } from 'react'
import styled from 'styled-components'
import { useLocation } from '@reach/router'

import UXContext from 'utils/UXContext'
import Select from 'components/base/FancySelect'
import Panel from 'components/base/Panel'
import Link from './share/Link'
import Mail from './share/Mail'
import Facebook from './share/Facebook'
import Twitter from './share/Twitter'
import Linkedin from './share/Linkedin'
import Whatsapp from './share/Whatsapp'
import Messenger from './share/Messenger'

const ShareButtons = styled.ul`
  display: flex;
  justify-content: space-between;
  margin: 0;
  margin-bottom: 2rem;
  padding: 0;

  li {
    list-style: none;
  }

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
  const [title, setTitle] = useState()
  useEffect(() => {
    setTitle(
      `URL du site web Recosanté${
        typeShare === 'result' && props.place ? ' - ' + props.place.nom : ''
      }`
    )
  }, [props.place, typeShare])
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
          title='Choisissez de partager l’accueil de Recosanté ou le tableau de bord d’une ville'
        />
      </h2>
      <ShareButtons>
        <li>
          <Mail
            subject={props.messages.mail[typeShare].subject}
            body={props.messages.mail[typeShare].body}
            url={url}
          />
        </li>
        <li>
          <Facebook quote={props.messages.facebook[typeShare].quote} url={url} />
        </li>
        <li>
          <Twitter title={props.messages.twitter[typeShare].title} url={url} />
        </li>
        <li>
          <Linkedin url={url} />
        </li>
        <li>
          <Whatsapp title={props.messages.whatsapp[typeShare].title} url={url} />
        </li>
        <li>
          <Messenger url={url} />
        </li>
      </ShareButtons>
      <Link title={title} url={url} />
    </Panel>
  )
}
