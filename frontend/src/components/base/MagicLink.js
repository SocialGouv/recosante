import { useLocation } from "@reach/router";
import { Link } from "gatsby";
import React from "react";

export default function MagicLink({
  to,
  className,
  onClick,
  children,
  ...props
}) {
  const { search } = useLocation();
  if (!to) {
    return (
      <button
        className={className}
        onClick={onClick}
        aria-label={props["aria-label"]}
      >
        {children}
      </button>
    );
  }
  const isExternalLink = to.includes("://") || to.includes(".");
  if (isExternalLink) {
    return (
      <a
        className={className}
        href={to}
        onClick={onClick || null}
        target="_blank"
        rel="noreferrer noopener"
        aria-label={props["aria-label"]}
      >
        {children}
      </a>
    );
  }
  return (
    <Link
      className={className}
      to={to + (!to.includes("?") ? search : "")}
      onClick={onClick || null}
      aria-label={props["aria-label"]}
    >
      {children}
    </Link>
  );
}
