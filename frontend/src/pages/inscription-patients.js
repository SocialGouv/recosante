import React from 'react'
import styled from 'styled-components'
import { useStaticQuery, graphql } from 'gatsby'
import { MDXRenderer } from 'gatsby-plugin-mdx'

import Web from 'components/layout/Web'
import Section from 'components/base/Section'
import Referral from 'components/Referral'

const StyledSection = styled(Section)`
  font-size: 1.125rem;
`
export default function InscriptionPatients() {
  const data = useStaticQuery(
    graphql`
      query {
        mdx(slug: { eq: "inscription-patients" }) {
          body
        }
      }
    `
  )

  return (
    <Web title={'Recommander Recosanté'}>
      <StyledSection small first>
        <MDXRenderer>{data.mdx.body}</MDXRenderer>
        <Referral />
      </StyledSection>
    </Web>
  )
}
