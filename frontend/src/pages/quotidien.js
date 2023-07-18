import React from "react";
import styled from "styled-components";

import Button from "components/base/Button";
import Section from "components/base/Section";
import Web from "components/layout/Web";

const StyledSection = styled(Section)``;
export default function Profil(props) {
  return (
    <Web title={`Confirmation de l'envoi quotidien`}>
      <StyledSection className="px-6 pt-20" small>
        <h1>Votre choix a été enregistré</h1>
        <p>Vous continuerez à recevoir les indicateurs chaque jour.</p>
        <Button.Wrapper>
          <Button to="/">Retourner à l'accueil</Button>
        </Button.Wrapper>
      </StyledSection>
    </Web>
  );
}
