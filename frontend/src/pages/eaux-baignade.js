import React from 'react'
import styled from 'styled-components'
import { useStaticQuery, graphql } from 'gatsby'

import Web from 'components/layout/Web'
import Newsletter from '../components/Newsletter'
import AboutBaignades from 'components/AboutBaignades'
import useIframe from 'hooks/useIframe'
import Search from 'components/Search'

const StyledSearch = styled(Search)`
    margin-bottom: 0;
`
export default function EauBaignade() {
  const iframe = useIframe()
  const data = useStaticQuery(
    graphql`
      query {
        mdx(slug: { eq: "introduction-baignades" }) {
          body
        }
      }
    `
  )

  return (
    <Web title={`Eaux de baignade`}>
      <Newsletter first data={data} type={'baignades'} seo />
      <AboutBaignades />
      {!iframe && (
        <>
          <StyledSearch />
        </>
      )}
    </Web>
  )
}