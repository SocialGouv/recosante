/** @type {import('next').NextConfig} */

const PATH = process.env.NEXT_PUBLIC_GATSBY_INTERN_URL || 'http://frontend';

// Import de la configuration partagée
const { santeFrRedirects } = require('./redirects-config.js');

const nextConfig = {
  output: 'standalone',
  trailingSlash: true,
  compiler: {
    styledComponents: true,
  },
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  },

  // Redirections 301 vers sante.fr
  async redirects() {
    return santeFrRedirects.map(redirect => ({
      source: `/articles/${redirect.localSlug}/`,
      destination: redirect.santeFrUrl,
      permanent: true,
    }));
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