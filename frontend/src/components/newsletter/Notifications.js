import React, { useContext, useRef } from 'react'
import styled from 'styled-components'
import { useStaticQuery, graphql } from 'gatsby'
import { MDXRenderer } from 'gatsby-plugin-mdx'

import ModalContext from 'utils/ModalContext'
import { useLocalUser } from 'hooks/useUser'
import Button from 'components/base/Button'
import Section from 'components/base/Section'
import Images from './notifications/Images'

import useOnScreen from 'hooks/useOnScreen'

const StyledSection = styled(Section)`
  display: flex;
  width: 60.5rem;

  ${(props) => props.theme.mq.medium} {
    flex-direction: column-reverse;
    align-items: center;
  }
`
const Content = styled.div`
  width: 29.25rem;
  margin-left: 2rem;

  ${(props) => props.theme.mq.medium} {
    width: 31rem;
    margin: 0 0 2rem;
  }
  ${(props) => props.theme.mq.small} {
    width: auto;
    margin: 0 0 1rem;
  }
  p {
    margin-bottom: 1em;
  }
`
const MockupWrapper = styled.div`
  flex: 1;
  position: relative;

  ${(props) => props.theme.mq.medium} {
    min-height: 14rem;
  }

  ${(props) => props.theme.mq.small} {
    min-height: auto;
  }
`
const StyledButton = styled(Button)`
  font-size: 1.125rem;

  ${(props) => props.theme.mq.small} {
    font-size: 1rem;
  }
`
export default function Notifications() {
  const data = useStaticQuery(
    graphql`
      query {
        mdx(slug: { eq: "introduction-notifications" }) {
          body
        }
      }
    `
  )

  const { setSubscription } = useContext(ModalContext)
  const { mutateUser } = useLocalUser()

  const ref = useRef()
  const isOnScreen = useOnScreen(ref)

  return (
    <StyledSection ref={ref} id='notifications'>
      <MockupWrapper>
        <Images isOnScreen={isOnScreen} />
      </MockupWrapper>
      <Content>
        <MDXRenderer>{data.mdx.body}</MDXRenderer>
        <Button.Wrapper right>
          <StyledButton
            onClick={() => {
              mutateUser({
                indicateurs: ['indice_atmo', 'raep'],
              })
              setSubscription('indicators')
              window?._paq?.push([
                'trackEvent',
                'Subscription',
                'Indicateur',
                'Tous',
              ])
            }}
            hollow
          >
            Choisir mes indicateurs
          </StyledButton>
        </Button.Wrapper>
      </Content>
    </StyledSection>
  )
}
