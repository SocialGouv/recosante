import { graphql } from "gatsby";
import React from "react";
import styled from "styled-components";

import Content from "components/Recommandations";
import Button from "components/base/Button";
import Web from "components/layout/Web";

import apiUrl from "utils/apiUrl";

const Introduction = styled.div`
  background-color: #eef1f7;
  padding: 2rem;
  margin-bottom: 2rem;
  p {
    margin-bottom: 0;
  }
`;

export default function Recommandations(props) {
  return (
    <Web title={props.data.mdx.frontmatter.title}>
      <section className="relative mx-auto flex max-w-sm flex-col px-6 pt-10 md:max-w-6xl xl:pt-20">
        <h1 className="max-sm:text-[6.5vw]">
          Nos <strong>Recommandations</strong>
        </h1>
        <Introduction>{props.children}</Introduction>
        <Content recommandations={props.pageContext.recommandations} />
        {/* <div className="mb-8 flex items-center justify-center">
          <Button to={`${apiUrl}/v1/recommandations.csv`}>
            Télécharger au format CSV
          </Button>
        </div> */}
      </section>
    </Web>
  );
}

export const pageQuery = graphql`
  query Recommandations($slug: String!) {
    mdx(fields: { slug: { eq: $slug } }) {
      frontmatter {
        title
      }
    }
  }
`;
