import { graphql, useStaticQuery } from "gatsby";
import React from "react";

import About from "components/About";
import Data from "components/Data";
import Web from "components/layout/Web";
import Newsletter from "../components/Newsletter";

export default function Asthme() {
  const data = useStaticQuery(
    graphql`
      query {
        mdx(fields: { slug: { eq: "introduction-pollen" } }) {
          body
        }
      }
    `
  );

  return (
    <Web title={`Alerte pollen`}>
      <Newsletter data={data} seo />
      <Data />
      <About />
    </Web>
  );
}
