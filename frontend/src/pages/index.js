import React from "react";

import Search from "components/Search";
import Web from "components/layout/Web";
import useIframe from "hooks/useIframe";
import Home from "components/Home";

function App() {
  const isIframe = useIframe();

  return (
    <>
      <Search />
      {!isIframe && <Home />}
    </>
  );
}

export default function Index() {
  return (
    <Web>
      <App />
    </Web>
  );
}
