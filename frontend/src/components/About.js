import { graphql, useStaticQuery } from "gatsby";
import React from "react";

import Markdown from "components/base/Markdown";
import Section from "components/base/Section";

export default function About() {
  const data = useStaticQuery(
    graphql`
      query {
        mdx(fields: { slug: { eq: "about" } }) {
          body
        }
      }
    `
  );

  return (
    <Section id="about" small>
      <Markdown>{data.mdx.body}</Markdown>
    </Section>
  );
}
