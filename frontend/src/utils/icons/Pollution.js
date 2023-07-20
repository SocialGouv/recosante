import React from "react";
import styled from "styled-components";

const Wrapper = styled.svg`
  width: auto;
  height: 2.75rem;
`;
export default function Pollution() {
  return (
    <Wrapper width="17" height="16" viewBox="0 0 17 16">
      <path
        d="M9.07667 2.0002L15.4275 13.0002C15.6116 13.3191 15.5023 13.7268 15.1835 13.9109C15.0821 13.9694 14.9672 14.0002 14.8501 14.0002H2.14845C1.78025 14.0002 1.48178 13.7017 1.48178 13.3335C1.48178 13.2165 1.51258 13.1015 1.57109 13.0002L7.92194 2.0002C8.10607 1.68133 8.51374 1.57208 8.83261 1.75618C8.93401 1.81469 9.01814 1.89885 9.07667 2.0002ZM7.83261 10.6669V12.0002H9.16594V10.6669H7.83261ZM7.83261 6.0002V9.33355H9.16594V6.0002H7.83261Z"
        className="fill"
      />
    </Wrapper>
  );
}
