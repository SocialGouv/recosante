import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'

import Web from 'components/layout/Web'
import Newsletter from '../components/Newsletter'
import AboutQa from 'components/AboutQa'

export default function Qa() {
  const data = useStaticQuery(
    graphql`
      query {
        mdx(slug: { eq: "introduction-qa" }) {
          body
        }
      }
    `
  )

  return (
    <Web title={`Qualité de l’air`}>
      <Newsletter first data={data} type={'qa'} indicateurs={['indice_atmo']} seo />
      <AboutQa />
    </Web>
  )
}
