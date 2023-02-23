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
`
const Logos = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  margin: 0 -1rem;

  ${(props) => props.theme.mq.small} {
    justify-content: center;
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
      <Title>Les données sont fournies par</Title>
      <Logos>
        {data.mdx.frontmatter.data.map((logo) => (
          <Logo to={logo.link} key={logo.link}>
            <GatsbyImage image={getImage(logo.image)} alt={logo.title} />
          </Logo>
        ))}
      </Logos>
    </Wrapper>
  )
}
