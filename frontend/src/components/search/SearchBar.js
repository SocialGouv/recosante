import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'

import { useSearch } from 'hooks/useSearch'
import useDebounce from 'hooks/useDebounce'
import TextInput from './searchBar/TextInput'
import Suggestions from './searchBar/Suggestions'

const Wrapper = styled.form`
  position: absolute;
  z-index: 100;
  top: 0;
  width: 21em;
  font-size: 2rem;
  background-color: rgba(${(props) => props.theme.colors.backgroundAlpha}, 1);
  //backdrop-filter: blur(1rem);
  border: solid 1px
    rgba(
      ${(props) => props.theme.colors.mainAlpha},
      ${(props) => (props.focus ? 0.15 : 0.05)}
    );
  border-bottom: none;
  box-shadow: inset 0 -0.125rem 0 0 ${(props) => props.theme.colors.main};

  ${(props) => props.theme.mq.medium} {
    max-width: 100%;
    left: 50%;
    transform: translateX(-50%);
  }
  ${(props) => props.theme.mq.small} {
    font-size: 1.25rem;
  }
`
export default function SearchBar(props) {
  const [search, setSearch] = useState(props.initialValue || '')

  const debouncedSearch = useDebounce(search)

  const { data, isFetching } = useSearch(debouncedSearch)

  const [focus, setFocus] = useState(false)
  const input = useRef(null)
  const [current, setCurrent] = useState(0)
  useEffect(() => {
    if (!focus) {
      setCurrent(0)
    }
  }, [focus])
  const selectPlace = (place) => {
    window?._paq?.push(['trackEvent', 'Search', 'PlaceInput', place.nom])
    setSearch(place.nom)
    props.handlePlaceSelection(place)
    setFocus(false)
  }

  return (
    <Wrapper
      className={props.className}
      focus={focus}
      onSubmit={(e) => {
        e.preventDefault()
        e.stopPropagation()
        if (current > -1 && data[current]) {
          selectPlace(data[current])
        }
      }}
    >
      <TextInput
        ref={input}
        search={search}
        suggestion={data && data[current]}
        suggestionVisible={data && focus}
        isFetching={isFetching}
        setSearch={setSearch}
        setFocus={setFocus}
        placeholder={props.placeholder}
        handlePlaceSelection={(place) => {
          selectPlace(place)
        }}
      />
      {data && focus && (
        <Suggestions
          search={debouncedSearch}
          results={data}
          focus={focus}
          current={current}
          isFetching={isFetching}
          setCurrent={setCurrent}
          handleSuggestionClick={(place) => {
            selectPlace(place)
          }}
        />
      )}
    </Wrapper>
  )
}
