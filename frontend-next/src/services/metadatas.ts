export namespace MetadataService {
  export function getJsonLd(description?: string) {
    return {
      '@context': 'http://schema.org',
      '@type': 'SoftwareApplication',
      name: 'Recosanté',
      installUrl: 'https://recosante.beta.gouv.fr/download',
      description:
        description ||
        "L'application officielle du gouvernement français pour suivre en temps réel la qualité de l'air et de l'eau, le pollen, l'indice UV, pollen, et les alertes météo.        ",
      applicationCategory: 'Santé et environnement',
      operatingSystem:
        'iOS 13.4 ou version ultérieure, macOS 11.0 ou version ultérieure avec puce Apple M1 ou ultérieure, visionOS 1.0 ou version ultérieure',
      availableOnDevice: 'iPhone, iPod touch, Mac, Apple Vision',
      inLanguage: 'fr',
      countriesSupported: ['FR'],
      softwareVersion: '1.0.7',
      datePublished: '2024-02-26',
      sceenshot:
        'https://recosante-preprod.ovh.fabrique.social.gouv.fr/og-image-x2.jpg',
      offers: {
        '@type': 'Offer',
        price: '0.00',
        priceCurrency: 'EUR',
      },
      provider: 'Fabrique numerique des ministeres sociaux',
      fileSize: '21.7 MB',
      ageRating: '4+',
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '5.0',
        reviewCount: 20,
      },
      review: {
        '@type': 'Review',
        reviewRating: {
          '@type': 'Rating',
          ratingValue: '5.0',
          bestRating: '5',
        },
        author: {
          '@type': 'Person',
          name: 'Fabrique numérique des ministères sociaux',
        },
      },
    };
  }
}
