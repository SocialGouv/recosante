import React from 'react'
import styled from 'styled-components'

import Checkbox from './option/Checkbox'

const Wrapper = styled.div`
  position: relative;
  padding: 0 0.5rem;
  margin-bottom: 1rem;

  ${(props) => props.theme.mq.smallish} {
    flex-basis: 50%;
    margin-bottom: 1.5rem;
  }
`
const Button = styled.button`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  overflow: hidden;
  width: 10rem;
  height: 10rem;
  margin: 0 auto;
  padding: 0.6875rem 0.25rem 0.5rem;
  color: ${(props) => props.theme.colors[props.active ? 'background' : 'main']};
  border: 0.25rem solid ${(props) => props.theme.colors.main};
  border-radius: 2rem;
  background-color: ${(props) =>
    props.theme.colors[props.active ? 'main' : 'background']};
  opacity: ${(props) => (props.disabled ? 0.3 : 1)};
  cursor: ${(props) => (props.disabled ? 'default' : 'pointer')};
  transition: all 200ms ease-out;

  &:hover {
    .box {
      background-color: rgba(
        ${(props) =>
          props.theme.colors[props.active ? 'backgroundAlpha' : 'mainAlpha']},
        ${(props) => (props.active ? 0.8 : 0.1)}
      );
    }
  }

  ${(props) => props.theme.mq.small} {
    flex-direction: row-reverse;
    width: 100%;
    height: 4.5rem;
    padding: 0.75rem 1rem;
    border: 0.1875rem solid ${(props) => props.theme.colors.main};
    border-radius: 1.5rem;
  }

  .fill {
    fill: ${(props) =>
      props.theme.colors[props.active ? 'background' : 'main']};
  }
  .stroke {
    stroke: ${(props) =>
      props.theme.colors[props.active ? 'background' : 'main']};
  }
  .antifill {
    fill: ${(props) =>
      props.theme.colors[props.active ? 'main' : 'background']};
  }
  .antistroke {
    stroke: ${(props) =>
      props.theme.colors[props.active ? 'main' : 'background']};
  }
`
const Label = styled.span`
  display: block;
  font-size: ${(props) => (props.small ? 0.875 : 1)}rem;
  text-align: center;
  line-height: 1.2;

  ${(props) => props.theme.mq.small} {
    flex: 1;
    margin: 0 1rem;
    text-align: left;
  }
`
const Detail = styled.div`
  position: absolute;
  top: calc(100% + 0.25rem);
  left: 0;
  right: 0;
  font-size: 0.75rem;
  font-weight: 300;
  text-align: center;
  color: ${(props) => props.theme.colors[props.modal ? 'main' : 'text']};
  text-decoration: ${(props) => (props.modal ? 'underline' : 'none')};
  cursor: ${(props) => (props.modal ? 'pointer' : 'default')};

  ${(props) => props.theme.mq.small} {
    position: relative;
    top: 0.125rem;
    left: 0;
    right: 0;
  }

  p {
    margin: 0;
    font-size: inherit;
  }
`
export default function Option(props) {
  return (
    <Wrapper>
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
            props.setModal(props.option.detail.modal)
          }}
          modal={props.option.detail.modal}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              e.currentTarget.click()
            }
          }}
        >
          <p>{props.option.detail.label}</p>
        </Detail>
      )}
    </Wrapper>
  )
}
