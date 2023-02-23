import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import styled from 'styled-components'

import Web from 'components/layout/Web'
import Section from 'components/base/Section'
import Button from 'components/base/Button'
import Content from 'components/Recommandations'

import apiUrl from 'utils/apiUrl'

const Title = styled.h1`
  color: ${(props) => props.theme.colors.main};
  font-size: 3.25rem;
  margin: 2rem 0;
`
const Introduction = styled.div`
  background-color: #eef1f7;
  padding: 2rem;
  margin-bottom: 2rem;
  p {
    margin-bottom: 0;
  }
`

export default function Recommandations(props) {

  const data = useStaticQuery(
    graphql`
      query {
        mdx(slug: { eq: "recommandations" }) {
          body
          frontmatter {
            title
          }
        }
      }
    `
  )

  return (
    <Web title={data.mdx.frontmatter.title}>
      <Section first medium>
        <Title>{data.mdx.frontmatter.title}</Title>
        <Introduction>
          <MDXRenderer>{data.mdx.body}</MDXRenderer>
        </Introduction>
        <Content recommandations={props.pageContext.recommandations}/>
        <Button.Wrapper center>
          <Button to={`${apiUrl}/v1/recommandations.csv`}>
            Télécharger au format CSV
          </Button>
        </Button.Wrapper>
      </Section>
    </Web>
  )

}