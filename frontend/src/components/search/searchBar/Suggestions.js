import React, { useEffect, useCallback } from 'react'
import styled from 'styled-components'

import Highlighter from 'react-highlight-words'

const Wrapper = styled.div`
  max-height: 21em;
  margin-bottom: 0.125rem;
  overflow-y: auto;
  background-color: ${(props) => props.theme.colors.background};
`
const Suggestion = styled.div`
  padding: 0.75em 0.75em 0.75em 2em;
  font-size: clamp(0.875rem, 0.875em, 1rem);
  cursor: pointer;
  transition: background-color 200ms ease-out,
    opacity ${(props) => (props.isFetching ? 300 : 0)}ms ease-out;
  background-color: rgba(
    ${(props) => props.theme.colors.mainAlpha},
    ${(props) => (props.current ? 0.075 : 0)}
  );
  opacity: ${(props) => (props.isFetching ? 0.3 : 1)};

  &:hover {
    background-color: rgba(${(props) => props.theme.colors.mainAlpha}, 0.11);
  }
  mark {
    color: ${(props) => props.theme.colors.text};
    background-color: transparent;
    opacity: 0.8;
  }
`
const Name = styled.span``
const PostalCode = styled.span`
  opacity: 1;
`
export default function Suggestions(props) {
  const maxSuggestions = 7

  const onKeyDown = useCallback(
    (e) => {
      if (e.code === 'ArrowDown') {
        e.preventDefault()
        props.current < maxSuggestions - 1
          ? props.setCurrent((prevCurrent) => prevCurrent + 1)
          : props.setCurrent(0)
      }
      if (e.code === 'ArrowUp') {
        e.preventDefault()
        props.current > 0 && props.setCurrent((prevCurrent) => prevCurrent - 1)
      }
    },
    [props]
  )

  useEffect(() => {
    window.addEventListener('keydown', onKeyDown)

    return () => {
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [onKeyDown])

  return (
    <Wrapper>
      {props.results.map(
        (result, index) =>
          index < maxSuggestions && (
            <Suggestion
              current={index === props.current}
              key={result['code']}
              isFetching={props.isFetching}
              onClick={() => props.handleSuggestionClick(result)}
              onMouseDown={(e) => e.preventDefault()}
            >
              <Name>
                <Highlighter
                  searchWords={props.search.split(' ')}
                  autoEscape={true}
                  textToHighlight={result['nom']}
                />
              </Name>
              <PostalCode>
                {' '}
                (
                {result['codesPostaux'].length > 2
                  ? result['codesPostaux'][0] +
                    ' ... ' +
                    result['codesPostaux'][result['codesPostaux'].length - 1]
                  : result['codesPostaux'].join(', ')}
                )
              </PostalCode>
            </Suggestion>
          )
      )}
    </Wrapper>
  )
}
