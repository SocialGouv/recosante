import React from 'react'
import styled from 'styled-components'

import useIframe from 'hooks/useIframe'

const Wrapper = styled.div`
  position: absolute;
  top: ${(props) => (props.iframe ? '5.75rem' : 0)};
  bottom: 0;
  left: -1rem;
  right: -1rem;
  background: linear-gradient(90deg, #d1edff 0%, #f8fafd 50%, #d6eeff 100%);
  border-radius: ${(props) => (props.iframe ? '2rem' : 0)};
`
export default function Background() {
  const iframe = useIframe()

  return <Wrapper iframe={iframe} />
}
