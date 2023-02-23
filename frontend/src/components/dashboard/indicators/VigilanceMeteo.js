import React from 'react'

import useIndicators from 'hooks/useIndicators'
import MagicLink from 'components/base/MagicLink'
import Card from 'components/misc/Card'
import Chart from './vigilanceMeteo/Chart'
import Details from './vigilanceMeteo/Details'

export default function VigilanceMeteo(props) {
  const { data, isError, isLoading } = useIndicators(props.place.code, props.date)

  return (
    <Card columns={6}>
      <Card.Content>
        <Card.Header>
          <Card.Info>
            <Card.Title isLoading={isLoading} indicateur='vigilancemeteo'>
              Vigilance météo
            </Card.Title>
            <Card.Value isError={isError}>
              {isError
                ? 'Arf 🦖'
                : data &&
                  (data.vigilance_meteo.indice?.label
                    ? data.vigilance_meteo.indice.label
                    : 'Pas de données')}
            </Card.Value>
          </Card.Info>
          <Chart data={data && !data.vigilance_meteo.error && data} />
        </Card.Header>
        <Card.Mobile indicateur='vigilancemeteo' place={props.place}>
          <Card.Details>
            <Details data={data && !data.vigilance_meteo.error && data} />
          </Card.Details>
          <Card.Recommandation
            dangerouslySetInnerHTML={{
              __html: isError
                ? `Nous ne sommes malheureusement pas en mesure d'afficher la vigilance météo pour l'instant. Veuillez réessayer dans quelques instants.`
                : data &&
                  (data.vigilance_meteo.error
                    ? `Les données ne sont pas disponibles pour cette commune`
                    : data.vigilance_meteo.advice &&
                      data.vigilance_meteo.advice.main),
            }}
          />
        </Card.Mobile>
        <Card.SubscribeWrapper>
          <Card.Subscribe indicateur='vigilance_meteo' place={props.place} />
        </Card.SubscribeWrapper>
      </Card.Content>
      {data &&
        data.vigilance_meteo &&
        data.vigilance_meteo.validity &&
        data.vigilance_meteo.sources && (
          <Card.Source>
            Prévision{' '}
            {data.vigilance_meteo.validity.start ? (
              <>
                du{' '}
                {new Date(
                  data.vigilance_meteo.validity.start
                ).toLocaleDateString('fr', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                })}{' '}
                au{' '}
                {new Date(data.vigilance_meteo.validity.end).toLocaleDateString(
                  'fr',
                  {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                  }
                )}{' '}
                dans
              </>
            ) : (
              <> dans </>
            )}{' '}
            {data.vigilance_meteo.validity.area}
            <br />
            Données fournies par{' '}
            <MagicLink to={data.vigilance_meteo.sources[0].url}>
              {data.vigilance_meteo.sources[0].label}
            </MagicLink>
          </Card.Source>
        )}
    </Card>
  )
}
