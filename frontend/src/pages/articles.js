import React from 'react'
import { graphql, Link } from 'gatsby'
import styled from 'styled-components'
import Web from 'components/layout/Web'
import Section from 'components/base/Section'

const ArticleLink = styled(Link)`
  text-decoration: none;
`
const Title = styled.h2`
  color: ${(props) => props.theme.colors.main};
`
const Excerpt = styled.p`
  color: ${(props) => props.theme.colors.text};
`

export default function Articles(props) {
    return (
      <Web>
        <Section first medium>
          <h1>Nos articles</h1>
          {props.data.allMdx.edges.map(({ node }) => (
            <ArticleLink to={node.slug} key={node.slug}>
              <Title>{node.frontmatter.title}</Title>
              <Excerpt>{node.excerpt}</Excerpt>
            </ArticleLink>
          ))}
        </Section>
      </Web>
    )
}

export const articlesQuery = graphql
`
{
  allMdx(
    filter: { fileAbsolutePath: { regex: "/articles/" } }
    sort: { fields: [frontmatter___order], order: DESC }
  ) {
    edges {
      node {
        slug
        excerpt(pruneLength: 250)
        frontmatter {
          title
          order
        }
      }
    }
  }
}
`
