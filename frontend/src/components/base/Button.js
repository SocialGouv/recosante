import React from "react";
import styled, { keyframes } from "styled-components";

import MagicLink from "components/base/MagicLink";

const fetchingKeyframe = keyframes`
  from {
    transform: translateX(-100%);
  }

  to {
    transform: translateX(100%);
  }
`;

const Wrapper = styled(MagicLink)`
  position: relative;
  display: flex;
  overflow: hidden;
  justify-content: center;
  align-items: center;
  width: ${(props) => (props.expand ? "100%" : "auto")};
  padding: 0.65em 1.25em;
  //font-weight: bold;
  color: ${(props) => (props.hollow ? props.theme.colors.main : "white")};
  text-decoration: none;
  background-color: ${(props) =>
    props.hollow
      ? "transparent"
      : props.theme.colors[props.disabled ? "disabled" : "main"]};
  border: 0.125rem solid
    ${(props) => props.theme.colors[props.disabled ? "disabled" : "main"]};
  border-radius: 1.5em;
  pointer-events: ${(props) =>
    props.disabled || props.fetching ? "none" : "inherit"};
  cursor: pointer;
  transition: opacity 200ms;

  ${(props) => props.theme.mq.small} {
    width: ${(props) => (props.noExpand ? "auto" : "100%")};
  }

  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 130%;
    height: 100%;
    transform: translateX(-100%) rotate(-45deg);
    background-color: ${(props) =>
      props.hollow
        ? props.theme.colors[props.color] ||
          props.color ||
          props.theme.colors.main
        : props.theme.colors.background};
    opacity: ${(props) => (props.hollow ? 0.1 : 0.2)};
  }
  &:hover,
  &:focus {
    &:before {
      transform: translateX(100%) rotate(-45deg);
      transition: transform 500ms ease-out;
    }
  }

  &:after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: ${(props) =>
      props.hollow ? props.theme.colors.main : props.theme.colors.background};
    opacity: ${(props) => (props.fetching ? "0.4" : "0")};
    animation: ${fetchingKeyframe} ${(props) => (props.fetching ? 600 : 0)}ms
      infinite;
  }

  ${(props) => props.theme.mq.small} {
    padding: 0.75em 1.25em;
  }
  & span {
    position: relative;
    text-align: center;
  }
`;
export default function Button({
  className,
  to,
  onClick,
  disabled,
  fetching,
  hollow,
  expand,
  noExpand,
  color,
  type,
  children,
}) {
  return (
    <Wrapper
      className={className}
      to={to}
      onClick={onClick}
      disabled={disabled}
      fetching={fetching}
      hollow={hollow ? 1 : 0}
      expand={expand ? 1 : 0}
      noExpand={noExpand ? 1 : 0}
      color={color}
      type={type}
    >
      <span>{children}</span>
    </Wrapper>
  );
}

Button.Wrapper = styled.div`
  display: flex;
  flex-direction: ${(props) => (props.vertical ? "column" : "row")};
  justify-content: ${(props) =>
    props.left ? "flex-start" : props.right ? "flex-end" : "center"};
  align-items: center;
  margin: 0 -0.5rem;

  > * {
    margin: 0 0.5rem ${(props) => (props.vertical ? "1rem" : "0")};
  }

  ${(props) => props.theme.mq.small} {
    flex-direction: column;
    margin: 0;

    > * {
      margin: 0 0 1rem;
    }
  }
`;
