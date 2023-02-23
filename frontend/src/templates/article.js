import React from 'react'
import { graphql } from 'gatsby'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import { StaticImage, GatsbyImage, getImage } from 'gatsby-plugin-image'
import styled from 'styled-components'
import Web from 'components/layout/Web'
import Section from 'components/base/Section'
import useIframe from 'hooks/useIframe'
import Search from 'components/Search'
import Newsletter from 'components/Newsletter'

const Title = styled.h1`
  color: ${(props) => props.theme.colors.main};
  font-size: 3.25rem;
  margin: 2rem 0;
`
const Category = styled.span`
  color: #fff;
  background-color: ${(props) => props.theme.colors.main};
  padding: 0.5rem 1rem;
`
const Thumbnail = styled(GatsbyImage)`
  width: 100%;
  margin-bottom: 2rem;
`
const BonGeste = styled.div`
  display: flex;
  background-color: #eef1f7;
  padding: 2rem;
  margin-bottom: 2rem;
  ${(props) => props.theme.mq.small} {
    flex-direction: column;
  }
`
const ImageWrapper = styled.div`
  text-align: center;
  margin-right: 2rem;
  ${(props) => props.theme.mq.small} {
    margin: 0 0 2rem;
  }
`
const Content = styled.div`
  flex: 1;
  h2 {
    color: ${(props) => props.theme.colors.main};
  }
  p {
    margin: 0;
  }
`

export default function Article(props) {
  const iframe = useIframe()
  return (
    <Web title={props.data.mdx.frontmatter.title}>
      <Section first medium>
        {props.data.mdx.frontmatter.category &&
          <Category
            dangerouslySetInnerHTML={{
              __html: props.data.mdx.frontmatter.category,
            }}/>
        }
        <Title
          dangerouslySetInnerHTML={{
            __html: props.data.mdx.frontmatter.title,
          }}
        />
        {props.data.mdx.frontmatter.image &&
          <Thumbnail image={getImage(props.data.mdx.frontmatter.image)} alt={props.data.mdx.frontmatter.title} />
        }
        {props.data.mdx.frontmatter.bon_geste &&
          <BonGeste>
            <ImageWrapper>
              <StaticImage
                src={'./images/bon-geste.png'}
                alt='Le bon geste'
                height={128}
              />
            </ImageWrapper>
            <Content>
              <h2>Le <strong>bon geste</strong></h2>
              <p
                dangerouslySetInnerHTML={{
                __html: props.data.mdx.frontmatter.bon_geste,
                }
              }/>
            </Content>
          </BonGeste>
        }
        <MDXRenderer>{props.data.mdx.body}</MDXRenderer>
      </Section>
      {!iframe && (
        <>
          <Search />
          <Newsletter />
        </>
      )}
    </Web>
  )
}

export const articleQuery = graphql`
  query article($slug: String!) {
    mdx(slug: { eq: $slug }) {
      body
      frontmatter {
        title
        category
        image {
          childImageSharp {
            gatsbyImageData(width: 768)
          }
        }
        bon_geste
      }
    }
  }
`
