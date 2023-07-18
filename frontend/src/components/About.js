import { graphql, useStaticQuery } from "gatsby";
import React from "react";

import Markdown from "components/base/Markdown";

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
    <section className="mx-auto my-20 max-w-prose px-6" id="about">
      <Markdown>{data.mdx.body}</Markdown>
    </section>
  );
}
