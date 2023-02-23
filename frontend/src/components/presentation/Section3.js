import React from 'react'
import { StaticImage } from 'gatsby-plugin-image'
import { useStaticQuery, graphql } from 'gatsby'
import { MDXRenderer } from 'gatsby-plugin-mdx'

import Wrapper from './Wrapper'

export default function Why() {
  const data = useStaticQuery(
    graphql`
      query {
        content: mdx(slug: { eq: "medecins-naissance" }) {
          body
        }
      }
    `
  )

  return (
    <Wrapper invert>
      <Wrapper.Content>
        <MDXRenderer>{data.content.body}</MDXRenderer>
      </Wrapper.Content>
      <Wrapper.Image width='35.5rem'>
        <StaticImage src={'./images/section3.jpg'} alt='Pourquoi' />
      </Wrapper.Image>
    </Wrapper>
  )
}
