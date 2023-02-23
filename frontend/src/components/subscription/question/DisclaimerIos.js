import React from 'react'
import styled from 'styled-components'

import useIos from 'hooks/useIos'

const Wrapper = styled.div`
  position: absolute;
  top: calc(100% + 1.5rem);
  left: 1rem;
  right: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;

  ${(props) => props.theme.mq.smallish} {
    top: calc(100% - 8rem);
  }
`
const Title = styled.div`
  font-size: 0.875rem;
  text-align: center;

  strong {
    font-weight: 700;
  }
`
const Text = styled.div`
  font-size: 0.75rem;
  font-weight: 300;
  text-align: center;
`
export default function DisclaimerIos() {
  const ios = useIos()
  return ios ? (
    <Wrapper>
      <Title>
        Attention, les notifications web ne fonctionnent pas sous iOS (iPhone et
        iPad)
      </Title>
      <Text>
        Vous pouvez quand même selectionner cette option et les activer plus
        tard sur vos autres appareils
      </Text>
    </Wrapper>
  ) : null
}
