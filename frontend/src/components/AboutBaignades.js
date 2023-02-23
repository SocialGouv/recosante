import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import { MDXRenderer } from 'gatsby-plugin-mdx'

import Section from 'components/base/Section'

export default function AboutBaignades() {
  const data = useStaticQuery(
    graphql`
      query {
        mdx(slug: { eq: "about-baignades" }) {
          body
        }
      }
    `
  )

  return (
    <Section id='about-baignades' small>
      <MDXRenderer>{data.mdx.body}</MDXRenderer>
    </Section>
  )
}