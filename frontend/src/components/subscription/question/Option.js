import React from "react";
import styled from "styled-components";

import Checkbox from "./option/Checkbox";

const Button = styled.button`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  overflow: hidden;
  width: 100%;
  margin: 0 auto;
  height: 100%;
  padding: 0.6875rem 0.25rem;
  color: ${(props) => props.theme.colors[props.active ? "background" : "main"]};
  border: 0.25rem solid ${(props) => props.theme.colors.main};
  border-radius: 2rem;
  background-color: ${(props) =>
    props.theme.colors[props.active ? "main" : "background"]};
  opacity: ${(props) => (props.disabled ? 0.3 : 1)};
  cursor: ${(props) => (props.disabled ? "default" : "pointer")};
  transition: all 200ms ease-out;

  &:hover {
    .box {
      background-color: rgba(
        ${(props) =>
          props.theme.colors[props.active ? "backgroundAlpha" : "mainAlpha"]},
        ${(props) => (props.active ? 0.8 : 0.1)}
      );
    }
  }

  ${(props) => props.theme.mq.smallish} {
    flex-direction: row;
    width: 100%;
    padding: 0.5rem 1rem;
    border: 2px solid ${(props) => props.theme.colors.main};
    border-radius: 0.75rem;
  }

  svg {
    width: 3rem;
  }

  .fill {
    fill: ${(props) =>
      props.theme.colors[props.active ? "background" : "main"]};
  }
  .stroke {
    stroke: ${(props) =>
      props.theme.colors[props.active ? "background" : "main"]};
  }
  .antifill {
    fill: ${(props) =>
      props.theme.colors[props.active ? "main" : "background"]};
  }
  .antistroke {
    stroke: ${(props) =>
      props.theme.colors[props.active ? "main" : "background"]};
  }
`;
const Label = styled.span`
  display: block;
  font-size: ${(props) => (props.smallish ? 0.875 : 1)}rem;
  text-align: center;
  line-height: 1.2;
  margin-top: 0.75rem;
  margin-bottom: 0.75rem;

  ${(props) => props.theme.mq.smallish} {
    flex: 1;
    margin-top: 0rem;
    margin-bottom: 0rem;
    margin-left: 1rem;
    margin-right: 1rem;
    text-align: left;
  }
`;
const Detail = styled.div`
  position: absolute;
  top: calc(100% + 0.25rem);
  left: 0;
  right: 0;
  font-size: 0.75rem;
  font-weight: 300;
  text-align: center;
  color: ${(props) => props.theme.colors[props.modal ? "main" : "text"]};
  text-decoration: ${(props) => (props.modal ? "underline" : "none")};
  cursor: ${(props) => (props.modal ? "pointer" : "default")};

  ${(props) => props.theme.mq.smallish} {
    position: relative;
    left: 0;
    right: 0;
    margin-top: 0.25rem;
  }
`;

export default function Option(props) {
  return (
    <div
      className={[
        "relative mb-4 shrink md:mb-0 md:max-w-[200px] md:grow md:basis-0 md:self-stretch",
        props.isLast ? "md:mr-0" : "md:mr-4",
      ].join(" ")}
    >
      <Button
        active={props.active}
        onClick={props.onClick}
        disabled={props.option.disabled}
      >
        {props.option.icon}
        <Label
          small={props.option.small}
          dangerouslySetInnerHTML={{
            __html: props.option.label,
          }}
        />
        <Checkbox checkbox={props.checkbox} active={props.active} />
      </Button>
      {props.option.detail && (
        <Detail
          tabIndex={props.option.detail.modal ? 0 : -1}
          onClick={() => {
            props.option.detail.modal &&
              props.setModal(props.option.detail.modal);
          }}
          modal={props.option.detail.modal}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              e.currentTarget.click();
            }
          }}
        >
          <p className="m-0 px-2 text-left text-xs md:text-center">
            {props.option.detail.label}
          </p>
        </Detail>
      )}
    </div>
  );
}
