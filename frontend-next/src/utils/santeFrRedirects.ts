// Configuration des redirections vers sante.fr
// Ce fichier contient la correspondance entre les articles locaux et les URLs de sante.fr

export interface SanteFrRedirect {
  localSlug: string;
  santeFrUrl: string;
  title: string; // Titre de l'article pour référence
  category?: string; // Catégorie pour faciliter l'organisation
}

// Tableau des redirections vers sante.fr
// Basé sur le CSV fourni par le client
export const santeFrRedirects: SanteFrRedirect[] = [
  // Rayons UV
  {
    localSlug: 'les-rayons-uv-quels-effets-sur-la-sante-et-celle-de-vos-enfants',
    santeFrUrl: 'https://www.sante.fr/les-rayons-uv-quels-effets-sur-la-sante-et-celle-de-vos-enfants',
    title: 'Les rayons UV : quels effets sur la santé et celle de vos enfants ?',
    category: 'Rayons UV'
  },
  {
    localSlug: 'les-rayons-uv-quels-effets-sur-la-sante',
    santeFrUrl: 'https://www.sante.fr/les-rayons-uv-quels-effets-sur-la-sante',
    title: 'Les rayons UV : quels effets sur la santé ?',
    category: 'Rayons UV'
  },
  {
    localSlug: 'comment-choisir-et-utiliser-un-produit-de-protection-solaire',
    santeFrUrl: 'https://www.sante.fr/comment-choisir-et-utiliser-un-produit-de-protection-solaire',
    title: 'Comment choisir et utiliser un produit de protection solaire ?',
    category: 'Rayons UV'
  },
  {
    localSlug: 'rayons-uv-lies-au-soleil-quels-risques-pour-les-yeux',
    santeFrUrl: 'https://www.sante.fr/rayons-uv-lies-au-soleil-quels-risques-pour-les-yeux',
    title: 'Rayons UV liés au soleil : quels risques pour les yeux ?',
    category: 'Rayons UV'
  },

  // Covid 19
  {
    localSlug: 'covid-19-quels-gestes-adopter-pour-proteger-sa-sante-et-son-environnement',
    santeFrUrl: 'https://www.sante.fr/covid-19-quels-gestes-adopter-pour-proteger-sa-sante-et-son-environnement',
    title: 'Covid-19 : quels gestes adopter pour protéger sa santé et son environnement ?',
    category: 'Covid 19'
  },

  // Santé
  {
    localSlug: 'comment-se-proteger-du-moustique-tigre',
    santeFrUrl: 'https://www.sante.fr/comment-se-proteger-du-moustique-tigre',
    title: 'Comment se protéger du moustique tigre ?',
    category: 'Santé'
  },
  {
    localSlug: 'comment-reduire-l-exposition-aux-ondes-de-son-telephone-portable',
    santeFrUrl: 'https://www.sante.fr/comment-reduire-lexposition-aux-ondes-de-son-telephone-portable',
    title: 'Comment réduire l\'exposition aux ondes de son téléphone portable ?',
    category: 'Santé'
  },
  {
    localSlug: 'comment-eviter-les-morsures-de-tiques',
    santeFrUrl: 'https://www.sante.fr/comment-eviter-les-morsures-de-tiques',
    title: 'Comment éviter les morsures de tiques ?',
    category: 'Santé'
  },
  {
    localSlug: 'comment-limiter-les-effets-du-bruit-sur-la-sante',
    santeFrUrl: 'https://www.sante.fr/comment-limiter-les-effets-du-bruit-sur-la-sante',
    title: 'Comment limiter les effets du bruit sur la santé ?',
    category: 'Santé'
  },
  {
    localSlug: 'quels-sont-les-effets-de-la-lumiere-bleue-sur-la-sante',
    santeFrUrl: 'https://www.sante.fr/quels-sont-les-effets-de-la-lumiere-bleue-sur-la-sante',
    title: 'Quels sont les effets de la lumière bleue sur la santé ?',
    category: 'Santé'
  },
  {
    localSlug: 'cueillette-de-champignons-comment-prevenir-les-intoxications',
    santeFrUrl: 'https://www.sante.fr/cueillette-de-champignons-comment-prevenir-les-intoxications',
    title: 'Cueillette de champignons : comment prévenir les intoxications ?',
    category: 'Santé'
  },
  {
    localSlug: 'comment-lutter-contre-les-punaises-de-lit',
    santeFrUrl: 'https://www.sante.fr/comment-lutter-contre-les-punaises-de-lit',
    title: 'Comment lutter contre les punaises de lit ?',
    category: 'Santé'
  },
  {
    localSlug: 'comment-reduire-l-exposition-aux-perturbateurs-endocriniens',
    santeFrUrl: 'https://www.sante.fr/comment-reduire-lexposition-aux-perturbateurs-endocriniens',
    title: 'Comment réduire l\'exposition aux perturbateurs endocriniens ?',
    category: 'Santé'
  },

  // Allergies au pollen
  {
    localSlug: 'comment-reconnaitre-une-allergie-aux-pollens',
    santeFrUrl: 'https://www.sante.fr/comment-reconnaitre-une-allergie-aux-pollens',
    title: 'Comment reconnaître une allergie aux pollens ?',
    category: 'Allergies au pollen'
  },
  {
    localSlug: 'comment-reduire-les-effets-des-pollens-sur-votre-sante',
    santeFrUrl: 'https://www.sante.fr/comment-reduire-les-effets-des-pollens-sur-votre-sante',
    title: 'Comment réduire les effets des pollens sur votre santé ?',
    category: 'Allergies au pollen'
  },
  {
    localSlug: 'a-quelle-periode-de-l-annee-y-a-t-il-le-plus-de-pollen-dans-l-air',
    santeFrUrl: 'https://www.sante.fr/quelle-periode-de-lannee-y-t-il-le-plus-de-pollen-dans-lair',
    title: 'À quelle période de l\'année y a-t-il le plus de pollen dans l\'air ?',
    category: 'Allergies au pollen'
  },
  {
    localSlug: 'pourquoi-faut-il-lutter-contre-l-ambroisie',
    santeFrUrl: 'https://www.sante.fr/pourquoi-faut-il-lutter-contre-lambroisie',
    title: 'Pourquoi faut-il lutter contre l\'ambroisie ?',
    category: 'Allergies au pollen'
  },

  // Pollution
  {
    localSlug: 'pollution-de-l-air-et-sante-quels-liens',
    santeFrUrl: 'https://www.sante.fr/pollution-de-lair-et-sante-quels-liens',
    title: 'Pollution de l\'air et santé : quels liens ?',
    category: 'Pollution'
  },
  {
    localSlug: 'comment-agit-la-france-sur-la-pollution-atmospherique',
    santeFrUrl: 'https://www.sante.fr/comment-agit-la-france-sur-la-pollution-atmospherique',
    title: 'Comment agit la France sur la pollution atmosphérique ?',
    category: 'Pollution'
  },
  {
    localSlug: 'quel-est-le-role-des-transports-dans-la-pollution-atmospherique',
    santeFrUrl: 'https://www.sante.fr/quel-est-le-role-des-transports-dans-la-pollution-atmospherique',
    title: 'Quel est le rôle des transports dans la pollution atmosphérique ?',
    category: 'Pollution'
  },
  {
    localSlug: 'pollution-de-l-air-en-voiture-comment-la-limiter',
    santeFrUrl: 'https://www.sante.fr/pollution-de-lair-en-voiture-comment-la-limiter',
    title: 'Pollution de l\'air en voiture : comment la limiter ?',
    category: 'Pollution'
  },
  {
    localSlug: 'comment-la-meteo-influence-t-elle-la-qualite-de-l-air',
    santeFrUrl: 'https://www.sante.fr/comment-la-meteo-influence-t-elle-la-qualite-de-lair',
    title: 'Comment la météo influence-t-elle la qualité de l\'air ?',
    category: 'Pollution'
  },
  {
    localSlug: 'pollution-des-sols-liee-a-l-activite-humaine-quels-effets-sur-la-sante',
    santeFrUrl: 'https://www.sante.fr/pollution-des-sols-liee-lactivite-humaine-quels-effets-sur-la-sante',
    title: 'Pollution des sols liée à l\'activité humaine : quels effets sur la santé ?',
    category: 'Pollution'
  },
  {
    localSlug: 'comment-adapter-sa-pratique-sportive-selon-la-qualite-de-l-air',
    santeFrUrl: 'https://www.sante.fr/comment-adapter-sa-pratique-sportive-selon-la-qualite-de-lair',
    title: 'Comment adapter sa pratique sportive selon la qualité de l\'air ?',
    category: 'Pollution'
  },
  {
    localSlug: 'a-velo-comment-reduire-son-exposition-a-la-pollution',
    santeFrUrl: 'https://www.sante.fr/velo-comment-reduire-son-exposition-la-pollution',
    title: 'À vélo : comment réduire son exposition à la pollution ?',
    category: 'Pollution'
  },
  {
    localSlug: 'les-microcapteurs-de-qualite-de-l-air-ambiant-sont-ils-fiables',
    santeFrUrl: 'https://www.sante.fr/les-microcapteurs-de-qualite-de-lair-ambiant-sont-ils-fiable',
    title: 'Les microcapteurs de qualité de l\'air ambiant sont-ils fiables ?',
    category: 'Pollution'
  },

  // Phénomènes météorologiques
  {
    localSlug: 'quels-gestes-adopter-en-periode-de-grand-froid',
    santeFrUrl: 'https://www.sante.fr/quels-gestes-adopter-en-periode-de-grand-froid',
    title: 'Quels gestes adopter en période de grand froid ?',
    category: 'Phénomènes météorologiques'
  },
  {
    localSlug: 'quels-reflexes-a-prendre-pour-proteger-son-enfant-du-grand-froid',
    santeFrUrl: 'https://www.sante.fr/quels-reflexes-prendre-pour-proteger-son-enfant-du-grand-froid',
    title: 'Quels réflexes à prendre pour protéger son enfant du grand froid ?',
    category: 'Phénomènes météorologiques'
  },
  {
    localSlug: 'qu-est-ce-que-la-vigilance-meteorologique',
    santeFrUrl: 'https://www.sante.fr/quest-ce-que-la-vigilance-meteorologique',
    title: 'Qu\'est-ce que la vigilance météorologique ?',
    category: 'Phénomènes météorologiques'
  },
  {
    localSlug: 'inondations-quels-sont-les-bons-reflexes',
    santeFrUrl: 'https://www.sante.fr/inondations-quels-sont-les-bons-reflexes',
    title: 'Inondations : quels sont les bons réflexes ?',
    category: 'Phénomènes météorologiques'
  },
  {
    localSlug: 'quels-comportements-adopter-en-cas-de-secheresse',
    santeFrUrl: 'https://www.sante.fr/quels-comportements-adopter-en-cas-de-secheresse',
    title: 'Quels comportements adopter en cas de sécheresse ?',
    category: 'Phénomènes météorologiques'
  },
  {
    localSlug: 'que-faire-en-cas-de-vigilance-meteo-neige-et-verglas',
    santeFrUrl: 'https://www.sante.fr/que-faire-en-cas-de-vigilance-meteo-neige-et-verglas',
    title: 'Que faire en cas de vigilance météo neige et verglas ?',
    category: 'Phénomènes météorologiques'
  },
  {
    localSlug: 'quels-gestes-adopter-en-cas-de-vigilance-meteo-avalanche',
    santeFrUrl: 'https://www.sante.fr/quels-gestes-adopter-en-cas-de-vigilance-meteo-avalanche',
    title: 'Quels gestes adopter en cas de vigilance météo avalanche ?',
    category: 'Phénomènes météorologiques'
  },
  {
    localSlug: 'comment-se-proteger-en-cas-de-vague-de-chaleur',
    santeFrUrl: 'https://www.sante.fr/comment-se-proteger-en-cas-de-vague-de-chaleur',
    title: 'Comment se protéger en cas de vague de chaleur ?',
    category: 'Phénomènes météorologiques'
  },
  {
    localSlug: 'comment-proteger-votre-sante-et-celle-de-vos-enfants-en-cas-de-fortes-chaleurs',
    santeFrUrl: 'https://www.sante.fr/comment-proteger-votre-sante-et-celle-de-vos-enfants-en-cas-de-fortes-chaleurs',
    title: 'Comment protéger votre santé et celle de vos enfants en cas de fortes chaleurs ?',
    category: 'Phénomènes météorologiques'
  },

  // À la maison
  {
    localSlug: 'l-air-interieur-des-logements-est-il-pollue',
    santeFrUrl: 'https://www.sante.fr/lair-interieur-des-logements-est-il-pollue',
    title: 'L\'air intérieur des logements est-il pollué ?',
    category: 'À la maison'
  },
  {
    localSlug: 'comment-aerer-son-logement-pour-ameliorer-l-air-interieur',
    santeFrUrl: 'https://www.sante.fr/comment-aerer-son-logement-pour-ameliorer-lair-interieur',
    title: 'Comment aérer son logement pour améliorer l\'air intérieur ?',
    category: 'À la maison'
  },
  {
    localSlug: 'comment-ameliorer-la-qualite-de-l-air-chez-soi-grace-a-la-ventilation',
    santeFrUrl: 'https://www.sante.fr/comment-ameliorer-la-qualite-de-lair-chez-soi-grace-la-ventilation',
    title: 'Comment améliorer la qualité de l\'air chez soi grâce à la ventilation ?',
    category: 'À la maison'
  },
  {
    localSlug: 'comment-chauffer-son-interieur-en-toute-securite',
    santeFrUrl: 'https://www.sante.fr/comment-chauffer-son-interieur-en-toute-securite',
    title: 'Comment chauffer son intérieur en toute sécurité ?',
    category: 'À la maison'
  },
  {
    localSlug: 'que-faire-en-presence-de-radon-dans-son-logement',
    santeFrUrl: 'https://www.sante.fr/que-faire-en-presence-de-radon-dans-son-logement',
    title: 'Que faire en présence de radon dans son logement ?',
    category: 'À la maison'
  },
  {
    localSlug: 'chauffage-au-bois-comment-bien-l-utiliser',
    santeFrUrl: 'https://www.sante.fr/chauffage-au-bois-comment-bien-lutiliser',
    title: 'Chauffage au bois : comment bien l\'utiliser ?',
    category: 'À la maison'
  },
  {
    localSlug: 'les-produits-d-entretien-polluent-ils-l-air-interieur',
    santeFrUrl: 'https://www.sante.fr/les-produits-dentretien-polluent-ils-lair-interieur',
    title: 'Les produits d\'entretien polluent-ils l\'air intérieur ?',
    category: 'À la maison'
  },
  {
    localSlug: 'comment-proteger-son-enfant-des-produits-chimiques-a-la-maison',
    santeFrUrl: 'https://www.sante.fr/comment-proteger-son-enfant-des-produits-chimiques-la-maison',
    title: 'Comment protéger son enfant des produits chimiques à la maison ?',
    category: 'À la maison'
  },
  {
    localSlug: 'comment-jardiner-sans-polluer',
    santeFrUrl: 'https://www.sante.fr/comment-jardiner-sans-polluer',
    title: 'Comment jardiner sans polluer ?',
    category: 'À la maison'
  },
  {
    localSlug: 'comment-ameliorer-l-air-de-son-logement-quand-on-est-futurs-ou-nouveaux-parents',
    santeFrUrl: 'https://www.sante.fr/comment-ameliorer-lair-de-son-logement-quand-est-futurs-ou-nouveaux-parents',
    title: 'Comment améliorer l\'air de son logement quand on est futurs ou nouveaux parents ?',
    category: 'À la maison'
  },
  {
    localSlug: 'comment-limiter-l-humidite-dans-son-logement',
    santeFrUrl: 'https://www.sante.fr/comment-limiter-lhumidite-dans-son-logement',
    title: 'Comment limiter l\'humidité dans son logement ?',
    category: 'À la maison'
  },
  {
    localSlug: 'comment-reduire-l-exposition-aux-polluants-pendant-les-travaux',
    santeFrUrl: 'https://www.sante.fr/comment-reduire-lexposition-aux-polluants-pendant-les-travaux',
    title: 'Comment réduire l\'exposition aux polluants pendant les travaux ?',
    category: 'À la maison'
  },
  {
    localSlug: 'cuisiner-en-protegeant-sa-sante-quels-gestes-adopter',
    santeFrUrl: 'https://www.sante.fr/cuisiner-en-protegeant-sa-sante-quels-gestes-adopter',
    title: 'Cuisiner en protégeant sa santé : quels gestes adopter ?',
    category: 'À la maison'
  },
  {
    localSlug: 'comment-utiliser-l-eau-de-pluie',
    santeFrUrl: 'https://www.sante.fr/comment-utiliser-leau-de-pluie',
    title: 'Comment utiliser l\'eau de pluie ?',
    category: 'À la maison'
  },
  {
    localSlug: 'comment-prevenir-l-exposition-au-plomb-dans-son-logement',
    santeFrUrl: 'https://www.sante.fr/comment-prevenir-lexposition-au-plomb-dans-son-logement',
    title: 'Comment prévenir l\'exposition au plomb dans son logement ?',
    category: 'À la maison'
  },
  {
    localSlug: 'les-plantes-ameliorent-elles-la-qualite-de-l-air-interieur',
    santeFrUrl: 'https://www.sante.fr/les-plantes-ameliorent-elles-la-qualite-de-lair-interieur',
    title: 'Les plantes améliorent-elles la qualité de l\'air intérieur ?',
    category: 'À la maison'
  },
  {
    localSlug: 'comment-limiter-la-presence-d-acariens-dans-son-logement',
    santeFrUrl: 'https://www.sante.fr/comment-limiter-la-presence-dacariens-dans-son-logement',
    title: 'Comment limiter la présence d\'acariens dans son logement ?',
    category: 'À la maison'
  },
  {
    localSlug: 'comment-eviter-l-exposition-a-l-amiante',
    santeFrUrl: 'https://www.sante.fr/comment-eviter-lexposition-lamiante',
    title: 'Comment éviter l\'exposition à l\'amiante ?',
    category: 'À la maison'
  },
  {
    localSlug: 'les-purificateurs-d-air-ameliorent-ils-la-qualite-de-l-air-interieur-chez-soi',
    santeFrUrl: 'https://www.sante.fr/les-purificateurs-dair-ameliorent-ils-la-qualite-de-lair-interieur-chez-soi',
    title: 'Les purificateurs d\'air améliorent-ils la qualité de l\'air intérieur chez soi ?',
    category: 'À la maison'
  },
  {
    localSlug: 'les-bougies-et-l-encens-degradent-ils-la-qualite-de-l-air-interieur',
    santeFrUrl: 'https://www.sante.fr/les-bougies-et-lencens-degradent-ils-la-qualite-de-lair-interieur',
    title: 'Les bougies et l\'encens dégradent-ils la qualité de l\'air intérieur ?',
    category: 'À la maison'
  },
  {
    localSlug: 'comment-eviter-une-intoxication-au-monoxyde-de-carbone',
    santeFrUrl: 'https://www.sante.fr/comment-eviter-une-intoxication-au-monoxyde-de-carbone',
    title: 'Comment éviter une intoxication au monoxyde de carbone ?',
    category: 'À la maison'
  },
  {
    localSlug: 'que-signifient-les-pictogrammes-de-danger-sur-les-produits-chimiques',
    santeFrUrl: 'https://www.sante.fr/que-signifient-les-pictogrammes-de-danger-sur-les-produits-chimiques',
    title: 'Que signifient les pictogrammes de danger sur les produits chimiques ?',
    category: 'À la maison'
  },
  {
    localSlug: 'quels-gestes-adopter-pour-profiter-du-sapin-de-noel-en-toute-securite-a-la-maison',
    santeFrUrl: 'https://www.sante.fr/quels-gestes-adopter-pour-profiter-du-sapin-de-noel-en-toute-securite-la-maison',
    title: 'Quels gestes adopter pour profiter du sapin de Noël en toute sécurité à la maison ?',
    category: 'À la maison'
  }
];

