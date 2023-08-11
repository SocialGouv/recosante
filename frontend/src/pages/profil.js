import React from "react";
import styled from "styled-components";

import Section from "components/base/Section";
import Web from "components/layout/Web";
import Profile from "components/subscription/Profile";

const StyledSection = styled(Section)``;
export default function Profil(props) {
  return (
    <Web title={"Profil"}>
      <StyledSection className="px-6 pt-20" medium>
        <Profile />
      </StyledSection>
    </Web>
  );
}
