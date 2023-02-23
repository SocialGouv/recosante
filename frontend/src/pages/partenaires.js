import React from 'react'
import styled from 'styled-components'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import { useStaticQuery, graphql } from 'gatsby'
import { MDXRenderer } from 'gatsby-plugin-mdx'

import MagicLink from 'components/base/MagicLink'
import Web from 'components/layout/Web'
import Section from 'components/base/Section'

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  margin: 0 -0.5rem;
`
const Logo = styled(MagicLink)`
  width: 7rem;
  margin: 0.5rem;
`
export default function Partners(props) {
  const data = useStaticQuery(
    graphql`
      query {
        mdx(slug: { eq: "partenaires" }) {
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
  )
  return (
    <Web title={'Ils parlent de nous'}>
      <Section first small>
        <MDXRenderer>{data.mdx.body}</MDXRenderer>
        <Wrapper>
          {data.mdx.frontmatter.partners.map((logo) => (
            <Logo to={logo.link} key={logo.link}>
              <GatsbyImage image={getImage(logo.image)} alt={logo.title} />
            </Logo>
          ))}
        </Wrapper>
      </Section>
      <Section small>
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
  )
}
