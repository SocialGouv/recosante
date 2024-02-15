/** @type {import('next').NextConfig} */

const PATH = process.env.NEXT_PUBLIC_GATSBY_INTERN_URL || 'http://frontend';

const nextConfig = {
  output: 'standalone',
  rewrites: async () => {
    return [
      {
        source: '/place/:path*',
        destination:
          `${PATH}/place`,
      },
      {
        source: '/static/:path*',
        destination:
          `${PATH}/static`,
      },
      {
        source: '/accessibilite',
        destination:
          `${PATH}/accessibilite/`,
      },
      {
        source: '/articles',
        destination:
          `${PATH}/articles`,
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
