'use client';

import React, { useEffect, useState } from 'react';
import DOMPurify from 'dompurify';

interface SafeHtmlProps {
  html: string;
  className?: string;
}

export default function SafeHtml({ html, className }: SafeHtmlProps) {
  const [sanitizedHtml, setSanitizedHtml] = useState<string>('');

  useEffect(() => {
    // DOMPurify ne fonctionne que côté client
    if (typeof window !== 'undefined') {
      const sanitized = DOMPurify.sanitize(html, {
        ALLOWED_TAGS: [
          'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
          'p', 'br', 'strong', 'em', 'u', 's',
          'ul', 'ol', 'li',
          'blockquote', 'code', 'pre',
          'a', 'img',
          'div', 'span',
          'table', 'thead', 'tbody', 'tr', 'th', 'td'
        ],
        ALLOWED_ATTR: [
          'href', 'target', 'rel', 'title', 'alt',
          'class', 'id', 'style'
        ],
        ALLOW_DATA_ATTR: false,
        KEEP_CONTENT: true,
        RETURN_DOM: false,
        RETURN_DOM_FRAGMENT: false,
        RETURN_TRUSTED_TYPE: false
      });
      setSanitizedHtml(sanitized);
    } else {
      // Côté serveur, on utilise le HTML brut (moins sécurisé mais nécessaire pour le build)
      setSanitizedHtml(html);
    }
  }, [html]);

  return (
    <div
      className={className}
      dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
    />
  );
}
