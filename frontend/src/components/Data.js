import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import { MDXRenderer } from 'gatsby-plugin-mdx'

import Section from 'components/base/Section'

export default function Data() {
  const data = useStaticQuery(
    graphql`
      query {
        mdx(slug: { eq: "data" }) {
          body
        }
      }
    `
  )

  return (
    <Section id='data' small>
      <MDXRenderer>{data.mdx.body}</MDXRenderer>
    </Section>
  )
}
