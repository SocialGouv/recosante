import React from "react";

import About from "components/About";
import Data from "components/Data";
import Search from "components/Search";
import Web from "components/layout/Web";
import useIframe from "hooks/useIframe";
import Newsletter from "../components/Newsletter";

export default function Index() {
  const iframe = useIframe();

  return (
    <Web>
      <Search iframe={iframe} />
      {!iframe && (
        <>
          <Newsletter />
          <Data />
          <About />
        </>
      )}
    </Web>
  );
}
