import React, { useState } from 'react'
import styled from 'styled-components'
import IframeResizer from 'iframe-resizer-react'

import { formatPlaceUrl } from 'utils/formatPlaceUrl'
import useWindowSize from 'hooks/useWindowSize'
import Section from 'components/base/Section'
import Code from 'components/widget/Code'
import Options from 'components/widget/Options'

const StyledSection = styled(Section)`
  display: flex;
  justify-content: space-between;

  ${(props) => props.theme.mq.medium} {
    flex-direction: column;
    align-items: center;
  }
`
const Configurator = styled.div`
  max-width: 25rem;
  margin-top: 2rem;

  ${(props) => props.theme.mq.medium} {
    margin-top: 0;
  }
`
const MainTitle = styled.h1`
  width: 29.25rem;

  ${(props) => props.theme.mq.medium} {
    width: auto;
  }
`
const Title = styled.h2`
  width: 29.25rem;

  ${(props) => props.theme.mq.medium} {
    width: auto;
  }
`
const StyledIframe = styled(IframeResizer)`
  display: block;
  width: 36rem;
  border: none;

  ${(props) => props.theme.mq.medium} {
    width: 100%;
  }
`

export default function Widget(props) {
  const [defaultPlace, setDefaultPlace] = useState(null)

  const url = 'https://recosante.beta.gouv.fr'

  const { width } = useWindowSize()

  return !props.home || width > 700 ? (
    <StyledSection first={props.main}>
      <Configurator>
        {props.main ? (
          <MainTitle>
            Intégrez <strong>Recosanté</strong>
            <br /> sur votre site
          </MainTitle>
        ) : (
          <Title large>
            Intégrez <strong>Recosanté</strong>
            <br /> sur votre site
          </Title>
        )}
        <Code defaultPlace={defaultPlace} url={url} />
        <Options setDefaultPlace={setDefaultPlace} />
      </Configurator>
      <StyledIframe
        src={`${url}${
          defaultPlace ? formatPlaceUrl(defaultPlace) : '/'
        }?iframe=1`}
        allowFullScreen={true}
        allow='geolocation'
      />
    </StyledSection>
  ) : null
}
