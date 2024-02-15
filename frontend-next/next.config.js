/** @type {import('next').NextConfig} */

const { redirect } = require('next/dist/server/api-utils');

const PATH = process.env.NEXT_PUBLIC_GATSBY_INTERN_URL || 'http://frontend';

const nextConfig = {
  output: 'standalone',
  trailingSlash: true,

  rewrites: async () => {
    return {
      afterFiles: [
        // catch-all to gatsby (js scripts, json data, etc.), with and without trailing slash
        {
          source: '/:slug*/',
          destination: `${PATH}/:slug*/`,
        },
        {
          source: '/:slug*',
          destination: `${PATH}/:slug*`,
        },
      ],
    };
  },
};

module.exports = nextConfig;
