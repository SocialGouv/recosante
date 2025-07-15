/** @type {import('next').NextConfig} */

 const PATH = process.env.NEXT_PUBLIC_GATSBY_INTERN_URL || 'http://frontend';

const nextConfig = {
  output: 'standalone',
  trailingSlash: true,
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  },

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
        // Exclude /place/ routes from being redirected to Gatsby

     
        {
          source: '/:slug*/',
          destination: `${PATH}/:slug*/`,
          missing: [
            {
              type: 'query',
              key: 'slug',
              value: '(?!not-found|iframe|place).*',

            },
          ],
        },
        {
          source: '/:slug*',
          destination: `${PATH}/:slug*`,
          missing: [
            {
              type: 'query',
              key: 'slug',
              // value is not "not-found", "iframe", or "place".
              value: '(?!not-found|iframe|place).*',
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