import React from "react";
import styled from "styled-components";

const Wrapper = styled.svg`
  width: auto;
  height: 2.75rem;
`;
export default function Baignades() {
  return (
    <Wrapper width="32" height="32" viewBox="0 0 32 32">
      <path
        d="M4 8C7.31067 8 9.79333 4 9.79333 4C9.79333 4 12.276 8 15.586 8C18.8967 8 22.2067 4 22.2067 4C22.2067 4 25.5173 8 28 8"
        className="stroke"
        strokeWidth="1.84615"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <path
        d="M4 18C7.31067 18 9.79333 14 9.79333 14C9.79333 14 12.276 18 15.586 18C18.8967 18 22.2067 14 22.2067 14C22.2067 14 25.5173 18 28 18"
        className="stroke"
        strokeWidth="1.84615"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <path
        d="M4 28C7.31067 28 9.79333 24 9.79333 24C9.79333 24 12.276 28 15.586 28C18.8967 28 22.2067 24 22.2067 24C22.2067 24 25.5173 28 28 28"
        className="stroke"
        strokeWidth="1.84615"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </Wrapper>
  );
}
