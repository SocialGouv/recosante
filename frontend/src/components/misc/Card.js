import styled from 'styled-components'

import Title from './card/Title'
import Mobile from './card/Mobile'
import Subscribe from './card/Subscribe'

const Card = styled.div`
  position: relative;
  width: 100%;
  max-width: 35.5rem;
  margin: 0 auto 2rem;
`
Card.Content = styled.div`
  margin-bottom: 0.5rem;
  padding: 2rem 2rem 1.5rem;
  background: rgba(${(props) => props.theme.colors.backgroundAlpha}, 1);
  border: 1px solid rgba(${(props) => props.theme.colors.backgroundAlpha}, 1);
  border-radius: 1.5rem;
  box-shadow: 0.25rem 0.25rem 1rem 0
    rgba(${(props) => props.theme.colors.backgroundAlpha}, 0.4);

  ${(props) => props.theme.mq.small} {
    padding: 1.5rem 1rem 1rem;
  }
`
Card.Header = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 2rem;

  ${(props) => props.theme.mq.small} {
    flex-direction: column;
    align-items: center;
  }
`
Card.Info = styled.div``
Card.Title = Title
Card.Value = styled.div`
  margin-left: -0.1rem;
  font-size: 3rem;
  font-weight: bold;
  line-height: 1;
  color: ${(props) => props.theme.colors[props.isError ? 'error' : 'main']};

  ${(props) => props.theme.mq.small} {
    margin: 0 0 1.5rem;
    font-size: 2.25rem;
    text-align: center;
  }
`
Card.Mobile = Mobile
Card.Details = styled.div`
  margin-bottom: 2rem;
`
Card.Recommandation = styled.div`
  font-weight: 300;
  margin-bottom: 1rem;
`
Card.SubscribeWrapper = styled.div`
  display: flex;
  justify-content: flex-end;

  ${(props) => props.theme.mq.medium} {
    justify-content: center;
  }

  ${(props) => props.theme.mq.small} {
    display: none;
  }
`
Card.Subscribe = Subscribe

Card.Source = styled.div`
  margin-right: 0.5rem;
  font-size: 0.625rem;
  font-weight: 300;
  text-align: right;
  color: ${(props) => props.theme.colors.title};

  p {
    margin: 0;
    font-size: inherit;
  }
`

export default Card
