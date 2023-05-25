import { graphql, useStaticQuery } from "gatsby";
import React from "react";
import styled from "styled-components";

import Button from "components/base/Button";
import Markdown from "components/base/Markdown";
import Section from "components/base/Section";

const StyledButton = styled(Button)`
  font-size: 1.25rem;
`;

export default function AboutQa() {
  const data = useStaticQuery(
    graphql`
      query {
        mdx(fields: { slug: { eq: "about-qa" } }) {
          body
        }
      }
    `
  );

  return (
    <Section id="about-qa" small>
      <Markdown>{data.mdx.body}</Markdown>
      <Button.Wrapper center>
        <StyledButton hollow to="/">
          Consulter la qualité de l’air de ma commune
        </StyledButton>
      </Button.Wrapper>
    </Section>
  );
}
