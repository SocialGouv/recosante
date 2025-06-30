export interface Municipality {
  nom: string;
  code: string;
  codesPostaux: string[];
  codeDepartement: string;
  codeRegion: string;
  population: number;
}

export namespace MunicipalityService {
  export async function searchMunicipalities(query: string): Promise<Municipality[]> {
    if (query.length < 3) {
      return [];
    }

    try {
      const params = new URLSearchParams({
        nom: query,
        fields: 'nom,code,codesPostaux,codeDepartement,codeRegion,population',
        format: 'json',
        boost: 'population',
        limit: '10'
      });

      const response = await fetch(`https://geo.api.gouv.fr/communes?${params}`);
      
      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Erreur lors de la recherche de communes:', error);
      return [];
    }
  }

  export async function getMunicipalityByCode(code: string): Promise<Municipality | null> {
    try {
      const params = new URLSearchParams({
        code: code,
        fields: 'nom,code,codesPostaux,codeDepartement,codeRegion,population',
        format: 'json'
      });

      const response = await fetch(`https://geo.api.gouv.fr/communes?${params}`);
      
      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
      }

      const data = await response.json();
      return data.length > 0 ? data[0] : null;
    } catch (error) {
      console.error('Erreur lors de la récupération de la commune:', error);
      return null;
    }
  }

  export function formatMunicipalityDisplay(municipality: Municipality): string {
    const postalCodes = municipality.codesPostaux?.slice(0, 2).join(', ');
    return postalCodes ? `${municipality.nom} (${postalCodes})` : municipality.nom;
  }
} 