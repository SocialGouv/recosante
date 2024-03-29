import FocusTrap from "focus-trap-react";
import { graphql, useStaticQuery } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";
import React from "react";
import styled from "styled-components";

import Button from "components/base/Button";
import Markdown from "components/base/Markdown";

const Wrapper = styled.div`
  position: absolute;
  z-index: 3;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 2rem;
  background: ${(props) => props.theme.colors.background};
  border-radius: 2rem;
  opacity: ${(props) => (props.visible ? 1 : 0)};
  visibility: ${(props) => (props.visible ? "visible" : "hidden")};
  pointer-events: ${(props) => (props.visible ? "inherit" : "none")};
  transition: opacity 300ms;

  ${(props) => props.theme.mq.small} {
    flex-direction: column;
    padding: 1rem;
  }
`;
const Image = styled.div`
  flex: 1;
  margin: 0 1rem;

  ${(props) => props.theme.mq.small} {
    margin: 0 3rem 1.5rem;
  }
`;
const Content = styled.div`
  flex: 1;
`;
const StyledButton = styled(Button)`
  position: absolute;
  bottom: 1.5rem;
  right: 2rem;

  ${(props) => props.theme.mq.small} {
    bottom: 1rem;
    right: 1rem;
  }
`;
export default React.forwardRef(function Newsletter(props, ref) {
  const data = useStaticQuery(
    graphql`
      query {
        mdx(fields: { slug: { eq: "newsletter-modal" } }) {
          body
        }
      }
    `
  );
  const visible = props.modal === "newsletter";
  return (
    <FocusTrap
      active={visible}
      focusTrapOptions={{ allowOutsideClick: true, escapeDeactivates: false }}
    >
      <Wrapper visible={visible}>
        <Image>
          <StaticImage
            src={"./newsletter/newsletter-preview.png"}
            alt=""
            height={400}
          />
        </Image>
        <Content ref={ref}>
          <Markdown>{data.mdx.body}</Markdown>
        </Content>
        <StyledButton onClick={() => props.setModal(false)} noExpand>
          J'ai compris
        </StyledButton>
      </Wrapper>
    </FocusTrap>
  );
});
