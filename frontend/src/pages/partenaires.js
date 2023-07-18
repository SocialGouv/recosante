import { graphql, useStaticQuery } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import React from "react";
import styled from "styled-components";

import MagicLink from "components/base/MagicLink";
import Markdown from "components/base/Markdown";
import Section from "components/base/Section";
import Web from "components/layout/Web";

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  margin: 0 -0.5rem;
`;
const Logo = styled(MagicLink)`
  width: 7rem;
  margin: 0.5rem;
`;
export default function Partners(props) {
  const data = useStaticQuery(
    graphql`
      query {
        mdx(fields: { slug: { eq: "partenaires" } }) {
          body
          frontmatter {
            partners {
              title
              image {
                childImageSharp {
                  gatsbyImageData(width: 108)
                }
              }
              link
            }
            press {
              title
              image {
                childImageSharp {
                  gatsbyImageData(width: 108)
                }
              }
              link
            }
          }
        }
      }
    `
  );
  return (
    <Web title={"Partenaires"}>
      <Section className="px-6 pt-10 xl:pt-20" small>
        <Markdown>{data.mdx.body}</Markdown>
        <Wrapper>
          {data.mdx.frontmatter.partners.map((logo) => (
            <Logo to={logo.link} key={logo.link}>
              <GatsbyImage image={getImage(logo.image)} alt={logo.title} />
            </Logo>
          ))}
        </Wrapper>
      </Section>
      <Section className="mx-auto max-w-prose px-6 pt-10 xl:pt-0">
        <Section.Title>Ils parlent de nous</Section.Title>
        <Wrapper>
          {data.mdx.frontmatter.press
            .sort((a, b) =>
              a.title.toLowerCase() > b.title.toLowerCase() ? 1 : -1
            )
            .map((logo) => (
              <Logo to={logo.link} key={logo.link}>
                <GatsbyImage image={getImage(logo.image)} alt={logo.title} />
              </Logo>
            ))}
        </Wrapper>
      </Section>
    </Web>
  );
}
