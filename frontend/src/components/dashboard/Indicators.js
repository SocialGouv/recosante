import React from 'react'
import styled from 'styled-components'
import Masonry from 'react-masonry-css'

import IndiceAtmo from './indicators/IndiceAtmo'
import Raep from './indicators/Raep'
import VigilanceMeteo from './indicators/VigilanceMeteo'
import IndiceUv from './indicators/IndiceUv'
import Baignades from './indicators/Baignades'
import PotentielRadon from './indicators/PotentielRadon'

const StyledMasonry = styled(Masonry)`
  display: flex;
  margin-left: -2rem;
  width: auto;

  .my-masonry-grid_column {
    padding-left: 2rem;
  }
`
export default function Indicators(props) {
  return (
    <StyledMasonry
      breakpointCols={{
        default: 2,
        1200: 1,
      }}
      columnClassName='my-masonry-grid_column'
    >
      <IndiceAtmo place={props.place} date={props.date} />
      <Raep place={props.place} date={props.date} />
      <VigilanceMeteo place={props.place} date={props.date} />
      <IndiceUv place={props.place} date={props.date} />
      <Baignades place={props.place} />
      <PotentielRadon place={props.place} />
    </StyledMasonry>
  )
}
