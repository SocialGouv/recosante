// import React, { forwardRef } from "react";
import styled from "styled-components";

const SectionStyled = styled.section`
  position: relative;
  width: ${(props) => (props.small ? 35.5 : props.medium ? 48 : 73)}rem;
  max-width: 100%;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 10rem;
  // padding-top: ${(props) => (props.first ? "12rem" : 0)};
  padding-left: 1.5rem;
  padding-right: 1.5rem;

  ${(props) => props.theme.mq.medium} {
    width: ${(props) => (props.small ? "31rem" : "100%")};
  }
  ${(props) => props.theme.mq.small} {
    width: 100%;
    margin-bottom: 0;
    // padding-top: ${(props) => (props.first ? "9rem" : 0)};
  }
`;
SectionStyled.Title = styled.h2`
  text-align: ${(props) => (props.center ? "center" : "left")};
`;
SectionStyled.Subtitle = styled.h3`
  margin-top: -1rem;
  font-size: 1.5em;
  text-align: ${(props) => (props.center ? "center" : "left")};
  ${(props) => props.theme.mq.small} {
    font-size: 1.5em;
  }
`;

export default SectionStyled;

// function Section(props, ref) {
//   return <SectionStyled {...props} ref={ref} />;
// }

// export default forwardRef(Section);
