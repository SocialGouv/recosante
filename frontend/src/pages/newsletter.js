import React from "react";

import About from "components/About";
import Data from "components/Data";
import Search from "components/Search";
import Widget from "components/Widget";
import Web from "components/layout/Web";
import Newsletter from "../components/Newsletter";

export default function NewsletterPage() {
  return (
    <Web title={`Lettre d'information`}>
      <Newsletter />
      <Search />
      <Widget />
      <Data />
      <About />
    </Web>
  );
}
