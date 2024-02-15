/** @type {import('next').NextConfig} */

const { redirect } = require('next/dist/server/api-utils');

const PATH = process.env.NEXT_PUBLIC_GATSBY_INTERN_URL || 'http://frontend';

const nextConfig = {
  output: 'standalone',
  rewrites: async () => {
    return {
      beforeFiles: [
        {
          source: '/place/:code-insee/:city',
          destination: `${PATH}/place/:code-insee/:city`,
        },
        {
          source: '/static/:key/:id/:slug*',
          destination: `${PATH}/static/:key/:id/:slug`,
        },
        {
          source: '/articles/*',
          destination: `${PATH}/articles/`,
        },
        {
          source: '/articles/:slug*',
          destination: `${PATH}/articles/:slug*`,
        },
      ],
      afterFiles: [
        {
          source: '/',
          has: [
            {
              type: 'query',
              key: 'iframe',
              value: '1',
            },
          ],
          destination: `${PATH}/`,
        },

        {
          source: '/accessibilite',
          destination: `${PATH}/accessibilite/`,
        },

        {
          source: '/mentions-legales',
          destination: `${PATH}/mentions-legales/`,
        },
        {
          source: '/donnees-personnelles',
          destination: `${PATH}/donnees-personnelles/`,
        },
        {
          source: '/cookies',
          destination: `${PATH}/cookies/`,
        },
        {
          source: '/partenaires',
          destination: `${PATH}/partenaires/`,
        },
        {
          source: '/recommandations',
          destination: `${PATH}/recommandations/`,
        },
        {
          source: '/stats',
          destination: `${PATH}/stats/`,
        },
      ],
    };
  },
};

module.exports = nextConfig;
