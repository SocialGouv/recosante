import { graphql, useStaticQuery } from "gatsby";
import React from "react";

import AboutQa from "components/AboutQa";
import Web from "components/layout/Web";
import Newsletter from "../components/Newsletter";

export default function Qa() {
  const data = useStaticQuery(
    graphql`
      query {
        mdx(fields: { slug: { eq: "introduction-qa" } }) {
          body
        }
      }
    `
  );

  return (
    <Web title={`Qualité de l’air`}>
      <Newsletter data={data} type={"qa"} indicateurs={["indice_atmo"]} seo />
      <AboutQa />
    </Web>
  );
}
