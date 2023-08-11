import { graphql, useStaticQuery } from "gatsby";
import React from "react";

import Markdown from "components/base/Markdown";

export default function Data() {
  const dataSource = useStaticQuery(
    graphql`
      query {
        mdx(fields: { slug: { eq: "data-source" } }) {
          body
        }
      }
    `
  );

  return (
    <section className="mx-auto my-20 max-w-prose px-6" id="data-source">
      <Markdown>{dataSource.mdx.body}</Markdown>
    </section>
  );
}
