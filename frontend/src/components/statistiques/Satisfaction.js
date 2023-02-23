import React from 'react'
import styled from 'styled-components'
import {
  PieChart,
  Pie,
  Tooltip,
  Cell,
  ResponsiveContainer,
  Legend,
} from 'recharts'

import Section from 'components/base/Section'

const Wrapper = styled.div`
  width: 100%;
  height: 35rem;
`
export default function Subscriptions(props) {
  const data = Object.keys(props.satisfaction).map((key) => ({
    name: key,
    satisfaction: props.satisfaction[key],
  }))
  const colors = ['#FFCD56', '#FFA726', '#2FA0F2', '#4BC0C0']
  return (
    <Section>
      <Section.Title center>Satisfaction des utilisateurs</Section.Title>
      <Wrapper>
        <ResponsiveContainer>
          <PieChart width={700} height={600}>
            <Pie
              dataKey='satisfaction'
              data={data}
              cx='50%'
              cy='55%'
              outerRadius={'90%'}
              label
              margin={{ top: 500 }}
            >
              {data.map((entry, index) => (
                <Cell key={entry.name} fill={colors[index]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend layout='vertical' align='center' verticalAlign='top' />
          </PieChart>
        </ResponsiveContainer>
      </Wrapper>
    </Section>
  )
}
