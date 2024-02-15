import React from "react";

import Marianne from "components/base/Marianne";
import Logo from "components/misc/Logo";

export default function Logos({ className }) {
  return (
    <a
      href="/"
      className={className}
      aria-label="Aller à l’accueil - Recosanté - République Française, Liberté Égalité Fraternité"
    >
      <Marianne />
      <Logo link />
    </a>
  );
}
