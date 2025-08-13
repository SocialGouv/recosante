// Configuration des redirections vers sante.fr
const santeFrRedirects: Record<string, string> = {
  'les-rayons-uv-quels-effets-sur-la-sante-et-celle-de-vos-enfants': 'https://www.sante.fr/les-rayons-uv-quels-effets-sur-la-sante-et-celle-de-vos-enfants',
  'les-rayons-uv-quels-effets-sur-la-sante': 'https://www.sante.fr/les-rayons-uv-quels-effets-sur-la-sante',
  'comment-choisir-et-utiliser-un-produit-de-protection-solaire': 'https://www.sante.fr/comment-choisir-et-utiliser-un-produit-de-protection-solaire',
  'rayons-uv-lies-au-soleil-quels-risques-pour-les-yeux': 'https://www.sante.fr/rayons-uv-lies-au-soleil-quels-risques-pour-les-yeux',
  'covid-19-quels-gestes-adopter-pour-proteger-sa-sante-et-son-environnement': 'https://www.sante.fr/covid-19-quels-gestes-adopter-pour-proteger-sa-sante-et-son-environnement',
  'comment-se-proteger-du-moustique-tigre': 'https://www.sante.fr/comment-se-proteger-du-moustique-tigre',
  'comment-reduire-l-exposition-aux-ondes-de-son-telephone-portable': 'https://www.sante.fr/comment-reduire-lexposition-aux-ondes-de-son-telephone-portable',
  'comment-eviter-les-morsures-de-tiques': 'https://www.sante.fr/comment-eviter-les-morsures-de-tiques',
  'comment-limiter-les-effets-du-bruit-sur-la-sante': 'https://www.sante.fr/comment-limiter-les-effets-du-bruit-sur-la-sante',
  'quels-sont-les-effets-de-la-lumiere-bleue-sur-la-sante': 'https://www.sante.fr/quels-sont-les-effets-de-la-lumiere-bleue-sur-la-sante',
  'cueillette-de-champignons-comment-prevenir-les-intoxications': 'https://www.sante.fr/cueillette-de-champignons-comment-prevenir-les-intoxications',
  'comment-lutter-contre-les-punaises-de-lit': 'https://www.sante.fr/comment-lutter-contre-les-punaises-de-lit',
  'comment-reduire-l-exposition-aux-perturbateurs-endocriniens': 'https://www.sante.fr/comment-reduire-lexposition-aux-perturbateurs-endocriniens',
  'comment-reconnaitre-une-allergie-aux-pollens': 'https://www.sante.fr/comment-reconnaitre-une-allergie-aux-pollens',
  'comment-reduire-les-effets-des-pollens-sur-votre-sante': 'https://www.sante.fr/comment-reduire-les-effets-des-pollens-sur-votre-sante',
  'a-quelle-periode-de-l-annee-y-a-t-il-le-plus-de-pollen-dans-l-air': 'https://www.sante.fr/quelle-periode-de-lannee-y-t-il-le-plus-de-pollen-dans-lair',
  'pourquoi-faut-il-lutter-contre-l-ambroisie': 'https://www.sante.fr/pourquoi-faut-il-lutter-contre-lambroisie',
  'pollution-de-l-air-et-sante-quels-liens': 'https://www.sante.fr/pollution-de-lair-et-sante-quels-liens',
  'comment-agit-la-france-sur-la-pollution-atmospherique': 'https://www.sante.fr/comment-agit-la-france-sur-la-pollution-atmospherique',
  'quel-est-le-role-des-transports-dans-la-pollution-atmospherique': 'https://www.sante.fr/quel-est-le-role-des-transports-dans-la-pollution-atmospherique',
  'pollution-de-l-air-en-voiture-comment-la-limiter': 'https://www.sante.fr/pollution-de-lair-en-voiture-comment-la-limiter',
  'comment-la-meteo-influence-t-elle-la-qualite-de-l-air': 'https://www.sante.fr/comment-la-meteo-influence-t-elle-la-qualite-de-lair',
  'pollution-des-sols-liee-a-l-activite-humaine-quels-effets-sur-la-sante': 'https://www.sante.fr/pollution-des-sols-liee-lactivite-humaine-quels-effets-sur-la-sante',
  'comment-adapter-sa-pratique-sportive-selon-la-qualite-de-l-air': 'https://www.sante.fr/comment-adapter-sa-pratique-sportive-selon-la-qualite-de-lair',
  'a-velo-comment-reduire-son-exposition-a-la-pollution': 'https://www.sante.fr/velo-comment-reduire-son-exposition-la-pollution',
  'les-microcapteurs-de-qualite-de-l-air-ambiant-sont-ils-fiables': 'https://www.sante.fr/les-microcapteurs-de-qualite-de-lair-ambiant-sont-ils-fiable',
  'quels-gestes-adopter-en-periode-de-grand-froid': 'https://www.sante.fr/quels-gestes-adopter-en-periode-de-grand-froid',
  'quels-reflexes-a-prendre-pour-proteger-son-enfant-du-grand-froid': 'https://www.sante.fr/quels-reflexes-prendre-pour-proteger-son-enfant-du-grand-froid',
  'qu-est-ce-que-la-vigilance-meteorologique': 'https://www.sante.fr/quest-ce-que-la-vigilance-meteorologique',
  'inondations-quels-sont-les-bons-reflexes': 'https://www.sante.fr/inondations-quels-sont-les-bons-reflexes',
  'quels-comportements-adopter-en-cas-de-secheresse': 'https://www.sante.fr/quels-comportements-adopter-en-cas-de-secheresse',
  'que-faire-en-cas-de-vigilance-meteo-neige-et-verglas': 'https://www.sante.fr/que-faire-en-cas-de-vigilance-meteo-neige-et-verglas',
  'quels-gestes-adopter-en-cas-de-vigilance-meteo-avalanche': 'https://www.sante.fr/quels-gestes-adopter-en-cas-de-vigilance-meteo-avalanche',
  'comment-se-proteger-en-cas-de-vague-de-chaleur': 'https://www.sante.fr/comment-se-proteger-en-cas-de-vague-de-chaleur',
  'comment-proteger-votre-sante-et-celle-de-vos-enfants-en-cas-de-fortes-chaleurs': 'https://www.sante.fr/comment-proteger-votre-sante-et-celle-de-vos-enfants-en-cas-de-fortes-chaleurs',
  'l-air-interieur-des-logements-est-il-pollue': 'https://www.sante.fr/lair-interieur-des-logements-est-il-pollue',
  'comment-aerer-son-logement-pour-ameliorer-l-air-interieur': 'https://www.sante.fr/comment-aerer-son-logement-pour-ameliorer-lair-interieur',
  'comment-ameliorer-la-qualite-de-l-air-chez-soi-grace-a-la-ventilation': 'https://www.sante.fr/comment-ameliorer-la-qualite-de-lair-chez-soi-grace-la-ventilation',
  'comment-chauffer-son-interieur-en-toute-securite': 'https://www.sante.fr/comment-chauffer-son-interieur-en-toute-securite',
  'que-faire-en-presence-de-radon-dans-son-logement': 'https://www.sante.fr/que-faire-en-presence-de-radon-dans-son-logement',
  'chauffage-au-bois-comment-bien-l-utiliser': 'https://www.sante.fr/chauffage-au-bois-comment-bien-lutiliser',
  'les-produits-d-entretien-polluent-ils-l-air-interieur': 'https://www.sante.fr/les-produits-dentretien-polluent-ils-lair-interieur',
  'comment-proteger-son-enfant-des-produits-chimiques-a-la-maison': 'https://www.sante.fr/comment-proteger-son-enfant-des-produits-chimiques-la-maison',
  'comment-jardiner-sans-polluer': 'https://www.sante.fr/comment-jardiner-sans-polluer',
  'comment-ameliorer-l-air-de-son-logement-quand-on-est-futurs-ou-nouveaux-parents': 'https://www.sante.fr/comment-ameliorer-lair-de-son-logement-quand-est-futurs-ou-nouveaux-parents',
  'comment-limiter-l-humidite-dans-son-logement': 'https://www.sante.fr/comment-limiter-lhumidite-dans-son-logement',
  'comment-reduire-l-exposition-aux-polluants-pendant-les-travaux': 'https://www.sante.fr/comment-reduire-lexposition-aux-polluants-pendant-les-travaux',
  'cuisiner-en-protegeant-sa-sante-quels-gestes-adopter': 'https://www.sante.fr/cuisiner-en-protegeant-sa-sante-quels-gestes-adopter',
  'comment-utiliser-l-eau-de-pluie': 'https://www.sante.fr/comment-utiliser-leau-de-pluie',
  'comment-prevenir-l-exposition-au-plomb-dans-son-logement': 'https://www.sante.fr/comment-prevenir-lexposition-au-plomb-dans-son-logement',
  'les-plantes-ameliorent-elles-la-qualite-de-l-air-interieur': 'https://www.sante.fr/les-plantes-ameliorent-elles-la-qualite-de-lair-interieur',
  'comment-limiter-la-presence-d-acariens-dans-son-logement': 'https://www.sante.fr/comment-limiter-la-presence-dacariens-dans-son-logement',
  'comment-eviter-l-exposition-a-l-amiante': 'https://www.sante.fr/comment-eviter-lexposition-lamiante',
  'les-purificateurs-d-air-ameliorent-ils-la-qualite-de-l-air-interieur-chez-soi': 'https://www.sante.fr/les-purificateurs-dair-ameliorent-ils-la-qualite-de-lair-interieur-chez-soi',
  'les-bougies-et-l-encens-degradent-ils-la-qualite-de-l-air-interieur': 'https://www.sante.fr/les-bougies-et-lencens-degradent-ils-la-qualite-de-lair-interieur',
  'comment-eviter-une-intoxication-au-monoxyde-de-carbone': 'https://www.sante.fr/comment-eviter-une-intoxication-au-monoxyde-de-carbone',
  'que-signifient-les-pictogrammes-de-danger-sur-les-produits-chimiques': 'https://www.sante.fr/que-signifient-les-pictogrammes-de-danger-sur-les-produits-chimiques',
  'quels-gestes-adopter-pour-profiter-du-sapin-de-noel-en-toute-securite-a-la-maison': 'https://www.sante.fr/quels-gestes-adopter-pour-profiter-du-sapin-de-noel-en-toute-securite-a-la-maison'
};

/**
 * Récupère l'URL de redirection vers sante.fr pour un article donné
 */
export function getRedirectUrl(slug: string): string | undefined {
  return santeFrRedirects[slug];
}

/**
 * Vérifie si un article a une redirection vers sante.fr
 */
export function hasRedirectToSanteFr(slug: string): boolean {
  return slug in santeFrRedirects;
}

/**
 * Récupère tous les slugs qui ont une redirection
 */
export function getRedirectedSlugs(): string[] {
  return Object.keys(santeFrRedirects);
}

/**
 * Récupère toutes les redirections
 */
export function getAllRedirects(): Record<string, string> {
  return { ...santeFrRedirects };
}
