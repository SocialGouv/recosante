import FocusTrap from "focus-trap-react";
import { graphql, useStaticQuery } from "gatsby";
import React, { useEffect } from "react";
import styled from "styled-components";

import Button from "components/base/Button";
import Markdown from "components/base/Markdown";
import Images from "components/newsletter/notifications/Images";

const Wrapper = styled.div`
  position: absolute;
  z-index: 3;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 3.5rem;
  padding-top: 1.5rem;
  padding-left: 2rem;
  padding-right: 2rem;
  overflow-y: auto;
  background: ${(props) => props.theme.colors.background};
  border-radius: 2rem;
  opacity: ${(props) => (props.visible ? 1 : 0)};
  visibility: ${(props) => (props.visible ? "visible" : "hidden")};
  pointer-events: ${(props) => (props.visible ? "inherit" : "none")};
  transition: opacity 300ms;

  ${(props) => props.theme.mq.small} {
    padding: 1rem;
  }
`;
const ImagesWrapper = styled.div`
  height: 15.1rem;

  ${(props) => props.theme.mq.small} {
    height: 8.5rem;
  }
`;
const StyledButton = styled(Button)`
  margin-right: 2rem;
  margin-left: auto;

  ${(props) => props.theme.mq.small} {
    margin-right: 1rem;
    margin-bottom: 1rem;
  }
`;
export default React.forwardRef(function Notifications(props, ref) {
  const data = useStaticQuery(
    graphql`
      query {
        mdx(fields: { slug: { eq: "notifications-modal" } }) {
          body
        }
      }
    `
  );
  const visible = props.modal === "notifications";
  useEffect(() => {
    visible &&
      window?._paq?.push(["trackEvent", "Subscription", "NotificationDetail"]);
  });
  return (
    <FocusTrap
      active={visible}
      focusTrapOptions={{ allowOutsideClick: true, escapeDeactivates: false }}
    >
      <Wrapper visible={visible}>
        <ImagesWrapper>
          <Images isOnScreen={true} />
        </ImagesWrapper>
        <Markdown ref={ref}>{data.mdx.body}</Markdown>
        <StyledButton onClick={() => props.setModal(false)} noExpand>
          J'ai compris
        </StyledButton>
      </Wrapper>
    </FocusTrap>
  );
});
