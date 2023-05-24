import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'

import Markdown from 'components/base/Markdown'
import Section from 'components/base/Section'

export default function Data() {
  const data = useStaticQuery(
    graphql`
      query {
        mdx(fields: { slug: { eq: "data" } }) {
          body
        }
      }
    `
  )

  return (
    <Section id='data' small>
      <Markdown>{data.mdx.body}</Markdown>
    </Section>
  )
}
