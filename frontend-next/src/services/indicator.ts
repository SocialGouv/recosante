const indicators = [
  'indice_atmospheric',
  'indice_uv',
  'pollen_allergy',
  'weather_alert',
  'bathing_water',
];

// Configuration de l'API
const API_CONFIG = {
  baseUrl: process.env.NEXT_PUBLIC_API_URL || 'https://recosante-api-node.fabrique.social.gouv.fr',
  endpoints: {
    indicators: '/indicators/website',
  },
};

// Types pour les données des indicateurs
export interface Indicator {
  slug: string;
  label: string;
  value: number;
  unit?: string;
  validity: {
    start: string;
    end: string;
  };
  advice?: string;
  details?: any;
}

export interface IndicatorsResponse {
  ok: boolean;
  data: Indicator[];
}

export namespace IndicatorService {
  export function getNameBySlug(slug: string) {
    switch (slug) {
      case 'indice_atmospheric':
        return "l'indice ATMO";
      case 'indice_uv':
        return "l'indice UV";
      case 'pollen_allergy':
        return 'le taux de pollen';
      case 'weather_alert':
        return 'les alertes météo';
      case 'bathing_water':
        return 'les eaux de baignade';
      default:
        return '';
    }
  }

   export async function getIndicators(municipalityCode: string): Promise<Indicator[]> {
    try {
      const url = `${API_CONFIG.baseUrl}${API_CONFIG.endpoints.indicators}?municipality_insee_code=${municipalityCode}`;
      
      console.log('Tentative de connexion à:', url);
      
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'appdevice': 'website',
          'appversion': '1.0.0',
          'appbuild': '1',
        },
        // credentials: 'include',
      });

      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
      }

      const result: IndicatorsResponse = await response.json();
      
      if (!result.ok) {
        throw new Error('Erreur dans la réponse de l\'API');
      }

      return result.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des indicateurs:', error);
      // Retourner un tableau vide en cas d'erreur
      return [];
    }
  }

 export function getIndicatorBySlug(indicators: any[], slug: string): any | undefined {
    return indicators.find(indicator => indicator.slug === slug);
  }
}
