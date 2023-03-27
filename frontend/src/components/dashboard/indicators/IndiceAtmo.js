import React from 'react'

import useIndicators from 'hooks/useIndicators'
import MagicLink from 'components/base/MagicLink'
import Card from 'components/misc/Card'
import Chart from './indiceAtmo/Chart'
import Details from './indiceAtmo/Details'

export default function IndiceAtmo(props) {
  const { data, isError, isLoading } = useIndicators(props.place.code, props.date)

  return (
    (!data || data.indice_atmo !== {}) && (
      <Card columns={6}>
        <Card.Content>
          <Card.Header>
            <Card.Info>
              <Card.Title isLoading={isLoading} indicateur='indice_atmo'>
                Indice ATMO de la qualité de l'air
              </Card.Title>
              <Card.Value isError={isError}>
                {isError
                  ? 'Oups 🦔'
                  : data &&
                    (data.indice_atmo.indice?.label || 'Pas de données')}
              </Card.Value>
            </Card.Info>
            <Chart data={data && !data.indice_atmo.error && data} />
          </Card.Header>
          <Card.Mobile indicateur='indice_atmo' place={props.place}>
            <Card.Details>
              <Details data={data && !data.indice_atmo.error && data} />
            </Card.Details>
            <Card.Recommandation
              dangerouslySetInnerHTML={{
                __html: isError
                  ? `<p>Nous ne sommes malheureusement pas en mesure d'afficher l'indice de qualité de l'air pour l'instant. Veuillez réessayer dans quelques instants.</p>`
                  : data &&
                    (data.indice_atmo.error
                      ? `<p>Les données ne sont pas disponibles pour cette commune.</p>`
                      : data.indice_atmo.advice &&
                        data.indice_atmo.advice.main),
              }}
            />
          </Card.Mobile>
          <Card.SubscribeWrapper>
            <Card.Subscribe indicateur='indice_atmo' place={props.place} />
          </Card.SubscribeWrapper>
        </Card.Content>
        {data && !data.indice_atmo.error && data.indice_atmo.validity && (
          <Card.Source>
            <p>
              Prévision pour le{' '}
              {new Date(data.indice_atmo.validity.start).toLocaleDateString(
                'fr',
                {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                }
              )}{' '}
              dans {data.indice_atmo.validity.area}
            </p>
            <p>
              Données fournies par{' '}
              {data.indice_atmo.sources && (
                <MagicLink to={data.indice_atmo.sources[0].url}>
                  {data.indice_atmo.sources[0].label}
                </MagicLink>
              )}
            </p>
          </Card.Source>
        )}
      </Card>
    )
  )
}
