import React from 'react'

import Element from './details/Element'

export default function Details(props) {
  const values = ['Vert', 'Jaune', 'Orange', 'Rouge']

  const details = props?.data?.vigilance_meteo?.indice?.details
    .filter(({ indice }) => indice.color !== 'Vert')
    .sort((a, b) => (
      a.indice.validity.start < b.indice.validity.start ? -1 : 1
    ))
    .reduce((details, { indice }) => {
      details[indice.color] ??= {}
      details[indice.color][indice.label] ??= {}
      details[indice.color][indice.label].indices ??= []
      details[indice.color][indice.label].indices.push(indice)
      details[indice.color][indice.label].validity ??= []
      details[indice.color][indice.label].validity.push({
        start: indice.validity.start && new Date(indice.validity.start.slice(0, 19)),
        end: indice.validity.end && new Date(indice.validity.end.slice(0, 19))
      })
      return details
    }, {})

  return (
    <div>
      {values.reverse().map((c) => (
        details && details[c] && Object.keys(details[c]).map((l) => (
          <Element indice={details[c][l].indices[0]} key={details[c][l].indices[0].color + '-' + details[c][l].indices[0].label} validity={details[c][l].validity} />
        ))
      ))}
    </div>
  )
}
