import React, { useEffect } from 'react'
import styled from 'styled-components'
import { QueryClient, QueryClientProvider } from 'react-query'

import { GlobalStyle } from 'utils/styles'
import useIframe from 'hooks/useIframe'
import StyleProvider from 'components/providers/StyleProvider'
import UserProvider from 'components/providers/UserProvider'
import ModalProvider from 'components/providers/ModalProvider'
import UXProvider from 'components/providers/UXProvider'
import Seo from './web/Seo'
import Header from './Header'
import Footer from './Footer'
import WrapperModal from 'components/modals/WrapperModal'
import DeleteModal from 'components/modals/DeleteModal'
import SubscriptionModal from 'components/modals/SubscriptionModal'
import ShareWrapper from 'components/wrappers/ShareWrapper'
import EmbedWrapper from 'components/wrappers/EmbedWrapper'
import InstallButton from 'components/base/InstallButton'

const queryClient = new QueryClient()

const Wrapper = styled.div``
const Fullscreen = styled.div`
  min-height: ${(props) => (props.iframe ? 'auto' : '100vh')};
`
const Content = styled.div`
  flex: 1;
  padding: 0 1rem;
`
export default function Web(props) {
  const iframe = useIframe()

  useEffect(() => {
    window?._paq?.push(['setCookieSameSite', 'None'])
  }, [])

  return (
    <Wrapper>
      <Seo title={props.title} />
      <QueryClientProvider client={queryClient}>
        <UXProvider>
          <StyleProvider>
            <UserProvider>
              <ModalProvider>
                <GlobalStyle />
                <Fullscreen iframe={iframe}>
                  <Header />
                  <Content>{props.children}</Content>
                </Fullscreen>
                {!iframe && <Footer />}
                <EmbedWrapper place={props.place} />
                <ShareWrapper place={props.place} />
                <InstallButton />
                <WrapperModal />
                <DeleteModal />
                <SubscriptionModal />
              </ModalProvider>
            </UserProvider>
          </StyleProvider>
        </UXProvider>
      </QueryClientProvider>
    </Wrapper>
  )
}
