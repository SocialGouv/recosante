import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.svg`
  width: auto;
  height: 2.25rem;
  margin: 0.25rem 0;
`
export default function Email() {
  return (
    <Wrapper width='53' height='40' viewBox='0 0 53 40'>
      <path
        d='M47.5781 0H4.92191C2.2078 0 0 2.24284 0 5.00003V35C0 37.7572 2.2078 40 4.92191 40H47.5781C50.2922 40 52.5 37.7572 52.5 35V5.00003C52.5 2.24284 50.2922 0 47.5781 0ZM47.5781 3.33331C47.801 3.33331 48.0131 3.3803 48.2069 3.46235L26.25 22.7946L4.29297 3.46235C4.48684 3.38041 4.69889 3.33331 4.9218 3.33331H47.5781ZM47.5781 36.6666H4.92191C4.0167 36.6666 3.28124 35.9196 3.28124 34.9999V6.98403L25.1749 26.2597C25.4842 26.5315 25.8671 26.6666 26.25 26.6666C26.6329 26.6666 27.0158 26.5316 27.3251 26.2597L49.2188 6.98403V35C49.2187 35.9196 48.4833 36.6666 47.5781 36.6666Z'
        className='fill'
      />
    </Wrapper>
  )
}