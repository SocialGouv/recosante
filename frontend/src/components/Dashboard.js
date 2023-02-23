import React, { useState } from 'react'
import styled from 'styled-components'

import Section from 'components/base/Section'
import Background from 'components/misc/Background'
import Header from './dashboard/Header'
import Indicators from './dashboard/Indicators'
import EpisodePollution from './dashboard/EpisodePollution'

const Wrapper = styled.div`
  position: relative;
  margin: 0 auto 10rem;
  padding: 0 0 6.5rem;

  ${(props) => props.theme.mq.small} {
    margin-bottom: 5rem;
  }
`
const StyledSection = styled(Section)`
  position: relative;
  margin: 0 auto;
`
export default function Dashboard(props) {
  const [date, setDate] = useState()
  return (
    <Wrapper>
      <Background />
      <StyledSection first>
        <Header place={props.place} date={date} setDate={setDate} />
        <Indicators place={props.place} date={date} />
        <EpisodePollution place={props.place} date={date} />
      </StyledSection>
    </Wrapper>
  )
}
