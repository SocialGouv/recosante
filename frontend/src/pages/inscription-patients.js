import { graphql, useStaticQuery } from "gatsby";
import React from "react";
import styled from "styled-components";

import Referral from "components/Referral";
import Markdown from "components/base/Markdown";
import Section from "components/base/Section";
import Web from "components/layout/Web";

const StyledSection = styled(Section)`
  font-size: 1.125rem;
`;
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
      <StyledSection small first>
        <Markdown>{data.mdx.body}</Markdown>
        <Referral />
      </StyledSection>
    </Web>
  );
}
