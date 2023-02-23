import React, { useState } from 'react'
import styled from 'styled-components'
import { useLocation } from '@reach/router'
import { navigate } from 'gatsby'

import { formatPlaceUrl } from 'utils/formatPlaceUrl'
import Search from 'components/Search'

const Open = styled.button`
  display: none;
  background: none;
  border: none;
  cursor: pointer;

  svg {
    width: 2rem;
    height: auto;

    path {
      fill: ${(props) => props.theme.colors.main};
    }
  }

  ${(props) => props.theme.mq.small} {
    display: block;
    opacity: ${(props) => (props.open ? 0 : 1)};
    pointer-events: ${(props) => (props.open ? 'none' : 'inherit')};
    transition: opacity 600ms;
  }
`
const Wrapper = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 0 1rem;
  opacity: ${(props) => (props.open ? 1 : 0)};
  pointer-events: ${(props) => (props.open ? 'inherit' : 'none')};
  transition: opacity 600ms;
`
const Close = styled.button`
  position: absolute;
  top: 1.75rem;
  right: 1rem;
  background: none;
  border: none;
  cursor: pointer;

  svg {
    width: 1.75rem;
    height: auto;

    path {
      fill: ${(props) => props.theme.colors.main};
    }
  }
`
export default function MobileSearch() {
  const location = useLocation()

  const [open, setOpen] = useState(false)

  return location.pathname !== '/' ? (
    <>
      <Open open={open} onClick={() => setOpen(true)}>
        <svg x='0px' y='0px' viewBox='0 0 512.005 512.005'>
          <path
            d='M505.749,475.587l-145.6-145.6c28.203-34.837,45.184-79.104,45.184-127.317c0-111.744-90.923-202.667-202.667-202.667
			S0,90.925,0,202.669s90.923,202.667,202.667,202.667c48.213,0,92.48-16.981,127.317-45.184l145.6,145.6
			c4.16,4.16,9.621,6.251,15.083,6.251s10.923-2.091,15.083-6.251C514.091,497.411,514.091,483.928,505.749,475.587z
			 M202.667,362.669c-88.235,0-160-71.765-160-160s71.765-160,160-160s160,71.765,160,160S290.901,362.669,202.667,362.669z'
          />
        </svg>
      </Open>
      <Wrapper open={open}>
        <Search
          handlePlaceSelection={(place) => {
            setOpen(false)
            navigate(formatPlaceUrl(place) + window.location.search)
          }}
        />
        <Close onClick={() => setOpen(false)}>
          <svg
            x='0px'
            y='0px'
            width='41.756px'
            height='41.756px'
            viewBox='0 0 41.756 41.756'
          >
            <path
              d='M27.948,20.878L40.291,8.536c1.953-1.953,1.953-5.119,0-7.071c-1.951-1.952-5.119-1.952-7.07,0L20.878,13.809L8.535,1.465
		c-1.951-1.952-5.119-1.952-7.07,0c-1.953,1.953-1.953,5.119,0,7.071l12.342,12.342L1.465,33.22c-1.953,1.953-1.953,5.119,0,7.071
		C2.44,41.268,3.721,41.755,5,41.755c1.278,0,2.56-0.487,3.535-1.464l12.343-12.342l12.343,12.343
		c0.976,0.977,2.256,1.464,3.535,1.464s2.56-0.487,3.535-1.464c1.953-1.953,1.953-5.119,0-7.071L27.948,20.878z'
            />
          </svg>
        </Close>
      </Wrapper>
    </>
  ) : null
}
