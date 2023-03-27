import React from 'react'
import { StaticImage } from 'gatsby-plugin-image'
import { useStaticQuery, graphql } from 'gatsby'
import { MDXRenderer } from 'gatsby-plugin-mdx'

import Wrapper from './Wrapper'

export default function Section1() {
  const data = useStaticQuery(
    graphql`
      query {
        content: mdx(slug: { eq: "medecins-comment" }) {
          body
        }
      }
    `
  )

  return (
    <Wrapper>
      <Wrapper.Content>
        <MDXRenderer>{data.content.body}</MDXRenderer>
      </Wrapper.Content>
      <Wrapper.Image width='35.5rem'>
        <StaticImage src={'./images/section1.jpg'} alt='' />
      </Wrapper.Image>
    </Wrapper>
  )
}
