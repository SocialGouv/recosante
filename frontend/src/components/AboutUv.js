import React from 'react'
import styled from 'styled-components'
import { useStaticQuery, graphql } from 'gatsby'
import { MDXRenderer } from 'gatsby-plugin-mdx'

import Section from 'components/base/Section'
import Button from 'components/base/Button'

const StyledButton = styled(Button)`
  font-size: 1.25rem;
`

export default function AboutUv() {
  const data = useStaticQuery(
    graphql`
      query {
        mdx(slug: { eq: "about-uv" }) {
          body
        }
      }
    `
  )

  return (
    <Section id='about-uv' small>
      <MDXRenderer>{data.mdx.body}</MDXRenderer>
      <Button.Wrapper center>
        <StyledButton hollow to='/'>
          Consulter l’indice UV de ma commune
        </StyledButton>
      </Button.Wrapper>
    </Section>
  )
}