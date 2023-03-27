import React from 'react'
import styled from 'styled-components'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import { useStaticQuery, graphql } from 'gatsby'

import MagicLink from 'components/base/MagicLink'

const Wrapper = styled.div``
const Title = styled.div`
  margin-bottom: 1rem;
  font-weight: bold;

  ${(props) => props.theme.mq.small} {
    text-align: center;
  }

  p {
    margin: 0;
    font-size: inherit;
  }
`
const Logos = styled.ul`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  margin: 0 -1rem;
  padding: 0;

  ${(props) => props.theme.mq.small} {
    justify-content: center;
  }

  li {
    list-style: none;
  }
`
const Logo = styled(MagicLink)`
  width: 5rem;
  margin: 1rem;
`
export default function Partners() {
  const data = useStaticQuery(
    graphql`
      query {
        mdx(slug: { eq: "partenaires" }) {
          body
          frontmatter {
            data {
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
    <Wrapper>
      <Title><p>Les données sont fournies par</p></Title>
      <Logos>
        {data.mdx.frontmatter.data.map((logo) => (
          <li key={logo.link}>
            <Logo to={logo.link} aria-label={logo.title}>
              <GatsbyImage image={getImage(logo.image)} alt={logo.title} />
            </Logo>
          </li>
        ))}
      </Logos>
    </Wrapper>
  )
}
