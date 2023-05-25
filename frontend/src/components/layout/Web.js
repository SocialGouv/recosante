import { MDXProvider } from "@mdx-js/react";
import React, { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import styled from "styled-components";

import InstallButton from "components/base/InstallButton";
import DeleteModal from "components/modals/DeleteModal";
import SubscriptionModal from "components/modals/SubscriptionModal";
import WrapperModal from "components/modals/WrapperModal";
import ModalProvider from "components/providers/ModalProvider";
import StyleProvider from "components/providers/StyleProvider";
import UXProvider from "components/providers/UXProvider";
import UserProvider from "components/providers/UserProvider";
import EmbedWrapper from "components/wrappers/EmbedWrapper";
import ShareWrapper from "components/wrappers/ShareWrapper";
import useIframe from "hooks/useIframe";
import { GlobalStyle } from "utils/styles";
import Footer from "./Footer";
import Header from "./Header";
import Seo from "./web/Seo";

const queryClient = new QueryClient();

const Wrapper = styled.div``;
const Fullscreen = styled.div`
  min-height: ${(props) => (props.iframe ? "auto" : "100vh")};
`;
const Content = styled.main`
  flex: 1;
  padding: 0 1rem;
`;
export default function Web(props) {
  const iframe = useIframe();

  useEffect(() => {
    window?._paq?.push(["setCookieSameSite", "None"]);
  }, []);

  return (
    <Wrapper>
      <Seo title={props.title} />
      <QueryClientProvider client={queryClient}>
        <UXProvider>
          <StyleProvider>
            <MDXProvider>
              <UserProvider>
                <ModalProvider>
                  <GlobalStyle />
                  <Fullscreen iframe={iframe}>
                    <Header />
                    <Content role="main">{props.children}</Content>
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
            </MDXProvider>
          </StyleProvider>
        </UXProvider>
      </QueryClientProvider>
    </Wrapper>
  );
}
