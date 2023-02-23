import React from 'react'
import styled from 'styled-components'

import EpisodePollution from './header/EpisodePollution'
import Select from 'components/base/FancySelect'
import Button from 'components/base/Button'

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;

  ${(props) => props.theme.mq.medium} {
    flex-direction: column;
  }
`
const TitleWrapper = styled.div`
  flex: 1;
  margin-bottom: 2rem;
`
const Title = styled.h1`
  margin: 0 0 0 -0.15rem;

  ${(props) => props.theme.mq.medium} {
    text-align: center;
  }
`
const Name = styled.span`
  color: ${(props) => props.theme.colors.main};
`
const DateWrapper = styled.span`
  font-size: 2rem;
  font-weight: 300;
  color: ${(props) => props.theme.colors.text};

  ${(props) => props.theme.mq.medium} {
    display: block;
    margin: 0.2rem 0 0.4rem;
    font-size: 1.25rem;
  }
  ${(props) => props.theme.mq.small} {
    font-size: 1.125rem;
  }
`
const Intro = styled.span`
  ${(props) => props.theme.mq.medium} {
    display: none;
  }
`
const Details = styled.div`
  font-size: 1.25rem;
  font-weight: 300;
  margin-bottom: 1rem;

  ${(props) => props.theme.mq.medium} {
    display: block;
    font-size: 1rem;
    text-align: center;
  }
  ${(props) => props.theme.mq.medium} {
    font-size: 0.875rem;
  }
`
const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin: 0 -0.5rem;
  > * {
    margin: 0 0.5rem 0;
  }
`

export default function Header(props) {
  const today = new Date()
  const tomorrow = new Date(today)
  tomorrow.setDate(tomorrow.getDate() + 1)
  const formatDateLabel = (date) => {
    return new Intl.DateTimeFormat('fr-FR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(date)
  }
  const formatDateValue = (date) => {
    return new Intl.DateTimeFormat("fr-CA", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit"
    }).format(date)
  }
  const todayValue = formatDateValue(today)
  const tomorrowValue = formatDateValue(tomorrow)
  const options = [
    { value: todayValue, label: formatDateLabel(today) },
    { value: tomorrowValue, label: formatDateLabel(tomorrow) }
  ]
  const date = (props.date === tomorrowValue) ? tomorrowValue : todayValue
  const changeDate = (date) => {
    props.setDate(date)
    window?._paq?.push(['trackEvent', 'Search', 'DateChange'])
  }
  return (
    <Wrapper>
      <TitleWrapper>
        <Title>
          <Name>{props.place.nom}</Name>
          <DateWrapper>
            <Intro>, le </Intro>
            <Select
              fancy
              value={date}
              onChange={(value) => {
                changeDate(value !== todayValue && value)
              }}
              options={options}
            />
          </DateWrapper>
        </Title>
        <Details>
          {props.place.codesPostaux.length > 2
            ? props.place.codesPostaux[0] +
            ' ... ' +
            props.place.codesPostaux[props.place.codesPostaux.length - 1]
            : props.place.codesPostaux.join(', ')}{' '}
          - {props.place.departement.nom}
        </Details>
        <ButtonWrapper>
          <Button
            hollow={date !== todayValue}
            onClick={() => {
              changeDate(false)
            }}>
            Aujourd’hui
          </Button>
          <Button
            hollow={date !== tomorrowValue}
            onClick={() => {
              changeDate(tomorrowValue)
            }}
          >
            Demain
          </Button>
        </ButtonWrapper>
      </TitleWrapper>
      <EpisodePollution place={props.place} date={props.date} />
    </Wrapper>
  )
}
