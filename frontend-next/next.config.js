/** @type {import('next').NextConfig} */

const PATH = process.env.NEXT_PUBLIC_GATSBY_INTERN_URL || 'http://frontend';

const nextConfig = {
  output: 'standalone',
  rewrites: async () => {
    return [
      {
        source: '/place/:code-insee/:city',
        destination:
          `${PATH}/place/:code-insee/:city`,
      },
      {
        source: '/static/:key/:id/:slug*',
        destination:
          `${PATH}/static/:key/:id/:slug`,
      },
      {
        source: '/accessibilite',
        destination:
          `${PATH}/accessibilite/`,
      },
      {
        source: '/articles/:slug*',
        destination:
          `${PATH}/articles/:slug*`,
      },
      {
        source: '/mentions-legales',
        destination:
          `${PATH}/mentions-legales/`,
      },
      {
        source: '/donnees-personnelles',
        destination:
          `${PATH}/donnees-personnelles/`,
      },
      {
        source: '/cookies',
        destination:
          `${PATH}/cookies/`,
        
      },
      {
        source: '/partenaires',
        destination:
          `${PATH}/partenaires/`,
      },
      {
        source: '/recommandations',
        destination:
          `${PATH}/recommandations/`,
      },
      {
        source: '/stats',
        destination:
          `${PATH}/stats/`,
      },
      {
        source: '/stats',
        destination:
          `${PATH}/stats/`,
      },
      {
        source: '/',
        has: [
          {
            "type": "query",
            "key": "iframe",
            "value": "1"
          }
        ],
        destination:
          `${PATH}/`,
      },
    ];
  },
};

module.exports = nextConfig;
