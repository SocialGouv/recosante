import { graphql, useStaticQuery } from "gatsby";
import React from "react";

import AboutUv from "components/AboutUv";
import Web from "components/layout/Web";
import Newsletter from "../components/Newsletter";

export default function Uv() {
  const data = useStaticQuery(
    graphql`
      query {
        mdx(fields: { slug: { eq: "introduction-uv" } }) {
          body
        }
      }
    `
  );

  return (
    <Web title={`UV`}>
      <Newsletter
        first
        data={data}
        type={"uv"}
        indicateurs={["indice_uv"]}
        seo
      />
      <AboutUv />
    </Web>
  );
}
