/** @type {import('next').NextConfig} */

 const PATH = process.env.NEXT_PUBLIC_GATSBY_INTERN_URL || 'http://frontend';

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
    return [
      // Rayons UV
      {
        source: '/articles/les-rayons-uv-quels-effets-sur-la-sante-et-celle-de-vos-enfants/',
        destination: 'https://www.sante.fr/les-rayons-uv-quels-effets-sur-la-sante-et-celle-de-vos-enfants',
        permanent: true,
      },
      {
        source: '/articles/les-rayons-uv-quels-effets-sur-la-sante/',
        destination: 'https://www.sante.fr/les-rayons-uv-quels-effets-sur-la-sante',
        permanent: true,
      },
      {
        source: '/articles/comment-choisir-et-utiliser-un-produit-de-protection-solaire/',
        destination: 'https://www.sante.fr/comment-choisir-et-utiliser-un-produit-de-protection-solaire',
        permanent: true,
      },
      {
        source: '/articles/rayons-uv-lies-au-soleil-quels-risques-pour-les-yeux/',
        destination: 'https://www.sante.fr/rayons-uv-lies-au-soleil-quels-risques-pour-les-yeux',
        permanent: true,
      },

      // Covid 19
      {
        source: '/articles/covid-19-quels-gestes-adopter-pour-proteger-sa-sante-et-son-environnement/',
        destination: 'https://www.sante.fr/covid-19-quels-gestes-adopter-pour-proteger-sa-sante-et-son-environnement',
        permanent: true,
      },

      // Santé
      {
        source: '/articles/comment-se-proteger-du-moustique-tigre/',
        destination: 'https://www.sante.fr/comment-se-proteger-du-moustique-tigre',
        permanent: true,
      },
      {
        source: '/articles/comment-reduire-l-exposition-aux-ondes-de-son-telephone-portable/',
        destination: 'https://www.sante.fr/comment-reduire-lexposition-aux-ondes-de-son-telephone-portable',
        permanent: true,
      },
      {
        source: '/articles/comment-eviter-les-morsures-de-tiques/',
        destination: 'https://www.sante.fr/comment-eviter-les-morsures-de-tiques',
        permanent: true,
      },
      {
        source: '/articles/comment-limiter-les-effets-du-bruit-sur-la-sante/',
        destination: 'https://www.sante.fr/comment-limiter-les-effets-du-bruit-sur-la-sante',
        permanent: true,
      },
      {
        source: '/articles/quels-sont-les-effets-de-la-lumiere-bleue-sur-la-sante/',
        destination: 'https://www.sante.fr/quels-sont-les-effets-de-la-lumiere-bleue-sur-la-sante',
        permanent: true,
      },
      {
        source: '/articles/cueillette-de-champignons-comment-prevenir-les-intoxications/',
        destination: 'https://www.sante.fr/cueillette-de-champignons-comment-prevenir-les-intoxications',
        permanent: true,
      },
      {
        source: '/articles/comment-lutter-contre-les-punaises-de-lit/',
        destination: 'https://www.sante.fr/comment-lutter-contre-les-punaises-de-lit',
        permanent: true,
      },
      {
        source: '/articles/comment-reduire-l-exposition-aux-perturbateurs-endocriniens/',
        destination: 'https://www.sante.fr/comment-reduire-lexposition-aux-perturbateurs-endocriniens',
        permanent: true,
      },

      // Allergies au pollen
      {
        source: '/articles/comment-reconnaitre-une-allergie-aux-pollens/',
        destination: 'https://www.sante.fr/comment-reconnaitre-une-allergie-aux-pollens',
        permanent: true,
      },
      {
        source: '/articles/comment-reduire-les-effets-des-pollens-sur-votre-sante/',
        destination: 'https://www.sante.fr/comment-reduire-les-effets-des-pollens-sur-votre-sante',
        permanent: true,
      },
      {
        source: '/articles/a-quelle-periode-de-l-annee-y-a-t-il-le-plus-de-pollen-dans-l-air/',
        destination: 'https://www.sante.fr/quelle-periode-de-lannee-y-t-il-le-plus-de-pollen-dans-lair',
        permanent: true,
      },
      {
        source: '/articles/pourquoi-faut-il-lutter-contre-l-ambroisie/',
        destination: 'https://www.sante.fr/pourquoi-faut-il-lutter-contre-lambroisie',
        permanent: true,
      },

      // Pollution
      {
        source: '/articles/pollution-de-l-air-et-sante-quels-liens/',
        destination: 'https://www.sante.fr/pollution-de-lair-et-sante-quels-liens',
        permanent: true,
      },
      {
        source: '/articles/comment-agit-la-france-sur-la-pollution-atmospherique/',
        destination: 'https://www.sante.fr/comment-agit-la-france-sur-la-pollution-atmospherique',
        permanent: true,
      },
      {
        source: '/articles/quel-est-le-role-des-transports-dans-la-pollution-atmospherique/',
        destination: 'https://www.sante.fr/quel-est-le-role-des-transports-dans-la-pollution-atmospherique',
        permanent: true,
      },
      {
        source: '/articles/pollution-de-l-air-en-voiture-comment-la-limiter/',
        destination: 'https://www.sante.fr/pollution-de-lair-en-voiture-comment-la-limiter',
        permanent: true,
      },
      {
        source: '/articles/comment-la-meteo-influence-t-elle-la-qualite-de-l-air/',
        destination: 'https://www.sante.fr/comment-la-meteo-influence-t-elle-la-qualite-de-lair',
        permanent: true,
      },
      {
        source: '/articles/pollution-des-sols-liee-a-l-activite-humaine-quels-effets-sur-la-sante/',
        destination: 'https://www.sante.fr/pollution-des-sols-liee-lactivite-humaine-quels-effets-sur-la-sante',
        permanent: true,
      },
      {
        source: '/articles/comment-adapter-sa-pratique-sportive-selon-la-qualite-de-l-air/',
        destination: 'https://www.sante.fr/comment-adapter-sa-pratique-sportive-selon-la-qualite-de-lair',
        permanent: true,
      },
      {
        source: '/articles/a-velo-comment-reduire-son-exposition-a-la-pollution/',
        destination: 'https://www.sante.fr/velo-comment-reduire-son-exposition-la-pollution',
        permanent: true,
      },
      {
        source: '/articles/les-microcapteurs-de-qualite-de-l-air-ambiant-sont-ils-fiables/',
        destination: 'https://www.sante.fr/les-microcapteurs-de-qualite-de-lair-ambiant-sont-ils-fiable',
        permanent: true,
      },

      // Phénomènes météorologiques
      {
        source: '/articles/quels-gestes-adopter-en-periode-de-grand-froid/',
        destination: 'https://www.sante.fr/quels-gestes-adopter-en-periode-de-grand-froid',
        permanent: true,
      },
      {
        source: '/articles/quels-reflexes-a-prendre-pour-proteger-son-enfant-du-grand-froid/',
        destination: 'https://www.sante.fr/quels-reflexes-prendre-pour-proteger-son-enfant-du-grand-froid',
        permanent: true,
      },
      {
        source: '/articles/qu-est-ce-que-la-vigilance-meteorologique/',
        destination: 'https://www.sante.fr/quest-ce-que-la-vigilance-meteorologique',
        permanent: true,
      },
      {
        source: '/articles/inondations-quels-sont-les-bons-reflexes/',
        destination: 'https://www.sante.fr/inondations-quels-sont-les-bons-reflexes',
        permanent: true,
      },
      {
        source: '/articles/quels-comportements-adopter-en-cas-de-secheresse/',
        destination: 'https://www.sante.fr/quels-comportements-adopter-en-cas-de-secheresse',
        permanent: true,
      },
      {
        source: '/articles/que-faire-en-cas-de-vigilance-meteo-neige-et-verglas/',
        destination: 'https://www.sante.fr/que-faire-en-cas-de-vigilance-meteo-neige-et-verglas',
        permanent: true,
      },
      {
        source: '/articles/quels-gestes-adopter-en-cas-de-vigilance-meteo-avalanche/',
        destination: 'https://www.sante.fr/quels-gestes-adopter-en-cas-de-vigilance-meteo-avalanche',
        permanent: true,
      },
      {
        source: '/articles/comment-se-proteger-en-cas-de-vague-de-chaleur/',
        destination: 'https://www.sante.fr/comment-se-proteger-en-cas-de-vague-de-chaleur',
        permanent: true,
      },
      {
        source: '/articles/comment-proteger-votre-sante-et-celle-de-vos-enfants-en-cas-de-fortes-chaleurs/',
        destination: 'https://www.sante.fr/comment-proteger-votre-sante-et-celle-de-vos-enfants-en-cas-de-fortes-chaleurs',
        permanent: true,
      },

      // À la maison
      {
        source: '/articles/l-air-interieur-des-logements-est-il-pollue/',
        destination: 'https://www.sante.fr/lair-interieur-des-logements-est-il-pollue',
        permanent: true,
      },
      {
        source: '/articles/comment-aerer-son-logement-pour-ameliorer-l-air-interieur/',
        destination: 'https://www.sante.fr/comment-aerer-son-logement-pour-ameliorer-lair-interieur',
        permanent: true,
      },
      {
        source: '/articles/comment-ameliorer-la-qualite-de-l-air-chez-soi-grace-a-la-ventilation/',
        destination: 'https://www.sante.fr/comment-ameliorer-la-qualite-de-lair-chez-soi-grace-la-ventilation',
        permanent: true,
      },
      {
        source: '/articles/comment-chauffer-son-interieur-en-toute-securite/',
        destination: 'https://www.sante.fr/comment-chauffer-son-interieur-en-toute-securite',
        permanent: true,
      },
      {
        source: '/articles/que-faire-en-presence-de-radon-dans-son-logement/',
        destination: 'https://www.sante.fr/que-faire-en-presence-de-radon-dans-son-logement',
        permanent: true,
      },
      {
        source: '/articles/chauffage-au-bois-comment-bien-l-utiliser/',
        destination: 'https://www.sante.fr/chauffage-au-bois-comment-bien-lutiliser',
        permanent: true,
      },
      {
        source: '/articles/les-produits-d-entretien-polluent-ils-l-air-interieur/',
        destination: 'https://www.sante.fr/les-produits-dentretien-polluent-ils-lair-interieur',
        permanent: true,
      },
      {
        source: '/articles/comment-proteger-son-enfant-des-produits-chimiques-a-la-maison/',
        destination: 'https://www.sante.fr/comment-proteger-son-enfant-des-produits-chimiques-la-maison',
        permanent: true,
      },
      {
        source: '/articles/comment-jardiner-sans-polluer/',
        destination: 'https://www.sante.fr/comment-jardiner-sans-polluer',
        permanent: true,
      },
      {
        source: '/articles/comment-ameliorer-l-air-de-son-logement-quand-on-est-futurs-ou-nouveaux-parents/',
        destination: 'https://www.sante.fr/comment-ameliorer-lair-de-son-logement-quand-est-futurs-ou-nouveaux-parents',
        permanent: true,
      },
      {
        source: '/articles/comment-limiter-l-humidite-dans-son-logement/',
        destination: 'https://www.sante.fr/comment-limiter-lhumidite-dans-son-logement',
        permanent: true,
      },
      {
        source: '/articles/comment-reduire-l-exposition-aux-polluants-pendant-les-travaux/',
        destination: 'https://www.sante.fr/comment-reduire-lexposition-aux-polluants-pendant-les-travaux',
        permanent: true,
      },
      {
        source: '/articles/cuisiner-en-protegeant-sa-sante-quels-gestes-adopter/',
        destination: 'https://www.sante.fr/cuisiner-en-protegeant-sa-sante-quels-gestes-adopter',
        permanent: true,
      },
      {
        source: '/articles/comment-utiliser-l-eau-de-pluie/',
        destination: 'https://www.sante.fr/comment-utiliser-leau-de-pluie',
        permanent: true,
      },
      {
        source: '/articles/comment-prevenir-l-exposition-au-plomb-dans-son-logement/',
        destination: 'https://www.sante.fr/comment-prevenir-lexposition-au-plomb-dans-son-logement',
        permanent: true,
      },
      {
        source: '/articles/les-plantes-ameliorent-elles-la-qualite-de-l-air-interieur/',
        destination: 'https://www.sante.fr/les-plantes-ameliorent-elles-la-qualite-de-lair-interieur',
        permanent: true,
      },
      {
        source: '/articles/comment-limiter-la-presence-d-acariens-dans-son-logement/',
        destination: 'https://www.sante.fr/comment-limiter-la-presence-dacariens-dans-son-logement',
        permanent: true,
      },
      {
        source: '/articles/comment-eviter-l-exposition-a-l-amiante/',
        destination: 'https://www.sante.fr/comment-eviter-lexposition-lamiante',
        permanent: true,
      },
      {
        source: '/articles/les-purificateurs-d-air-ameliorent-ils-la-qualite-de-l-air-interieur-chez-soi/',
        destination: 'https://www.sante.fr/les-purificateurs-dair-ameliorent-ils-la-qualite-de-lair-interieur-chez-soi',
        permanent: true,
      },
      {
        source: '/articles/les-bougies-et-l-encens-degradent-ils-la-qualite-de-l-air-interieur/',
        destination: 'https://www.sante.fr/les-bougies-et-lencens-degradent-ils-la-qualite-de-lair-interieur',
        permanent: true,
      },
      {
        source: '/articles/comment-eviter-une-intoxication-au-monoxyde-de-carbone/',
        destination: 'https://www.sante.fr/comment-eviter-une-intoxication-au-monoxyde-de-carbone',
        permanent: true,
      },
      {
        source: '/articles/que-signifient-les-pictogrammes-de-danger-sur-les-produits-chimiques/',
        destination: 'https://www.sante.fr/que-signifient-les-pictogrammes-de-danger-sur-les-produits-chimiques',
        permanent: true,
      },
      {
        source: '/articles/quels-gestes-adopter-pour-profiter-du-sapin-de-noel-en-toute-securite-a-la-maison/',
        destination: 'https://www.sante.fr/quels-gestes-adopter-pour-profiter-du-sapin-de-noel-en-toute-securite-la-maison',
        permanent: true,
      },
    ];
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