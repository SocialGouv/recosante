import React from 'react'
import { graphql } from 'gatsby'
import { MDXRenderer } from 'gatsby-plugin-mdx'

import Web from 'components/layout/Web'
import Section from 'components/base/Section'

export default function Page(props) {
  return (
    <Web>
      <Section first medium>
        <h1
          dangerouslySetInnerHTML={{
            __html: props.data.mdx.frontmatter.title,
          }}
        />
        <MDXRenderer>{props.data.mdx.body}</MDXRenderer>
      </Section>
    </Web>
  )
}

export const pageQuery = graphql`
  query page($slug: String!) {
    mdx(slug: { eq: $slug }) {
      body
      frontmatter {
        title
      }
    }
  }
`
