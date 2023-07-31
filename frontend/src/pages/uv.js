import { graphql, useStaticQuery } from "gatsby";
import React from "react";

import AboutUv from "components/AboutUv";
import Web from "components/layout/Web";
import Newsletter from "../components/Newsletter";

function UvWithDataStaticQuery() {
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
    <>
      <Newsletter data={data} type={"uv"} indicateurs={["indice_uv"]} seo />
      <AboutUv />
    </>
  );
}

export default function Uv() {
  return (
    <Web title={`UV`}>
      <UvWithDataStaticQuery />
    </Web>
  );
}
