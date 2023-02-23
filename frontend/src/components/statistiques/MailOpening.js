import React, { useState, useEffect, useContext } from 'react'
import styled from 'styled-components'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

import StyleContext from 'utils/StyleContext'
import Section from 'components/base/Section'

const Wrapper = styled.div`
  width: 100%;
  height: 25rem;
`
export default function Opening(props) {
  const { themes, theme } = useContext(StyleContext)
  let data = Object.keys(props.openings).map((key) => ({
    date: key,
    [`taux d'ouverture`]: Math.round(props.openings[key]),
  }))

  data.pop()

  console.log(data[data.length - 1])

  const [width, setWidth] = useState(null)
  useEffect(() => {
    setTimeout(() => setWidth(window.innerWidth), 100)
  }, [])

  return (
    <Section>
      <Section.Title center>
        <strong>
          {Math.round(data[data.length - 1][`taux d'ouverture`])}%
        </strong>{' '}
        d’ouverture de mail (le {data[data.length - 1]['date']})
      </Section.Title>
      <Wrapper>
        <ResponsiveContainer>
          <AreaChart
            data={data}
            margin={{ top: 5, right: 30, left: 20, bottom: 50 }}
          >
            <XAxis
              dataKey='date'
              tick={{ fontSize: 12 }}
              interval={width < 1200 ? 'preserveStartEnd' : 0}
              angle={-45}
              dx={-25}
              dy={25}
            />
            <YAxis unit='%' ticks={[0, 20, 40, 60, 80, 100]} />
            <Tooltip />
            <Area
              dataKey={`taux d'ouverture`}
              fill={themes[theme].colors.main}
            />
          </AreaChart>
        </ResponsiveContainer>
      </Wrapper>
    </Section>
  )
}
