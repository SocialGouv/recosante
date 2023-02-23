import React, { useState } from 'react'
import styled from 'styled-components'
import { useStaticQuery, graphql } from 'gatsby'

import steps from 'utils/indicateursSteps'
import { useLocalUser } from 'hooks/useUser'
import useNotificationsPrompt from 'hooks/useNotificationsPrompt'
import Progress from './subscription/Progress'
import Question from './subscription/Question'
import Navigation from './subscription/Navigation'
import Recommandations from './subscription/Recommandations'
import Identity from './subscription/Identity'
import Notifications from './subscription/Notifications'
import Newsletter from './subscription/Newsletter'

const Wrapper = styled.div``
export default function Indicators(props) {
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

  const [currentStep, setCurrentStep] = useState(0)

  const [modal, setModal] = useState(false)

  const { user, mutateUser } = useLocalUser()

  return (
    <Wrapper>
      <Progress currentStep={currentStep} steps={steps} />
      {steps[currentStep] ? (
        <>
          <Question step={steps[currentStep]} setModal={setModal} />
          <Navigation
            currentStep={currentStep}
            prompting={notifications.prompting}
            setCurrentStep={(newStep) => {
              if (
                newStep === 3 &&
                user['indicateurs_media'][0] === 'notifications_web'
              ) {
                notifications.subscribe().then((pushSubscription) => {
                  pushSubscription &&
                    mutateUser({
                      webpush_subscriptions_info:
                        JSON.stringify(pushSubscription),
                    })
                  setCurrentStep(newStep)
                })
              } else {
                setCurrentStep(newStep)
              }
            }}
            forceCurrentStep={(newStep) => {
              notifications.clear()
              setCurrentStep(newStep)
            }}
            steps={steps}
          />
        </>
      ) : currentStep === 'end' ? (
        'End'
      ) : currentStep === 'identity' ? (
        <Identity setPreviousStep={() => setCurrentStep(3)} />
      ) : (
        <Recommandations
          setCurrentStep={setCurrentStep}
          gotoDeepLastStep={() =>
            setCurrentStep((prevCurrentStep) => prevCurrentStep - 1)
          }
          small
        />
      )}
      <Notifications modal={modal} setModal={setModal} />
      <Newsletter modal={modal} setModal={setModal} />
    </Wrapper>
  )
}
