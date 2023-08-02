import { MDXProvider } from "@mdx-js/react";
import { QueryParamProvider } from "use-query-params";
import { ReachAdapter } from "use-query-params/adapters/reach";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { useEffect } from "react";

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
import useIframe, { IFrameProvider } from "hooks/useIframe";
import Footer from "./Footer";
import Header from "./Header";
import Seo from "./web/Seo";

const queryClient = new QueryClient();

function Providers({ children }) {
  return (
    <IFrameProvider>
      <QueryClientProvider client={queryClient}>
        <UXProvider>
          <QueryParamProvider adapter={ReachAdapter}>
            <StyleProvider>
              <MDXProvider>
                <UserProvider>
                  <ModalProvider>{children}</ModalProvider>
                </UserProvider>
              </MDXProvider>
            </StyleProvider>
          </QueryParamProvider>
        </UXProvider>
      </QueryClientProvider>
    </IFrameProvider>
  );
}

function App({ children }) {
  const iframe = useIframe();
  return (
    <>
      <div className={iframe ? "" : "min-h-screen"}>
        <Header />
        <main className="w-full flex-1" role="main">
          {children}
        </main>
      </div>
      {!iframe && <Footer />}
    </>
  );
}

export default function Web({ title, children, place }) {
  useEffect(() => {
    window?._paq?.push(["setCookieSameSite", "None"]);
  }, []);

  return (
    <div>
      <Seo title={title} />
      <Providers>
        <App>{children}</App>
        <EmbedWrapper place={place} />
        <ShareWrapper place={place} />
        <InstallButton />
        <WrapperModal />
        <DeleteModal />
        <SubscriptionModal />
      </Providers>
    </div>
  );
}
