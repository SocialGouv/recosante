import React from 'react'

import useIndicators from 'hooks/useIndicators'
import MagicLink from 'components/base/MagicLink'
import Card from 'components/misc/Card'
import Chart from './potentielRadon/Chart'

export default function PotentielRadon(props) {
  const { data, isError, isLoading } = useIndicators(props.place.code)

  return (
    <Card columns={6}>
      <Card.Content>
        <Card.Header>
          <Card.Info>
            <Card.Title isLoading={isLoading} indicateur='potentiel_radon'>
              Potentiel Radon
            </Card.Title>
            <Card.Value isError={isError}>
              {isError ? 'Arf 🦖' : data && data.potentiel_radon.indice.label}
            </Card.Value>
          </Card.Info>
          <Chart data={data} />
        </Card.Header>
        <Card.Mobile indicateur='potentiel_radon' place={props.place} disabled>
          <Card.Recommandation
            dangerouslySetInnerHTML={{
              __html: isError
                ? `Nous ne sommes malheureusement pas en mesure d'afficher le potentiel radon pour l'instant. Veuillez réessayer dans quelques instants.`
                : data &&
                  data.potentiel_radon.advice &&
                  data.potentiel_radon.advice.main,
            }}
          />
        </Card.Mobile>
        <Card.SubscribeWrapper>
          <Card.Subscribe
            indicateur='potentiel_radon'
            place={props.place}
            disabled
          />
        </Card.SubscribeWrapper>
      </Card.Content>
      {data &&
        data.potentiel_radon &&
        data.potentiel_radon.validity &&
        data.potentiel_radon.sources && (
          <Card.Source>
            Données statiques valides pour {data.potentiel_radon.validity.area}
            <br />
            Données fournies par l'
            <MagicLink to={data.potentiel_radon.sources[0].url}>
              {data.potentiel_radon.sources[0].label}
            </MagicLink>
          </Card.Source>
        )}
    </Card>
  )
}
