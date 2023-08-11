import { graphql, useStaticQuery } from "gatsby";
import React from "react";

import Referral from "components/Referral";
import Markdown from "components/base/Markdown";
import Web from "components/layout/Web";

export default function InscriptionPatients() {
  const data = useStaticQuery(
    graphql`
      query {
        mdx(fields: { slug: { eq: "inscription-patients" } }) {
          body
        }
      }
    `
  );

  return (
    <Web title={"Recommander Recosanté"}>
      <section className="mx-auto max-w-prose px-6 py-10 text-lg xl:py-20">
        <Markdown>{data.mdx.body}</Markdown>
        <Referral />
      </section>
    </Web>
  );
}
