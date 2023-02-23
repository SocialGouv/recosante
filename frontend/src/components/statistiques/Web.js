import React, { useContext } from 'react'
import Section from 'components/base/Section'
import { MainTitle, Subsection, StyledSection, Wrapper } from 'components/Statistiques'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts'
import StyleContext from 'utils/StyleContext'

export default function Website(props) {
  const { themes, theme } = useContext(StyleContext)
  const today = new Date()
  const visitsData = Object.keys(props.monthly_visits).map((key) => ({
    date: key,
    all: props.monthly_visits[key],
    place: props.place_monthly_visits[key],
  }))
  const totalIntegration = props.integration_widget + props.integration_website
  const otherChannels = props.channel_campaign + props.channel_website + props.channel_social
  const totalChannel = props.channel_search + props.channel_direct + otherChannels
  const integrationData = [{
    name: "Widget intégré",
    value: props.integration_widget / totalIntegration
  }, {
    name: "Site web",
    value: props.integration_website / totalIntegration
  }]
  const channelData = [{
    name: "Moteurs de recherche",
    value: props.channel_search / totalChannel
  }, {
    name: "Accès direct",
    value: props.channel_direct / totalChannel
  }, {
    name: "Autres canaux",
    value: otherChannels / totalChannel
  }]
  const formatAsDecimal = (num) => (
    new Intl.NumberFormat('fr-FR', {
      style: 'decimal'
    }).format(num)
  )
  const formatAsPercent = (num) => (
    new Intl.NumberFormat('fr-FR', {
      style: 'percent'
    }).format(num)
  )
  const colors = [themes[theme].colors.main, '#6a6af4', '#cacafb']
  return (
    <Section first>
      <MainTitle>
        Le tableau de bord des indicateurs
      </MainTitle>
      <Subsection>
        <Section.Title center>
          <strong>{formatAsDecimal(props.total_visits)}</strong> visites
        </Section.Title>
        <Section.Subtitle center>
          (au {today.toLocaleDateString()})
        </Section.Subtitle>
        <Wrapper>
          <ResponsiveContainer>
            <LineChart data={visitsData}>
              <XAxis
                dataKey='date'
                tick={{ fontSize: 12 }}
                interval='preserveStartEnd'
              />
              <YAxis tickFormatter={(value) => formatAsDecimal(value)} />
              <Tooltip formatter={(value) => formatAsDecimal(value)} />
              <Legend />
              <Line
                name='toutes les visites'
                dataKey='all'
                stroke={colors[0]}
                strokeWidth={3}
              />
              <Line
                name='utilisations du tableau de bord'
                dataKey='place'
                stroke={colors[1]}
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </Wrapper>
      </Subsection>
      <Subsection>
        <Section.Title center>
          D’où viennent nos visiteurs ?
        </Section.Title>
        <StyledSection>
          <Wrapper>
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  dataKey='value'
                  data={integrationData}
                  cx='50%'
                  cy='50%'
                  outerRadius={'66%'}
                  label={(entry) => formatAsPercent(entry.value)}
                  isAnimationActive={false}
                >
                  {integrationData.map((entry, index) => (
                    <Cell key={entry.name} fill={colors[index]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => formatAsPercent(value)} />
                <Legend layout='vertical' align='center' verticalAlign='bottom' />
              </PieChart>
            </ResponsiveContainer>
          </Wrapper>
          <Wrapper>
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  dataKey='value'
                  data={channelData}
                  cx='50%'
                  cy='50%'
                  outerRadius={'66%'}
                  label={(entry) => formatAsPercent(entry.value)}
                  isAnimationActive={false}
                >
                  {channelData.map((entry, index) => (
                    <Cell key={entry.name} fill={colors[index]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => formatAsPercent(value)} />
                <Legend layout='vertical' align='center' verticalAlign='bottom' />
              </PieChart>
            </ResponsiveContainer>
          </Wrapper>
        </StyledSection>
      </Subsection>
    </Section>
  )
}