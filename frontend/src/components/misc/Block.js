import styled from 'styled-components'

export default styled.div`
  position: relative;
  z-index: 1;
  width: 24rem;
  padding: 1.5rem 1.5rem 1.8125rem;
  background-color: ${(props) => props.theme.colors.background};

  ${(props) => props.theme.mq.medium} {
    position: relative;
    top: auto;
    bottom: auto;
    right: auto;
    transform: none;
    width: 36.5rem;
    padding: 0;
    margin: 0 0 1.5rem;
    font-size: 1rem;
    opacity: 1;
  }

  ${(props) => props.theme.mq.small} {
    width: 90vw;
  }

  &:before {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 0.3125rem;
    background-color: ${(props) =>
      props.theme.colors[props.color] || props.theme.colors.main};

    ${(props) => props.theme.mq.medium} {
      display: none;
    }
  }
`
