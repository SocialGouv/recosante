import React from "react";
import styled from "styled-components";

import Button from "components/base/Button";
import Section from "components/base/Section";
import Web from "components/layout/Web";

const StyledSection = styled(Section)`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
export default function NotFound() {
  return (
    <Web title={"404"}>
      <StyledSection className="px-6 pt-20" small>
        <h1>404</h1>
        <p>Cette page n’existe pas (ou plus).</p>
        <Button to="/">Retourner à l'accueil</Button>
      </StyledSection>
    </Web>
  );
}
