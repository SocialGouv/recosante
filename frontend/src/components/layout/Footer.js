import React from "react";

import Links from "./footer/Links";
import MobileButtons from "./footer/MobileButtons";
import Partners from "./footer/Partners";
import Logos from "./header/Logos";

export default function Footer() {
  return (
    <footer
      className="relative border-t-2 border-main bg-background pt-8"
      role="contentinfo"
    >
      <div className="mx-auto mb-8 flex max-w-6xl flex-col items-start justify-between px-4 py-0 xl:flex-row xl:items-center xl:gap-x-6">
        <Partners />
        <p className="my-8 max-w-2xl text-center xl:mt-0">
          Recosanté est un service public qui vous aide à connaître votre
          environnement et à agir pour protéger votre santé.
        </p>
        <MobileButtons iframe={false} />
        <Logos className="mx-auto flex items-center justify-center" />
      </div>
      <Links />
    </footer>
  );
}