// Fonction pour obtenir l'URL de redirection pour un slug donné
export function getRedirectUrl(slug: string): string | undefined {
  const redirect = santeFrRedirects.find(r => r.localSlug === slug);
  return redirect?.santeFrUrl;
}

// Fonction pour vérifier si un article a une redirection
export function hasRedirect(slug: string): boolean {
  return santeFrRedirects.some(r => r.localSlug === slug);
}

// Fonction pour obtenir toutes les redirections
export function getAllRedirects(): SanteFrRedirect[] {
  return santeFrRedirects;
}

// Fonction pour obtenir les redirections par catégorie
export function getRedirectsByCategory(category: string): SanteFrRedirect[] {
  return santeFrRedirects.filter(r => r.category === category);
}

// Fonction pour ajouter une redirection (utile pour l'administration)
export function addRedirect(redirect: SanteFrRedirect): void {
  // Vérifier si la redirection existe déjà
  const existingIndex = santeFrRedirects.findIndex(r => r.localSlug === redirect.localSlug);
  if (existingIndex >= 0) {
    santeFrRedirects[existingIndex] = redirect;
  } else {
    santeFrRedirects.push(redirect);
  }
}

// Fonction pour supprimer une redirection
export function removeRedirect(slug: string): void {
  const index = santeFrRedirects.findIndex(r => r.localSlug === slug);
  if (index >= 0) {
    santeFrRedirects.splice(index, 1);
  }
} 