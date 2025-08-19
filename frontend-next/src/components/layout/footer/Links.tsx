import React from 'react';
import Link from 'next/link';

export default function Links() {
  return (
    <div style={{ 
      borderTop: '1px solid #e5e7eb',
      paddingTop: '2rem',
      paddingBottom: '2rem',
      marginTop: '1rem'
    }}>
      <ul style={{ 
        display: 'flex', 
        flexWrap: 'wrap', 
        maxWidth: '75em', 
        margin: '0 auto', 
        padding: '1.5rem 1rem', 
        listStyleType: 'none' 
      }}>
        <li style={{ 
          marginRight: '1rem', 
          paddingRight: '1rem', 
          borderRight: '1px solid #d1d5db' 
        }}>
          <Link 
            href="/accessibilite"
            style={{ 
              display: 'block', 
              fontSize: '0.75rem', 
              color: '#6b7280', 
              textDecoration: 'none' 
            }}
          >
            accessibilité : partiellement conforme
          </Link>
        </li>
        <li style={{ 
          marginRight: '1rem', 
          paddingRight: '1rem', 
          borderRight: '1px solid #d1d5db' 
        }}>
          <Link 
            href="/mentions-legales"
            style={{ 
              display: 'block', 
              fontSize: '0.75rem', 
              color: '#6b7280', 
              textDecoration: 'none' 
            }}
          >
            mentions légales
          </Link>
        </li>
        <li style={{ 
          marginRight: '1rem', 
          paddingRight: '1rem', 
          borderRight: '1px solid #d1d5db' 
        }}>
          <Link 
            href="/donnees-personnelles"
            style={{ 
              display: 'block', 
              fontSize: '0.75rem', 
              color: '#6b7280', 
              textDecoration: 'none' 
            }}
          >
            données personnelles
          </Link>
        </li>
        <li style={{ 
          marginRight: '1rem', 
          paddingRight: '1rem', 
          borderRight: '1px solid #d1d5db' 
        }}>
          <Link 
            href="/cookies"
            style={{ 
              display: 'block', 
              fontSize: '0.75rem', 
              color: '#6b7280', 
              textDecoration: 'none' 
            }}
          >
            gestion des cookies
          </Link>
        </li>
        <li style={{ 
          marginRight: '1rem', 
          paddingRight: '1rem', 
          borderRight: '1px solid #d1d5db' 
        }}>
          <Link 
            href="/partenaires"
            style={{ 
              display: 'block', 
              fontSize: '0.75rem', 
              color: '#6b7280', 
              textDecoration: 'none' 
            }}
          >
            partenaires
          </Link>
        </li>
        <li style={{ 
          marginRight: '1rem', 
          paddingRight: '1rem',
          borderRight: '1px solid #d1d5db' 
        }}>
          <Link 
            href="/stats"
            style={{ 
              display: 'block', 
              fontSize: '0.75rem', 
              color: '#6b7280', 
              textDecoration: 'none' 
            }}
          >
            statistiques
          </Link>
        </li>
        <li style={{ 
          marginRight: '1rem', 
          paddingRight: '1rem', 
          borderRight: '1px solid #d1d5db' 
        }}>
          <Link 
            href="/articles"
            style={{ 
              display: 'block', 
              fontSize: '0.75rem', 
              color: '#6b7280', 
              textDecoration: 'none' 
            }}
          >
            articles
          </Link>
        </li>
        <li style={{ 
          marginRight: '0', 
          paddingRight: '0', 
          borderRight: 'none' 
        }}>
          <Link 
            href="/recommandations"
            style={{ 
              display: 'block', 
              fontSize: '0.75rem', 
              color: '#6b7280', 
              textDecoration: 'none' 
            }}
          >
            recommandations
          </Link>
        </li>
      </ul>
    </div>
  );
}
