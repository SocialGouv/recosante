import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'

import Web from 'components/layout/Web'
import Newsletter from '../components/Newsletter'
import Data from 'components/Data'
import About from 'components/About'

export default function Asthme() {
  const data = useStaticQuery(
    graphql`
      query {
        mdx(slug: { eq: "introduction-pollen" }) {
          body
        }
      }
    `
  )

  return (
    <Web title={`Allerte pollen`}>
      <Newsletter first data={data} seo />
      <Data />
      <About />
    </Web>
  )
}
