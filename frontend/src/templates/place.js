import React from "react";

import About from "components/About";
import Dashboard from "components/Dashboard";
import Data from "components/Data";
import Web from "components/layout/Web";
import useIframe from "hooks/useIframe";
import Newsletter from "../components/Newsletter";

export default function Place(props) {
  const iframe = useIframe();

  return (
    <Web title={props.pageContext.place.nom} place={props.pageContext.place}>
      <Dashboard place={props.pageContext.place} iframe={iframe} />
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
