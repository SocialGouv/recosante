import React from 'react'

import useBaignades from 'hooks/useBaignades'
import MagicLink from 'components/base/MagicLink'
import Card from 'components/misc/Card'
import Chart from './baignades/Chart'
import Details from './baignades/Details'

export default function IndiceAtmo(props) {
  const { data, isError, isLoading } = useBaignades(props.place.code)
  return (
    (!data || data.baignades !== {}) && (
      <Card columns={6}>
        <Card.Content>
          <Card.Header>
            <Card.Info>
              <Card.Title isLoading={isLoading} indicateur='baignades'>
                Qualité des eaux de baignade
              </Card.Title>
              <Card.Value isError={isError}>
                {isError
                  ? 'Zut 🦙'
                  : data &&
                  (data.baignades.indice?.label || 'Pas de données')}
              </Card.Value>
            </Card.Info>
            <Chart data={data && !data.baignades.error && data} />
          </Card.Header>
          <Card.Mobile indicateur='baignades' place={props.place} disabled>
            <Card.Details>
              <Details data={data && !data.baignades.error && data} />
            </Card.Details>
            <Card.Recommandation
              dangerouslySetInnerHTML={{
                __html: isError
                  ? `Nous ne sommes malheureusement pas en mesure d’afficher la qualité des eaux de baignade pour l’instant. Veuillez réessayer dans quelques instants.`
                  : data &&
                  (data.baignades.error
                    ? `Les données ne sont pas disponibles pour cette commune`
                    : (data.baignades.indice?.label === 'Hors-saison'
                      ? `La saison de baignade n’a pas encore officiellement débuté dans cette commune.`
                      : (data.baignades.indice?.label === 'Pas de sites'
                        ? `Il n’y a pas de sites de baignade en eau de mer ou en eau douce recensés pour cette commune.`
                        : data.baignades.indice?.summary['Interdiction'] > 0 ?
                          `Pour plus de renseignements sur les interdictions de baignade, veuillez contacter la mairie ou l’Agence régionale de santé (ARS).` :
                          data.baignades.advice &&
                          data.baignades.advice.main))),
              }}
            />
          </Card.Mobile>
          <Card.SubscribeWrapper>
            <Card.Subscribe indicateur='baignades' place={props.place} disabled />
          </Card.SubscribeWrapper>
        </Card.Content>
        {data && !data.baignades.error && data.baignades.validity && (
          <Card.Source>
            {data.baignades.indice?.label !== 'Pas de sites' &&
              <>
                Saison ouverte du{' '}
                {new Date(data.baignades.validity.start).toLocaleDateString('fr', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}{' '}
                au{' '}
                {new Date(data.baignades.validity.end).toLocaleDateString('fr', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}{' '}
                dans {data.baignades.validity.area}
                <br />
              </>
            }
            Données fournies par{' '}
            {data.baignades.sources && (
              <MagicLink to={data.baignades.sources[0].url}>
                {data.baignades.sources[0].label}
              </MagicLink>
            )}
          </Card.Source>
        )}
      </Card>
    )
  )
}
