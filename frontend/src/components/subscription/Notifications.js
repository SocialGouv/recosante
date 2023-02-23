import React from 'react'
import styled from 'styled-components'
import { useStaticQuery, graphql } from 'gatsby'
import { MDXRenderer } from 'gatsby-plugin-mdx'

import Button from 'components/base/Button'
import Images from 'components/newsletter/notifications/Images'

const Wrapper = styled.div`
  position: absolute;
  z-index: 3;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1.5rem 2rem;
  background: ${(props) => props.theme.colors.background};
  border-radius: 2rem;
  opacity: ${(props) => (props.visible ? 1 : 0)};
  pointer-events: ${(props) => (props.visible ? 'inherit' : 'none')};
  transition: opacity 300ms;

  ${(props) => props.theme.mq.small} {
    padding: 1rem;
  }
`
const ImagesWrapper = styled.div`
  height: 15.1rem;

  ${(props) => props.theme.mq.small} {
    height: 8.5rem;
  }
`
const StyledButton = styled(Button)`
  position: absolute;
  bottom: 1.5rem;
  right: 2rem;

  ${(props) => props.theme.mq.small} {
    bottom: 1rem;
    right: 1rem;
  }
`
export default function Notifications(props) {
  const data = useStaticQuery(
    graphql`
      query {
        mdx(slug: { eq: "notifications-modal" }) {
          body
        }
      }
    `
  )
  return (
    <Wrapper visible={props.modal === 'notifications'}>
      <ImagesWrapper>
        <Images isOnScreen={true} />
      </ImagesWrapper>
      <MDXRenderer>{data.mdx.body}</MDXRenderer>
      <StyledButton onClick={() => props.setModal(false)} noExpand>
        J'ai compris
      </StyledButton>
    </Wrapper>
  )
}
