import React from "react";

import Marianne from "components/base/Marianne";
import Logo from "components/misc/Logo";
import { Link } from "gatsby";

export default function Logos() {
  return (
    <Link
      to="/"
      className="mx-auto flex items-center justify-center"
      aria-label="Aller à l’accueil - Recosanté - République Française, Liberté Égalité Fraternité"
    >
      <Marianne />
      <Logo link />
    </Link>
  );
}
