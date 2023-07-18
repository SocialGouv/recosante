import { graphql } from "gatsby";
import React from "react";

import Section from "components/base/Section";
import Web from "components/layout/Web";

export default function Page(props) {
  return (
    <Web title={props.data.mdx.frontmatter.title}>
      <Section className="px-6 pt-10 xl:pt-20" medium>
        <h1
          dangerouslySetInnerHTML={{
            __html: props.data.mdx.frontmatter.title,
          }}
        />
        {props.children}
      </Section>
    </Web>
  );
}

export const pageQuery = graphql`
  query Page($slug: String!) {
    mdx(fields: { slug: { eq: $slug } }) {
      frontmatter {
        title
      }
    }
  }
`;
