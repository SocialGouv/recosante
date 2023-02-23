import React from 'react'
import styled from 'styled-components'
import MagicLink from 'components/base/MagicLink'

const StyledMagicLink = styled(MagicLink)`
  display: none;
  ${(props) => props.theme.mq.medium} {
    display: block;
  }
`
const Svg = styled.svg``
export default function Messenger(props) {
  return (
    <StyledMagicLink
      to={`fb-messenger://share?link=${props.url}`}
      onClick={() =>
        window._paq?.push(['trackEvent', 'Share', 'Messenger', props.url])
      }
    >
      <Svg
        xmlns='http://www.w3.org/2000/svg'
        height='512'
        viewBox='0 0 152 152'
        width='512'
      >
        <path d='m81.91 73.65 18.64-10.31-20.78 22.04-9.67-10.32-18.88 10.32 20.77-22.04z' />
        <path d='m76 0a76 76 0 1 0 76 76 76 76 0 0 0 -76-76zm0 108.38a40.63 40.63 0 0 1 -10.9-1.48l-12.94 7.1v-13.42a34.2 34.2 0 0 1 -14.16-27.39c0-19.44 17-35.19 38-35.19s38 15.76 38 35.19-17 35.19-38 35.19z' />
      </Svg>
    </StyledMagicLink>
  )
}
