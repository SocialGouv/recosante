import React, { useRef } from 'react'
import styled from 'styled-components'
import { useStaticQuery, graphql } from 'gatsby'
import { MDXRenderer } from 'gatsby-plugin-mdx'

import useOnScreen from 'hooks/useOnScreen'
import Section from 'components/base/Section'

const StyledSection = styled(Section)`
  opacity: ${(props) => (props.isOnScreen ? 1 : 0)};
  transform: translateY(${(props) => (props.isOnScreen ? 0 : '25%')});
  transition: opacity 600ms, transform 900ms ease-out;

  ${(props) => props.theme.mq.small} {
    transform: none;
    opacity: 1;
  }
  ul {
    margin: 0;
    padding: 0;
  }
  li {
    position: relative;
    margin-bottom: 1.5rem;
    padding-left: 3rem;
    font-size: 1.125rem;
    list-style: none;

    &:before {
      content: '';
      position: absolute;
      top: 0.25rem;
      left: 0.5rem;
      width: 2rem;
      height: 2rem;
      background-image: url('data:image/svg+xml;utf8,<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M19.9999 0C14.184 0 9.453 4.73102 9.453 10.5469C9.453 16.3627 14.184 21.0938 19.9999 21.0938C25.8157 21.0938 30.5468 16.3627 30.5468 10.5469C30.5468 4.73102 25.8157 0 19.9999 0Z" fill="%23000091"/><path d="M37.3812 31.1469C34.2284 26.417 28.9514 23.5938 23.2683 23.5938H16.7314C11.0483 23.5938 5.77144 26.417 2.61863 31.1469L2.42175 31.4421V40H37.578H37.5781V31.4421L37.3812 31.1469Z" fill="%23000091"/></svg>');
      background-size: 2rem;
      opacity: ${(props) => (props.animationIsOnScreen ? 1 : 0)};
      transition: opacity 1000ms;
    }

    &:nth-child(2) {
      &:before {
        transition-delay: 300ms;
      }
    }
  }
`
export default function Who() {
  const data = useStaticQuery(
    graphql`
      query {
        mdx(slug: { eq: "medecins-pour-qui" }) {
          body
        }
      }
    `
  )

  const ref = useRef()
  const isOnScreen = useOnScreen(ref, '-100px', 0)
  const animationIsOnScreen = useOnScreen(ref)

  return (
    <StyledSection
      ref={ref}
      isOnScreen={isOnScreen}
      animationIsOnScreen={animationIsOnScreen}
      small
    >
      <MDXRenderer>{data.mdx.body}</MDXRenderer>
    </StyledSection>
  )
}
