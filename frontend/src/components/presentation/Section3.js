import React from 'react'
import { StaticImage } from 'gatsby-plugin-image'
import { useStaticQuery, graphql } from 'gatsby'

import Markdown from 'components/base/Markdown'
import Wrapper from './Wrapper'

export default function Why() {
  const data = useStaticQuery(
    graphql`
      query {
        content: mdx(fields: { slug: { eq: "medecins-naissance" } }) {
          body
        }
      }
    `
  )

  return (
    <Wrapper invert>
      <Wrapper.Content>
        <Markdown>{data.content.body}</Markdown>
      </Wrapper.Content>
      <Wrapper.Image width='35.5rem'>
        <StaticImage src={'./images/section3.jpg'} alt='' />
      </Wrapper.Image>
    </Wrapper>
  )
}
