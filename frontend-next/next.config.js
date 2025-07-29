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
    const santeFrRedirects = [
      // Rayons UV
      {
        localSlug: 'les-rayons-uv-quels-effets-sur-la-sante-et-celle-de-vos-enfants',
        santeFrUrl: 'https://www.sante.fr/les-rayons-uv-quels-effets-sur-la-sante-et-celle-de-vos-enfants'
      },
      {
        localSlug: 'les-rayons-uv-quels-effets-sur-la-sante',
        santeFrUrl: 'https://www.sante.fr/les-rayons-uv-quels-effets-sur-la-sante'
      },
      {
        localSlug: 'comment-choisir-et-utiliser-un-produit-de-protection-solaire',
        santeFrUrl: 'https://www.sante.fr/comment-choisir-et-utiliser-un-produit-de-protection-solaire'
      },
      {
        localSlug: 'rayons-uv-lies-au-soleil-quels-risques-pour-les-yeux',
        santeFrUrl: 'https://www.sante.fr/rayons-uv-lies-au-soleil-quels-risques-pour-les-yeux'
      },

      // Covid 19
      {
        localSlug: 'covid-19-quels-gestes-adopter-pour-proteger-sa-sante-et-son-environnement',
        santeFrUrl: 'https://www.sante.fr/covid-19-quels-gestes-adopter-pour-proteger-sa-sante-et-son-environnement'
      },

      // Santé
      {
        localSlug: 'comment-se-proteger-du-moustique-tigre',
        santeFrUrl: 'https://www.sante.fr/comment-se-proteger-du-moustique-tigre'
      },
      {
        localSlug: 'comment-reduire-l-exposition-aux-ondes-de-son-telephone-portable',
        santeFrUrl: 'https://www.sante.fr/comment-reduire-lexposition-aux-ondes-de-son-telephone-portable'
      },
      {
        localSlug: 'comment-eviter-les-morsures-de-tiques',
        santeFrUrl: 'https://www.sante.fr/comment-eviter-les-morsures-de-tiques'
      },
      {
        localSlug: 'comment-limiter-les-effets-du-bruit-sur-la-sante',
        santeFrUrl: 'https://www.sante.fr/comment-limiter-les-effets-du-bruit-sur-la-sante'
      },
      {
        localSlug: 'quels-sont-les-effets-de-la-lumiere-bleue-sur-la-sante',
        santeFrUrl: 'https://www.sante.fr/quels-sont-les-effets-de-la-lumiere-bleue-sur-la-sante'
      },
      {
        localSlug: 'cueillette-de-champignons-comment-prevenir-les-intoxications',
        santeFrUrl: 'https://www.sante.fr/cueillette-de-champignons-comment-prevenir-les-intoxications'
      },
      {
        localSlug: 'comment-lutter-contre-les-punaises-de-lit',
        santeFrUrl: 'https://www.sante.fr/comment-lutter-contre-les-punaises-de-lit'
      },
      {
        localSlug: 'comment-reduire-l-exposition-aux-perturbateurs-endocriniens',
        santeFrUrl: 'https://www.sante.fr/comment-reduire-lexposition-aux-perturbateurs-endocriniens'
      },

      // Allergies au pollen
      {
        localSlug: 'comment-reconnaitre-une-allergie-aux-pollens',
        santeFrUrl: 'https://www.sante.fr/comment-reconnaitre-une-allergie-aux-pollens'
      },
      {
        localSlug: 'comment-reduire-les-effets-des-pollens-sur-votre-sante',
        santeFrUrl: 'https://www.sante.fr/comment-reduire-les-effets-des-pollens-sur-votre-sante'
      },
      {
        localSlug: 'a-quelle-periode-de-l-annee-y-a-t-il-le-plus-de-pollen-dans-l-air',
        santeFrUrl: 'https://www.sante.fr/quelle-periode-de-lannee-y-t-il-le-plus-de-pollen-dans-lair'
      },
      {
        localSlug: 'pourquoi-faut-il-lutter-contre-l-ambroisie',
        santeFrUrl: 'https://www.sante.fr/pourquoi-faut-il-lutter-contre-lambroisie'
      },

      // Pollution
      {
        localSlug: 'pollution-de-l-air-et-sante-quels-liens',
        santeFrUrl: 'https://www.sante.fr/pollution-de-lair-et-sante-quels-liens'
      },
      {
        localSlug: 'comment-agit-la-france-sur-la-pollution-atmospherique',
        santeFrUrl: 'https://www.sante.fr/comment-agit-la-france-sur-la-pollution-atmospherique'
      },
      {
        localSlug: 'quel-est-le-role-des-transports-dans-la-pollution-atmospherique',
        santeFrUrl: 'https://www.sante.fr/quel-est-le-role-des-transports-dans-la-pollution-atmospherique'
      },
      {
        localSlug: 'pollution-de-l-air-en-voiture-comment-la-limiter',
        santeFrUrl: 'https://www.sante.fr/pollution-de-lair-en-voiture-comment-la-limiter'
      },
      {
        localSlug: 'comment-la-meteo-influence-t-elle-la-qualite-de-l-air',
        santeFrUrl: 'https://www.sante.fr/comment-la-meteo-influence-t-elle-la-qualite-de-lair'
      },
      {
        localSlug: 'pollution-des-sols-liee-a-l-activite-humaine-quels-effets-sur-la-sante',
        santeFrUrl: 'https://www.sante.fr/pollution-des-sols-liee-lactivite-humaine-quels-effets-sur-la-sante'
      },
      {
        localSlug: 'comment-adapter-sa-pratique-sportive-selon-la-qualite-de-l-air',
        santeFrUrl: 'https://www.sante.fr/comment-adapter-sa-pratique-sportive-selon-la-qualite-de-lair'
      },
      {
        localSlug: 'a-velo-comment-reduire-son-exposition-a-la-pollution',
        santeFrUrl: 'https://www.sante.fr/velo-comment-reduire-son-exposition-la-pollution'
      },
      {
        localSlug: 'les-microcapteurs-de-qualite-de-l-air-ambiant-sont-ils-fiables',
        santeFrUrl: 'https://www.sante.fr/les-microcapteurs-de-qualite-de-lair-ambiant-sont-ils-fiable'
      },

      // Phénomènes météorologiques
      {
        localSlug: 'quels-gestes-adopter-en-periode-de-grand-froid',
        santeFrUrl: 'https://www.sante.fr/quels-gestes-adopter-en-periode-de-grand-froid'
      },
      {
        localSlug: 'quels-reflexes-a-prendre-pour-proteger-son-enfant-du-grand-froid',
        santeFrUrl: 'https://www.sante.fr/quels-reflexes-prendre-pour-proteger-son-enfant-du-grand-froid'
      },
      {
        localSlug: 'qu-est-ce-que-la-vigilance-meteorologique',
        santeFrUrl: 'https://www.sante.fr/quest-ce-que-la-vigilance-meteorologique'
      },
      {
        localSlug: 'inondations-quels-sont-les-bons-reflexes',
        santeFrUrl: 'https://www.sante.fr/inondations-quels-sont-les-bons-reflexes'
      },
      {
        localSlug: 'quels-comportements-adopter-en-cas-de-secheresse',
        santeFrUrl: 'https://www.sante.fr/quels-comportements-adopter-en-cas-de-secheresse'
      },
      {
        localSlug: 'que-faire-en-cas-de-vigilance-meteo-neige-et-verglas',
        santeFrUrl: 'https://www.sante.fr/que-faire-en-cas-de-vigilance-meteo-neige-et-verglas'
      },
      {
        localSlug: 'quels-gestes-adopter-en-cas-de-vigilance-meteo-avalanche',
        santeFrUrl: 'https://www.sante.fr/quels-gestes-adopter-en-cas-de-vigilance-meteo-avalanche'
      },
      {
        localSlug: 'comment-se-proteger-en-cas-de-vague-de-chaleur',
        santeFrUrl: 'https://www.sante.fr/comment-se-proteger-en-cas-de-vague-de-chaleur'
      },
      {
        localSlug: 'comment-proteger-votre-sante-et-celle-de-vos-enfants-en-cas-de-fortes-chaleurs',
        santeFrUrl: 'https://www.sante.fr/comment-proteger-votre-sante-et-celle-de-vos-enfants-en-cas-de-fortes-chaleurs'
      },

      // À la maison
      {
        localSlug: 'l-air-interieur-des-logements-est-il-pollue',
        santeFrUrl: 'https://www.sante.fr/lair-interieur-des-logements-est-il-pollue'
      },
      {
        localSlug: 'comment-aerer-son-logement-pour-ameliorer-l-air-interieur',
        santeFrUrl: 'https://www.sante.fr/comment-aerer-son-logement-pour-ameliorer-lair-interieur'
      },
      {
        localSlug: 'comment-ameliorer-la-qualite-de-l-air-chez-soi-grace-a-la-ventilation',
        santeFrUrl: 'https://www.sante.fr/comment-ameliorer-la-qualite-de-lair-chez-soi-grace-la-ventilation'
      },
      {
        localSlug: 'comment-chauffer-son-interieur-en-toute-securite',
        santeFrUrl: 'https://www.sante.fr/comment-chauffer-son-interieur-en-toute-securite'
      },
      {
        localSlug: 'que-faire-en-presence-de-radon-dans-son-logement',
        santeFrUrl: 'https://www.sante.fr/que-faire-en-presence-de-radon-dans-son-logement'
      },
      {
        localSlug: 'chauffage-au-bois-comment-bien-l-utiliser',
        santeFrUrl: 'https://www.sante.fr/chauffage-au-bois-comment-bien-lutiliser'
      },
      {
        localSlug: 'les-produits-d-entretien-polluent-ils-l-air-interieur',
        santeFrUrl: 'https://www.sante.fr/les-produits-dentretien-polluent-ils-lair-interieur'
      },
      {
        localSlug: 'comment-proteger-son-enfant-des-produits-chimiques-a-la-maison',
        santeFrUrl: 'https://www.sante.fr/comment-proteger-son-enfant-des-produits-chimiques-la-maison'
      },
      {
        localSlug: 'comment-jardiner-sans-polluer',
        santeFrUrl: 'https://www.sante.fr/comment-jardiner-sans-polluer'
      },
      {
        localSlug: 'comment-ameliorer-l-air-de-son-logement-quand-on-est-futurs-ou-nouveaux-parents',
        santeFrUrl: 'https://www.sante.fr/comment-ameliorer-lair-de-son-logement-quand-est-futurs-ou-nouveaux-parents'
      },
      {
        localSlug: 'comment-limiter-l-humidite-dans-son-logement',
        santeFrUrl: 'https://www.sante.fr/comment-limiter-lhumidite-dans-son-logement'
      },
      {
        localSlug: 'comment-reduire-l-exposition-aux-polluants-pendant-les-travaux',
        santeFrUrl: 'https://www.sante.fr/comment-reduire-lexposition-aux-polluants-pendant-les-travaux'
      },
      {
        localSlug: 'cuisiner-en-protegeant-sa-sante-quels-gestes-adopter',
        santeFrUrl: 'https://www.sante.fr/cuisiner-en-protegeant-sa-sante-quels-gestes-adopter'
      },
      {
        localSlug: 'comment-utiliser-l-eau-de-pluie',
        santeFrUrl: 'https://www.sante.fr/comment-utiliser-leau-de-pluie'
      },
      {
        localSlug: 'comment-prevenir-l-exposition-au-plomb-dans-son-logement',
        santeFrUrl: 'https://www.sante.fr/comment-prevenir-lexposition-au-plomb-dans-son-logement'
      },
      {
        localSlug: 'les-plantes-ameliorent-elles-la-qualite-de-l-air-interieur',
        santeFrUrl: 'https://www.sante.fr/les-plantes-ameliorent-elles-la-qualite-de-lair-interieur'
      },
      {
        localSlug: 'comment-limiter-la-presence-d-acariens-dans-son-logement',
        santeFrUrl: 'https://www.sante.fr/comment-limiter-la-presence-dacariens-dans-son-logement'
      },
      {
        localSlug: 'comment-eviter-l-exposition-a-l-amiante',
        santeFrUrl: 'https://www.sante.fr/comment-eviter-lexposition-lamiante'
      },
      {
        localSlug: 'les-purificateurs-d-air-ameliorent-ils-la-qualite-de-l-air-interieur-chez-soi',
        santeFrUrl: 'https://www.sante.fr/les-purificateurs-dair-ameliorent-ils-la-qualite-de-lair-interieur-chez-soi'
      },
      {
        localSlug: 'les-bougies-et-l-encens-degradent-ils-la-qualite-de-l-air-interieur',
        santeFrUrl: 'https://www.sante.fr/les-bougies-et-lencens-degradent-ils-la-qualite-de-lair-interieur'
      },
      {
        localSlug: 'comment-eviter-une-intoxication-au-monoxyde-de-carbone',
        santeFrUrl: 'https://www.sante.fr/comment-eviter-une-intoxication-au-monoxyde-de-carbone'
      },
      {
        localSlug: 'que-signifient-les-pictogrammes-de-danger-sur-les-produits-chimiques',
        santeFrUrl: 'https://www.sante.fr/que-signifient-les-pictogrammes-de-danger-sur-les-produits-chimiques'
      },
      {
        localSlug: 'quels-gestes-adopter-pour-profiter-du-sapin-de-noel-en-toute-securite-a-la-maison',
        santeFrUrl: 'https://www.sante.fr/quels-gestes-adopter-pour-profiter-du-sapin-de-noel-en-toute-securite-la-maison'
      }
    ];
    
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