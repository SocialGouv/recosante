import React, { useState, useEffect } from "react"
import styled from 'styled-components'

import Element from './details/Element'
import Button from 'components/base/Button'

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
`
export default function Details(props) {
  const offSeason = props.data?.baignades?.indice?.label === "Hors-saison"
  const allDetails = props.data?.baignades?.indice?.details
  const threshold = 5
  const [details, setDetails] = useState(null)
  const [loadAll, setLoadAll] = useState(false)
  const [hasMore, setHasMore] = useState(false)
  const handleLoadAll = () => {
    setLoadAll(true)
  }
  useEffect(() => {
    if (loadAll && hasMore) {
      setDetails(allDetails)
      setLoadAll(false)
    }
  }, [loadAll, hasMore]) //eslint-disable-line
  useEffect(() => {
    if (details) {
      const hasMore = details.length < allDetails.length
      setHasMore(hasMore)
    }
  }, [details]) //eslint-disable-line
  useEffect(() => {
    allDetails && setDetails([...allDetails.slice(0, threshold)])
  }, [allDetails]) //eslint-disable-line

  return details ? (
    <Wrapper>
      {details.map((element) => (
        <Element
          key={element.label}
          label={element.label}
          url={element.url}
          interdiction={element.interdiction}
          sample={!offSeason ? element.sample : null}
          ranking={element.ranking}
        />
      ))}
      {hasMore && <Button.Wrapper><Button onClick={handleLoadAll}>Voir tous les sites</Button></Button.Wrapper>}
    </Wrapper>
  ) : null
}
