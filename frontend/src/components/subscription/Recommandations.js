import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

import steps from 'utils/recommandationsSteps'
import { useLocalUser } from 'hooks/useUser'
import Progress from './Progress'
import Question from './Question'
import Navigation from './Navigation'

const Wrapper = styled.div`
  position: relative;

  ${(props) => props.theme.mq.small} {
    position: static;
  }
`
export default function Recommandations(props) {
  const { user } = useLocalUser()

  const [currentStep, setCurrentStep] = useState(0)

  const propsSetCurrentStep = props.setCurrentStep
  useEffect(() => {
    if (user['recommandations'][0] === 'non' || !steps[currentStep]) {
      propsSetCurrentStep('identity')
    }
  }, [user, currentStep, propsSetCurrentStep])

  return (
    <Wrapper>
      <Progress currentStep={currentStep} steps={steps} small={props.small} />
      {steps[currentStep] ? (
        <>
          <Question step={steps[currentStep]} />
          <Navigation
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
            gotoDeepLastStep={props.gotoDeepLastStep}
            steps={steps}
          />
        </>
      ) : (
        'END RECO'
      )}
    </Wrapper>
  )
}
