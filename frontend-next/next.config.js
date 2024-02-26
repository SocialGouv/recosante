/** @type {import('next').NextConfig} */

const { redirect } = require('next/dist/server/api-utils');


 const PATH = process.env.NEXT_PUBLIC_GATSBY_INTERN_URL || 'http://frontend';

const nextConfig = {
  output: 'standalone',
  trailingSlash: true,

  rewrites: async () => {
    return {
      beforeFiles: [
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
    ],
      fallback: [
        
        // These rewrites are checked after both pages/public files
        // and dynamic routes are checked (so no conflicts with [city]/[indicator] etc.)
        // Catch-all to gatsby (js scripts, json data, etc.)

        // {
        //   source: '/:slug*/',
        //   destination: `${PATH}/:slug*/`,
        // },
        // {
        //   source: '/:slug*',
        //   destination: `${PATH}/:slug*`,
        // },
        {
          source: '/:slug*/',
          destination: `${PATH}/:slug*/`,
          has: [
            {
              type: 'query',
              key: 'slug',
              value: '(?!not-found).*',
            },
          ],
        },
        {
          source: '/:slug*',
          destination: `${PATH}/:slug*`,
          has: [
            {
              type: 'query',
              key: 'slug',
              value: '(?!not-found).*',
            },
          ],
        },
        // This rewrite explicitly avoids rewriting for the "not-found" slug
        {
          source: '/not-found',
          destination: '/',
        },
      ],
    };
  },

};

module.exports = nextConfig;