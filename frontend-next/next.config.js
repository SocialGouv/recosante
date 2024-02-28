/** @type {import('next').NextConfig} */

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
          `/iframe`,
      },
    ],
      fallback: [
        
        // These rewrites are checked after both pages/public files
        // and dynamic routes are checked (so no conflicts with [city]/[indicator] etc.)
        // Catch-all to gatsby (js scripts, json data, etc.)

     
        {
          source: '/:slug*/',
          destination: `${PATH}/:slug*/`,
          has: [
            {
              type: 'query',
              key: 'slug',
              value: '(?!not-found|iframe).*',

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
              // value is not "not-found" and "iframe".
              value: '(?!not-found|iframe).*',
            },
          ],
        },
        // This rewrite explicitly avoids rewriting for the "not-found" slug
        {
          source: '/not-found/',
          destination: '/not-found/',
        },
      ],
    };
  },

};

module.exports = nextConfig;