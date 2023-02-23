import React, { useState } from 'react'
import { useQueryParam } from 'use-query-params'
import { useStaticQuery, graphql } from 'gatsby'

import { useUser, useUserMutation } from 'hooks/useUser'
import useNotificationsPrompt from 'hooks/useNotificationsPrompt'
import useIos from 'hooks/useIos'
import Section from 'components/base/Section'
import Button from 'components/base/Button'
import Alert from 'components/base/Alert'
import UnloggedForm from 'components/misc/UnloggedForm'

export default function Notifications() {
  const ios = useIos()

  const { applicationServerKey } = useStaticQuery(
    graphql`
      query {
        applicationServerKey {
          application_server_key
        }
      }
    `
  )
  const notifications = useNotificationsPrompt(
    '/sw.js',
    applicationServerKey.application_server_key
  )

  const [user] = useQueryParam('user')
  const [token] = useQueryParam('token')
  const { error, data }  = useUser()
  const mutation = useUserMutation()
  const [success, setSuccess] = useState(false)

  return user && token && !error ? (
    <Section first small>
      <h1>
        Activer les <strong>notifications</strong>
        <br />
        sur cet appareil
      </h1>
      {data && (
        <>
          {data.indicateurs_media[0] === 'mail' ? (
            <>
              <p>
                Vous recevez pour l'instant les{' '}
                <strong>indicateurs par mail</strong>.
              </p>
              {ios ? (
                <p>
                  Malheureusement les notifications ne sont pas disponibles sur
                  iOS (iPhone et iPad). Vous pouvez ouvrir cette page sur un
                  autre appareil si vous le souhaitez.
                </p>
              ) : (
                <p>
                  Si vous souhaitez changer pour activer les notifications sur
                  cet appareil, cliquez ci-dessous (vous ne recevrez plus de
                  mail).
                </p>
              )}
            </>
          ) : success ? (
            <p>
              Vous recevrez maintenant les{' '}
              <strong>indicateurs par notifications</strong> sur cet appareil !
            </p>
          ) : (
            <>
              <p>
                Vous recevez pour l'instant les{' '}
                <strong>indicateurs par notifications.</strong>
              </p>
              {ios ? (
                <p>
                  Malheureusement les notifications ne sont pas disponibles sur
                  iOS (iPhone et iPad). Vous pouvez ouvrir cette page sur un
                  autre appareil ou modifier votre profil pour choisir de les
                  recevoir par mail.
                </p>
              ) : (
                <p>
                  Si vous souhaitez les recevoir sur cet appareil en
                  particulier, cliquez ci-dessous (vous continuerez de les
                  recevoir sur vos autres appareils)
                </p>
              )}
            </>
          )}
          <Button.Wrapper vertical>
            {!success && !ios && (
              <Button
                fetching={notifications.prompting}
                onClick={() => {
                  notifications.subscribe().then((pushSubscription) => {
                    if (pushSubscription) {
                      setSuccess(true)
                      mutation.mutate({
                        indicateurs_media: ['notifications_web'],
                        webpush_subscriptions_info:
                          JSON.stringify(pushSubscription),
                      })
                    }
                  })
                }}
              >
                Activer les notifications sur cet appareil
              </Button>
            )}
            <Button to={`/profil/?user=${user}&token=${token}`} hollow>
              Voir mon profil
            </Button>
          </Button.Wrapper>
        </>
      )}
      {notifications.error && (
        <Alert error>
          Vous devez accepter les notifications web pour pouvoir continuer
        </Alert>
      )}
      {mutation.isError && (
        <Alert error>
          Une erreur est survenue. Vos préférences n'ont pas été mises à jour
        </Alert>
      )}
    </Section>
  ) : (
    <Section first>
      <UnloggedForm unauthorized={!!error} />
    </Section>
  )
}
