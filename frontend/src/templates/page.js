import React from 'react'
import { graphql } from 'gatsby'

import Web from 'components/layout/Web'
import Section from 'components/base/Section'

export default function Page(props) {
  return (
    <Web title={props.data.mdx.frontmatter.title}>
      <Section first medium>
        <h1
          dangerouslySetInnerHTML={{
            __html: props.data.mdx.frontmatter.title,
          }}
        />
        {props.children}
      </Section>
    </Web>
  )
}

export const pageQuery = graphql`
  query Page($slug: String!) {
    mdx(fields: { slug: { eq: $slug } }) {
      frontmatter {
        title
      }
    }
  }
`
