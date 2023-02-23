import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'

import Web from 'components/layout/Web'
import Newsletter from '../components/Newsletter'
import AboutUv from 'components/AboutUv'

export default function Uv() {
  const data = useStaticQuery(
    graphql`
      query {
        mdx(slug: { eq: "introduction-uv" }) {
          body
        }
      }
    `
  )

  return (
    <Web title={`UV`}>
      <Newsletter first data={data} type={'uv'} indicateurs={['indice_uv']} seo />
      <AboutUv />
    </Web>
  )
}