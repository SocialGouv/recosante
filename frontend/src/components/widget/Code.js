import React, { useState, useEffect, useContext } from 'react'
import styled from 'styled-components'
import { useLocation } from '@reach/router'
import copy from 'copy-to-clipboard'

import StyleContext from 'utils/StyleContext'
import { formatPlaceUrl } from 'utils/formatPlaceUrl'

const Wrapper = styled.div`
  position: relative;
  margin-bottom: 3rem;
`
const Label = styled.label`
  display: block;
  margin-bottom: 1em;
  font-size: 1.125rem;

  ${(props) => props.theme.mq.small}  {
    font-size: 1rem;
  }
`
const Text = styled.textarea`
  position: relative;
  display: block;
  width: 100%;
  height: 8.5rem;
  padding: 0.5em 0.75em;
  color: ${(props) => props.theme.colors.text};
  font-family: 'Courier New', Courier, monospace;
  line-height: inherit;
  background: ${(props) => props.theme.colors.input};
  border: none;
  border-radius: 0.25rem 0.25rem 0 0;
  box-shadow: inset 0 -2px 0 0 ${(props) => props.theme.colors.main};
  cursor: pointer;
  overflow: hidden;
  resize: none;
  white-space: pre-wrap;
  cursor: copy;
`
const Copy = styled.button`
  position: absolute;
  bottom: 0;
  right: 0;
  padding: 0.5rem 0.3rem 0.5rem 1rem;
  color: ${(props) => props.theme.colors.background};
  background-color: ${(props) => props.theme.colors.main};
  border: none;
  cursor: copy;

  &:focus {
    outline: none;
  }
`
const Check = styled.svg`
  width: 1rem;
  height: auto;
  vertical-align: top;
  opacity: ${(props) => (props.copied ? 1 : 0)};
  transition: opacity 200ms ease-out;
  path {
    fill: ${(props) => props.theme.colors.background};
  }
`
export default function Code(props) {
  let location = useLocation()
  const { theme } = useContext(StyleContext)

  const [script, setScript] = useState('')

  useEffect(() => {
    setScript(
      `<script id="widget-recosante" src="${
        window.location.origin
      }/iframe.js" data-search="${
        props.defaultPlace ? formatPlaceUrl(props.defaultPlace).substring(1) : ''
      }?theme=${theme}"></script>`
    )
  }, [location.pathname, props.defaultPlace, theme])

  const [copied, setCopied] = useState(false)
  useEffect(() => {
    return () => {
      setCopied(false)
    }
  }, [script])

  return (
    <Wrapper>
      <Label>
        Copiez ce code puis ajoutez-le où vous souhaitez qu'il s'affiche sur
        votre site web
      </Label>
      <Text
        readOnly={true}
        value={script}
        onClick={() => {
          if (copy(script)) {
            setCopied(true)
          }
        }}
      />
      <Copy
        onClick={() => {
          if (copy(script)) {
            setCopied(true)
          }
        }}
      >
        Copier{' '}
        <Check
          copied={copied}
          height='417pt'
          viewBox='0 -46 417.81333 417'
          width='417pt'
        >
          <path d='m159.988281 318.582031c-3.988281 4.011719-9.429687 6.25-15.082031 6.25s-11.09375-2.238281-15.082031-6.25l-120.449219-120.46875c-12.5-12.5-12.5-32.769531 0-45.246093l15.082031-15.085938c12.503907-12.5 32.75-12.5 45.25 0l75.199219 75.203125 203.199219-203.203125c12.503906-12.5 32.769531-12.5 45.25 0l15.082031 15.085938c12.5 12.5 12.5 32.765624 0 45.246093zm0 0' />
        </Check>
      </Copy>
    </Wrapper>
  )
}
