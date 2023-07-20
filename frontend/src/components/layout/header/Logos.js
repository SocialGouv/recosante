import React from "react";

import Marianne from "components/base/Marianne";
import Logo from "components/misc/Logo";
import { Link } from "gatsby";

export default function Logos({ className }) {
  return (
    <Link
      to="/"
      className={className}
      aria-label="Aller à l’accueil - Recosanté - République Française, Liberté Égalité Fraternité"
    >
      <Marianne />
      <Logo link />
    </Link>
  );
}
