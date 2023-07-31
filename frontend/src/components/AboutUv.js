import { graphql, useStaticQuery } from "gatsby";
import React from "react";
import styled from "styled-components";

import Button from "components/base/Button";
import Markdown from "components/base/Markdown";

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
    <section className="mx-auto my-20 max-w-prose px-6" id="about-uv">
      <Markdown>{data.mdx.body}</Markdown>
      <Button.Wrapper center>
        <StyledButton hollow to="/">
          Consulter l’indice UV de ma commune
        </StyledButton>
      </Button.Wrapper>
    </section>
  );
}
