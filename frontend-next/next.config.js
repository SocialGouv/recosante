/** @type {import('next').NextConfig} */

const PATH = process.env.NEXT_PUBLIC_GATSBY_INTERN_URL || 'http://frontend';
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

  async redirects() {
    return santeFrRedirects.map((redirect) => ({
      source: `/articles/${redirect.localSlug}/`,
      destination: redirect.santeFrUrl,
      permanent: true,
    }));
  },

  async rewrites() {
    return {
      beforeFiles: [
        {
          source: '/',
          has: [
            {
              type: 'query',
              key: 'iframe',
              value: '1',
            },
          ],
          destination: `/iframe`,
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

// Injected content via Sentry wizard below

const { withSentryConfig } = require('@sentry/nextjs');

module.exports = withSentryConfig(module.exports, {
  // For all available options, see:
  // https://www.npmjs.com/package/@sentry/webpack-plugin#options

  org: 'incubateur',
  project: 'recosante-web',
  sentryUrl: 'https://sentry2.fabrique.social.gouv.fr/',

  // Only print logs for uploading source maps in CI
  silent: !process.env.CI,

  // For all available options, see:
  // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

  // Upload a larger set of source maps for prettier stack traces (increases build time)
  widenClientFileUpload: true,

  // Route browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers.
  // This can increase your server load as well as your hosting bill.
  // Note: Check that the configured route will not match with your Next.js middleware, otherwise reporting of client-
  // side errors will fail.
  tunnelRoute: '/monitoring',

  // Automatically tree-shake Sentry logger statements to reduce bundle size
  disableLogger: true,

  // Enables automatic instrumentation of Vercel Cron Monitors. (Does not yet work with App Router route handlers.)
  // See the following for more information:
  // https://docs.sentry.io/product/crons/
  // https://vercel.com/docs/cron-jobs
  automaticVercelMonitors: true,
});
