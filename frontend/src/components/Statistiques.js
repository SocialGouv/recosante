import React from 'react'
import styled from 'styled-components'
import Section from 'components/base/Section'
import useStatistiques from 'hooks/useStatistiques'
import Email from 'components/statistiques/Email'
import Web from 'components/statistiques/Web'

export const MainTitle = styled.h1`
  color: ${(props) => props.theme.colors.main};
  font-size: 2.75rem;
  margin-bottom: 5rem;
`
export const Subsection = styled(Section)`
  margin-bottom: 5rem;
`
export const StyledSection = styled(Section)`
  display: flex;
  ${(props) => props.theme.mq.medium} {
    flex-direction: column;
  }
  margin-bottom: 0;
`
export const Wrapper = styled.div`
  width: 100%;
  height: 25rem;
`
export const Text = styled.h3`
  flex: 1;
  text-align: center;
  margin-top: 2rem;
  strong {
    font-size: 4rem;
  }
`

export default function Statistiques() {
  const { web, email, openings } = useStatistiques()
  return web && web && email && email ? (
    <>
      {web.total_visits && (
        <Web
          total_visits={web.total_visits}
          monthly_visits={JSON.parse(web.monthly_visits)}
          place_monthly_visits={JSON.parse(web.place_monthly_visits)}
          integration_widget={web.integration_widget}
          integration_website={web.integration_website}
          channel_search={web.channel_search}
          channel_direct={web.channel_direct}
          channel_website={web.channel_website}
          channel_social={web.channel_social}
          channel_campaign={web.channel_campaign}
        />
      )}
      {email.total_actifs && (
        <Email
          total_actifs={email.total_actifs}
          active_users={JSON.parse(email.active_users)}
          desinscriptions={JSON.parse(email.desinscriptions)}
          temps_moyen_inscription={email.temps_moyen_inscription} 
          indicateur_indice_atmo={email.indicateur_indice_atmo}
          indicateur_raep={email.indicateur_raep}
          indicateur_vigilance_meteo={email.indicateur_vigilance_meteo}
          indicateur_indice_uv={email.indicateur_indice_uv}
          frequence_quotidien={email.frequence_quotidien}
          frequence_alerte={email.frequence_alerte}
          media_mail={email.media_mail}
          media_notifications_web={email.media_notifications_web}
          newsletter_hebdo={email.newsletter_hebdo}
          total_utile={email.total_utile}
          utile_oui={email.utile_oui}
          opening={openings && openings && openings.opening}
        />
      )}
    </>
  ) : null
}
