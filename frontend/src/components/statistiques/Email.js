import React, { useContext } from 'react'
import Section from 'components/base/Section'
import { MainTitle, Subsection, StyledSection, Wrapper, Text } from 'components/Statistiques'
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

export default function Email(props) {
  const { themes, theme } = useContext(StyleContext)
  const today = new Date()
  const activeUsersData = Object.keys(props.active_users).map((key) => ({
    date: key,
    active: props.active_users[key],
  }))
  const desabonnementData = Object.keys(props.active_users).map((key) => ({
    date: key,
    desinscriptions: (props.desinscriptions[key] || 0) / props.active_users[key],
  }))
  const frequenceData = [{
    name: "Tous les jours",
    value: props.frequence_quotidien / props.total_actifs
  }, {
    name: "En cas de vigilance",
    value: props.frequence_alerte / props.total_actifs
  }]
  const mediaData = [{
    name: "Par email",
    value: props.media_mail / props.total_actifs
  }, {
    name: "Par notification",
    value: props.media_notifications_web / props.total_actifs
  }]
  const formatAsDecimal = (num) => (
    new Intl.NumberFormat('fr-FR', {
      style: 'decimal'
    }).format(num)
  )
  const formatAsPercent = (num) => (
    new Intl.NumberFormat('fr-FR', {
      style: 'percent',
    }).format(num)
  )
  const formatAsFractionPercent = (num) => (
    new Intl.NumberFormat('fr-FR', {
      style: 'percent',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(num)
  )
  const colors = [themes[theme].colors.main, '#6a6af4', '#cacafb']
  return (
    <>
      <Section>
        <MainTitle>
          L’abonnement aux indicateurs
        </MainTitle>
        <Subsection>
          <Section.Title center>
            <strong>{formatAsDecimal(props.total_actifs)}</strong> abonnés
          </Section.Title>
          <Section.Subtitle center>
            (au {today.toLocaleDateString()})
          </Section.Subtitle>
          <Wrapper>
            <ResponsiveContainer>
              <LineChart data={activeUsersData}>
                <XAxis
                  dataKey='date'
                  tick={{ fontSize: 12 }}
                  interval='preserveStartEnd'
                />
                <YAxis tickFormatter={(value) => formatAsDecimal(value)} />
                <Tooltip formatter={(value) => formatAsDecimal(value)} />
                <Legend />
                <Line
                  name='abonnés'
                  dataKey='active'
                  stroke={colors[0]}
                  strokeWidth={3}
                />
              </LineChart>
            </ResponsiveContainer>
          </Wrapper>
        </Subsection>
        <Subsection>
          <Section.Title center>À quels indicateurs sont abonnés nos utilisateurs ?</Section.Title>
          <StyledSection>
            <Text center>
              <strong>
                {formatAsPercent(props.indicateur_indice_atmo / props.total_actifs)}
              </strong>
              <br /> à l’indice ATMO de qualité de l’air
            </Text>
            <Text center>
              <strong>
                {formatAsPercent(props.indicateur_raep / props.total_actifs)}
              </strong>
              <br /> au risque d’allergie aux pollens
            </Text>
            <Text center>
              <strong>
                {formatAsPercent(props.indicateur_vigilance_meteo / props.total_actifs)}
              </strong>
              <br /> à la vigilance méteo
            </Text>
            <Text center>
              <strong>
                {formatAsPercent(props.indicateur_indice_uv / props.total_actifs)}
              </strong>
              <br /> à l’indice UV
            </Text>
          </StyledSection>
        </Subsection>
        <Subsection>
          <Section.Title center>À quelle fréquence et de quelle façon les reçoivent-ils ?</Section.Title>
          <StyledSection>
            <Wrapper>
              <ResponsiveContainer>
                <PieChart width={700} height={600}>
                  <Pie
                    dataKey='value'
                    data={frequenceData}
                    cx='50%'
                    cy='50%'
                    outerRadius={'66%'}
                    label={(entry) => formatAsPercent(entry.value)}
                    isAnimationActive={false}
                  >
                    {frequenceData.map((entry, index) => (
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
                <PieChart width={700} height={600}>
                  <Pie
                    dataKey='value'
                    data={mediaData}
                    cx='50%'
                    cy='50%'
                    outerRadius={'66%'}
                    label={(entry) => formatAsPercent(entry.value)}
                    isAnimationActive={false}
                  >
                    {mediaData.map((entry, index) => (
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
        <Subsection>
          <Section.Title center>
            Quelle proportion se désabonne chaque mois ?
          </Section.Title>
          <Section.Subtitle center>
            (après <strong>{props.temps_moyen_inscription}</strong> jours en moyenne)
          </Section.Subtitle>
          <Wrapper>
            <ResponsiveContainer>
              <LineChart data={desabonnementData}>
                <XAxis
                  dataKey='date'
                  tick={{ fontSize: 12 }}
                  interval='preserveStartEnd'
                />
                <YAxis tickFormatter={(value) => formatAsPercent(value)} />
                <Tooltip formatter={(value) => formatAsFractionPercent(value)} />
                <Legend />
                <Line
                  name='taux de désabonnement mensuel'
                  dataKey='desinscriptions'
                  stroke={colors[0]}
                  strokeWidth={3}
                />
              </LineChart>
            </ResponsiveContainer>
          </Wrapper>
        </Subsection>
      </Section>
      <Section>
        <MainTitle>
          L’abonnement à la lettre d’information hebdomadaire
        </MainTitle>
        <StyledSection>
          <Text center>
            <strong>
              {formatAsDecimal(props.newsletter_hebdo)}
            </strong>
            <br /> abonnés reçoivent l’infolettre
          </Text>
          {props.opening > 0 && (
            <Text center>
              <strong>
                + de {formatAsPercent(props.opening)}
              </strong>
              <br /> des infolettres sont ouvertes
            </Text>
          )}
          <Text center>
            <strong>
              {formatAsPercent(props.utile_oui / props.total_utile)}
            </strong>
            <br /> des répondants sont satisfaits du contenu
          </Text>
        </StyledSection>
      </Section>
    </>
  )
}
