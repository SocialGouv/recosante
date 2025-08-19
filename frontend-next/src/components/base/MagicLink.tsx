'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import React from 'react';

interface MagicLinkProps {
  to: string;
  className?: string;
  onClick?: () => void;
  children: React.ReactNode;
  'aria-label'?: string;
}

export default function MagicLink({
  to,
  className,
  onClick,
  children,
  ...props
}: MagicLinkProps) {
  const searchParams = useSearchParams();
  
  if (!to) {
    return (
      <button
        className={className}
        onClick={onClick}
        aria-label={props['aria-label']}
      >
        {children}
      </button>
    );
  }
  
  const isExternalLink = to.includes('://') || to.includes('.');
  
  if (isExternalLink) {
    return (
      <a
        className={className}
        href={to}
        onClick={onClick || undefined}
        target="_blank"
        rel="noreferrer noopener"
        aria-label={props['aria-label']}
      >
        {children}
      </a>
    );
  }
  
  const search = searchParams.toString();
  const href = search ? `${to}?${search}` : to;
  
  return (
    <Link
      className={className}
      href={href}
      onClick={onClick || undefined}
      aria-label={props['aria-label']}
    >
      {children}
    </Link>
  );
}
