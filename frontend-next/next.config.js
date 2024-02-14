/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  redirects: async () => {
    return [
      {
        source: '/accessibilité',
        destination:
          'https://frontend-recosante-preprod.dev.fabrique.social.gouv.fr/articles',
        permanent: true,
      },
      {
        source: '/articles',
        destination:
          'https://frontend-recosante-preprod.dev.fabrique.social.gouv.fr/articles',
        permanent: true,
      },
      {
        source: '/mentions-legales',
        destination:
          'https://frontend-recosante-preprod.dev.fabrique.social.gouv.fr/mentions-legales/',
        permanent: true,
      },
      {
        source: '/donnees-personnelles',
        destination:
          'https://frontend-recosante-preprod.dev.fabrique.social.gouv.fr/donnees-personnelles/',
        permanent: true,
      },
      {
        source: '/cookies',
        destination:
          'https://frontend-recosante-preprod.dev.fabrique.social.gouv.fr/cookies/',
        permanent: true,
      },
      {
        source: '/partenaires',
        destination:
          'https://frontend-recosante-preprod.dev.fabrique.social.gouv.fr/partenaires/',
        permanent: true,
      },
      {
        source: '/recommandations',
        destination:
          'https://frontend-recosante-preprod.dev.fabrique.social.gouv.fr/recommandations/',
        permanent: true,
      },
      {
        source: '/stats',
        destination:
          'https://frontend-recosante-preprod.dev.fabrique.social.gouv.fr/stats/',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
