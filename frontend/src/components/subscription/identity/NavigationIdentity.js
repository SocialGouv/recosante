import React from 'react'
import styled from 'styled-components'

import Button from 'components/base/Button'

const Wrapper = styled.div`
  display: flex;
  flex-direction: row-reverse;
  justify-content: space-between;

  ${(props) => props.theme.mq.small} {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 1rem;
    background-color: ${(props) => props.theme.colors.background};
    border-top: 0.25rem solid ${(props) => props.theme.colors.main};
  }
`
const PreviousButton = styled(Button)`
  padding-left: 2.25rem;

  svg {
    position: absolute;
    top: 50%;
    right: calc(100% + 0.5rem);
    transform: translateY(-50%);
  }
  path {
    fill: ${(props) => props.theme.colors.main};
  }
`
const NextButton = styled(Button)`
  padding-right: 2.25rem;

  svg {
    position: absolute;
    top: 50%;
    left: calc(100% + 0.5rem);
    transform: translateY(-50%);
  }
  path {
    fill: ${(props) => props.theme.colors.background};
  }
`
export default function NavigationIdentity(props) {
  return (
    <Wrapper>
      <NextButton type='submit' fetching={props.fetching} noExpand
        onClick={() => {
          window?._paq?.push(['trackEvent', 'Subscription', 'Validate'])
        }}
      >
        Valider{' '}
        <svg width='15' height='24' viewBox='0 0 15 24'>
          <path d='M14.6416 12.0001C14.6416 12.4302 14.4774 12.8603 14.1496 13.1882L3.83004 23.5077C3.17359 24.1641 2.10926 24.1641 1.45308 23.5077C0.796891 22.8515 0.796891 21.7874 1.45308 21.1309L10.5844 12.0001L1.4534 2.86922C0.79721 2.21277 0.79721 1.14876 1.4534 0.49263C2.10958 -0.164141 3.17391 -0.164141 3.83036 0.49263L14.1499 10.8119C14.4778 11.14 14.6416 11.5701 14.6416 12.0001Z' />
        </svg>
      </NextButton>
      <PreviousButton
        type='button'
        onClick={() => {
          window?._paq?.push(['trackEvent', 'Subscription', 'Prev', 'identity'])
          props.setPreviousStep()
        }}
        hollow
        noExpand
      >
        <svg width='14' height='24' viewBox='0 0 14 24'>
          <path d='M0.000966501 11.9999C0.00096652 11.5698 0.1652 11.1397 0.492974 10.8118L10.8125 0.492339C11.469 -0.164113 12.5333 -0.164113 13.1895 0.492339C13.8457 1.14853 13.8457 2.21264 13.1895 2.86914L4.05818 11.9999L13.1892 21.1308C13.8454 21.7872 13.8454 22.8512 13.1892 23.5074C12.533 24.1641 11.4687 24.1641 10.8122 23.5074L0.492654 13.1881C0.164827 12.86 0.000966482 12.4299 0.000966501 11.9999Z' />
        </svg>{' '}
        Précédent
      </PreviousButton>
    </Wrapper>
  )
}
