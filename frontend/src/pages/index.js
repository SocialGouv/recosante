import React from "react";

import About from "components/About";
import Data from "components/Data";
import Search from "components/Search";
import Web from "components/layout/Web";
import Newsletter from "components/Newsletter";
import useIframe, { IFrameProvider } from "hooks/useIframe";

function App() {
  const isIframe = useIframe();
  return (
    <Web>
      <Search />
      {!isIframe && (
        <>
          <Newsletter />
          <Data />
          <About />
        </>
      )}
    </Web>
  );
}

export default function Index() {
  return (
    <IFrameProvider>
      <App />
    </IFrameProvider>
  );
}
