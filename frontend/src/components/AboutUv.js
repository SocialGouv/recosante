import { graphql, useStaticQuery } from "gatsby";
import React from "react";
import styled from "styled-components";

import Button from "components/base/Button";
import {
  default as Markdown,
  default as Section,
} from "components/base/Section";

const StyledButton = styled(Button)`
  font-size: 1.25rem;
`;

export default function AboutUv() {
  const data = useStaticQuery(
    graphql`
      query {
        mdx(fields: { slug: { eq: "about-uv" } }) {
          body
        }
      }
    `
  );

  return (
    <Section id="about-uv" small>
      <Markdown>{data.mdx.body}</Markdown>
      <Button.Wrapper center>
        <StyledButton hollow to="/">
          Consulter l’indice UV de ma commune
        </StyledButton>
      </Button.Wrapper>
    </Section>
  );
}
