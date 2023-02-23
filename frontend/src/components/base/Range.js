import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  position: relative;

  &:before,
  &:after {
    position: absolute;
    bottom: 0.5rem;
    font-size: 0.875rem;
    font-style: italic;
        color: ${(props) => props.theme.colors.footer};


  }
  &:before {
    content: '${(props) => props.start}';
    left: 0;
  }
  &:after {
    content: '${(props) => props.end}';
    right: 0;
  }
`
const Input = styled.input`
  -webkit-appearance: none;
  width: 100%;
  margin-bottom: 2rem;
  background: transparent;

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
  }

  &::-ms-track {
    width: 100%;
    cursor: pointer;
    background: transparent;
    border-color: transparent;
    color: transparent;
  }

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    height: 1rem;
    width: 1rem;
    background: ${(props) => props.theme.colors.main};
    border-radius: 0.5rem;
    cursor: pointer;
    margin-top: -0.375rem;
  }

  &::-moz-range-thumb {
    height: 1rem;
    width: 1rem;
    background: ${(props) => props.theme.colors.main};
    border-radius: 0.5rem;
    cursor: pointer;
  }

  &::-ms-thumb {
    height: 1rem;
    width: 1rem;
    background: ${(props) => props.theme.colors.main};
    border-radius: 0.5rem;
    cursor: pointer;
  }

  &::-webkit-slider-runnable-track {
    width: 100%;
    height: 0.25rem;
    cursor: pointer;
    background: ${(props) => props.theme.colors.border};
  }

  &:focus::-webkit-slider-runnable-track {
    background: ${(props) => props.theme.colors.border};
  }

  &::-moz-range-track {
    width: 100%;
    height: 0.25rem;
    cursor: pointer;
    background: ${(props) => props.theme.colors.border};
  }

  &::-ms-track {
    width: 100%;
    height: 0.5rem;
    cursor: pointer;
    background: transparent;
    border-color: transparent;
    border-width: 0.25rem 0;
    color: transparent;
  }
  &::-ms-fill-lower {
    background: ${(props) => props.theme.colors.border};
  }
  &:focus::-ms-fill-lower {
    background: ${(props) => props.theme.colors.border};
  }
  &::-ms-fill-upper {
    background: ${(props) => props.theme.colors.border};
  }
  &:focus::-ms-fill-upper {
    background: ${(props) => props.theme.colors.border};
  }
`
export default function Range(props) {
  return (
    <Wrapper start={props.start} end={props.end}>
      <Input type='range' {...props} />
    </Wrapper>
  )
}
