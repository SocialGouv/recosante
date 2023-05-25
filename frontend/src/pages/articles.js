import Section from "components/base/Section";
import Web from "components/layout/Web";
import { graphql, Link } from "gatsby";
import React from "react";
import styled from "styled-components";

const ArticleLink = styled(Link)`
  text-decoration: none;
`;
const Title = styled.h2`
  color: ${(props) => props.theme.colors.main};
`;
const Excerpt = styled.p`
  color: ${(props) => props.theme.colors.text};
`;

export default function Articles(props) {
  return (
    <Web title={"Nos articles"}>
      <Section first medium>
        <h1>Nos articles</h1>
        {props.data.allMdx.edges.map(({ node }) => (
          <ArticleLink to={node.fields.slug} key={node.fields.slug}>
            <Title>{node.frontmatter.title}</Title>
            <Excerpt>{node.excerpt}</Excerpt>
          </ArticleLink>
        ))}
      </Section>
    </Web>
  );
}

export const articlesQuery = graphql`
  {
    allMdx(
      filter: { internal: { contentFilePath: { regex: "/articles/" } } }
      sort: { frontmatter: { order: DESC } }
    ) {
      edges {
        node {
          fields {
            slug
          }
          excerpt(pruneLength: 250)
          frontmatter {
            title
            order
          }
        }
      }
    }
  }
`;
