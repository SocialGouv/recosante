import Newsletter from "components/Newsletter";
import Search from "components/Search";
import Section from "components/base/Section";
import Web from "components/layout/Web";
import { graphql } from "gatsby";
import { GatsbyImage, StaticImage, getImage } from "gatsby-plugin-image";
import useIframe from "hooks/useIframe";
import React from "react";
import styled from "styled-components";

const Title = styled.h1`
  color: ${(props) => props.theme.colors.main};
  font-size: 3.25rem;
  margin: 2rem 0;

  ${(props) => props.theme.mq.small} {
    font-size: 1.5rem;
    margin: 1.5rem 0;
  }
`;

const Thumbnail = styled(GatsbyImage)`
  width: 100%;
  margin-bottom: 2rem;
`;
const BonGeste = styled.div`
  display: flex;
  background-color: #eef1f7;
  padding: 2rem;
  margin-bottom: 2rem;
  ${(props) => props.theme.mq.small} {
    flex-direction: column;
  }
`;
const ImageWrapper = styled.div`
  text-align: center;
  margin-right: 2rem;
  ${(props) => props.theme.mq.small} {
    margin: 0 0 2rem;
  }
`;
const Content = styled.div`
  flex: 1;
  h2 {
    color: ${(props) => props.theme.colors.main};
  }
  p {
    margin: 0;
  }
`;

export default function Article(props) {
  const iframe = useIframe();
  return (
    <Web title={props.data.mdx.frontmatter.title}>
      <Section className="max-w-prose pt-10 xl:pt-20">
        {props.data.mdx.frontmatter.category && (
          <span
            className="rounded-full bg-main px-6 py-2 text-white"
            dangerouslySetInnerHTML={{
              __html: props.data.mdx.frontmatter.category,
            }}
          />
        )}
        <Title
          dangerouslySetInnerHTML={{
            __html: props.data.mdx.frontmatter.title,
          }}
        />
        {props.data.mdx.frontmatter.image && (
          <Thumbnail
            image={getImage(props.data.mdx.frontmatter.image)}
            alt=""
          />
        )}
        {props.data.mdx.frontmatter.bon_geste && (
          <BonGeste>
            <ImageWrapper>
              <StaticImage
                src="./images/bon-geste.png"
                alt="Ampoule pour indiquer une bonne idée ou un bon geste"
                height={128}
              />
            </ImageWrapper>
            <Content>
              <h2>
                Le <strong>bon geste</strong>
              </h2>
              <p
                dangerouslySetInnerHTML={{
                  __html: props.data.mdx.frontmatter.bon_geste,
                }}
              />
            </Content>
          </BonGeste>
        )}
        {props.children}
      </Section>
      {!iframe && (
        <>
          <Search />
          <Newsletter />
        </>
      )}
    </Web>
  );
}

export const articleQuery = graphql`
  query article($slug: String!) {
    mdx(fields: { slug: { eq: $slug } }) {
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
`;
